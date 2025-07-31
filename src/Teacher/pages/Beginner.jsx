import React, { useState, useRef, useEffect } from "react";
import "../css/Teacher.css";

const Beginner = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [videos, setVideos] = useState({});
  const [courseInput, setCourseInput] = useState("");
  const videoSectionRef = useRef(null);

  // Load from localStorage on initial load
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("beginnerCourses")) || [];
    const savedVideos = JSON.parse(localStorage.getItem("beginnerVideos")) || {};
    setCourses(savedCourses);
    setVideos(savedVideos);
  }, []);

  // Save to localStorage when courses or videos change
  useEffect(() => {
    localStorage.setItem("beginnerCourses", JSON.stringify(courses));
    localStorage.setItem("beginnerVideos", JSON.stringify(videos));
  }, [courses, videos]);

  const handleAddCourse = () => {
    const newCourse = courseInput.trim();
    if (newCourse && !courses.includes(newCourse)) {
      setCourses([...courses, newCourse]);
      setSelectedCourse(newCourse);
      setCourseInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddCourse();
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!selectedCourse) return alert("Курс сонгоно уу.");
    if (file && file.type.startsWith("video/")) {
      const videoURL = URL.createObjectURL(file);

      setVideos((prev) => {
        const updated = { ...prev };
        if (!updated[selectedCourse]) updated[selectedCourse] = [];

        const exists = updated[selectedCourse].some((v) => v.name === file.name);
        if (!exists) {
          updated[selectedCourse].push({ name: file.name, url: videoURL });
        }

        return updated;
      });

      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="teach-panel-page">
      <h2>Анхан шат</h2>

      <div className="course-control">
        <input
          type="text"
          placeholder="Шинэ курс нэр..."
          value={courseInput}
          onChange={(e) => setCourseInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="course-input"
        />
        <button className="course-button" onClick={handleAddCourse}>
          ➕ Курс нэмэх
        </button>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="course-select"
        >
          <option value="">-- Курс сонгох --</option>
          {courses.map((course, idx) => (
            <option key={idx} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <label className="upload-label">
          🎥 Видео нэмэх
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            hidden
          />
        </label>
      )}

      {selectedCourse && videos[selectedCourse]?.length > 0 && (
        <div className="video-preview-section" ref={videoSectionRef}>
          <h3>{selectedCourse} курсийн бичлэгүүд</h3>
          {videos[selectedCourse].map((vid, index) => (
            <div key={index} className="video-card">
              <p>{vid.name}</p>
              <video width="320" controls>
                <source src={vid.url} type="video/mp4" />
                Видео дэмжихгүй байна.
              </video>
            </div>
          ))}
        </div>
      )}

      {courses.length > 0 && (
        <div className="courses-card-section">
          <h3>Үүсгэсэн курсүүд</h3>
          <div className="courses-cards-container">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className={`course-card ${
                  course === selectedCourse ? "selected-course" : ""
                }`}
                onClick={() => setSelectedCourse(course)}
                style={{ cursor: "pointer" }}
              >
                <h4>{course}</h4>
                <p>Видео: {videos[course]?.length || 0}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Beginner;
