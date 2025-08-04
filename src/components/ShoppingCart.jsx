import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import '../css/ShoppingCart.css';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item name', quantity: 1, price: 'Sonoo' },
    { id: 2, name: 'Item name', quantity: 1, price: 'Sonoo' },
    { id: 3, name: 'Item name', quantity: 1, price: 'Sonoo' },
    { id: 4, name: 'Item name', quantity: 1, price: 'Sonoo' }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        {/* Header */}
        <div className="cart-header">
          <div className="header-top">
            <span className="logo">🥁 E-DRUM</span>
          </div>
          <div className="header-bottom">
            <button className="continue-shopping">
              <ArrowLeft size={16} />
              Continue shopping
            </button>
          </div>
        </div>

        <div className="cart-content">
          {/* Left Side - Shopping Cart */}
          <div className="cart-section">
            <h2 className="cart-title">Shopping cart</h2>
            <p className="cart-count">You have {cartItems.length} items in your cart</p>

            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  {/* Checkbox */}
                  <div className="item-checkbox">
                    <div className="checkbox-check"></div>
                  </div>

                  {/* Item Image */}
                  <div className="item-image">
                    <div className="placeholder-image">
                      <div className="placeholder-icon"></div>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="item-price">
                    <span>{item.price}</span>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Payment Section */}
          <div className="payment-section">
            <div className="payment-card">
              <h3 className="payment-title">Төлбөр төлөх сонголтол хийнэ үү</h3>

              <div className="payment-options">
                <div className="payment-option">
                  <div className="option-icon">⇄</div>
                  <div className="option-text">
                    <div className="option-main">ДАНСЛАЛТ</div>
                    <div className="option-sub">ШИЛЖҮҮЛЭГ</div>
                  </div>
                </div>

                <div className="payment-option">
                  <div className="option-icon">←</div>
                  <div className="option-text">
                    <div className="option-main">QPAY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;