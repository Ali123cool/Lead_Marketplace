import React, { useState, useEffect } from 'react';
import ChangeEmail_Form from '../Components/ChangeEmail_Form';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const ChangeEmail = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        // Redirect to login page after logout
        window.location.href = '/login';
      }
    });

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe(); // Clean up listener on unmount
      }
    };
  }, [navigate]);

  const handleChangeEmail = async (newEmail) => {
    setMessage('');
    setError('');

    try {
      // Step 1: Update email in auth.users
      const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
        options: { redirectTo: `${window.location.origin}/login` }, // Redirect after email confirmation
      });

      if (error) {
        setError('Error updating email: ' + error.message);
      } else {
        // Step 2: Update email in public.users_meta
        const userId = data.user.id; // Get the user ID from the auth response
        const { error: metaError } = await supabase
          .from('users_meta')
          .update({ email: newEmail })
          .eq('id', userId); // Update where id matches

        if (metaError) {
          setError('Error updating email in users_meta: ' + metaError.message);
        } else {
          setMessage(`Please check your email inbox at ${newEmail} to confirm the email change.`);

          // Wait for 5 seconds before logging the user out
          setTimeout(async () => {
            const { error: signOutError } = await supabase.auth.signOut();
            if (signOutError) {
              setError('Error logging out after email change: ' + signOutError.message);
            } else {
              navigate('/login'); // Redirect to login page after sign out
            }
          }, 5000); // Wait for 5 seconds
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="container max-w-md p-6 bg-primary rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-6">Change Email</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Change Email Form */}
        <ChangeEmail_Form onSubmit={handleChangeEmail} />
      </div>
    </div>
  );
};

export default ChangeEmail;
