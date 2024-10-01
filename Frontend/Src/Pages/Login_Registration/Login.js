import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import FormField from '../../Components/common/Form/FormField';
import FormButton from '../../Components/common/Form/FormButton';
import FormCheckbox from '../../Components/common/Form/FormCheckbox';
import FormTitle from '../../Components/common/Form/FormTitle';
import FormMessageLink from '../../Components/common/Form/FormMessageLink';
import FormMessage from '../../Components/common/Form/FormMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login, loading, isEmailVerified, role } = useAuth();  // Access isEmailVerified and role from context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');  // Reset error message before login attempt

    try {
      await login(email, password);  // Perform login
      
      // Redirect based on the account type and email verification status
      if (!isEmailVerified) {
        navigate('/check-email');  // If email is not verified, redirect to check-email page
      } else if (role === 'vendor') {
        navigate('/vendor-dashboard');
      } else if (role === 'customer') {
        navigate('/customer-dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed: Incorrect email or password.');  // Display error if login fails
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary mt-8">
      <div className="bg-tertiary rounded-lg p-6 max-w-md w-full">
        <FormTitle title="Login" />

        {errorMessage && <FormMessage type="error" message={errorMessage} />}  {/* Display error message */}

        <form onSubmit={handleLogin}>
          <FormField
            type="email"
            placeholder="Enter your email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            type="password"
            placeholder="Enter your password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormCheckbox
            label="Remember Me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <FormButton text={loading ? "Logging in..." : "Login"} disabled={loading} />  {/* Disable button when loading */}
        </form>

        <div className="text-center mt-6">
          <FormMessageLink
            message="Don't have an account?"
            linkText="Register here."
            linkTo="/register"
          />
          <FormMessageLink
            message="Didn't get a verification email?"
            linkText="Resend Verification."
            linkTo="/resend-verification"
          />
          <FormMessageLink
            message="Forgot your password?"
            linkText="Reset Password."
            linkTo="/reset-password"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
