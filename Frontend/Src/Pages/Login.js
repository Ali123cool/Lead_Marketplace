// Src/Pages/Login.js

import React, { useState } from 'react';
import Global_Navbar from '../Components/Global_Navbar';
import Login_Form from '../Components/Login_Form';
import Login_LinkToRegister from '../Components/Login_LinkToRegister';
import Login_ErrorMessage from '../Components/Login_ErrorMessage';
import Global_Footer from '../Components/Global_Footer';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (formData) => {
    // Simulate login and error handling
    if (formData.email === 'test@example.com' && formData.password === 'password') {
      // Simulate successful login
      setErrorMessage('');
      console.log('Login successful!');
    } else {
      // Simulate login error
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Global_Navbar />
      <div className="container mx-auto px-6 py-12">
        <Login_ErrorMessage message={errorMessage} />
        <Login_Form onSubmit={handleLogin} />
        <Login_LinkToRegister />
      </div>
      <Global_Footer />
    </div>
  );
};

export default Login;
