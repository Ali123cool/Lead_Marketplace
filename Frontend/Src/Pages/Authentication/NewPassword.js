import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitNewPassword } from '../../HelperFunctions/Authentication/AuthSubmitNewPassword';
import FormField from '../../Components/common/Form/FormField';
import FormButton from '../../Components/common/Form/FormButton';
import FormMessage from '../../Components/common/Form/FormMessage';
import FormTitle from '../../Components/common/Form/FormTitle';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hashFragment = window.location.hash;
    if (hashFragment && hashFragment.includes('type=recovery')) {
      console.log('Password recovery mode detected');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const response = await submitNewPassword(newPassword);

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

        {message && <FormMessage type="success" message={message} />}
        {error && <FormMessage type="error" message={error} />}

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