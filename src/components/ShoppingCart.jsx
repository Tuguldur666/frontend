import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, CreditCard, Smartphone, Heart, Star } from 'lucide-react';
import "../css/ShoppingCart.css";
import { UserContext } from '../UserContext'; // Adjust import path as needed

const ShoppingCart = () => {
  const { accessToken } = useContext(UserContext);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // Fetch cart items from API
  useEffect(() => {
    if (!accessToken) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/store/getCart', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Assuming API response structure { cartItems: [...] }
        // Adjust if your API returns differently
        setCartItems(response.data.cartItems || []);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setError('Failed to load cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [accessToken]);

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

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'drums20') {
      setPromoApplied(true);
    }
  };

  // Calculate subtotal, savings, promo discount, shipping, tax, total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const promoDiscount = promoApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 500 ? 0 : 19.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  if (loading) {
    return <div className="loading">Loading your cart...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (cartItems.length === 0) {
    return <div className="empty-cart">Your cart is empty.</div>;
  }

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <button className="back-btn">
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </button>
          </div>
          <div className="nav-center">
            <div className="logo">
              <span className="logo-icon">🥁</span>
              <span className="logo-text">DrumHub</span>
            </div>
          </div>
          <div className="nav-right">
            <div className="cart-badge">
              <ShoppingBag size={20} />
              <span className="badge-count">{cartItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-container">
        {/* Cart Items Section */}
        <div className="cart-section">
          <div className="section-header">
            <h1 className="section-title">Your Cart</h1>
            <p className="section-subtitle">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} • Free shipping on orders over $500</p>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} className="item-image" />
                  {item.fastShipping && <div className="fast-shipping-badge">⚡ Fast Shipping</div>}
                </div>

                <div className="item-details">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <button className="wishlist-btn">
                      <Heart size={18} />
                    </button>
                  </div>

                  <p className="item-description">{item.description}</p>

                  <div className="item-meta">
                    <div className="rating">
                      <Star size={14} className="star-filled" />
                      <span className="rating-score">{item.rating}</span>
                      <span className="rating-count">({item.reviews} reviews)</span>
                    </div>
                    <div className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      {item.inStock ? '✓ In Stock' : '⚠ Out of Stock'}
                    </div>
                  </div>

                  <div className="price-section">
                    <div className="current-price">${(item.price * item.quantity).toFixed(2)}</div>
                    <div className="original-price">${(item.originalPrice * item.quantity).toFixed(2)}</div>
                    <div className="savings">Save ${(item.originalPrice - item.price) * item.quantity.toFixed(2)}</div>
                  </div>
                </div>

                <div className="item-actions">
                  <div className="quantity-section">
                    <label className="quantity-label">Qty</label>
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-item-btn"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code Section */}
          <div className="promo-section">
            <div className="promo-input-group">
              <input
                type="text"
                placeholder="Enter promo code (try: DRUMS20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button onClick={applyPromo} className="promo-btn">
                Apply
              </button>
            </div>
            {promoApplied && (
              <div className="promo-success">
                ✅ Promo code applied! 20% discount
              </div>
            )}
          </div>
        </div>

        {/* Checkout Section */}
        <div className="checkout-section">
          <div className="checkout-card">
            <h2 className="checkout-title">Order Summary</h2>

            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {savings > 0 && (
                <div className="summary-row savings-row">
                  <span>You're saving</span>
                  <span className="savings-amount">-${savings.toFixed(2)}</span>
                </div>
              )}

              {promoApplied && (
                <div className="summary-row promo-row">
                  <span>Promo discount (20%)</span>
                  <span className="promo-discount">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'free-shipping' : ''}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="payment-methods">
              <h3 className="payment-title">Payment Method</h3>

              <div className="payment-options">
                <button
                  onClick={() => setSelectedPayment('card')}
                  className={`payment-option ${selectedPayment === 'card' ? 'selected' : ''}`}
                >
                  <CreditCard size={20} />
                  <span>Credit Card</span>
                  {selectedPayment === 'card' && <div className="selected-indicator">✓</div>}
                </button>

                <button
                  onClick={() => setSelectedPayment('qpay')}
                  className={`payment-option ${selectedPayment === 'qpay' ? 'selected' : ''}`}
                >
                  <Smartphone size={20} />
                  <span>QPay</span>
                  {selectedPayment === 'qpay' && <div className="selected-indicator">✓</div>}
                </button>
              </div>
            </div>

            <button className="checkout-btn">
              <span>Complete Purchase</span>
              <span className="checkout-amount">${total.toFixed(2)}</span>
            </button>

            <div className="security-badges">
              <div className="security-item">🔒 SSL Secured</div>
              <div className="security-item">🛡️ Buyer Protection</div>
              <div className="security-item">↩️ 30-day Returns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
