// VendorDashboard_Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const VendorDashboard_Sidebar = () => {
  return (
    <div className="bg-primary h-screen p-6 text-bodyText">
      <ul className="space-y-4">
        <li>
          <Link to="/vendor/profile" className="hover:text-button1">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/vendor/leads" className="hover:text-button1">
            Manage Leads
          </Link>
        </li>
        <li>
          <Link to="/vendor/payouts" className="hover:text-button1">
            Payouts
          </Link>
        </li>
        <li>
          <Link to="/vendor/notifications" className="hover:text-button1">
            Notifications
          </Link>
        </li>
        <li>
          <Link to="/vendor/support" className="hover:text-button1">
            Support
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default VendorDashboard_Sidebar;
