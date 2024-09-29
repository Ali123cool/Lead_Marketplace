import React, { useState, useEffect } from 'react';
import ChangePassword_Form from '../Components/ChangePassword_Form';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        // Force a full page reload after logging out
        window.location.href = '/login';
      }
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe(); // Clean up listener
      }
    };
  }, [navigate]);

  const handleChangePassword = async (newPassword) => {
    setMessage('');
    setError('');

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setError('Error updating password: ' + error.message);
      } else {
        setMessage('Password successfully updated.');

        // Log the user out after updating the password
        setTimeout(async () => {
          const { error: signOutError } = await supabase.auth.signOut();
          if (signOutError) {
            setError('Error logging out after password change: ' + signOutError.message);
          }
        }, 5000); // Wait for 5 seconds before signing out
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="container max-w-md p-6 bg-primary rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-6">Change Password</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Change Password Form */}
        <ChangePassword_Form onSubmit={handleChangePassword} />
      </div>
    </div>
  );
};

export default ChangePassword;
