import React, { useState } from 'react';
import { ArrowLeft, Package, Trash2, Minus, Plus } from 'lucide-react';
import '../Css/ShoppingCart.css'; // ✅ Fix the correct path based on folder structure

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item name', price: '$Price', quantity: 1, selected: true },
    { id: 2, name: 'Item name', price: '$Price', quantity: 1, selected: false },
    { id: 3, name: 'Item name', price: '$Price', quantity: 1, selected: true },
    { id: 4, name: 'Item name', price: '$Price', quantity: 1, selected: false }
  ]);

  const toggleItemSelection = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="shopping-cart-container">
      {/* Header */}
      <div className="shopping-cart-header">
        <ArrowLeft className="back-icon" />
        <h1 className="header-title">Continue shopping</h1>
      </div>

      <div className="main-content">
        {/* Shopping Cart Section */}
        <div className="cart-section">
          <h2 className="cart-title">Shopping cart</h2>
          <p className="cart-subtitle">You have {cartItems.length} items in your cart</p>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItemSelection(item.id)}
                  className="cart-item-checkbox"
                />

                {/* Item Image */}
                <div className="item-image">
                  <Package size={24} color="#000" />
                </div>

                {/* Item Name */}
                <div className="item-name">
                  {item.name}
                </div>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-button"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-button"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Price */}
                <div className="item-price">
                  {item.price}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="delete-button"
                >
                  <Trash2 size={20} color="#007bff" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className="payment-section">
          <div className="payment-container">
            <h3 className="payment-title">Төлбөр төлөх сонголтоо хийнэ үү</h3>

            <div className="payment-methods">
              <div className="payment-method">
                <div className="payment-icon">
                  <div className="transfer-icon"></div>
                </div>
                <div className="payment-method-text">
                  ДАНС<br />ШИЛЖҮҮЛЭГ
                </div>
              </div>

              <div className="payment-method">
                <div className="payment-icon">
                  <div className="qpay-icon"></div>
                </div>
                <div className="payment-method-text">
                  QPAY
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
