// VendorDashboard_ManageLeads.js
import React, { useState } from 'react';

const VendorDashboard_ManageLeads = () => {
  const [leads, setLeads] = useState([
    { id: 1, title: 'Roofing Job in Texas', status: 'Pending', price: '$200' },
    { id: 2, title: 'Roof Repair in Florida', status: 'Sold', price: '$500' },
  ]);
  
  const handleAddLead = () => {
    // Logic to add a new lead, for now we'll just console log
    console.log('Add new lead clicked');
  };

  return (
    <div className="bg-primary p-6 rounded-md">
      <h2 className="text-bodyText text-2xl font-bold mb-6">Manage Leads</h2>

      <table className="w-full bg-secondary rounded-md text-bodyText">
        <thead>
          <tr>
            <th className="p-4 text-left">Lead Title</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td className="p-4">{lead.title}</td>
              <td className="p-4">{lead.status}</td>
              <td className="p-4">{lead.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleAddLead}
        className="bg-button1 text-bodyText py-3 px-6 rounded-md mt-4"
      >
        Add New Lead
      </button>
    </div>
  );
};

export default VendorDashboard_ManageLeads;
