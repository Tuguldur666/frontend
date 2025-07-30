import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, ShoppingCart, ArrowLeft } from 'lucide-react';

import '../css/Shop.css';
import '../css/Description.css';

const Description = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

  return (
    <div>
      {/* Header with Back Button */}
      <div className="shop-header-simple">
        <button className="back-home-button" onClick={() => navigate('/shop')} aria-label="Back to shop">
          <ArrowLeft size={20} />
        </button>

        <div className="search-container">
          <input type="text" placeholder="Хайх" className="search-input" />
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

      {/* Product Content */}
      <div className="main-content">
        <div className="product-images">
          <div className="main-image">
            <img
              src="https://images.unsplash.com/photo-1616627562176-0bbf81df06f0"
              alt="Drum Kit"
              className="product-main-img"
            />
          </div>
          <div className="thumbnail-images">
            <div className="thumbnail">
              <img
                src="https://images.unsplash.com/photo-1616627562176-0bbf81df06f0"
                alt="Thumbnail"
                className="thumbnail-img"
              />
            </div>
          </div>
        </div>

        <div className="product-details">
          <h1 className="product-title">Drum Kit 6</h1>

          <div className="rating">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">☆</span>
          </div>

          <div className="price">
            <span className="price-label">Үнэ:</span>
            <span className="price-value">₮299,000</span>
          </div>

          <div className="description-section">
            <div className="description-title">Тайлбар</div>
            <div className="features">
              <p>– Анхан шатны сурагчдад тохиромжтой</p>
              <p>– Үндсэн хичээлүүдийг багтаасан</p>
            </div>
            <div className="specifications">
              <p>
                Энэхүү хичээлийн багц нь анхан шатны сурагчдад зориулсан бөгөөд хөгжмийн
                суурь мэдлэгийг агуулсан. Тус багц нь өөртөө онол, практик, дасгалуудыг
                багтаадаг.
              </p>
            </div>
          </div>

          <div className="product-actions">
            <div className="quantity-control">
              <span className="quantity-label">Тоо ширхэг:</span>
              <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
              <span className="quantity-display">{quantity}</span>
              <button className="quantity-btn" onClick={increaseQuantity}>+</button>
            </div>

            <div className="action-buttons">
              <button className="btn-wishlist">Сагсанд нэмэх</button>
              <button className="btn-buy">Одоо авах</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
