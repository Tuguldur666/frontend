import React from "react";
import "../../Admin/Css/Admin.css";
import Button from "@mui/material/Button";
import { SaveIcon } from "lucide-react";
const teacherStats = [
  { title: "Нийт сурагчид", value: "15", growth: "өмнөх сараас +12% " },
  { title: "Идэвхитэй сургалтууд", value: "6", growth: "өмнөх сараас +12% " },
  { title: "Сарын орлого", value: "₹125,000", growth: "өмнөх сараас +12% " },
  {
    title: "Сурагчдын өгсөн чансаа",
    value: "4.9",
    growth: "өмнөх сараас +12% ",
  },
];

const myCourses = [
  { title: "Ахисан шат", students: 18, time: "8 цагийн өмнө" },
  { title: "Дунд шат", students: 18, time: "8 цагийн өмнө" },
  { title: "Анхан шат", students: 18, time: "8 цагийн өмнө" },
];

const recentActivities = [
  'Амгаланбаатар "Ахисан шатны хичээлд нэгдлээ"',
  'Амгалан "Анхан шатны хичээлд нэгдлээ',
  'Баатар "Дунд шатны хичээлд нэгдлээ',
];

const TeachDashboard = () => {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Дашбоард  </h2>

      <div className="dashboard-top">
        <div className="stat-grid">
          {teacherStats.map((item, index) => (
            <div className="stat-card" key={index}>
              <h4 className="stat-title">{item.title}</h4>
              <p className="stat-value">{item.value}</p>
              <span className="stat-growth">{item.growth}</span>
            </div>
          ))}
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              backgroundColor: "#5dd195ff",
              "&:hover": {
                backgroundColor: "#3bda88ff",
              },
              borderRadius: "7px",
              marginTop: 2,

              textTransform: "none",
              fontWeight: 600,
              padding: "6px 16px",
              height: "40px",
            }}
          >
            Цагийн хуваарь нэмэх
          </Button>
        </div>
      </div>

      <div
        className="dashboard-bottom"
        style={{ display: "flex", gap: "20px", marginTop: "30px" }}
      >
        <div className="dashboard-courses" style={{ flex: 1 }}>
          <h3>Миний сургалтууд</h3>
          {myCourses.map((course, index) => (
            <div
              className="course-card"
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <h4>{course.title}</h4>
              <p>{course.students} Сурагчид</p>
              <small>{course.time}</small>
            </div>
          ))}
        </div>

        <div className="dashboard-activity" style={{ flex: 1 }}>
          <h3>Recent Student Activity</h3>
          <ul>
            {recentActivities.map((activity, idx) => (
              <li key={idx}>
                {activity} — <small>5 мин өмнө</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeachDashboard;
