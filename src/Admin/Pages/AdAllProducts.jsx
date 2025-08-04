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

  const fetchProducts = async () => {
    if (!accessToken) return;
    try {
      const response = await axiosInstance.get("/store/getAllProducts", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setProducts(Array.isArray(response.data.data) ? response.data.data : []);
    } catch {
      setProducts([]);
    }
  };

  useEffect(() => {
    if (accessToken) fetchProducts();
  }, [accessToken]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Энэ барааг устгахдаа итгэлтэй байна уу?")) return;
    if (!accessToken) return alert("Unauthorized");

    try {
      await axiosInstance.delete("/store/deleteProduct", {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { productId },
      });
      fetchProducts();
    } catch {
      alert("Барааг устгахад алдаа гарлаа.");
    }
  };

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

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewImageUrlChange = (e) => {
    setEditFormData((prev) => ({ ...prev, newImageUrl: e.target.value }));
  };

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

  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData((prev) => {
          if (prev.images.includes(reader.result)) return prev;
          return {
            ...prev,
            images: [...(prev.images || []), reader.result],
          };
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) return alert("Unauthorized");

    try {
      await axiosInstance.put(
        "/store/updateProduct",
        {
          productId: editingProductId,
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
    } catch {
      alert("Барааг шинэчлэхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="ad-product-container">
      <div className="ad-product-header">
        <h2>Бүх бараанууд</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="ad-product-add-btn"
        >
          + Бараа нэмэх
        </button>
      </div>

      {showAddModal && (
        <div className="ad-product-modal-overlay">
          <div className="ad-product-modal">
            <button
              className="ad-product-close-btn"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
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

      <table className="ad-product-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Нэр</th>
            <th>Үнэ</th>
            <th>Зураг</th>
            <th>Ангилал</th>
            <th>Үйлдэл</th>
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
                <td>
                  <img src={product.thumbnail} alt="thumb" className="ad-product-thumbnail" />
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <input
                      className="ad-product-input"
                      name="title"
                      value={editFormData.title}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.title || product.name
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <input
                      className="ad-product-number"
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleInputChange}
                    />
                  ) : (
                    `₮${product.price}`
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleAdditionalImagesUpload}
                        style={{ marginBottom: 8 }}
                      />
                      <div className="ad-product-img-grid">
                        {editFormData.images?.map((imgUrl, idx) => (
                          <div style={{ position: "relative" }} key={idx}>
                            <img
                              src={imgUrl}
                              className={`ad-product-img-thumbnail ${
                                editFormData.thumbnail === imgUrl ? "active" : ""
                              }`}
                              alt=""
                              onClick={() =>
                                setEditFormData((prev) => ({ ...prev, thumbnail: imgUrl }))
                              }
                              title="Click to set as thumbnail"
                            />
                            <button
                              type="button"
                              className="ad-product-remove-btn"
                              onClick={() => handleRemoveImage(idx)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <input
                        className="ad-product-input"
                        type="text"
                        placeholder="Шинэ зурагны URL оруулна уу"
                        value={editFormData.newImageUrl || ""}
                        onChange={handleNewImageUrlChange}
                      />
                      <button
                        type="button"
                        className="ad-product-btn"
                        style={{ marginTop: 8 }}
                        onClick={handleAddImage}
                      >
                        Зураг нэмэх
                      </button>
                    </>
                  ) : (
                    <div className="ad-product-img-grid">
                      {(product.images || []).map((imgUrl, idx) => (
                        <img
                          key={idx}
                          src={imgUrl}
                          className="ad-product-img-thumbnail"
                          alt=""
                        />
                      ))}
                    </div>
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <input
                      className="ad-product-input"
                      name="category"
                      value={editFormData.category}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <>
                      <button className="ad-product-btn" onClick={handleUpdateSubmit}>
                        Хадгалах
                      </button>
                      <button
                        className="ad-product-btn ad-product-cancel-btn"
                        onClick={handleCancelEdit}
                      >
                        Цуцлах
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="ad-product-btn"
                        onClick={() => handleEditClick(product)}
                      >
                        Засах
                      </button>
                      <button
                        className="ad-product-btn ad-product-cancel-btn"
                        onClick={() => handleDelete(product._id)}
                      >
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

export default AdAllProducts;
