import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, Package, Trash2, Minus, Plus } from "lucide-react";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../UserContext";
import ShopHeader from "./ShopHeader"; // Import header here
import "../Css/ShoppingCart.css";

const ShoppingCart = () => {
  const { accessToken } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const syncGuestCartToUser = async (cartId) => {
      try {
        console.log("[ShoppingCart][syncGuestCartToUser] Start syncing with cartId:", cartId);
        const res = await axiosInstance.post(
          "/store/assignGuestCartToUser",
          { cartId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("[ShoppingCart][syncGuestCartToUser] Response:", res.data);
        localStorage.removeItem("guest_cart_id");
        localStorage.removeItem("guest_cart_items");
        console.log("[ShoppingCart][syncGuestCartToUser] Removed guest_cart_id and guest_cart_items from localStorage");
        await new Promise((resolve) => setTimeout(resolve, 400)); // small delay to ensure sync
        console.log("[ShoppingCart][syncGuestCartToUser] Delay complete, returning from sync");
      } catch (err) {
        console.error("[ShoppingCart][syncGuestCartToUser] Error:", err);
      }
    };

    const fetchCart = async () => {
      try {
        console.log("[ShoppingCart][fetchCart] Called. accessToken:", accessToken);

        if (accessToken) {
          console.log("[ShoppingCart][fetchCart] Logged-in user detected");
          const guestCartId = localStorage.getItem("guest_cart_id");
          console.log("[ShoppingCart][fetchCart] guest_cart_id from localStorage:", guestCartId);

          if (guestCartId) {
            console.log("[ShoppingCart][fetchCart] Syncing guest cart to user...");
            await syncGuestCartToUser(guestCartId);
          }

          const res = await axiosInstance.get("/store/getCart", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log("[ShoppingCart][fetchCart] Backend /store/getCart response:", res.data);

          const items = Array.isArray(res.data?.data)
            ? res.data.data
            : res.data?.data?.cart || [];
          console.log("[ShoppingCart][fetchCart] Extracted items array:", items);

          setCartItems(items);
          console.log("[ShoppingCart][fetchCart] cartItems state updated");
        } else {
          console.log("[ShoppingCart][fetchCart] Guest user detected");
          const cartId = localStorage.getItem("guest_cart_id");
          console.log("[ShoppingCart][fetchCart] guest_cart_id from localStorage:", cartId);

          if (cartId) {
            const res = await axiosInstance.get("/store/getCart", {
              params: { cartId },
            });
            console.log("[ShoppingCart][fetchCart] Guest /store/getCart response:", res.data);

            const items = Array.isArray(res.data?.data)
              ? res.data.data
              : res.data?.data?.cart || [];
            console.log("[ShoppingCart][fetchCart] Extracted guest items array:", items);

            setCartItems(items);
            console.log("[ShoppingCart][fetchCart] cartItems state updated for guest");
          } else {
            console.log("[ShoppingCart][fetchCart] No guest_cart_id found, setting cartItems to empty");
            setCartItems([]);
          }
        }
      } catch (err) {
        console.error("[ShoppingCart][fetchCart] Error loading cart:", err);
        setCartItems([]);
      }
    };

    console.log("[ShoppingCart] useEffect triggered, calling fetchCart");
    fetchCart();
  }, [accessToken]);

  const toggleItemSelection = (id) => {
    console.log("[ShoppingCart][toggleItemSelection] toggling selection for id:", id);
    setCartItems((items) =>
      items.map((item) =>
        item._id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeItem = async (id, productId) => {
    console.log("[ShoppingCart][removeItem] removing item with id:", id);

    try {
      if (accessToken) {
        // Logged-in user
        await axiosInstance.delete("/store/removeItemFromCart", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            productId: productId,
          },
        });
      } else {
        // Guest user
        const cartId = localStorage.getItem("guest_cart_id");
        if (!cartId) {
          console.warn("[ShoppingCart][removeItem] No guest cart ID found");
          return;
        }
        await axiosInstance.delete("/store/removeItemFromCart", {
          data: {
            productId: productId,
            cartId: cartId,
          },
        });
      }
      // On success, update UI
      setCartItems((items) => items.filter((item) => item._id !== id));
      console.log("[ShoppingCart][removeItem] Item removed successfully");
    } catch (err) {
      console.error("[ShoppingCart][removeItem] Failed to remove item:", err);
    }
  };

  const clearCart = async () => {
    console.log("[ShoppingCart][clearCart] Clearing entire cart");
    try {
      if (accessToken) {
        await axiosInstance.delete("/store/clearCart", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {}, // no body needed for logged-in user
        });
      } else {
        const cartId = localStorage.getItem("guest_cart_id");
        if (!cartId) {
          console.warn("[ShoppingCart][clearCart] No guest cart ID found");
          return;
        }
        await axiosInstance.delete("/store/clearCart", {
          data: {
            cartId: cartId,
          },
        });
      }
      setCartItems([]);
      console.log("[ShoppingCart][clearCart] Cart cleared successfully");
    } catch (err) {
      console.error("[ShoppingCart][clearCart] Failed to clear cart:", err);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    console.log("[ShoppingCart][updateQuantity] updating quantity for id:", id, "to:", newQuantity);
    if (newQuantity < 1) {
      console.log("[ShoppingCart][updateQuantity] newQuantity less than 1, ignoring");
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handlePlaceOrder = () => {
    console.log("[ShoppingCart][handlePlaceOrder] triggered");
    if (!accessToken) {
      alert("Захиалахын тулд эхлээд нэвтэрнэ үү");
      console.log("[ShoppingCart][handlePlaceOrder] user not logged in, showing alert");
      return;
    }

    alert("Таны захиалга амжилттай боллоо!");
    console.log("[ShoppingCart][handlePlaceOrder] order placed alert shown");
  };

  console.log("[ShoppingCart] Rendering, cartItems:", cartItems);

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
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item._id} className="cart-item">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleItemSelection(item._id)}
                      className="cart-item-checkbox"
                    />

                    <div className="item-image">
                      <Package size={24} color="#000" />
                    </div>

                    <div className="item-name">{item.productId?.title || "Unnamed product"}</div>

                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="quantity-button"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="quantity-button"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="item-price">{item.productId?.price || "N/A"}₮</div>

                    <button
                      onClick={() => removeItem(item._id, item.productId?._id)}
                      className="delete-button"
                    >
                      <Trash2 size={20} color="#007bff" />
                    </button>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>

            {/* Place order button */}
            <div className="order-button-container">
              <button className="btn-place-order" onClick={handlePlaceOrder}>
                Захиалах
              </button>
            </div>

            {/* Clear cart button */}
            {cartItems.length > 0 && (
              <div className="clear-cart-button-container" style={{ marginTop: "1rem" }}>
                <button className="btn-clear-cart" onClick={clearCart}>
                  Бүх барааг устгах
                </button>
              </div>
            )}
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
