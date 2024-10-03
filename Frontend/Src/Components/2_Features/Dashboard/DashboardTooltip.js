// Src/Components/common/Dashboards/DashboardTooltip.js

import React, { useState } from 'react';

const DashboardTooltip = ({ text, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        className="text-white bg-secondary w-6 h-6 border-2 rounded-full flex items-center justify-center text-lg font-bold"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        i
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
