import React, { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

function RequireAuth({ allowedRoles = [], children }) {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    // User not logged in, redirect to login page, preserving the page user tried to access
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // User logged in but role is not authorized for this route
    // Redirect to home page or an unauthorized page if you have one
    return <Navigate to="/" replace />;
  }

  // User is authorized, render child routes or component
  return children || <Outlet />;
}

export default RequireAuth;
