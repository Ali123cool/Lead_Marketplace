import React, { useState } from 'react';
import FormField from '../../Components/common/Form/FormField';
import FormButton from '../../Components/common/Form/FormButton';
import FormCheckbox from '../../Components/common/Form/FormCheckbox';
import FormTitle from '../../Components/common/Form/FormTitle'; 
import FormMessageLink from '../../Components/common/Form/FormMessageLink';
import FormMessage from '../../Components/common/Form/FormMessage'; // Importing FormMessage
import { useAuth } from '../../Context/AuthContext'; // Use AuthContext
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth(); // Access login from AuthContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await login(email, password); // Use login function from AuthContext
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      setErrorMessage('Login failed: Incorrect email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary mt-8">
      <div className="bg-tertiary rounded-lg p-6 max-w-md w-full">
        <FormTitle title="Login" />

        {/* Display the error message using FormMessage if it exists */}
        {errorMessage && <FormMessage type="error" message={errorMessage} />}

        {/* Login Form */}
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
          <FormButton text="Login" />
        </form>

        {/* Login Links */}
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
