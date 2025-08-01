import React, { useContext, useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Teacher.css";
import { UserContext } from "../../UserContext";

const TeachSidebar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);

  const teacherName = user ? `${user.firstName}` : "Teacher Panel";
 useEffect(() => {
    console.log("User Info:", user);
  }, [user]);
  const handleLogout = () => {
    logout();
    navigate("/teacher/login");
  };

  const toggleTrainingMenu = () => {
    setIsTrainingOpen(!isTrainingOpen);
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

          {/* Сургалт with submenu */}
          <li>
            <div
              className="sidebar-link"
              onClick={toggleTrainingMenu}
              style={{ cursor: "pointer" }}
            >
              👨‍🏫 Сургалт ▾
            </div>
            {isTrainingOpen && (
              <ul className="submenu">
                <li>
                  <NavLink
                    to="/teacher/course/beginner"
                    className={({ isActive }) =>
                      `sidebar-sublink ${isActive ? "active-link" : ""}`
                    }
                  >
                    Анхан шат
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/teacher/course/intermediate"
                    className={({ isActive }) =>
                      `sidebar-sublink ${isActive ? "active-link" : ""}`
                    }
                  >
                    Дунд шат
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/teacher/course/advanced"
                    className={({ isActive }) =>
                      `sidebar-sublink ${isActive ? "active-link" : ""}`
                    }
                  >
                    Ахисан шат
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/teacher/course/professional"
                    className={({ isActive }) =>
                      `sidebar-sublink ${isActive ? "active-link" : ""}`
                    }
                  >
                    Гүнзгий шат
                  </NavLink>
                </li>
              </ul>
            )}
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
                marginLeft: "25px",
              }}
            >
              Гарах
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TeachSidebar;
