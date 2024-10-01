import React, { createContext, useContext, useState, useEffect } from 'react'; 
import { supabase } from '../Api/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Login function using Supabase auth
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      if (!data.user) throw new Error('Login failed: No user data returned.');

      setUser(data.user);  // Set user state
      setIsEmailVerified(!!data.user.email_confirmed_at);  // Check email verification

      // Fetch user's role
      await fetchUserRole(data.user.id);

    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  // Fetch the user's role from the 'users_meta' table
  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users_meta')
        .select('account_type')
        .eq('id', userId)  // Ensure 'id' matches your schema
        .single();
      if (error) throw error;
      setRole(data.account_type || null);  // Set user's role
    } catch (error) {
      console.error('Error fetching user role:', error.message);
    }
  };

  // Logout function using Supabase auth
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
      setIsEmailVerified(false);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  // Check if the user session exists on app load
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setIsEmailVerified(!!session.user.email_confirmed_at);
          await fetchUserRole(session.user.id);
        }
      } catch (error) {
        console.error('Session check error:', error.message);
      }
    };

    checkUserSession();

    // Listen for auth state changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsEmailVerified(!!session.user.email_confirmed_at);
        await fetchUserRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
        setIsEmailVerified(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, isEmailVerified, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext in other components
export const useAuth = () => {
  return useContext(AuthContext);
};
