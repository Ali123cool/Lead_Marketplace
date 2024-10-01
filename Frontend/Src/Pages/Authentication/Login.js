import React, { useState, useEffect } from 'react';
import FormField from '../../Components/common/Form/FormField';
import FormButton from '../../Components/common/Form/FormButton';
import FormTitle from '../../Components/common/Form/FormTitle';
import FormMessageLink from '../../Components/common/Form/FormMessageLink';
import FormMessage from '../../Components/common/Form/FormMessage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // Use the Auth context directly

const Login = () => {
  const { login, role, user } = useAuth(); // Get login function, role, and user from context
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      // Call the login function from AuthContext
      await login(formData.email, formData.password);

      // Show success message
      setSuccessMessage('Login successful! Redirecting...');
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // UseEffect to redirect after successful login and when role is available
  useEffect(() => {
    if (user && role) {
      if (role === 'vendor') {
        navigate('/vendor-dashboard');
      } else if (role === 'customer') {
        navigate('/customer-dashboard');
      } else {
        navigate('/'); // Fallback if role isn't recognized
      }
    }
  }, [role, user, navigate]); // Watch role and user for changes

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center mt-10">
      <div className="container max-w-md mx-auto p-6 bg-tertiary rounded-md shadow-md">
        <FormTitle title="Login" />

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
          <FormButton text="Login" disabled={isSubmitting} />
        </form>

        <div className="text-center mt-4">
          <FormMessageLink
            message="Don't have an account?"
            linkText="Register here."
            linkTo="/register"
          />
          <FormMessageLink
            message="Forgot your password?"
            linkText="Reset Password."
            linkTo="/reset-password"
          />
          <FormMessageLink
            message="Didn't get a verification email?"
            linkText="Resend Verification."
            linkTo="/resend-verification"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
