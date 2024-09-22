// Src/Components/Registration_ErrorMessage.js

import React from 'react';

const Registration_ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-500 text-bodyText p-3 rounded-md mb-4">
      {message}
    </div>
  );
};

export default Registration_ErrorMessage;
