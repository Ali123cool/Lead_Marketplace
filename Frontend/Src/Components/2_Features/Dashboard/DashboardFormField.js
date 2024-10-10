// Src/Components/common/Dashboards/DashboardFormField.js

import React, { forwardRef } from 'react';

const DashboardFormField = forwardRef(({ label, type = 'text', value, onChange, placeholder = '', className = '' }, ref) => {
  return (
    <div className={`mb-4 ${className} w-full max-w-md mx-auto`}>
      {label && <label className="block font-bold mb-2">{label}</label>}
      <input
        type={type}
        value={value || ''} // Ensure it's never null
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 w-full rounded-2xl text-black border-button-secondary border-2"
        ref={ref} // Pass the ref down
      />
    </div>
  );
});

export default DashboardFormField;
