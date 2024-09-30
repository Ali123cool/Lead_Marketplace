import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ roleRequired }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Show a loader while checking auth state

  // Redirect to login if the user is not logged in
  if (!user) return <Navigate to="/login" />;

  // Redirect if the user's role doesn't match the required role for the route
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />; // Redirect to home or an unauthorized page
  }

  // If user is authenticated and has the right role, render the child components
  return <Outlet />;
};

export default ProtectedRoute;
