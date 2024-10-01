import React, { useState } from 'react';
import FormField from '../../Components/common/Form/FormField';
import FormButton from '../../Components/common/Form/FormButton';
import FormMessage from '../../Components/common/Form/FormMessage';
import FormMessageLink from '../../Components/common/Form/FormMessageLink';
import FormTitle from '../../Components/common/Form/FormTitle'; 
import { resendVerificationEmail } from '../../HelperFunctions/Authentication/AuthResendVerification'; // Importing the helper function

const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResendVerification = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any existing messages
    setError(''); // Clear any existing errors

    // Use the helper function for the logic
    const response = await resendVerificationEmail(email);

    if (response.success) {
      setMessage(response.message); // Set success message
    } else {
      setError(response.message); // Set error message
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="bg-tertiary rounded-lg p-6 max-w-md w-full">
        <FormTitle title="Resend Verification" />

        {/* Success or Error Messages */}
        {message && <FormMessage type="success" message={message} />}
        {error && <FormMessage type="error" message={error} />}

        {/* Resend Verification Form */}
        <form onSubmit={handleResendVerification}>
          <FormField
            type="email"
            placeholder="Enter your email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormButton text="Resend Verification" />
        </form>

        {/* Link to login page */}
        <div className="text-center mt-4">
          <FormMessageLink
            message="Remember your credentials?"
            linkText="Go to Login"
            linkTo="/login"
          />
        </div>
      </div>
    </div>
  );
};

export default ResendVerification;
