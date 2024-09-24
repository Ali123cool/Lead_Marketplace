import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const EmailVerified = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      const user = supabase.auth.user();

      if (!user) {
        // If the user is not logged in, redirect to login page
        navigate('/login');
        return;
      }

      // Check if the user's email is verified
      if (!user.email_confirmed_at) {
        // If the email is not confirmed, send them to the email verification page
        navigate('/check-email');
        return;
      }

      // If email is verified, check account type from users_meta table
      const { data: userMeta, error } = await supabase
        .from('users_meta')
        .select('account_type')
        .eq('user_id', user.id)
        .single();

      if (error || !userMeta) {
        console.error('Error fetching account type', error);
        navigate('/login');
        return;
      }

      // Redirect based on account type
      if (userMeta.account_type === 'vendor') {
        navigate('/vendor-dashboard');
      } else if (userMeta.account_type === 'customer') {
        navigate('/customer-dashboard');
      }
    };

    checkUserAndRedirect();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default EmailVerified;
