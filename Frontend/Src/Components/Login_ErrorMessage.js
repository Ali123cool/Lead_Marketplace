// Src/Components/Login_ErrorMessage.js

import React from 'react';

const Login_ErrorMessage = ({ message }) => {
  if (!message) return null; // Only show if there's a message

  return (
    <div className="bg-red-500 text-bodyText p-3 rounded-md mb-4">
      {message}
    </div>
  );
};

export default Login_ErrorMessage;
