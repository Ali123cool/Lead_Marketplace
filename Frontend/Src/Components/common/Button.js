// Src/Components/common/Button.js

import React from 'react';

const Button = ({ styleType = 'btn-1', children, onClick, className = '' }) => {
  return (
    <button className={`${styleType} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
