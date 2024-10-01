import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const TokenProtectedRoute = () => {
  const location = useLocation();
  const hash = location.hash;
  const params = new URLSearchParams(hash.slice(1));
  const token = params.get('access_token'); // Extract the access token

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default TokenProtectedRoute;
