import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import '@fontsource/inter'; 
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const scrollToFooter = () => {
    setTimeout(() => {
      const footer = document.querySelector(".footer-main");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollToTop: true } });
    }
    setMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleContactClick = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      const footer = document.querySelector(".footer-main");
      if (footer) footer.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollToFooter: true } });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  useEffect(() => {
    if (location.state?.scrollToFooter) {
      scrollToFooter();
    }
  }, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const secondHero = document.querySelector(".second-hero");
      const secondHeroTop = secondHero ? secondHero.offsetTop : 0;
      const footer = document.querySelector(".footer-main");
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;
      const windowHeight = window.innerHeight;

      if (footerTop <= windowHeight || currentScrollY < 50) {
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

      if (menuOpen) {
        setMenuOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen]);

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.state]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-icon")
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header
      className={`navbar ${showHeader ? "header--visible" : "header--hidden"}`}
    >
      <div onClick={handleLogoClick}>
        <button className="head-logo">E-drum</button>
      </div>

      <button
        className="mobile-menu-icon"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div
        className={`menu-container ${menuOpen ? "open" : ""} menu-container-desktop`}
      >
        <nav className="nav-buttons">
          <button className="nav-btn" onClick={() => handleNavClick("/subject")}>
            Хичээлүүд
          </button>
          <button className="nav-btn" onClick={() => handleNavClick("/shop")}>
            Дэлгүүр
          </button>
          <button className="nav-btn" onClick={handleContactClick}>
            Холбоо барих
          </button>
        </nav>

        <div className="auth-buttons">
          <button className="loginn-btn" onClick={() => handleNavClick("/login")}>
            Нэвтрэх
          </button>
          <button className="registerr-btn" onClick={() => handleNavClick("/register")}>
            Бүртгүүлэх
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-dropdown" ref={dropdownRef}>
          <button onClick={() => handleNavClick("/subject")}>Хичээлүүд</button>
          <button onClick={() => handleNavClick("/shop")}>Дэлгүүр</button>
          <button onClick={handleContactClick}>Холбоо барих</button>
          <button onClick={() => handleNavClick("/login")}>Нэвтрэх</button>
          <button onClick={() => handleNavClick("/register")}>Бүртгүүлэх</button>
        </div>
      )}
    </header>
  );
}

export default Header;
