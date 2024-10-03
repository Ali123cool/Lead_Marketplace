import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../Api/SupabaseClient';
import { authLogoff } from './AuthLogoff';
import { authLogin } from './AuthLogin';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    setLoading(true); // Add loading state for login
    try {
      const { user, role } = await authLogin(email, password);
      setUser(user); // Update context with user and role
      setRole(role);
    } catch (err) {
      throw err; // Propagate the error upwards
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          const { data: roleData } = await supabase
            .from('users_meta')
            .select('account_type')
            .eq('email', session.user.email)
            .single();
          setRole(roleData?.account_type || null);
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (err) {
        console.error('Session check failed:', err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const logoff = async () => {
    await authLogoff();
    setUser(null);
    setRole(null);
  };

  const value = {
    user,
    role,
    loading,
    login,
    logoff,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
