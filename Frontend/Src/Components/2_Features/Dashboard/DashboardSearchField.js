// Src/Components/common/Dashboards/DashboardSearchField.js

import React from 'react';

const DashboardSearchField = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="w-full max-w-xs mb-6">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border p-2 w-full rounded-md text-black"
      />
    </div>
  );
};

export default DashboardSearchField;
