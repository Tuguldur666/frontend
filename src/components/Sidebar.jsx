import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Sidebar.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const Sidebar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      icon: "📊",
      text: "Дашборд",
      path: "/student-portal",
    },
    {
      id: "lessons",
      icon: "📝",
      text: "Хичээл",
      path: "/lessons",
    },
    {
      id: "assignments",
      icon: "📋",
      text: "Даsгал",
      path: "/assignments",
    },
    {
      id: "completion",
      icon: "➕",
      text: "Тоглоом",
      path: "/completion",
    },
    {
      id: "payment",
      icon: "📄",
      text: "Төлбөр",
      path: "/payment",
    },
    {
      id: "home",
      icon: "🏠",
      text: "Гарах",
      path: "/",
    },
  ];

  const handleNavigation = (item) => {
    if (item.id === "home") {
      // Handle logout logic here if needed
      navigate("/");
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">📚</div>
        <span className="logo-text">EduPortal</span>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${isActive(item.path) ? "active" : ""}`}
            onClick={() => handleNavigation(item)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.text}</span>
          </div>
        ))}
      </nav>

      <div className="settings">
        <div className="nav-item" onClick={() => navigate("/settings")}>
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Тохиргоо</span>
        </div>
        <div className="nav-item logout-item" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          <span className="nav-text">Гарах</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
