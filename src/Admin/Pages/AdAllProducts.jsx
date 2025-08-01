import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../../axiosInstance";
import "../css/Admin.css";
import { UserContext } from "../../UserContext";

const AdAllProducts = () => {
  const { accessToken } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    thumbnail: "",
    images: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/store/getAllProducts");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const startEditing = (product) => {
    setEditProductId(product._id);
    setEditForm({
      title: product.title || "",
      description: product.description || "",
      category: product.category || "",
      price: product.price || "",
      thumbnail: product.thumbnail || "",
      images: product.images || [],
    });
    setError("");
  };

  const cancelEditing = () => {
    setEditProductId(null);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input change for thumbnail upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview image as base64 (you might want to upload to server here instead)
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm((prev) => ({
        ...prev,
        thumbnail: reader.result, // base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  // Set thumbnail by clicking one of existing images
  const setThumbnailFromImage = (imgUrl) => {
    setEditForm((prev) => ({
      ...prev,
      thumbnail: imgUrl,
    }));
  };

  const removeImage = (index) => {
    setEditForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateProduct = async () => {
    setError("");
    if (!accessToken) {
      setError("Unauthorized: No token found");
      return;
    }

    try {
      await axiosInstance.put(
        "/store/updateProduct",
        {
          productId: editProductId,
          title: editForm.title,
          description: editForm.description,
          category: editForm.category,
          price: Number(editForm.price),
          thumbnail: editForm.thumbnail,
          images: editForm.images,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      fetchProducts();
      cancelEditing();
    } catch (err) {
      console.error("Failed to update product:", err);
      setError(
        err.response?.data?.message || "Failed to update product. Check your input."
      );
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    if (!accessToken) {
      alert("Unauthorized: No token found");
      return;
    }

    try {
      await axiosInstance.delete("/store/deleteProduct", {
        headers: { Authorization: `Bearer ${accessToken}` },
        data: { productId: id },
      });
      fetchProducts();
      if (editProductId === id) cancelEditing();
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <div className="content-page">
      <h2>Бүх бараа</h2>
      <table className="content-table">
        <thead>
          <tr>
            <th>Нэр</th>
            <th>Тайлбар</th>
            <th>Ангилал</th>
            <th>Үнэ</th>
            <th>Thumbnail</th>
            <th>Зурагнууд</th>
            <th>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                {editProductId === p._id ? (
                  <input
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}
                  />
                ) : (
                  p.title
                )}
              </td>
              <td>
                {editProductId === p._id ? (
                  <input
                    name="description"
                    value={editForm.description}
                    onChange={handleChange}
                  />
                ) : (
                  p.description
                )}
              </td>
              <td>
                {editProductId === p._id ? (
                  <input
                    name="category"
                    value={editForm.category}
                    onChange={handleChange}
                  />
                ) : (
                  p.category
                )}
              </td>
              <td>
                {editProductId === p._id ? (
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleChange}
                    min={0}
                  />
                ) : (
                  p.price
                )}
              </td>
              <td style={{ minWidth: 160 }}>
                {editProductId === p._id ? (
                  <>
                    {editForm.thumbnail ? (
                      <img
                        src={editForm.thumbnail}
                        alt="thumbnail"
                        style={{
                          width: 80,
                          height: 60,
                          objectFit: "cover",
                          marginBottom: 8,
                          border: "2px solid #333",
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      <span>Thumbnail байхгүй</span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      style={{ marginBottom: 8 }}
                    />
                    <div style={{ fontSize: 12, marginBottom: 4 }}>
                      Сонгох: доорх зургууд дунд дараарай
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {editForm.images && editForm.images.length > 0 ? (
                        editForm.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`select-thumb-${i}`}
                            onClick={() => setThumbnailFromImage(img)}
                            style={{
                              width: 40,
                              height: 30,
                              objectFit: "cover",
                              borderRadius: 4,
                              cursor: "pointer",
                              border:
                                editForm.thumbnail === img
                                  ? "2px solid blue"
                                  : "1px solid #ccc",
                            }}
                            title="Click to set as thumbnail"
                          />
                        ))
                      ) : (
                        <span>Зураг байхгүй</span>
                      )}
                    </div>
                  </>
                ) : p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt="thumbnail"
                    style={{ width: 60, height: 40, objectFit: "cover" }}
                  />
                ) : (
                  "-"
                )}
              </td>
              <td style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {editProductId === p._id ? (
                  editForm.images.length > 0 ? (
                    editForm.images.map((img, i) => (
                      <div
                        key={i}
                        style={{ position: "relative", display: "inline-block" }}
                      >
                        <img
                          src={img}
                          alt={`img-${i}`}
                          style={{
                            width: 60,
                            height: 40,
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                        <button
                          type="button"
                          title="Зураг устгах"
                          onClick={() => removeImage(i)}
                          style={{
                            position: "absolute",
                            top: -6,
                            right: -6,
                            background: "red",
                            border: "none",
                            borderRadius: "50%",
                            color: "white",
                            width: 20,
                            height: 20,
                            cursor: "pointer",
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  ) : (
                    <span>Зураг байхгүй</span>
                  )
                ) : p.images && p.images.length > 0 ? (
                  p.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`img-${i}`}
                      style={{
                        width: 40,
                        height: 30,
                        marginRight: 5,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  ))
                ) : (
                  "-"
                )}
              </td>
              <td>
                {editProductId === p._id ? (
                  <>
                    <button
                      onClick={updateProduct}
                      className="btn-edit"
                      style={{ marginRight: 8 }}
                    >
                      Хадгалах
                    </button>
                    <button onClick={cancelEditing} className="btn-delete">
                      Болих
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(p)}
                      className="btn-edit"
                      style={{ marginRight: 8 }}
                    >
                      Засах
                    </button>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="btn-delete"
                    >
                      Устгах
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && (
        <p style={{ color: "red", marginTop: 10, fontWeight: "bold" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default AdAllProducts;
