import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import "../Css/Admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
