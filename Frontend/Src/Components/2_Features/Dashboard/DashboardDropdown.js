import React from 'react';

const DashboardDropdown = ({ options, value, onChange, label }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      {label && <label className="block font-bold mb-2">{label}</label>}
      <select
        className="p-2 w-full rounded-2xl text-black border-button-secondary border-2"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option, index) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const optionLabel = typeof option === 'string' ? option : option.label;
          return (
            <option key={index} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DashboardDropdown;
