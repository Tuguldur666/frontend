import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import ShopHeader from './ShopHeader';  // import header
import '../css/Shop.css';

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
        setKits(response.data.data || []);
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
        <img src={kit.thumbnail} alt={kit.title} className="drum-kit-photo" />
      </div>
      <div className="drum-kit-info">
        <h3 className="drum-kit-name">{kit.title}</h3>
        <p className="drum-kit-price">{kit.price}₮</p>
      </div>
    </div>
  );

  return (
    <div className="shop-container">
      {/* Use ShopHeader */}
      <ShopHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
                    className={`dropdown-item ${
                      cat === selectedCategory ? 'selected' : ''
                    }`}
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
            .filter(
              (kit) =>
                kit.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCategory === 'Бөмбөр'
                  ? true
                  : kit.category?.toLowerCase() === selectedCategory.toLowerCase())
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
