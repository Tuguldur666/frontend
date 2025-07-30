// src/Teacher/Components/TeachSidebar.jsx
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Teacher.css";
import { UserContext } from "../../UserContext";

const TeachSidebar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const teacherName = user ? `${user.firstName}` : "Teacher Panel";

  const handleLogout = () => {
    logout();
    navigate("/teacher/login");
  };

  return (
    <div className="teach-sidebar">
      <div className="sidebar-header">
        <h2>{teacherName}</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/teacher/panel"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              🏠 Дашбоард
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher/content"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              📚 Контент
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher/student"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              👩‍🎓 Сурагчид
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher/settings"
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
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              🚪 Гарах
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TeachSidebar;
