import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // To capture the token from the URL
import FormField from '../../Components/common/Form/FormField';
import FormButton from '../../Components/common/Form/FormButton';
import FormMessage from '../../Components/common/Form/FormMessage';
import FormTitle from '../../Components/common/Form/FormTitle';
import { submitNewPassword } from '../../HelperFunctions/authSubmitNewPassword';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams(); // Hook to get the query params (the reset token)

  // Extract the token from the URL
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Basic client-side validation
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!token) {
      setError('Invalid or missing token.');
      return;
    }

    // Call the helper function to submit the new password
    const response = await submitNewPassword(token, newPassword);

    if (response.success) {
      setMessage(response.message);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="bg-tertiary rounded-lg p-6 max-w-md w-full">
        <FormTitle title="Reset Password" />

        {/* Success or Error Messages */}
        {message && <FormMessage type="success" message={message} />}
        {error && <FormMessage type="error" message={error} />}

        {/* New Password Form */}
        <form onSubmit={handleSubmit}>
          <FormField
            type="password"
            placeholder="Enter your new password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FormField
            type="password"
            placeholder="Confirm your new password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FormButton text="Reset Password" />
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
