import React, { useState } from 'react';
import FormField from '../../Components/Common/Form/FormField';
import FormButton from '../../Components/Common/Form/FormButton';
import FormRadioGroup from '../../Components/Common/Form/FormRadioGroup';
import FormTitle from '../../Components/Common/Form/FormTitle';
import FormMessageLink from '../../Components/Common/Form/FormMessageLink';
import FormMessage from '../../Components/Common/Form/FormMessage';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../HelperFunctions/Authentication/AuthRegistration';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'customer',
  });
  const [error, seterror] = useState('');
  const [message, setmessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);  // Track submission status
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror('');
    setmessage('');

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      seterror('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);  // Disable the form while submitting

    try {
      // Use the helper function to handle registration
      const response = await registerUser(formData.email, formData.password, formData.accountType);

      if (response.success) {
        setmessage('Registration successful! Please check your email.');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page
        }, 10000);
      } else {
        seterror(response.message);  // Show the generic error message
      }
    } catch (error) {
      seterror('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);  // Re-enable the form
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center mt-10">
      <div className="container max-w-md mx-auto p-6 bg-tertiary rounded-md shadow-md">
        <FormTitle title="Register" />


        {/* Show only one message at a time */}
        {message && !error && <FormMessage type="success" message={message} />}
        {error && !message && <FormMessage type="error" message={error} />}

        <form onSubmit={handleSubmit}>
          <FormField
            type="email"
            placeholder="Enter your email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <FormField
            type="password"
            placeholder="Enter your password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <FormField
            type="password"
            placeholder="Confirm your password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <FormRadioGroup
            label="Account Type"
            options={[
              { label: 'Customer', value: 'customer' },
              { label: 'Vendor', value: 'vendor' },
            ]}
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
          />
          <FormButton text="Register" disabled={isSubmitting} />  {/* Disable when submitting */}
        </form>

        <div className="text-center mt-4">
          <FormMessageLink
            message="Already have an account?"
            linkText="Log in here."
            linkTo="/login"
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
