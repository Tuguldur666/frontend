import React from "react";
import "../Css/Admin.css";
import Rating from "@mui/material/Rating";

function AdContent() {
  const contentList = [
    {
      course: "Бөмбөр",
      teacher: "Жавзан",
      performance: "Анхан шат",
      revenue: "₮2,500,000",
      rating: 4.0,
      lastUpdated: "2025-07-25",
    },
    {
      course: "Бөмбөр",
      teacher: "Пэрэнлэй",
      performance: "Дунд",
      revenue: "₮1,700,000",
      rating: 3.5,
      lastUpdated: "2025-07-24",
    },
    {
      course: "Бөмбөр",
      teacher: "Ёндон",
      performance: "Ахисан түвшин",
      revenue: "₮3,200,000",
      rating: 4.5,
      lastUpdated: "2025-07-20",
    },
  ];

  return (
    <div className="content-page">
      <h2>Контент</h2>
      <table className="content-table">
        <thead>
          <tr>
            <th>Сургалт</th>
            <th>Багш</th>
            <th>Төлөв</th>
            <th>Цалин</th>
            <th>Чансаа/5</th>
            <th>Сүүлд шинэчлэгдсэн</th>
          </tr>
        </thead>
        <tbody>
          {contentList.map((item, index) => (
            <tr key={index}>
              <td>{item.course}</td>
              <td>{item.teacher}</td>
              <td>{item.performance}</td>
              <td>{item.revenue}</td>
              <td>
                <Rating
                  name={`read-only-${index}`}
                  value={item.rating}
                  precision={0.1}
                  readOnly
                />
              </td>
              <td>{item.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdContent;
