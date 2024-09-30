// TokenProtectedRoute.js
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const TokenProtectedRoute = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token'); // Get 'token' from URL

  if (!token) {
    // If no token is present, redirect to home or login page
    return <Navigate to="/login" />;
  }

  // If token exists, render the page
  return <Outlet />;
};

export default TokenProtectedRoute;
