// Src/Components/common/Dashboards/DashboardContainer.js

import React from 'react';

const DashboardContainer = ({ children, className = '' }) => {
  return (
    <div className={`bg-primary border-2 p-6 rounded-md shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default DashboardContainer;
