import React, { useState, useRef, useEffect } from 'react';

const DashboardTooltip = ({ text, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  // Toggle tooltip on click
  const toggleTooltip = () => setShowTooltip(!showTooltip);

  useEffect(() => {
    if (showTooltip) {
      const tooltip = tooltipRef.current;
      const bounding = tooltip.getBoundingClientRect();

      // Check if tooltip goes beyond viewport and adjust accordingly
      if (bounding.bottom > window.innerHeight) {
        tooltip.style.bottom = '100%';
        tooltip.style.top = 'auto';
      } else {
        tooltip.style.top = '100%';
        tooltip.style.bottom = 'auto';
      }
    }
  }, [showTooltip]);

  return (
    <div className={`relative inline-block ${className} overflow-visible`} onClick={toggleTooltip}>
      <button
        className="text-white bg-secondary w-6 h-6 border p-1 m-1 rounded-full flex items-center justify-center text-md font-bold"
      >
        i
      </button>
      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-48 bg-secondary text-white text-sm p-2 rounded shadow-lg z-50"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default DashboardTooltip;
