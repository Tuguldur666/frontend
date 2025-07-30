import React, { useEffect, useState } from "react";
import "../../Admin/Css/Admin.css"
import "../css/Teacher.css"
function TeachStudent() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        name: "С. Болдбаатар",
        course: "Анхан шат",
        date: "2025-08-15",
        time: "13:00",
      },
      {
        id: 2,
        name: "Б. Энхцэцэг",
        course: "Дунд шатт",
        date: "2025-08-12",
        time: "14:30",
      },
      {
        id: 3,
        name: "Г. Мөнх-Эрдэнэ",
        course: "Ахисан түвшин",
        date: "2025-08-10",
        time: "11:45",
      },
    ];
    setStudents(mockStudents);
  }, []);

  return (
    <div className="content-page">
  <h2>Сурагчид</h2>
  <div className="student-section">
    <table className="content-table">
      <thead>
        <tr>
          <th>Нэр</th>
          <th>Сургалт</th>
          <th>бүртгүүлсэн огноо</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.course}</td>
            <td>{student.date}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="appointment-box">
      <h3>Цаг захиалсан</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.time}
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
}

export default TeachStudent;
