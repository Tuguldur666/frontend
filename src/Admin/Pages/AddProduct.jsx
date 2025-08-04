import React, { useState, useEffect } from 'react';
import axiosInstance, { setAuthToken } from '../../axiosInstance'; // make sure this path is valid

const CLOUD_NAME = 'dvlxevlor';
const UPLOAD_PRESET = 'E-Drum';

const AdAddProduct = ({ accessToken }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (accessToken) {
      console.log("Setting auth token:", accessToken);
      setAuthToken(accessToken);
    } else {
      console.warn("No accessToken provided!");
    }
  }, [accessToken]);

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected images:", files);
    setImages(files);
    setPreviewUrls(files.map(file => URL.createObjectURL(file)));
  };

  const uploadToCloudinary = async (file, index) => {
    console.log(`Uploading image ${index + 1}:`, file.name);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Cloudinary upload error:", err);
      throw new Error('Зураг оруулахад алдаа гарлаа');
    }

    const data = await res.json();
    console.log(`Uploaded image ${index + 1}:`, data.secure_url);
    return data.secure_url;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log("Submitting product...");
    console.log("Current token header:", axiosInstance.defaults.headers.common['Authorization']);

    const priceNumber = Number(price);
    if (!title.trim() || !description.trim() || !category.trim()) {
      setError('Нэр, тайлбар, категори хоосон байж болохгүй');
      return;
    }
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setError('Үнэ нь 0-ээс их тоо байх ёстой');
      return;
    }
    if (images.length === 0) {
      setError('Хамгийн багадаа нэг зураг оруулна уу');
      return;
    }

    setLoading(true);

    try {
      const uploadedUrls = await Promise.all(images.map((img, i) => uploadToCloudinary(img, i)));

      const productData = {
        title,
        description,
        category,
        price: priceNumber,
        thumbnail: uploadedUrls[0],
        images: uploadedUrls,
      };

      console.log("Sending product to backend:", productData);

      const res = await axiosInstance.post('/store/createProduct', productData);

      console.log("Response from backend:", res);

      alert('Бүтээгдэхүүн амжилттай нэмэгдлээ!');
      setTitle('');
      setDescription('');
      setCategory('');
      setPrice('');
      setImages([]);
      setPreviewUrls([]);
    } catch (err) {
      console.error("Error creating product:", err);
      if (err.response) {
        console.error("Backend response data:", err.response.data);
        setError(err.response.data.message || 'Бүтээгдэхүүн нэмэхэд алдаа гарлаа');
      } else {
        setError(err.message || 'Алдаа гарлаа');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content">
      <h2>Бүтээгдэхүүн нэмэх</h2>
      <form onSubmit={onSubmit} style={{ maxWidth: 600 }} noValidate>
        <div style={{ marginBottom: 12 }}>
          <label>Нэр:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Тайлбар:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Категори:</label><br />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Үнэ (₮):</label><br />
          <input
            type="number"
            min="1"
            step="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Зураг сонгох (олон зураг сонгож болно):</label><br />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onImagesChange}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          {previewUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`preview-${i}`}
              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, boxShadow: '0 0 5px rgba(0,0,0,0.2)' }}
            />
          ))}
        </div>

        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? '#999' : '#2196F3',
            color: 'white',
            padding: '10px 18px',
            borderRadius: 6,
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          {loading ? 'Нэмэж байна...' : 'Бүтээгдэхүүн нэмэх'}
        </button>
      </form>
    </div>
  );
};

export default AdAddProduct;