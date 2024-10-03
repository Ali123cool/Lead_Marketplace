import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../HelperFunctions/Authentication/AuthContext';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, role, loading } = useAuth(); // Get user, role, and loading from context
  const location = useLocation();

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific role is required and the user's role doesn't match, redirect to a different page
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected content
  return children;
};

export default ProtectedRoute;
