import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const FormField = ({ type = 'text', placeholder = '', label, name, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      {label && <label className="block body-primary mb-2">{label}</label>}

      <div className="relative">
        {/* Input field for all types */}
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          name={name} // Add the name attribute so it can work properly with formData
          value={value}  // Use value from props, controlled by parent component
          onChange={onChange} // Update parent component's state on change
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md body-secondary"
        />

        {/* Password visibility toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-button-primary" />
            ) : (
              <Eye className="h-5 w-5 text-button-primary" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
