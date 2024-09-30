import React, { useState } from 'react';
import FormField from '../../Components/common/Form/FormField';
import FormButton from '../../Components/common/Form/FormButton';
import FormRadioGroup from '../../Components/common/Form/FormRadioGroup';
import FormTitle from '../../Components/common/Form/FormTitle';
import FormMessageLink from '../../Components/common/Form/FormMessageLink';
import FormMessage from '../../Components/common/Form/FormMessage';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../HelperFunctions/authRegistration';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'customer',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
    setErrorMessage('');
    setSuccessMessage('');

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Use the helper function to handle registration
      const response = await registerUser(formData.email, formData.password, formData.accountType);

      if (response.success) {
        setSuccessMessage('Registration successful! Please check your email.');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page
        }, 10000);
      } else {
        throw new Error(); // Trigger the catch block for generic error
      }
    } catch (error) {
      // Set a generic error message
      setErrorMessage('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center mt-10">
      <div className="container max-w-md mx-auto p-6 bg-tertiary rounded-md shadow-md">
        <FormTitle title="Register" />

        {successMessage && <FormMessage type="success" message={successMessage} />}
        {errorMessage && <FormMessage type="error" message={errorMessage} />}

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
          <FormButton text="Register" />
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
