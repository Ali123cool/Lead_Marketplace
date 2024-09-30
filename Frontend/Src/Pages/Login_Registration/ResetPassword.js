import React, { useState } from 'react';
import FormField from '../../Components/common/Form/FormField';
import FormButton from '../../Components/common/Form/FormButton';
import FormMessage from '../../Components/common/Form/FormMessage';
import FormMessageLink from '../../Components/common/Form/FormMessageLink';
import FormTitle from '../../Components/common/Form/FormTitle';
import { resetUserPassword } from '../../HelperFunctions/authResetPassword'; // Importing the helper function

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setError('');   // Clear previous errors

    // Call the helper function for resetting password
    const response = await resetUserPassword(email);

    if (response.success) {
      setMessage(response.message); // Show success message
    } else {
      setError(response.message); // Show error message
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="bg-tertiary rounded-lg p-6 max-w-md w-full">
        {/* Form Title */}
        <FormTitle title="Reset Password" />

        {/* Success or Error Messages */}
        {message && <FormMessage type="success" message={message} />}
        {error && <FormMessage type="error" message={error} />}

        {/* Reset Password Form */}
        <form onSubmit={handleResetPassword}>
          <FormField
            type="email"
            placeholder="Enter your email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormButton text="Reset Password" />
        </form>

        {/* Link to login page */}
        <div className="text-center mt-4">
          <FormMessageLink
            message="Remember your password?"
            linkText="Go to Login"
            linkTo="/login"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
