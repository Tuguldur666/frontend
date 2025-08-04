import React, { useState } from 'react';
import { ArrowLeft, Package, Trash2, Minus, Plus } from 'lucide-react';

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
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <ArrowLeft style={styles.backIcon} />
        <h1 style={styles.headerTitle}>Continue shopping</h1>
      </div>

      <div style={styles.mainContent}>
        {/* Shopping Cart Section */}
        <div style={styles.cartSection}>
          <h2 style={styles.cartTitle}>Shopping cart</h2>
          <p style={styles.cartSubtitle}>You have {cartItems.length} items in your cart</p>

          <div style={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItemSelection(item.id)}
                  style={styles.checkbox}
                />

                {/* Item Image */}
                <div style={styles.itemImage}>
                  <Package size={24} color="#000" />
                </div>

                {/* Item Name */}
                <div style={styles.itemName}>
                  {item.name}
                </div>

                {/* Quantity Controls */}
                <div style={styles.quantityControls}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={styles.quantityButton}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={styles.quantityDisplay}>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={styles.quantityButton}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Price */}
                <div style={styles.itemPrice}>
                  {item.price}
                </div>

                {/* Delete Button */}
                <button 
                  onClick={() => removeItem(item.id)}
                  style={styles.deleteButton}
                >
                  <Trash2 size={20} color="#007bff" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div style={styles.paymentSection}>
          <div style={styles.paymentContainer}>
            <h3 style={styles.paymentTitle}>Төлбөр төлөх сонголтоо хийнэ үү</h3>
            
            <div style={styles.paymentMethods}>
              <div style={styles.paymentMethod}>
                <div style={styles.paymentIcon}>
                  <div style={styles.transferIcon}></div>
                </div>
                <div style={styles.paymentMethodText}>
                  ДАНС<br />ШИЛЖҮҮЛЭГ
                </div>
              </div>

              <div style={styles.paymentMethod}>
                <div style={styles.paymentIcon}>
                  <div style={styles.qpayIcon}></div>
                </div>
                <div style={styles.paymentMethodText}>
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

const styles = {
  container: {
    backgroundColor: '#fff',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '15px',
    borderBottom: '2px solid #000'
  },
  backIcon: {
    width: '24px',
    height: '24px',
    color: '#000',
    marginRight: '15px',
    cursor: 'pointer'
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
    margin: 0
  },
  mainContent: {
    display: 'flex',
    gap: '40px'
  },
  cartSection: {
    flex: 1
  },
  cartTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000',
    margin: '0 0 10px 0'
  },
  cartSubtitle: {
    color: '#000',
    marginBottom: '25px',
    fontSize: '14px'
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    border: '2px solid #000',
    borderRadius: '8px',
    backgroundColor: '#fff'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    marginRight: '15px',
    accentColor: '#000'
  },
  itemImage: {
    width: '60px',
    height: '60px',
    border: '2px solid #000',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '15px',
    backgroundColor: '#fff'
  },
  itemName: {
    flex: 1,
    fontSize: '16px',
    fontWeight: '500',
    color: '#000'
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px'
  },
  quantityButton: {
    width: '32px',
    height: '32px',
    border: '1px solid #000',
    backgroundColor: '#fff',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  quantityDisplay: {
    width: '50px',
    height: '32px',
    border: '1px solid #000',
    borderLeft: 'none',
    borderRight: 'none',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '500',
    color: '#000'
  },
  itemPrice: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#000',
    marginRight: '15px',
    minWidth: '80px'
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px'
  },
  paymentSection: {
    width: '320px'
  },
  paymentContainer: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '25px',
    borderRadius: '8px'
  },
  paymentTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '25px',
    margin: '0 0 25px 0'
  },
  paymentMethods: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  paymentMethod: {
    backgroundColor: '#e5e5e5',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  paymentIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '12px',
    height: '20px'
  },
  transferIcon: {
    width: '30px',
    height: '3px',
    backgroundColor: '#000',
    position: 'relative'
  },
  qpayIcon: {
    width: '30px',
    height: '3px',
    backgroundColor: '#000'
  },
  paymentMethodText: {
    color: '#000',
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: '1.2'
  }
};

export default ShoppingCart;