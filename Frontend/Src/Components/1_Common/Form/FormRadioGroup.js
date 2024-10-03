import React from 'react';

const FormRadioGroup = ({ label, options, name, value, onChange }) => {
  return (
    <div className="mb-4">
      {/* Label using body-primary style */}
      <label className="block body-primary mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            {/* Input styled for radio buttons */}
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="mr-2"
            />
            <span className="body-tertiary">{option.label}</span> 
          </label>
        ))}
      </div>
    </div>
  );
};

export default FormRadioGroup;
