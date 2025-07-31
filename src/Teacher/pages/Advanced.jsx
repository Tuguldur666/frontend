import React, { useState } from "react";
import "../css/Teacher.css"
const Advanced = () => {
  const [videos, setVideos] = useState([]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const videoURL = URL.createObjectURL(file);
      setVideos((prev) => [...prev, { name: file.name, url: videoURL }]);
    }
  };

  return (
    <div className="teach-panel-page">
      <h2> Ahisan shat</h2>

      <label className="upload-label">
  🎥 Видео нэмэх
  <input
    type="file"
    accept="video/*"
    onChange={handleVideoUpload}
    hidden
  />
</label>
      <div className="video-preview-section">
        {videos.map((vid, index) => (
          <div key={index} className="video-card">
            <p>{vid.name}</p>
            <video width="320" controls>
              <source src={vid.url} type="video/mp4" />
               видео дэмжихгүй байна.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advanced;
