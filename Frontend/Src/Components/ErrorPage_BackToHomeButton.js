import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage_BackToHomeButton = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <button
      className="mt-8 bg-button1 text-white py-2 px-6 rounded hover:bg-button2"
      onClick={handleBackToHome}
    >
      Back to Home
    </button>
  );
};

export default ErrorPage_BackToHomeButton;
