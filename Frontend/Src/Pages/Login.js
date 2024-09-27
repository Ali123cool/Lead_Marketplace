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
      // Step 1: Attempt login with Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        // Step 2: Handle login errors
        if (error.message === 'Invalid login credentials') {
          setErrorMessage('Login failed: Incorrect password.');
        } else if (error.message === 'Email not confirmed') {
          setErrorMessage('Please verify your email before logging in.');
        } else {
          setErrorMessage('Login failed: ' + error.message);
        }
      } else if (data.user) {
        // Step 3: Fetch the user's account type from the users_meta table
        const { data: userMeta, error: metaError } = await supabase
          .from('users_meta')
          .select('account_type')
          .eq('id', data.user.id)
          .single();

        if (metaError) {
          setErrorMessage('Failed to fetch account type. Please try again.');
        } else {
          const accountType = userMeta?.account_type;

          // Step 4: Navigate based on account type
          if (accountType === 'vendor') {
            navigate('/vendor-dashboard');
          } else if (accountType === 'customer') {
            navigate('/customer-dashboard');
          } else {
            setErrorMessage('Unknown account type.');
          }
        }
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center mt-4">
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
