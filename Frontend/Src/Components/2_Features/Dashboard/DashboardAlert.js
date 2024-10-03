// Src/Components/common/Dashboards/DashboardAlert.js

import React from 'react';

const DashboardAlert = ({ type = 'success', message }) => {
  const alertStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
  };

  return (
    <div className={`p-4 rounded-md mb-4 ${alertStyles[type]}`}>
      {message}
    </div>
  );
};

export default DashboardAlert;
