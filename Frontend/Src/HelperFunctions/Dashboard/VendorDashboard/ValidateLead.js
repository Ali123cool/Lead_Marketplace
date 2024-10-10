import { supabase } from '../../../Api/SupabaseClient';

const validateLead = async (leadData, userId) => {
  let status = 'approved';

  // Required fields check
  const requiredFields = [
    'title', 'short_description', 'long_description', 
    'client_first_name', 'client_last_name', 'client_email', 
    'client_phone_number', 'client_full_address', 'industry_tag', 
    'client_city', 'client_state', 'client_zip_code', 'client_country'
  ];

  for (const field of requiredFields) {
    if (!leadData[field] || leadData[field].toString().trim() === '') {
      return { status: 'rejected', justification: 'Lead rejected.' };
    }
  }

  // Duplicate check within the last two weeks
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  
  const { data: duplicateLeads, error: duplicateError } = await supabase
    .from('leads')
    .select('id, vendor_id, status')
    .eq('client_first_name', leadData.client_first_name)
    .eq('client_last_name', leadData.client_last_name)
    .eq('client_email', leadData.client_email)
    .eq('client_phone_number', leadData.client_phone_number)
    .eq('client_full_address', leadData.client_full_address)
    .eq('industry_tag', leadData.industry_tag)
    .gte('created_at', twoWeeksAgo.toISOString());

  if (duplicateError) {
    throw new Error('Error checking for duplicates.');
  }

  if (duplicateLeads.length > 0) {
    const isOwnDeletedLead = duplicateLeads.some(
      (lead) => lead.vendor_id === userId && lead.status === 'deleted'
    );

    if (!isOwnDeletedLead) {
      return { status: 'rejected', justification: 'Lead rejected.' };
    }
  }

  // Allow reposting a previously rejected lead after running validation checks
  const { data: previouslyRejected } = await supabase
    .from('leads')
    .select('id')
    .eq('client_email', leadData.client_email)
    .eq('status', 'rejected')
    .neq('vendor_id', userId); // Check if it's a different user's lead

  if (previouslyRejected.length > 0) {
    status = 'approved'; // Allow the lead to be reposted and undergo full validation
  }

  // Check for potential duplicate with same email, phone number, or address
  const { data: potentialDuplicates } = await supabase
    .from('leads')
    .select('id, status')
    .eq('client_email', leadData.client_email)
    .eq('industry_tag', leadData.industry_tag)
    .neq('status', 'deleted');

  if (potentialDuplicates.length > 0) {
    status = 'flagged';
  }

  // Disposable email domain check
  const disposableEmailDomains = ['mailinator.com', '10minutemail.com', 'yopmail.com'];
  const emailDomain = leadData.client_email.split('@').pop();
  
  if (disposableEmailDomains.includes(emailDomain)) {
    status = 'flagged';
  }

  // Phone number validation
  const fakePhonePatterns = ['1234567890', '1111111111', '0000000000'];
  const phoneRegex = /^[0-9+\-() ]{7,}$/;
  
  if (fakePhonePatterns.includes(leadData.client_phone_number) || !phoneRegex.test(leadData.client_phone_number)) {
    status = 'flagged';
  }

  // Address check for existing leads with different status
  const { data: addressLeads, error: addressLeadsError } = await supabase
    .from('leads')
    .select('id, status')
    .eq('client_full_address', leadData.client_full_address)
    .eq('industry_tag', leadData.industry_tag)
    .in('status', ['approved', 'sold', 'flagged']);
  
  if (addressLeads.length > 0) {
    status = 'flagged';
  }

  // Validate name for suspicious patterns
  const nameRegex = /^[a-zA-Z ]+$/;
  if (!nameRegex.test(leadData.client_first_name) || !nameRegex.test(leadData.client_last_name)) {
    status = 'flagged';
  }

  // Spam keyword check in title or description
  const spamKeywords = ['free', 'money', 'cheap', 'earn', 'lottery'];
  const contentToCheck = (leadData.title + ' ' + leadData.short_description + ' ' + leadData.long_description).toLowerCase();
  if (spamKeywords.some(keyword => contentToCheck.includes(keyword))) {
    status = 'flagged';
  }

  return { status, justification: status === 'flagged' ? 'Lead flagged. It will be reviewed by an admin.' : '' };
};

export default validateLead;
