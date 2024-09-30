// VendorDashboard_Notifications.js
import React, { useState } from 'react';

const VendorDashboard_Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Lead Sold for $300', date: '2024-01-15' },
    { id: 2, message: 'Payout of $500 Approved', date: '2024-01-16' },
  ]);

  return (
    <div className="bg-primary p-6 rounded-md">
      <h2 className="text-bodyText text-2xl font-bold mb-6">Notifications</h2>

      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification.id} className="bg-secondary p-4 rounded-md text-bodyText">
            <p>{notification.message}</p>
            <p className="text-sm text-textSecondary">{notification.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorDashboard_Notifications;
