// Src/Components/common/Dashboards/DashboardChart.js

import React from 'react';

const DashboardChart = ({ placeholderText = 'Chart will be here', className = '' }) => {
  return (
    <div className={`bg-secondary text-white p-4 rounded-md shadow-md ${className}`}>
      <p>{placeholderText}</p>
    </div>
  );
};

export default DashboardChart;
