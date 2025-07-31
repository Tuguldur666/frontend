import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../UserContext";
import "../Css/admin.css";

const AdDashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useContext(UserContext);
  const [teacherCount, setTeacherCount] = useState(null);
  useEffect(() => {
    const fetchDashboardInfo = async () => {
      if (!accessToken) {
        setError("No access token found.");
        setLoading(false);
        return;
      }

      try {
        const [dashboardRes, teachersRes] = await Promise.all([
          axiosInstance.post("/admin/dashboardInfo"),
          axiosInstance.post("/admin/getTeacherStat"),
        ]);

        if (dashboardRes.data.status === "error") {
          throw new Error(dashboardRes.data.error || "Unknown error");
        }
        if (teachersRes.data.status === "error") {
          throw new Error(teachersRes.data.error || "Failed to fetch teachers");
        }

        const data = dashboardRes.data.data;
        const teachers = teachersRes.data.data;

        setTeacherCount(teachers.length);

        const formattedStats = [
          { title: "Нийт хэрэглэгч", value: data.totalUsers },
          { title: "Багш нарын тоо", value: teachers.length },
          { title: "Нийт хичээл", value: data.totalCourses },
          { title: "Сарын орлого", value: `${data.totalRevenue || 0}₮` },
          { title: "Орлогын өсөлт", value: data.monthlyGrowthRate },
        ];

        setStats(formattedStats);
      } catch (err) {
        setError(err.message || "Хяналтын мэдээллийг авч чадсангүй.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardInfo();
  }, [accessToken]);

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
