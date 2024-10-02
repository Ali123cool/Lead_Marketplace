import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../HelperFunctions/Context/AuthContext'; // Use AuthContext's login
import FormField from '../../Components/Common/Form/FormField';
import FormButton from '../../Components/Common/Form/FormButton';
import FormTitle from '../../Components/Common/Form/FormTitle';
import FormMessageLink from '../../Components/Common/Form/FormMessageLink';
import FormMessage from '../../Components/Common/Form/FormMessage';

const Login = () => {
  const { user, role, loading, login } = useAuth(); // Use login method from context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, seterror] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (role === 'vendor') {
        navigate('/vendor-dashboard');
      } else if (role === 'customer') {
        navigate('/customer-dashboard');
      } 
    }
  }, [user, role, loading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror(''); // Reset error message
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password); // Use login from AuthContext
    } catch (error) {
      seterror(error.message); // Display the error message if login fails
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center mt-10">
      <div className="container max-w-md mx-auto p-6 bg-tertiary rounded-md shadow-md">
        <FormTitle title="Login" />

        {error && <FormMessage type="error" message={error} />}  {/* Show error message */}
        
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
          <FormButton text={isSubmitting ? 'Logging in...' : 'Login'} disabled={isSubmitting} />
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
