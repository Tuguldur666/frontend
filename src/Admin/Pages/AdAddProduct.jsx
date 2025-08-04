import React, { useState, useEffect } from 'react';

const CLOUD_NAME = 'dvlxevlor'; 
const UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET'; 

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
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Image upload failed');
    }

    const data = await res.json();
    return data.secure_url;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !category || !price || images.length === 0) {
      setError('Бүх талбарыг бөглөнө үү, зураг оруулна уу');
      return;
    }

    setLoading(true);

    try {
      const uploadedUrls = await Promise.all(images.map(uploadToCloudinary));

      const productData = {
        title,
        description,
        category,
        price: Number(price),
        thumbnail: uploadedUrls[0],
        images: uploadedUrls,
      };

      const res = await fetch('/store/createProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error('Бүтээгдэхүүн нэмэхэд алдаа гарлаа');
      }

      alert('Бүтээгдэхүүн амжилттай нэмэгдлээ!');
      setTitle('');
      setDescription('');
      setCategory('');
      setPrice('');
      setImages([]);
      setPreviewUrls([]);

    } catch (err) {
      setError(err.message || 'Алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content">
      <h2>Бүтээгдэхүүн нэмэх</h2>
      <form onSubmit={onSubmit} style={{ maxWidth: 600 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Нэр:</label><br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Тайлбар:</label><br />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
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
            onChange={e => setCategory(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Үнэ (₮):</label><br />
          <input
            type="number"
            min="0"
            step="100"
            value={price}
            onChange={e => setPrice(e.target.value)}
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
