import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import "../Css/admin.css";

const AdDashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const res = await axiosInstance.get("/admin/dashboardInfo");

        const data = res.data.data;

        const formattedStats = [
          {
            title: "Нийт хэрэглэгч",
            value: data.totalUsers,
          },
          {
            title: "Идэвхтэй багш",
            value: data.activeTeachers,
          },
          {
            title: "Нийт хичээл",
            value: data.totalCourses,
          },
          {
            title: "Сарын орлого",
            value: `${data.monthlyRevenue}₮`,
          },
          {
            title: "Орлогын өсөлт",
            value: data.monthlyGrowthRate,
          },
        ];

        setStats(formattedStats);
      } catch (err) {
        setError("Хяналтын мэдээллийг авч чадсангүй.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardInfo();
  }, []);

  if (loading) return <p>Уншиж байна...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Хяналтын самбар</h2>

      <div className="dashboard-top">
        <div className="stat-grid">
          {stats.map((item, index) => (
            <div className="stat-card" key={index}>
              <h4 className="stat-title">{item.title}</h4>
              <p className="stat-value">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="activity-box">
          <h3>Идэвхи</h3>
          <ul>
            <li>Шинэ багш бүртгүүллээ - 5мин өмнө</li>
            <li>Шинэ хэрэглэгч бүртгүүллээ - 15мин өмнө</li>
            <li>Хэрэглэгч худалдан авалт хийлээ - 54мин өмнө</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdDashboard;
