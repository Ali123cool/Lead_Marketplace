// Src/Components/common/Dashboards/DashboardTooltip.js

import React, { useState } from 'react';

const DashboardTooltip = ({ text, children, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        className="text-white bg-secondary px-2 py-1 rounded"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        {children}
      </button>
      {showTooltip && (
        <div className="absolute left-0 mt-2 w-48 bg-secondary text-white text-sm p-2 rounded shadow-lg z-10">
          {text}
        </div>
      )}
    </div>
  );
};

export default DashboardTooltip;
