import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../Api/supabaseClient';
import { useNavigate } from 'react-router-dom';

// Create a context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Tracks logged-in user
  const [loading, setLoading] = useState(true);  // Tracks loading state
  const [role, setRole] = useState(null);  // Tracks user's role (vendor, customer)
  const navigate = useNavigate();

  // Function to handle user login (adjust based on your API)
  const login = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setLoading(false);
      throw error;
    }

    setUser(data.user);
    await fetchUserRole(data.user.id);  // Fetch role after login
    setLoading(false);
  };

  // Function to handle user logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    navigate('/login');  // Redirect to login page
  };

  // Fetch user's role from your database (Supabase or another source)
  const fetchUserRole = async (userId) => {
    const { data, error } = await supabase.from('users_meta').select('account_type').eq('id', userId).single();
    if (!error) {
      setRole(data.account_type);  // Example roles: 'vendor', 'customer'
    }
  };

  // Automatically check for user on app load
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);
        await fetchUserRole(session.user.id);  // Fetch role if logged in
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for accessing the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
