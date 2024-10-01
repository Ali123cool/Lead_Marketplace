import React, { createContext, useContext, useState, useEffect } from 'react'; 
import { supabase } from '../Api/supabaseClient';

// Create a context for the authentication logic
const AuthContext = createContext();

// AuthProvider component that wraps your app and provides authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);              // Stores the logged-in user
  const [loading, setLoading] = useState(true);        // Tracks whether an auth action is loading
  const [role, setRole] = useState(null);              // Stores the user's role (e.g., vendor, customer)
  const [isEmailVerified, setIsEmailVerified] = useState(false);  // Tracks if the user's email is verified

  // Login function using Supabase auth
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw new Error(error.message);  // Throw the error so the calling function can handle it
      }
  
      if (!data.user) {
        throw new Error('Login failed: No user data returned.');
      }
  
      setUser(data.user);  // Store the logged-in user
      setIsEmailVerified(!!data.user.email_confirmed_at);  // Check if email is verified
      await fetchUserRole(data.user.id);  // Fetch the user's role
      
      return data.user;  // Optionally return the user object
  
    } catch (error) {
      console.error('Login error: Ensure that your email and password are correct');
      throw error;  // Re-throw the error to be caught in the component calling this function
    } finally {
      setLoading(false);  // Ensure loading stops after login attempt
    }
  };

  // Logout function using Supabase auth
  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
      setIsEmailVerified(false);  // Clear user state on logout
    } catch (error) {
      console.error('Logout error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the user's role from the 'users_meta' table
  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users_meta')
        .select('account_type')
        .eq('user_id', userId)
        .single();
      if (error) throw error;
      setRole(data?.account_type || null);  // Set the role if found
    } catch (error) {
      console.error('Error fetching user role:', error.message);
    }
  };

  // Check if the user session exists on app load
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setIsEmailVerified(!!session.user.email_confirmed_at);  // Check if email is verified
          await fetchUserRole(session.user.id);  // Fetch the role if user is logged in
        }
      } catch (error) {
        console.error('Session check error:', error.message);
      } finally {
        setLoading(false);  // Stop loading once session is checked
      }
    };

    checkUserSession();

    // Listen for auth state changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setLoading(true);
      if (session?.user) {
        setUser(session.user);
        setIsEmailVerified(!!session.user.email_confirmed_at);  // Check if email is verified
        await fetchUserRole(session.user.id);  // Fetch role on auth state change
      } else {
        setUser(null);
        setRole(null);
        setIsEmailVerified(false);
      }
      setLoading(false);
    });

    // Clean up the auth listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Return the provider with the state and functions for children components
  return (
    <AuthContext.Provider value={{ user, role, isEmailVerified, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext in other components
export const useAuth = () => {
  return useContext(AuthContext);
};
