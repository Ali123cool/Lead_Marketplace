// Src/HelperFunctions/Dashboard/VendorDashboard/PostLeads.js

import { supabase } from '../../../Api/SupabaseClient';

/**
 * Prepare lead data by combining client address fields and structuring the data appropriately.
 * @param {Object} lead - New or updated lead data from the form.
 * @returns {Object} Prepared lead data ready for insertion into the database.
 */
const prepareLeadData = (lead) => {
  const client_full_address = [
    lead.client_street_address1,
    lead.client_street_address2,
    lead.client_city,
    lead.client_state,
    lead.client_zip_code,
    lead.client_country,
  ]
    .filter((field) => field && field.trim() !== '')
    .join(', ');

  return {
    ...lead,
    client_full_address,
    price: parseFloat(lead.price),
  };
};

/**
 * Post a new lead to the 'leads' table after validation.
 * @param {Object} leadData - Raw lead data from the form.
 * @returns {Promise<Object>} The created lead data.
 */
const postLead = async (leadData) => {
  // Prepare the lead data
  const preparedLeadData = prepareLeadData(leadData);

  // Get the current authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    throw new Error('User not authenticated.');
  }

  const vendor_id = userData.user.id;

  // Insert the new lead into the 'leads' table
  const { data, error } = await supabase.from('leads').insert([
    {
        preparedLeadData,
        vendor_id,
      },
    ]);
  
    if (error) {
      console.error('Error creating lead:', error);
      throw new Error('Unable to create lead at this time.');
    }
  
    return data[0];
  };
  
  /**
   * Update an existing lead in the 'leads' table.
   * @param {string} leadId - UUID of the lead to update.
   * @param {Object} leadData - Updated lead data from the form.
   * @returns {Promise<Object>} The updated lead data.
   */
  const updateLead = async (leadId, leadData) => {
    // Prepare the lead data
    const preparedLeadData = prepareLeadData(leadData);
  
    // Get the current authenticated user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      throw new Error('User not authenticated.');
    }
  
    const vendor_id = userData.user.id;
  
    // Update the lead in the 'leads' table
    const { data, error } = await supabase
      .from('leads')
      .update(preparedLeadData)
      .eq('id', leadId)
      .eq('vendor_id', vendor_id);
  
    if (error) {
      console.error('Error updating lead:', error);
      throw new Error('Unable to update lead at this time.');
    }
  
    return data[0];
  };
  
  export { postLead, updateLead };
  