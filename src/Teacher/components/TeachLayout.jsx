import React, { useState, useRef, useEffect } from "react";
import TeachSidebar from "./TeachSidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

const TeachLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        event.target.id !== "menu-toggle"
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* Mobile Header */}
      <div className="mobile-header">
        <Menu
          id="menu-toggle"
          className="menu-icon"
          size={28}
          onClick={toggleSidebar}
        />
        <span className="mobile-title">Teacher Panel</span>
      </div>

      <TeachSidebar
        isOpen={isSidebarOpen}
        sidebarRef={sidebarRef}
        closeSidebar={closeSidebar}
      />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default TeachLayout;
