// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function PrivateRoute({ children }) {
  const { token } = useContext(UserContext);

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
}
