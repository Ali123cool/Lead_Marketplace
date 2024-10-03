// Src/Components/common/Dashboards/DashboardFormField.js

import React from 'react';

const DashboardFormField = ({ label, type = 'text', value, onChange, placeholder = '', className = '' }) => {
  return (
    <div className={`mb-4 ${className} w-full max-w-xl mx-auto `}>
      {label && <label className="block font-bold mb-2 ">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 w-full rounded-2xl text-black border-button-secondary border-2"
      />
    </div>
  );
};

export default DashboardFormField;
