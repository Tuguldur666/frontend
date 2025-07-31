import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Home } from 'lucide-react';
import '../css/Shop.css';
import drumImage from '../assets/drum.jpg';
import axiosInstance from '../axiosInstance';

const Shop = () => {
  const [kits, setKits] = useState([]);
  const [selectedKit, setSelectedKit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Бөмбөр');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const categories = ['Бөмбөр', 'Гитар', 'Пиано', 'Ukulele', 'Speaker'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/store/getAllProducts');
        setKits(response.data.products || []); // Assuming the API returns { products: [...] }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

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
      onClick={() => handleKitSelect(kit._id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="drum-kit-image">
        <img src={drumImage} alt="Drum Kit" className="drum-kit-photo" />
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
            <button className="filter-button active" type="button">
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
          {kits
            .filter((kit) =>
              kit.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((kit) => (
              <DrumKitCard
                key={kit._id}
                kit={kit}
                isSelected={selectedKit === kit._id}
              />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Shop;
