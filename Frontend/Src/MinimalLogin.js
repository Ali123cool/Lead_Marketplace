import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './Api/supabaseClient'; // Adjust this import path as needed

const MinimalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      if (data.user) {
        console.log('Login successful', data.user);
        
        // Fetch user role
        const { data: userMeta, error: metaError } = await supabase
          .from('users_meta')
          .select('account_type')
          .eq('id', data.user.id)
          .single();

        if (metaError) throw metaError;

        console.log('User role:', userMeta.account_type);

        // Navigate based on role
        if (userMeta.account_type === 'vendor') {
          navigate('/vendor-dashboard');
        } else if (userMeta.account_type === 'customer') {
          navigate('/customer-dashboard');
        } else {
          setError('Unknown account type');
        }
      }
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default MinimalLogin;