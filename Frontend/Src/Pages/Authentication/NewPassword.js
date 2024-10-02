import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitNewPassword } from '../../HelperFunctions/Authentication/AuthSubmitNewPassword';
import FormField from '../../Components/Common/Form/FormField';
import FormButton from '../../Components/Common/Form/FormButton';
import FormMessage from '../../Components/Common/Form/FormMessage';
import FormTitle from '../../Components/Common/Form/FormTitle';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset any existing messages
    setError('');   // Reset any existing errors

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Call the function to reset the password
    const response = await submitNewPassword(newPassword);

    // If a previous session is already active it will automatically redirect to the customer or vendor dashboard
    if (response.success) {
      setMessage(response.message);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="bg-tertiary rounded-lg p-6 max-w-md w-full">
        <FormTitle title="Set New Password" />

        {/* Show only one message at a time */}
        {message && !error && <FormMessage type="success" message={message} />}
        {error && !message && <FormMessage type="error" message={error} />}

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
          <FormButton text="Set New Password" />
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
