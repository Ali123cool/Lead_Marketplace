import React from 'react';

const FormCheckbox = ({ label, linkText, linkTo }) => {
  return (
    <div className="flex items-center mt-4">
      <input type="checkbox" className="mr-2" />
      <label className="body-primary">
        {label} 
        {linkText && (
          <a href={linkTo} className="text-button-secondary ml-1 hover:underline">
            {linkText}
          </a>
        )}
      </label>
    </div>
  );
};

export default FormCheckbox;
