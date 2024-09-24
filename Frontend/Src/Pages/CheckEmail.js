import React from 'react';
import { Link } from 'react-router-dom';

const CheckEmail = () => {
  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-center items-center text-bodyText">
      <h1 className="text-3xl font-bold mb-6">Check Your Email</h1>
      <p className="mb-4">
        A confirmation email has been sent to your email address. Please verify your email before continuing.
      </p>
      <Link to="/login" className="text-button1 hover:underline">
        Go to Login
      </Link>
    </div>
  );
};

export default CheckEmail;
