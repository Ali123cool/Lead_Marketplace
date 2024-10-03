// Src/Components/common/Dashboards/DashboardBadge.js

import React from 'react';

const DashboardBadge = ({ label, type = 'default' }) => {
  const badgeStyles = {
    default: 'bg-gray-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    error: 'bg-red-500 text-white',
  };

  return (
    <span className={`inline-block px-2 py-1 rounded-md ${badgeStyles[type]}`}>
      {label}
    </span>
  );
};

export default DashboardBadge;
