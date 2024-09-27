// VendorDashboard_Header.js
import React from 'react';

const VendorDashboard_Header = ({ vendorName }) => {
  return (
    <div className="bg-secondary p-4 rounded-md shadow-md">
      <h1 className="text-2xl text-bodyText font-bold">
        Welcome, {vendorName}
      </h1>
      <p className="text-bodyText mt-2">
        Manage your leads, check payouts, and update your profile.
      </p>
    </div>
  );
};

export default VendorDashboard_Header;
