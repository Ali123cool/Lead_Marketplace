// VendorDashboard_Payouts.js
import React, { useState } from 'react';

const VendorDashboard_Payouts = () => {
  const [payouts, setPayouts] = useState([
    { id: 1, amount: '$500', status: 'Paid', date: '2024-01-15' },
    { id: 2, amount: '$200', status: 'Pending', date: '2024-01-18' },
  ]);

  const handleConnectStripe = () => {
    // Logic to connect to Stripe (you can integrate Stripe API here)
    console.log('Connect to Stripe clicked');
  };

  const handleRequestPayout = () => {
    // Logic to request a new payout (Stripe API can be called here)
    console.log('Request payout clicked');
  };

  return (
    <div className="bg-primary p-6 rounded-md">
      <h2 className="text-bodyText text-2xl font-bold mb-6">Manage Payouts</h2>

      <button
        onClick={handleConnectStripe}
        className="bg-button1 text-bodyText py-3 px-6 rounded-md mb-4"
      >
        Connect to Stripe
      </button>

      <button
        onClick={handleRequestPayout}
        className="bg-button2 text-bodyText py-3 px-6 rounded-md ml-4 mb-4"
      >
        Request Payout
      </button>

      <table className="w-full bg-secondary rounded-md text-bodyText mt-4">
        <thead>
          <tr>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout) => (
            <tr key={payout.id}>
              <td className="p-4">{payout.amount}</td>
              <td className="p-4">{payout.status}</td>
              <td className="p-4">{payout.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorDashboard_Payouts;
