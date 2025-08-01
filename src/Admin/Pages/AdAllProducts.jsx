import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../UserContext";
import AdAddProduct from "./AddProduct";
import "../Css/AdAllProducts.css";

const AdAllProducts = () => {
  const { accessToken } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Fetch products
  const fetchProducts = async () => {
    if (!accessToken) return;
    try {
      const response = await axiosInstance.get("/store/getAllProducts", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const productsData = Array.isArray(response.data.data) ? response.data.data : [];
      setProducts(productsData);
    } catch (error) {
      setProducts([]);
    }
  };

  useEffect(() => {
    if (accessToken) fetchProducts();
  }, [accessToken]);

  // Delete product
  const handleDelete = async (productId) => {
    if (!window.confirm("Энэ барааг устгахдаа итгэлтэй байна уу?")) return;

    if (!accessToken) {
      alert("Unauthorized: No token found");
      return;
    }

    try {
      // IMPORTANT: axios.delete requires the body inside the config as 'data' property
      await axiosInstance.delete("/store/deleteProduct", {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { productId },
      });
      fetchProducts();
    } catch (error) {
      alert("Барааг устгахад алдаа гарлаа.");
    }
  };

  // Start editing a product
  const handleEditClick = (product) => {
    setEditingProductId(product._id);
    setEditFormData({
      title: product.title || product.name || "",
      description: product.description || "",
      thumbnail: product.thumbnail || "",
      images: product.images || [],
      category: product.category || "",
      price: product.price || 0,
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditFormData({});
  };

  // Handle input changes (title, price, category, thumbnail, description)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new image URL input change
  const handleNewImageUrlChange = (e) => {
    setEditFormData((prev) => ({ ...prev, newImageUrl: e.target.value }));
  };

  // Add new image to images array
  const handleAddImage = () => {
    const newUrl = editFormData.newImageUrl?.trim();
    if (newUrl && !editFormData.images.includes(newUrl)) {
      setEditFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), newUrl],
        newImageUrl: "",
      }));
    }
  };

  // Remove image from images array by index
  const handleRemoveImage = (index) => {
    setEditFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: newImages,
        thumbnail: prev.thumbnail === prev.images[index] ? (newImages[0] || "") : prev.thumbnail,
      };
    });
  };

  // Handle upload of additional images via file input
  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData((prev) => {
          if (prev.images.includes(reader.result)) return prev; // avoid duplicates
          return {
            ...prev,
            images: [...(prev.images || []), reader.result],
          };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // Submit updated product
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      alert("Unauthorized: No token found");
      return;
    }

    try {
      await axiosInstance.put(
        "/store/updateProduct",
        {
          productId: editingProductId, // required by API
          title: editFormData.title,
          description: editFormData.description,
          thumbnail: editFormData.thumbnail,
          images: editFormData.images,
          category: editFormData.category,
          price: Number(editFormData.price),
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      alert("Барааг шинэчлэхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="admin-products-container" style={{ padding: 24 }}>
      <div
        className="admin-header"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}
      >
        <h2>Бүх бараанууд</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="add-product-btn"
          style={{ backgroundColor: "#4CAF50", color: "white", border: "none", padding: "10px 16px", borderRadius: 8, cursor: "pointer", fontSize: 16 }}
        >
          + Бараа нэмэх
        </button>
      </div>

      {showAddModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 12,
              maxHeight: "90vh",
              overflowY: "auto",
              width: "90%",
              maxWidth: 600,
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                position: "absolute",
                top: 8,
                right: 12,
                fontSize: 24,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Close modal"
            >
              ×
            </button>
            <AdAddProduct
              accessToken={accessToken}
              onClose={() => setShowAddModal(false)}
              onProductAdded={() => {
                fetchProducts();
                setShowAddModal(false);
              }}
            />
          </div>
        </div>
      )}

      <table className="admin-product-table" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={th}>Thumbnail</th>
            <th style={th}>Name</th>
            <th style={th}>Price</th>
            <th style={th}>Images</th> {/* Replaces Inventory */}
            <th style={th}>Category</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                Бараа олдсонгүй.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td style={td}>
                  <img
                    src={product.thumbnail}
                    alt="thumbnail"
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                  />
                </td>
                <td style={td}>
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.title || product.name
                  )}
                </td>
                <td style={td}>
                  {editingProductId === product._id ? (
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleInputChange}
                    />
                  ) : (
                    `₮${product.price}`
                  )}
                </td>
                <td style={td}>
                  {editingProductId === product._id ? (
                    <>
                      {/* Upload multiple images input */}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesUpload}
                        style={{ marginBottom: 8, width: "100%" }}
                      />

                      {/* Editable images with delete buttons and clickable for thumbnail */}
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                        {editFormData.images && editFormData.images.length > 0 ? (
                          editFormData.images.map((imgUrl, idx) => (
                            <div
                              key={idx}
                              style={{ position: "relative", display: "inline-block" }}
                            >
                              <img
                                src={imgUrl}
                                alt={`img-${idx}`}
                                onClick={() =>
                                  setEditFormData((prev) => ({
                                    ...prev,
                                    thumbnail: imgUrl,
                                  }))
                                }
                                style={{
                                  width: 60,
                                  height: 60,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                  cursor: "pointer",
                                  border:
                                    editFormData.thumbnail === imgUrl
                                      ? "2px solid blue"
                                      : "1px solid #ccc",
                                }}
                                title="Click to set as thumbnail"
                              />
                              <button
                                onClick={() => handleRemoveImage(idx)}
                                style={{
                                  position: "absolute",
                                  top: -6,
                                  right: -6,
                                  backgroundColor: "red",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: 20,
                                  height: 20,
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  lineHeight: 1,
                                }}
                                aria-label="Remove image"
                                type="button"
                              >
                                ×
                              </button>
                            </div>
                          ))
                        ) : (
                          <span>Зураг байхгүй байна</span>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Шинэ зурагны URL оруулна уу"
                        value={editFormData.newImageUrl || ""}
                        onChange={handleNewImageUrlChange}
                        style={{ marginBottom: 8, width: "100%" }}
                      />
                      <button
                        type="button"
                        onClick={handleAddImage}
                        style={{ marginBottom: 16 }}
                      >
                        Зураг нэмэх
                      </button>
                    </>
                  ) : (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {(product.images || []).map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          alt={`img-${idx}`}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </td>
                <td style={td}>
                  {editingProductId === product._id ? (
                    <input
                      type="text"
                      name="category"
                      value={editFormData.category}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td style={td}>
                  {editingProductId === product._id ? (
                    <>
                      <button onClick={handleUpdateSubmit} style={{ marginRight: 8 }}>
                        Хадгалах
                      </button>
                      <button onClick={handleCancelEdit}>Цуцлах</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(product)} style={{ marginRight: 8 }}>
                        Засах
                      </button>
                      <button onClick={() => handleDelete(product._id)} style={{ color: "red" }}>
                        Устгах
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const th = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left",
};

const td = {
  border: "1px solid #ddd",
  padding: "12px",
};

export default AdAllProducts;
