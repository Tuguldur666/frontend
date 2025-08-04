import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Teacher.css";
import { UserContext } from "../../UserContext";

const TeachSidebar = ({ isOpen, sidebarRef, closeSidebar }) => {
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
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  return (
    <div ref={sidebarRef} className={`teach-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-inner">
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
              >
                👩‍🎓 Сурагчид
              </NavLink>
            </li>

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
                  {["beginner", "intermediate", "advanced", "professional"].map(
                    (level, idx) => (
                      <li key={idx}>
                        <NavLink
                          to={`/teacher/course/${level}`}
                          className={({ isActive }) =>
                            `sidebar-sublink ${isActive ? "active-link" : ""}`
                          }
                          onClick={handleLinkClick}
                        >
                          {
                            {
                              beginner: "Анхан шат",
                              intermediate: "Дунд шат",
                              advanced: "Ахисан шат",
                              professional: "Гүнзгий шат",
                            }[level]
                          }
                        </NavLink>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>

            <li>
              <NavLink
                to="/teacher/settings"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active-link" : ""}`
                }
                onClick={handleLinkClick}
              >
                ⚙️ Тохиргоо
              </NavLink>
            </li>

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
              🔓 Гарах
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TeachSidebar;
