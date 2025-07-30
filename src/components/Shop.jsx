import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Home } from 'lucide-react';
import '../css/Shop.css';

const Shop = () => {
  const [selectedKit, setSelectedKit] = useState(6); // Kit 6 selected by default
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Бөмбөр');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const drumKits = [
    { id: 1, name: 'Gear4Music Drum Kit', price: '1 000 000' },
    { id: 2, name: 'Gear4Music Drum Kit', price: '1 000 000' },
    { id: 3, name: 'Gear4Music Drum Kit', price: '1 000 000' },
    { id: 4, name: 'Gear4Music Drum Kit', price: '1 000 000' },
    { id: 5, name: 'Gear4Music Drum Kit', price: '1 000 000' },
    { id: 6, name: 'Gear4Music Drum Kit', price: '1 000 000' },
    { id: 7, name: 'Gear4Music Drum Kit', price: '1 000 000' },
    { id: 8, name: 'Gear4Music Drum Kit', price: '1 000 000' },
    { id: 9, name: 'Gear4Music Drum Kit', price: '1 000 000' },
    { id: 10, name: 'Gear4Music Drum Kit', price: '1 000 000' }
  ];

  const categories = ['Бөмбөр', 'Гитар', 'Пиано'];

  const handleKitSelect = (kitId) => {
    setSelectedKit(kitId);
    navigate(`/description/${kitId}`);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const DrumKitCard = ({ kit, isSelected }) => (
    <div 
      className={`drum-kit-card ${isSelected ? 'selected' : ''}`}
      onClick={() => handleKitSelect(kit.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="drum-kit-image">
        <svg viewBox="0 0 120 80" className="drum-svg">
          <g fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="1">
            <ellipse cx="60" cy="55" rx="25" ry="20" fill="#e8e8e8" stroke="#ccc" strokeWidth="2"/>
            <ellipse cx="60" cy="52" rx="22" ry="17" fill="#f0f0f0"/>
            <ellipse cx="35" cy="35" rx="8" ry="6" fill="#e8e8e8" stroke="#ccc" strokeWidth="1"/>
            <ellipse cx="35" cy="32" rx="7" ry="5" fill="#f0f0f0"/>
            <ellipse cx="85" cy="35" rx="8" ry="6" fill="#e8e8e8" stroke="#ccc" strokeWidth="1"/>
            <ellipse cx="85" cy="32" rx="7" ry="5" fill="#f0f0f0"/>
            <ellipse cx="90" cy="60" rx="12" ry="10" fill="#e8e8e8" stroke="#ccc" strokeWidth="1"/>
            <ellipse cx="90" cy="57" rx="10" ry="8" fill="#f0f0f0"/>
            <ellipse cx="45" cy="50" rx="10" ry="8" fill="#e8e8e8" stroke="#ccc" strokeWidth="1"/>
            <ellipse cx="45" cy="47" rx="8" ry="6" fill="#f0f0f0"/>
            <ellipse cx="25" cy="25" rx="12" ry="2" fill="#ffd700" stroke="#daa520" strokeWidth="1"/>
            <ellipse cx="75" cy="20" rx="15" ry="2" fill="#ffd700" stroke="#daa520" strokeWidth="1"/>
            <ellipse cx="95" cy="25" rx="10" ry="2" fill="#ffd700" stroke="#daa520" strokeWidth="1"/>
            <ellipse cx="20" cy="45" rx="8" ry="1.5" fill="#ffd700" stroke="#daa520" strokeWidth="1"/>
            <ellipse cx="20" cy="47" rx="8" ry="1.5" fill="#ffd700" stroke="#daa520" strokeWidth="1"/>
            <line x1="35" y1="41" x2="35" y2="65" stroke="#333" strokeWidth="2"/>
            <line x1="85" y1="41" x2="85" y2="65" stroke="#333" strokeWidth="2"/>
            <line x1="90" y1="70" x2="90" y2="75" stroke="#333" strokeWidth="2"/>
            <line x1="25" y1="27" x2="30" y2="40" stroke="#333" strokeWidth="2"/>
            <line x1="75" y1="22" x2="70" y2="35" stroke="#333" strokeWidth="2"/>
            <line x1="20" y1="49" x2="25" y2="60" stroke="#333" strokeWidth="2"/>
          </g>
        </svg>
      </div>
      <div className="drum-kit-info">
        <h3 className="drum-kit-name">{kit.name}</h3>
        <p className="drum-kit-price">{kit.price}</p>
      </div>
    </div>
  );

  return (
    <div className="shop-container">
      <div className="shop-header-simple">

        {/* Back to Home Button */}
        <button
          className="back-home-button"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <Home size={20} />
        </button>

        {/* Centered Search */}
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
        
        {/* Cart button with navigation */}
        <button
          className="cart-button"
          onClick={() => navigate('/cart')}
          aria-label="Go to cart"
        >
          <ShoppingCart size={20} />
          <span>Сагс</span>
        </button>
      </div>

      <main className="shop-main">
        <div className="category-filter">
          <div 
            className="filter-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            tabIndex={0}
            onBlur={() => setDropdownOpen(false)}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <button
              className="filter-button active"
              type="button"
            >
              {selectedCategory} ▾
            </button>
            {dropdownOpen && (
              <ul className="dropdown-list" role="listbox">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={`dropdown-item ${cat === selectedCategory ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(cat)}
                    role="option"
                    aria-selected={cat === selectedCategory}
                    tabIndex={-1}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="products-grid">
          {drumKits.map((kit) => (
            <DrumKitCard
              key={kit.id}
              kit={kit}
              isSelected={selectedKit === kit.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Shop;
