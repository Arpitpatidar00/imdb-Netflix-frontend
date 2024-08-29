import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthVerify } from './AuthVerify.js'; // Adjust the import path as needed

const PrivateRoute = ({ element }) => {
  const isAuthenticated = AuthVerify();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;