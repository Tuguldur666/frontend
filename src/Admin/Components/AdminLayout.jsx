import React, { useState, useRef } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import "../Css/Admin.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        sidebarRef={sidebarRef}
        closeSidebar={closeSidebar}
      />

      {/* Backdrop (mobile) */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="admin-main">
        <div className="mobile-header">
                <Menu
                  id="menu-toggle"
                  className="menu-icon"
                  size={28}
                  onClick={toggleSidebar}
                />
                <span className="mobile-title">Admin panel</span>
              </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
