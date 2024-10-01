import React, { useState } from 'react';
import { authResetPassword } from '../../HelperFunctions/authResetPassword';
import FormField from '../../Components/common/Form/FormField';
import FormButton from '../../Components/common/Form/FormButton';
import FormMessage from '../../Components/common/Form/FormMessage';
import FormTitle from '../../Components/common/Form/FormTitle';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const response = await authResetPassword(email);

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
        {message && <FormMessage type="success" message={message} />}
        {error && <FormMessage type="error" message={error} />}
        <form onSubmit={handleSubmit}>
          <FormField
            type="email"
            placeholder="Enter your email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormButton text="Send Reset Email" />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;