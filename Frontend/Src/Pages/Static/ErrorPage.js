import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/1_Common/UserInterface/Button';

const ErrorPage_ErrorMessage = () => {
  return (
    <div className="text-center text-text-primary">
      <h1 className="text-h1 font-bold mb-4 -mt-16">404</h1>
      <p className="body-primary">Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
};

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

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center flex-grow">
        <ErrorPage_ErrorMessage />
        <ErrorPage_BackToHomeButton />
      </div>
    </div>
  );
};

export default ErrorPage;