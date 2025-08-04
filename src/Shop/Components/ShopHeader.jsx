import React, { useState } from 'react';
import { Search, ShoppingCart, Home, User } from 'lucide-react';
import '../css/ShopHeader.css';
import { Navigate, useNavigate } from 'react-router-dom';

const ShopHeader = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock navigation functions - replace with your actual navigation logic
  const navigateToHome = () => {
    console.log('Navigating to home');
    navigate('/');
  };

  const navigateToCart = () => {
    console.log('Navigating to cart');
    navigate('/cart');
  };

  const navigateToLogin = () => {
    console.log('Navigating to login');
    navigate('/login');
  };

  return (
    <header className="shop-header">
      <div className="shop-header-container">
        <div className="shop-header-content">
          
          {/* Home Button */}
          <button
            onClick={navigateToHome}
            className="home-button"
            aria-label="Home"
          >
            <Home size={20} />
          </button>

          {/* Search Box */}
          <div className="search-wrapper">
            <div className="search-container">
              <input
                type="text"
                placeholder="Хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="search-icon-wrapper">
                <Search size={16} />
              </div>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="buttons-container">
            
            {/* Cart Button */}
            <button
              onClick={navigateToCart}
              className="cart-button"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={18} />
              <span>Сагс</span>
            </button>

            {/* Login Button */}
            <button
              onClick={navigateToLogin}
              className="login-button"
              aria-label="Login"
            >
              <User size={18} />
              <span>Нэвтрэх</span>
            </button>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;