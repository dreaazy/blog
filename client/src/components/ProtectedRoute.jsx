import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  if (!isAuth) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirect to home or an unauthorized page
  }

  return element;
};

export default ProtectedRoute;