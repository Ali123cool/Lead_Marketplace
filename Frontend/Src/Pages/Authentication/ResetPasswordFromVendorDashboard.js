import React, { useState } from 'react';
import { authResetPasswordFromDashboard } from '../../HelperFunctions/Authentication/AuthResetPasswordFromDashboard'; // Import the new helper function
import FormField from '../../Components/1_Common/Form/FormField';
import FormButton from '../../Components/1_Common/Form/FormButton';
import FormMessage from '../../Components/1_Common/Form/FormMessage';
import FormTitle from '../../Components/1_Common/Form/FormTitle';
import FormMessageLink from '../../Components/1_Common/Form/FormMessageLink'; // Import FormMessageLink

const ResetPasswordFromVendorDashboard = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const response = await authResetPasswordFromDashboard(email);

    if (response.success) {
      setMessage(response.message);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center -mt-8">
      <div className="bg-tertiary rounded-lg p-6 max-w-md w-full">
        <FormTitle title="Reset Password" />

        {/* Show only one message at a time */}
        {message && !error && <FormMessage type="success" message={message} />}
        {error && !message && <FormMessage type="error" message={error} />}

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

        {/* Use FormMessageLink for Back to Dashboard */}
        <div className="text-center mt-4">
          <FormMessageLink 
            message="Back to Vendor Dashboard?" 
            linkText="Go Back" 
            linkTo="/vendor-dashboard"  // This is the link to the vendor dashboard
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordFromVendorDashboard;
