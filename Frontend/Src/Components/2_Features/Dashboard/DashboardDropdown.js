// Src/Components/common/Dashboards/DashboardDropdown.js

import React from 'react';

const DashboardDropdown = ({ options, value, onChange }) => {
  return (
    <div className="relative inline-block w-full max-w-xs mb-6">
      <select
        className="p-2 w-full rounded-2xl text-black border-button-secondary border-2"
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DashboardDropdown;
