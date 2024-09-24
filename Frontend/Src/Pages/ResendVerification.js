import React, { useState } from 'react';
import ResendVerification_Form from '../Components/ResendVerification_Form';
import { supabase } from '../supabaseClient'; // Supabase client

const ResendVerification = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResendVerification = async (email) => {
    setMessage('');
    setError('');

    try {
      const { error } = await supabase.auth.resendConfirmationEmail(email);

      if (error) {
        setError('Failed to resend verification email: ' + error.message);
      } else {
        setMessage('If an account exists, a verification email has been sent.');
      }
    } catch (err) {
      setError('Something went wrong, please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="container max-w-md mx-auto p-6 bg-primary rounded-md shadow-md">
        <h2 className="text-center text-2xl text-bodyText font-bold mb-6">Resend Verification</h2>

        {/* Message or error */}
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Resend Verification Form */}
        <ResendVerification_Form onSubmit={handleResendVerification} />
      </div>
    </div>
  );
};

export default ResendVerification;
