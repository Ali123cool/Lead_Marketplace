import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../Common/UserInterface/Button'; // Import the common Button component

const ErrorPage_BackToHomeButton = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="mt-8">
      <Button styleType="btn-1" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </div>
  );
};

export default ErrorPage_BackToHomeButton;
