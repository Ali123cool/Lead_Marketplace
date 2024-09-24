import React from 'react';

const Registration_ErrorMessage = ({ message }) => {
  if (!message) return null; // If there's no error message, don't display anything.

  return (
    <div className="bg-red-600 text-white p-3 rounded-md mb-4">
      <p className="font-semibold">Error:</p>
      <p>{message}</p>
    </div>
  );
};

export default Registration_ErrorMessage;
