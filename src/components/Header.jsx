import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

// import "../css/Header.css";
function Header(onScrollToFooter) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scrollToFooter = () => {
    const footer = document.querySelector(".footer-main");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const handleContactClick = () => {
    if (location.pathname === "/") {
      scrollToFooter();
    } else {
      navigate("/", { state: { scrollToFooter: true } });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const secondHero = document.querySelector(".second-hero");
      const secondHeroTop = secondHero ? secondHero.offsetTop : 0;
      const currentScrollY = window.scrollY;
      const footer = document.querySelector(".footer-main");
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;
      const windowHeight = window.innerHeight;

      if (footerTop <= windowHeight) {
        setShowHeader(true);
      } else if (currentScrollY < 50) {
        setShowHeader(true);
      } else if (
        currentScrollY < lastScrollY &&
        currentScrollY <= secondHeroTop
      ) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`navbar ${
          showHeader ? "header--visible" : "header--hidden"
        }`}
      >
        <div className="logoo">
           <img src="/images/llogo.png" alt="logo test"  style={{height:"50px"}}/>
        </div>
        <nav className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate("/subject")}>
            Хичээлүүд 
          </button>
          <button className="nav-btn" onClick={() => navigate("/shop")}>
            Дэлгүүр
          </button>

          <button className="nav-btn">Үнэ</button>
          <button className="nav-btn" onClick={handleContactClick}>
            Холбоо барих
          </button>
        </nav>

        <div className="auth-buttons">
          <button className="loginn-btn" onClick={() => navigate("/login")}>
            Нэвтрэх
          </button>
          <button
            className="registerr-btn"
            onClick={() => navigate("/register")}
          >
            Бүртгүүлэх
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
