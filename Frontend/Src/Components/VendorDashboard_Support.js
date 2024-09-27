// VendorDashboard_Support.js
import React, { useState } from 'react';

const VendorDashboard_Support = () => {
  const [issueCategory, setIssueCategory] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can send this data to an email or Supabase table
    try {
      // Example: sending a support request to the database
      /*
      const { data, error } = await supabase
        .from('support_tickets')
        .insert({ category: issueCategory, message });
      
      if (error) throw error;
      */

      setSuccessMessage('Your support request has been sent successfully!');
    } catch (error) {
      console.error('Error submitting support request:', error);
    }

    // Reset form fields
    setIssueCategory('');
    setMessage('');
  };

  return (
    <div className="bg-primary p-6 rounded-md">
      <h2 className="text-bodyText text-2xl font-bold mb-6">Contact Support</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-bodyText mb-2">Issue Category</label>
          <select
            className="w-full p-3 border rounded-md text-black"
            value={issueCategory}
            onChange={(e) => setIssueCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Payout">Payout Issue</option>
            <option value="Lead Issue">Lead Issue</option>
            <option value="Account">Account Issue</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-bodyText mb-2">Message</label>
          <textarea
            className="w-full p-3 border rounded-md text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" className="bg-button1 text-bodyText py-3 px-6 rounded-md">
          Submit Support Request
        </button>

        {successMessage && (
          <p className="text-green-600 mt-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default VendorDashboard_Support;
