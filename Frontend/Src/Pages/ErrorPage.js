import React from 'react';
import ErrorPage_ErrorMessage from '../Components/ErrorPage_ErrorMessage';
import ErrorPage_BackToHomeButton from '../Components/ErrorPage_BackToHomeButton';
import Global_Navbar from '../Components/Global_Navbar';


const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col justify-between">
      <Global_Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        <ErrorPage_ErrorMessage />
        <ErrorPage_BackToHomeButton />
      </div>
    </div>
  );
};

export default ErrorPage;
