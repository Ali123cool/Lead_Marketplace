import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle redirects
import Registration_Form from '../Components/Registration_Form';
import Registration_ErrorMessage from '../Components/Registration_ErrorMessage';
import Registration_LinkToLogin from '../Components/Registration_LinkToLogin';
import { supabase } from '../supabaseClient'; // Supabase client

const Registration = () => {
  const [errorMessage, setErrorMessage] = useState('');
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
        setErrorMessage('Registration failed');
        return;
      }

      const userId = data.user.id;

      // Step 2: Insert into users_meta table
      const { error: metaError } = await supabase
        .from('users_meta')
        .insert({
          id: userId,
          email: formData.email,
          account_type: formData.accountType,
        });

      if (metaError) {
        setErrorMessage('Error creating account in users_meta');
        return;
      }

      // Step 3: Insert into either customers or vendors table based on account type
      if (formData.accountType === 'customer') {
        const { error: customerError } = await supabase
          .from('customers')
          .insert({
            id: userId, // Use the same ID from auth.users
            email: formData.email,
            first_name: formData.first_name, // Assuming these fields exist in formData
            last_name: formData.last_name,
            is_verified: false, // Example field
          });

        if (customerError) {
          setErrorMessage('Error creating account in customers table');
          return;
        }
      } else if (formData.accountType === 'vendor') {
        const { error: vendorError } = await supabase
          .from('vendors')
          .insert({
            id: userId, // Use the same ID from auth.users
            email: formData.email,
            first_name: formData.first_name, // Assuming these fields exist in formData
            last_name: formData.last_name,
            account_status: 'pending', // Example field for vendors
          });

        if (vendorError) {
          setErrorMessage('Error creating account in vendors table');
          return;
        }
      }

      // Step 4: Redirect to "Check Email" page
      setTimeout(() => {
        navigate('/check-email');
      }, 2000);

    } catch (err) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center mt-10">
      <div className="container max-w-md mx-auto p-6 bg-primary rounded-md shadow-md">
        <h2 className="text-center text-2xl text-bodyText font-bold mb-6">Register</h2>

        {errorMessage && <Registration_ErrorMessage message={errorMessage} />}
        <Registration_Form onSubmit={handleRegistration} />
        <Registration_LinkToLogin /> {/* Include this inside the same box */}
      </div>
    </div>
  );
};

export default Registration;
