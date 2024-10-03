// Src/Components/common/Card.js

import React from 'react';

const Card = ({ 
  styleType = 'card-1', 
  heading, 
  text, 
  className = '', 
  textAlign = 'text-left', 
  centerContent = false 
}) => {
  return (
    <div 
      className={`${styleType} ${className} ${centerContent ? 'flex flex-col items-center justify-center' : ''}`}
    >
      <h2 className={`h2 mb-4 ${textAlign}`}>{heading}</h2>
      <p className={`body-primary ${textAlign}`}>{text}</p>
    </div>
  );
};

export default Card;
