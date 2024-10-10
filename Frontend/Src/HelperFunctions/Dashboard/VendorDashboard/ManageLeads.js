// Src/HelperFunctions/Dashboard/VendorDashboard/ManageLeads.js

import { supabase } from '../../../Api/SupabaseClient';

/**
 * Fetch tags from the 'tags' table and organize them by category.
 * @returns {Promise<Object>} An object with tag categories as keys and arrays of tag names as values.
 */
const getTags = async () => {
  const { data, error } = await supabase.from('tags').select('tag_name, tag_category').order('tag_category');

  if (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Unable to retrieve tags at this time.');
  }

  // Organize tags by category
  const organizedTags = data.reduce((acc, tag) => {
    const category = tag.tag_category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tag.tag_name);
    return acc;
  }, {});

  // Ensure all expected categories are present
  const expectedCategories = ['industry', 'insurance_usage', 'job_type', 'service_timing', 'service_type'];
  expectedCategories.forEach((category) => {
    if (!organizedTags[category]) {
      organizedTags[category] = [];
    }
  });

  return organizedTags;
};

/**
 * Fetch leads for the current vendor with pagination.
 * Excludes leads with status 'deleted' and 'flagged' unless specified.
 * @param {number} page - Current page number.
 * @param {number} limit - Number of leads per page (default is 10).
 * @param {boolean} includeDeleted - Whether to include deleted leads (default is false).
 * @returns {Promise<Object>} An object containing the leads array and totalPages.
 */
const getLeads = async (page = 1, limit = 10, includeDeleted = false) => {
  // Get the current authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new Error('User not authenticated.');
  }

  const vendor_id = userData.user.id;

  // Build the query
  let query = supabase
    .from('leads')
    .select(
      `
      id,
      title,
      short_description,
      long_description,
      status,
      price,
      created_at,
      industry_tag,
      insurance_usage_tag,
      job_type_tag,
      service_timing_tag,
      service_type_tag,
      client_first_name,
      client_last_name,
      client_email,
      client_phone_number,
      client_street_address1,
      client_street_address2,
      client_city,
      client_state,
      client_zip_code,
      client_country
      `,
      { count: 'exact' }
    )
    .eq('vendor_id', vendor_id);

  if (!includeDeleted) {
    query = query.not('status', 'in', '(deleted,flagged)');
  }

  // Fetch leads for the current page
  const { data: leadsData, count, error: leadsError } = await query
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (leadsError) {
    console.error('Error fetching leads:', leadsError);
    throw new Error('Unable to retrieve leads.');
  }

  const totalPages = Math.ceil(count / limit) || 1;

  return { leads: leadsData, totalPages };
};

/**
 * Fetch statistics for the current vendor.
 * @returns {Promise<Object>} An object containing totalLeads, leadsSold, pendingLeads, and totalApprovedLeadsWorth.
 */
const getStatistics = async () => {
  // Get the current authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new Error('User not authenticated.');
  }

  const vendor_id = userData.user.id;

  // Initialize statistics object
  const stats = {
    totalLeads: 0,
    leadsSold: 0,
    pendingLeads: 0,
    totalApprovedLeadsWorth: 0,
  };

  // Fetch total leads (excluding 'deleted' and 'flagged')
  const { count: totalLeads, error: totalLeadsError } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('vendor_id', vendor_id)
    .not('status', 'in', '(deleted,flagged)');

  if (totalLeadsError) {
    console.error('Error fetching total leads:', totalLeadsError);
    throw new Error('Unable to retrieve total leads.');
  }

  stats.totalLeads = totalLeads || 0;

  // Leads sold
  const { count: leadsSold, error: leadsSoldError } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('vendor_id', vendor_id)
    .eq('status', 'sold');

  if (leadsSoldError) {
    console.error('Error fetching leads sold:', leadsSoldError);
    throw new Error('Unable to retrieve leads sold.');
  }

  stats.leadsSold = leadsSold || 0;

  // Pending leads (status 'pending' or 'flagged')
  const { count: pendingLeads, error: pendingLeadsError } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('vendor_id', vendor_id)
    .in('status', ['pending', 'flagged']);

  if (pendingLeadsError) {
    console.error('Error fetching pending leads:', pendingLeadsError);
    throw new Error('Unable to retrieve pending leads.');
  }

  stats.pendingLeads = pendingLeads || 0;

  // Total worth of approved and sold leads
  const { data: approvedLeads, error: approvedLeadsError } = await supabase
    .from('leads')
    .select('price')
    .eq('vendor_id', vendor_id)
    .in('status', ['approved', 'sold']);

  if (approvedLeadsError) {
    console.error('Error fetching approved leads:', approvedLeadsError);
    throw new Error('Unable to retrieve approved leads.');
  }

  stats.totalApprovedLeadsWorth = approvedLeads.reduce((acc, lead) => acc + parseFloat(lead.price || 0), 0);

  return stats;
};

/**
 * Update the status of a lead in the 'leads' table.
 * @param {string} leadId - UUID of the lead to update.
 * @param {string} status - New status for the lead.
 * @returns {Promise<void>}
 */
const updateLeadStatus = async (leadId, status) => {
  // Get the current authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new Error('User not authenticated.');
  }

  const vendor_id = userData.user.id;

  // Update the lead's status
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', leadId)
    .eq('vendor_id', vendor_id);

  if (error) {
    console.error('Error updating lead status:', error);
    throw new Error('Unable to update lead status.');
  }
};

export default {
  getTags,
  getLeads,
  getStatistics,
  updateLeadStatus
};
