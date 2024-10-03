// Src/Components/common/Dashboards/DashboardAccordion.js

import React, { useState } from 'react';

const DashboardAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="w-full text-left bg-secondary text-white p-4 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <div className="p-4 bg-primary rounded-md mt-2">{children}</div>}
    </div>
  );
};

export default DashboardAccordion;
