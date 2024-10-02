// Src/Components/common/Dashboards/DashboardButton.js

import React from 'react';

const DashboardButton = ({ styleType = 'btn-1', children, onClick, className = '' }) => {
  return (
    <button className={`${styleType} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default DashboardButton;
