// Src/Components/CenteredContainer.js
import React from 'react';

const CenteredContainer = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)]">
      {children}
    </div>
  );
};

export default CenteredContainer;
