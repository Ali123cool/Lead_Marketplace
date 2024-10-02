// Src/Components/common/Dashboards/DashboardCard.js

import React from 'react';

const DashboardCard = ({ styleType = 'card-1', children, className = '' }) => {
  return (
    <div className={`${styleType} ${className}`}>
      {children}
    </div>
  );
};

export default DashboardCard;
