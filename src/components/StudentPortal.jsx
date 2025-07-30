import React, { useEffect, useState, useContext } from 'react';
import '../css/StudentPortal.css';
import axiosInstance from '../axiosInstance';
import { UserContext } from '../UserContext';

const StudentPortal = () => {
  const { token, user } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/user/getUser', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('getUser response:', res.data);

        const firstName = res.data?.user?.firstName;
        const lastName = res.data?.user?.lastName;

        if (firstName || lastName) {
          setUsername(`${firstName || ''} ${lastName || ''}`.trim());
        } else if (user?.firstName || user?.lastName) {
          setUsername(
            `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Хэрэглэгч'
          );
        } else if (user?.username) {
          setUsername(user.username);
        } else {
          setUsername('Хэрэглэгч');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);

        if (user?.firstName || user?.lastName) {
          setUsername(
            `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Хэрэглэгч'
          );
        } else if (user?.username) {
          setUsername(user.username);
        } else {
          setUsername('Хэрэглэгч');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [token, user]);

  return (
    <div className="student-portal">
      <div className="main-content">
        <header className="header">
          <div className="user-info">
            <div className="user-avatar">
              <div className="avatar-circle"></div>
            </div>
            <span className="greeting">
              Сайн уу, {isLoading ? '...' : username}
            </span>
          </div>

          <div className="progress-section">
            <div className="progress-circle">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#e0e7ff"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray="314"
                  strokeDashoffset="125.6"
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <text x="60" y="65" textAnchor="middle" className="progress-text">
                  45%
                </text>
              </svg>
            </div>
            <div className="progress-info">
              <div className="progress-label">1 7 хоног</div>
              <div className="progress-sublabel">Сар</div>
              <div className="progress-detail">80%</div>
            </div>
          </div>

          <div className="notification">
            <span className="notification-icon">🔔</span>
          </div>
        </header>

        <div className="content-area">
          <div className="lessons-section">
            <h3>Сүүлд үзсэн хичээл</h3>
            <div className="lesson-list">
              <div className="lesson-item">Видео хичээл 2</div>
              <div className="lesson-item">Видео хичээл 1</div>
              <div className="lesson-item">Видео хичээл 5</div>
              <div className="lesson-item">Видео хичээл 10</div>
            </div>
          </div>

          <div className="activity-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-text">Amit commented on "Basic Rhythms" lesson</div>
                <div className="activity-time">5 min ago</div>
              </div>
              <div className="activity-item">
                <div className="activity-text">New course</div>
                <div className="activity-time">5 min ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
