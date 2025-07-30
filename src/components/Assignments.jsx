import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import '../css/Assignments.css';

const Assignments = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const navigate = useNavigate();  // Use navigate hook

  const assignments = [
    { id: 1, title: 'Test', status: 'ongoing', dueDate: '2024-01-15', difficulty: 'Hard', category: 'Дүүл' },
    { id: 2, title: 'Test', status: 'ongoing', dueDate: '2024-01-20', difficulty: 'Ez', category: 'Дүүл' },
    { id: 3, title: 'Test', status: 'ongoing', dueDate: '2024-01-25', difficulty: 'Normal', category: 'Дүүл' },
    { id: 4, title: 'Test', status: 'ongoing', dueDate: '2024-01-30', difficulty: 'Sha2', category: 'Дүүл' }
  ];

  const tabs = [
    { id: 'ongoing', label: 'Одоогийн даалгавар' },
    { id: 'completed', label: 'Дууссан' },
    { id: 'archived', label: 'Архивлагдсан' }
  ];

  const filteredAssignments = assignments.filter(a => a.status === activeTab);

  const handleAssignmentClick = (assignment) => {
    // Navigate to assignment detail page
    navigate(`/assignments/${assignment.id}`);
  };

  return (
    <div className="assignments-page">
      <div className="main-content">
        <div className="content-header">
          <div className="header-top">
            <div className="page-title">
              <span className="title-icon">📋</span>
              <span>даалгавaр 1</span>
            </div>
            <div className="notification-icon">🔔</div>
          </div>
          <div className="tabs-container">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="content-body">
          <div className="assignments-grid">
            {filteredAssignments.map(assignment => (
              <div
                key={assignment.id}
                className="assignment-card"
                onClick={() => handleAssignmentClick(assignment)}
              >
                <div className="assignment-content">
                  <h3 className="assignment-title">{assignment.title}</h3>
                  <div className="assignment-details">
                    <div className="assignment-meta">
                      <span className="assignment-category">{assignment.category}</span>
                      <span className="assignment-difficulty">{assignment.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredAssignments.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>Даалгавар байхгүй</h3>
              <p>Одоогоор энэ ангилалд даалгавар байхгүй байна.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
