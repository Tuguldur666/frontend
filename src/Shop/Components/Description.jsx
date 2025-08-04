import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import "../css/Description.css";
import { UserContext } from "../../UserContext";
import ShopHeader from "./ShopHeader";

const Description = () => {
  const { kitId } = useParams();
  const { accessToken } = useContext(UserContext);

  const [kit, setKit] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!kitId) {
      console.error("No product id found in params");
      return;
    }

    axiosInstance
      .post("/store/getProductById", { productId: kitId })
      .then((res) => {
        if (res.data.success && res.data.data) {
          setKit(res.data.data);
          const img = res.data.data.image || res.data.data.images?.[0];
          setMainImage(img || null);
        } else {
          console.error("Product not found or response malformed");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
      });
  }, [kitId]);

  const handleAddToCart = async () => {
    if (!kit) return;

    if (quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    try {
      const body = {
        productId: kit._id,
        quantity,
      };

      const guestCartId = localStorage.getItem("guest_cart_id");

      // For guest users, include cartId in body
      if (!accessToken && guestCartId) {
        body.cartId = guestCartId;
      }

      const headers = {};
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const res = await axiosInstance.post("/store/addItemToCart", body, {
        headers,
      });

      // If backend returns a new guest cartId, store it
      if (!accessToken && !guestCartId && res.data.cartId) {
        localStorage.setItem("guest_cart_id", res.data.cartId);
        console.log("[Description] Saved new guest cartId:", res.data.cartId);
      }

      alert("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart.");
    }
  };

  if (!kit) return <div className="description-loading">Loading...</div>;

  return (
    <div className="description-container">
      <ShopHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="main-content">
        <div className="product-images">
          <div className="main-image">
            {mainImage ? (
              <img src={mainImage} alt={kit.name} className="product-main-img" />
            ) : (
              <div>No image available</div>
            )}
          </div>
          <div className="thumbnail-images">
            {kit.images && kit.images.length > 0
              ? kit.images.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="thumbnail"
                    onClick={() => setMainImage(imgUrl)}
                  >
                    <img
                      src={imgUrl}
                      alt={`${kit.name} thumbnail ${idx + 1}`}
                      className="thumbnail-img"
                    />
                  </div>
                ))
              : kit.image && (
                  <div className="thumbnail">
                    <img
                      src={kit.image}
                      alt={`${kit.name} thumbnail`}
                      className="thumbnail-img"
                    />
                  </div>
                )}
          </div>
        </div>

        <div className="product-details">
          <h2 className="product-title">{kit.name}</h2>

          <div className="price">
            <span className="price-label">Price:</span>
            <span className="price-value">{kit.price}₮</span>
          </div>

          <div className="description-section">
            <h3 className="description-title">Description</h3>
            <p className="specifications">{kit.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-control">
              <label htmlFor="quantity" className="quantity-label">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{
                  width: "60px",
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div className="action-buttons">
              <button className="btn-buy" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
