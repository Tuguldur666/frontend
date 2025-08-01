import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Home } from 'lucide-react';
import '../css/Shop.css';

const ShopHeader = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <div className="shop-header-simple">
      <button
        className="back-home-button"
        onClick={() => navigate('/')}
        aria-label="Back to home"
      >
        <Home size={20} />
      </button>

      <div className="search-container">
        <input
          type="text"
          placeholder="Хайх"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Search className="search-icon" size={16} />
      </div>

      <button
        className="cart-button"
        onClick={() => navigate('/cart')}
        aria-label="Go to cart"
      >
        <ShoppingCart size={20} />
        <span>Сагс</span>
      </button>
    </div>
  );
};

export default ShopHeader;
