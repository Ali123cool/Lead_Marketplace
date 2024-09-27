import React, { useState } from 'react';
import ResetPassword_Form from '../Components/ResetPassword_Form';
import { supabase } from '../supabaseClient'; // Supabase client

const ResetPassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (email) => {
    setMessage('');
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        setError('Failed to send reset password email: ' + error.message);
      } else {
        setMessage('If an account exists, a password reset email has been sent.');
      }
    } catch (err) {
      setError('Something went wrong, please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="container max-w-md mx-auto p-6 bg-primary rounded-md shadow-md">
        <h2 className="text-center text-2xl text-bodyText font-bold mb-6">Reset Password</h2>

        {/* Message or error */}
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Reset Password Form */}
        <ResetPassword_Form onSubmit={handleResetPassword} />
      </div>
    </div>
  );
};

export default ResetPassword;
