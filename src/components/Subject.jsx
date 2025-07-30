import React from "react";
import "../css/Subject.css";

import Header from "./Header";
function Subject() {
  return (
    <div className="subject-container">
      <Header />
      <section className="sub-section1">
        <div className="sub-section-header">
          {" "}
          <h2>Бөмбөрийн хичээлүүд</h2>
          <h3>
            Анхан шатнаас эхлээд мэргэжлийн түвшин хүртэл, бүх түвшний сурагчдад
            тохирсон 6 хичээл
          </h3>
          <div className="sub-header-card">
            <div id="subCard">3 хичээл</div>
            <div id="subCard">45 багш</div>
            <div id="subCard">1500 сурагч</div>
            <div></div>
          </div>
        </div>
      </section>
      <section className="sub-section2">
        <div className="sub-section2-cards">
          {[1, 2, 3].map((_, index) => (
            <div className="sub-section2-card" key={index}>
              <div className="card-top-labels">
                <span className="badge left">Анхан шат</span>
                <span className="badge right">Үнэгүй</span>
              </div>
              <div className="card-image-placeholder">
                <img src="/images/youtube-icon.png" alt="video" />
              </div>
              <h3 className="card-title">Бөмбөрийн үндэс</h3>
              <p className="card-desc">
                Анхан шатны сурагчдад зориулсан бөмбөрийн үндсэн техник, суурь,
                зүтгэлтэй сурах хичээл
              </p>
              <p className="card-teacher">Багш: Б.Баттулга</p>
              <div className="card-meta">
                <span>🕒 8 долоо хоногийн өмнө</span>
                <span>👥 248</span>
                <span>⭐ 4.8</span>
              </div>
              <button className="view-button">Хичээл үзэх</button>
            </div>
          ))}
        </div>
      </section>
      <section className="footer">
        <div className="footer-main">
          <div className="footer-left">
            <p className="footer-description">
              Бөмбөр хөгжимийг орчин үеийн технологийн тусламжтай хүн бүрт
              хүртээмжтэй болгох зорилготой.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-title">Холбоосууд</h3>
              <ul className="footer-list">
                <li>Хичээлүүд</li>
                <li>Багш нар</li>
                <li>Үнэ</li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Хичээлүүд</h3>
              <ul className="footer-list">
                <li>Бөмбөр</li>
                <li>Гитар</li>
                <li>Төгөлдөр хуур</li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Тусламж</h3>
              <ul className="footer-list">
                <li>Холбоо барих</li>
                <li>Түгээмэл асуултууд</li>
                <li>Дэмжлэг</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-meta">
            <p className="footer-tagline">
              Монгол хэл дээрх хөгжмийн хичээлийн платформ
            </p>
            <p className="footer-copyright">©2025 Нүдэн Солюшн ХХК.</p>
          </div>
          <hr className="footer-divider" />
        </div>
      </section>
    </div>
  );
}

export default Subject;
