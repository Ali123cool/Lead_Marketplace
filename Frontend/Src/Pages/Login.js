import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Supabase client
import Login_Form from '../Components/Login_Form';
import Login_ErrorMessage from '../Components/Login_ErrorMessage';
import Login_LinkToRegister from '../Components/Login_LinkToRegister';
import Login_LinkToResendVerification from '../Components/Login_LinkToResendVerification';
import Login_LinkToResetPassword from '../Components/Login_LinkToResetPassword';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For navigation after successful login

  const handleLogin = async (formData) => {
    setErrorMessage('');
    setLoading(true);

    const { email, password } = formData;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        // Check for specific errors like unverified email or wrong password
        if (error.message === 'Invalid login credentials') {
          setErrorMessage('Login failed: Incorrect password.');
        } else if (error.message === 'Email not confirmed') {
          setErrorMessage('Please verify your email before logging in.');
        } else {
          setErrorMessage('Login failed: ' + error.message);
        }
      } else if (data.user) {
        // Redirect after successful login
        navigate('/dashboard'); // Replace with actual dashboard route
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="container max-w-md mx-auto p-6 bg-primary rounded-md shadow-md">
        <h2 className="text-center text-2xl text-bodyText font-bold mb-6">Login</h2>

        {/* Error message */}
        {errorMessage && <Login_ErrorMessage message={errorMessage} />}

        {/* Login form */}
        <Login_Form onSubmit={handleLogin} />

        {/* Links */}
        <Login_LinkToRegister />
        <Login_LinkToResendVerification />
        <Login_LinkToResetPassword />
      </div>
    </div>
  );
};

export default Login;
