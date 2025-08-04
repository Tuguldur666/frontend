import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Css/Admin.css";
import { UserContext } from "../../UserContext";

const AdminSidebar = ({ isOpen, sidebarRef, closeSidebar }) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };
  return (
     <div ref={sidebarRef} className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>
          {user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : "Админ"}
        </h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/admin/panel"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }onClick={handleLinkClick}
            >
              🏠 Дашбоард
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/teacher"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }onClick={handleLinkClick}
            >
              👩‍🏫 Багш
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/content"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }onClick={handleLinkClick}
            >
              📚 Контент
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/shop"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }onClick={handleLinkClick}
            >
              🛒 Дэлгүүр
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/financial"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }onClick={handleLinkClick}
            >
              🛒 Санхүү
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/adduser"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }onClick={handleLinkClick}
            >
              ➕ Хэрэглэгч нэмэх
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }onClick={handleLinkClick}
            >
              ⚙️ Тохиргоо
            </NavLink>
          </li>
          <br/>
          <li>
            <button
              onClick={handleLogout}
              className="sidebar-link logoutt-link"
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              🔓 Гарах
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
