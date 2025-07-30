import React, { useState } from "react";
import "../Css/Admin.css";
const AdShop = () => {
  const [activeTab, setActiveTab] = useState("Захиалга");

  const orders = Array(15).fill({
    
    name: "Yamaha E-5510",
    price: "₮3,399,000",
    status: "Төлөгдсөн",
    ordered: "2025-07-27",
    phone: "89808814",
    address: "Сонгино-Хайрхан 1-5-524",
  });

  const renderOrders = () => (
    <table className="orders-table">
      <thead>
        <tr>
          
          <th>Барааны нэр</th>
          <th>Үнэ</th>
          <th>Төлөв</th>
          <th>Захиалсан өдөр</th>
          <th>Утасны дугаар</th>
          <th>Хаяг</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, idx) => (
          <tr key={idx}>
            
            <td>{order.name}</td>
            <td>{order.price}</td>
            <td className="paid">{order.status}</td>
            <td>{order.ordered}</td>
            <td>{order.phone}</td>
            <td>{order.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Дэлгүүр</h2>

      <div className="stat-grid">
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-title">Нийт ашиг</div>
            <div className="stat-value">₮4.2M</div>
            <div className="stat-growth">Өмнөх сараас +12%</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {["Захиалга", "Хүргэгдсэн", "Хүргэгдээгүй"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? "active-tab" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="orders-section">
        <h3>Orders</h3>
        {renderOrders()}
      </div>
    </div>
  );
};

export default AdShop;
