// Src/Pages/Registration.js

import React, { useState } from 'react';
import Global_Navbar from '../Components/Global_Navbar';
import Registration_Form from '../Components/Registration_Form';
import Registration_LinkToLogin from '../Components/Registration_LinkToLogin';
import Registration_ErrorMessage from '../Components/Registration_ErrorMessage';
import Global_Footer from '../Components/Global_Footer';

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = (formData) => {
    // Simulate registration error for demo purposes
    if (formData.email === '') {
      setErrorMessage('Email cannot be empty.');
    } else {
      setErrorMessage('');
      console.log('Registration successful:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Global_Navbar />
      <div className="container mx-auto px-6 py-12">
        <Registration_ErrorMessage message={errorMessage} />
        <Registration_Form onSubmit={handleRegistration} />
        <Registration_LinkToLogin />
      </div>
      <Global_Footer />
    </div>
  );
};

export default Registration;
