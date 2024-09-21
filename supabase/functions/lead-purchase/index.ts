import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase Client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  try {
    // Extract the purchase payload from the request
    const payload = await req.json();
    const { customer_id, lead_ids } = payload;

    // Fetch the leads and group by vendor
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .in('id', lead_ids);

    if (error) throw new Error("Error fetching leads");

    const leadsByVendor = groupBy(leads, 'vendor_id');

    // Notify each vendor and update leads as "sold"
    for (const vendor_id in leadsByVendor) {
      const vendorLeads = leadsByVendor[vendor_id];

      // Send notification to the vendor
      await sendVendorNotification(vendor_id, vendorLeads);

      // Mark the leads as sold
      await supabase
        .from('leads')
        .update({ status: 'sold', sold_at: new Date() })
        .in('id', vendorLeads.map(lead => lead.id));
    }

    // Send notification to the customer with order summary
    await sendCustomerNotification(customer_id, leads);

    return new Response("Purchase processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing lead purchase:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
});

// Helper function to group leads by vendor
function groupBy(leads, key) {
  return leads.reduce((result, lead) => {
    (result[lead[key]] = result[lead[key]] || []).push(lead);
    return result;
  }, {});
}

// Mock vendor notification function
async function sendVendorNotification(vendor_id, vendorLeads) {
  console.log(`Sending notification to Vendor ${vendor_id} for ${vendorLeads.length} leads`);
  // Here you can integrate actual email sending logic
  return true;
}

// Mock customer notification function
async function sendCustomerNotification(customer_id, leads) {
  console.log(`Sending order summary to Customer ${customer_id} for ${leads.length} leads`);
  // Here you can integrate actual email sending logic
  return true;
}
