import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ roleRequired }) => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (role !== roleRequired) {
    return <Navigate to="/" />; // Redirect if the user role doesn't match
  }

  return <Outlet />; // Render the child routes
};

export default ProtectedRoute;
