import React, { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

function RequireAuth({ children }) {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
}

export default RequireAuth;
