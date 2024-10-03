// Src/Components/common/Dashboards/DashboardTabs.js

import React, { useState } from 'react';

const DashboardTabs = ({ tabs, initialTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`btn-2 ${activeTab === index ? 'bg-opacity-100' : 'bg-opacity-60'}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

export default DashboardTabs;
