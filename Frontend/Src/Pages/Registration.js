import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle redirects
import Registration_Form from '../Components/Registration_Form';
import Registration_ErrorMessage from '../Components/Registration_ErrorMessage';
import Registration_LinkToLogin from '../Components/Registration_LinkToLogin';
import { supabase } from '../supabaseClient'; // Supabase client

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate(); // To redirect to the "Check Email" page

  const handleRegistration = async (formData) => {
    setErrorMessage(''); // Clear any existing error message

    try {
      // Step 1: Register user via Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrorMessage(`Registration failed: ${error.message}`);
        return;
      }

      // Step 2: Insert into users_meta table (optional step for custom metadata)
      const userId = data.user.id;
      const { error: metaError } = await supabase
        .from('users_meta')
        .insert({
          id: userId,
          email: formData.email,
          account_type: formData.accountType,
        });

      if (metaError) {
        setErrorMessage(`Error saving account type: ${metaError.message}`);
        return;
      }

      // Step 3: If all successful, redirect to "Check Email" page
      setRegistrationSuccess(true);
      setTimeout(() => {
        navigate('/check-email');
      }, 2000);

    } catch (err) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="container max-w-md mx-auto p-6 bg-primary rounded-md shadow-md">
        <h2 className="text-center text-2xl text-bodyText font-bold mb-6">Register</h2>

        {/* Show success message or the form */}
        {registrationSuccess ? (
          <div className="bg-green-600 text-white p-4 rounded-md mb-4">
            <p className="font-semibold">Registration Successful!</p>
            <p>Please check your email to verify your account.</p>
          </div>
        ) : (
          <>
            {errorMessage && <Registration_ErrorMessage message={errorMessage} />}
            <Registration_Form onSubmit={handleRegistration} />
            <Registration_LinkToLogin /> {/* Include this inside the same box */}
          </>
        )}
      </div>
    </div>
  );
};

export default Registration;
