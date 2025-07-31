import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToFooter = () => {
    const footer = document.querySelector(".footer-main");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactClick = () => {
    setMenuOpen(false);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <header
      className={`navbar ${showHeader ? "header--visible" : "header--hidden"}`}
    >
      <div
        className="logoo"
        onClick={() => {
          if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            navigate("/", { state: { scrollToTop: true } });
          }
          setMenuOpen(false);
        }}
      >
        <img
          src="/images/llogo.png"
          alt="logo test"
          style={{ height: "50px", cursor: "pointer" }}
        />
      </div>

      <div className="hamburger-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>

      <nav className={`nav-buttons ${menuOpen ? "nav-open" : ""}`}>
        <button className="nav-btn" onClick={() => { setMenuOpen(false); navigate("/subject"); }}>
          Хичээлүүд
        </button>
        <button className="nav-btn" onClick={() => { setMenuOpen(false); navigate("/shop"); }}>
          Дэлгүүр
        </button>
        <button className="nav-btn" onClick={() => setMenuOpen(false)}>Үнэ</button>
        <button className="nav-btn" onClick={handleContactClick}>
          Холбоо барих
        </button>
      </nav>

      <div className={`auth-buttons ${menuOpen ? "nav-open" : ""}`}>
        <button className="loginn-btn" onClick={() => { setMenuOpen(false); navigate("/login"); }}>
          Нэвтрэх
        </button>
        <button
          className="registerr-btn"
          onClick={() => { setMenuOpen(false); navigate("/register"); }}
        >
          Бүртгүүлэх
        </button>
      </div>
    </header>
  );
}

export default Header;
