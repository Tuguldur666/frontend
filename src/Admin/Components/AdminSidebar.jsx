import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Css/Admin.css";
import { UserContext } from "../../UserContext";

const AdminSidebar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // Logout handler - clears user context and navigates to admin login
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-sidebar">
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
              }
            >
              🏠 Дашбоард
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/teacher"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              👩‍🏫 Багш
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/content"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              📚 Контент
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/shop"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              🛒 Дэлгүүр
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/financial"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              🛒 Санхүү
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/adduser"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              ➕ Хэрэглэгч нэмэх
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              ⚙️ Тохиргоо
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="sidebar-link logout-link"
              style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
