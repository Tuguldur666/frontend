import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, Package, Trash2, Minus, Plus } from "lucide-react";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../UserContext";
import ShopHeader from "./ShopHeader";  // Import header here
import "../Css/ShoppingCart.css";

const ShoppingCart = () => {
  const { accessToken } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (accessToken) {
          // Logged-in user: fetch cart with token
          console.log("[ShoppingCart] Logged-in user detected, fetching cart...");
          const res = await axiosInstance.get("/store/getCart", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setCartItems(res.data.cartItems || []);
        } else {
          // Guest user: fetch cart with cartId from localStorage
          console.log("[ShoppingCart] Guest user detected, checking localStorage for guest_cart_id.");
          let cartId = localStorage.getItem("guest_cart_id");
          console.log("[ShoppingCart] Guest cartId from localStorage:", cartId);

          if (cartId) {
            const res = await axiosInstance.get("/store/getCart", {
              params: { cartId },
            });

            if (res.data && res.data.data && Array.isArray(res.data.data.cart)) {
              setCartItems(res.data.data.cart);
            } else {
              console.warn("[ShoppingCart] No cartItems found in guest cart response:", res.data);
              setCartItems([]);
            }
          } else {
            console.log("[ShoppingCart] No guest_cart_id found, initializing empty cart.");
            setCartItems([]);
          }
        }
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };

    fetchCart();
  }, [accessToken]);

  const toggleItemSelection = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handlePlaceOrder = () => {
    if (!accessToken) {
      alert("Захиалахын тулд эхлээд нэвтэрнэ үү");
      // TODO: redirect to login page if you have routing, e.g.
      // navigate("/login");
      return;
    }
    
    // TODO: Add your place order logic here
    alert("Таны захиалга амжилттай боллоо!");
  };

  return (
    <>
      <ShopHeader /> {/* Header here */}

      <div className="shopping-cart-container">
        <div className="shopping-cart-header">
          <ArrowLeft className="back-icon" />
          <h1 className="header-title">Continue shopping</h1>
        </div>

        <div className="main-content">
          <div className="cart-section">
            <h2 className="cart-title">Shopping cart</h2>
            <p className="cart-subtitle">You have {cartItems.length} items in your cart</p>

            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleItemSelection(item.id)}
                    className="cart-item-checkbox"
                  />

                  <div className="item-image">
                    <Package size={24} color="#000" />
                  </div>

                  <div className="item-name">{item.name}</div>

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

                  <div className="item-price">{item.price}</div>

                  <button onClick={() => removeItem(item.id)} className="delete-button">
                    <Trash2 size={20} color="#007bff" />
                  </button>
                </div>
              ))}
            </div>

            {/* Place order button */}
            <div className="order-button-container">
              <button className="btn-place-order" onClick={handlePlaceOrder}>
                Захиалах
              </button>
            </div>
          </div>

          <div className="payment-section">
            <div className="payment-container">
              <h3 className="payment-title">Төлбөр төлөх сонголтоо хийнэ үү</h3>

              <div className="payment-methods">
                <div className="payment-method">
                  <div className="payment-icon">
                    <div className="transfer-icon"></div>
                  </div>
                  <div className="payment-method-text">
                    ДАНС
                    <br />
                    ШИЛЖҮҮЛЭГ
                  </div>
                </div>

                <div className="payment-method">
                  <div className="payment-icon">
                    <div className="qpay-icon"></div>
                  </div>
                  <div className="payment-method-text">QPAY</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
