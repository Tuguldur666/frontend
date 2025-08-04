import React, { useState, useEffect, useRef, useContext } from "react";
import axiosInstance from "../../axiosInstance"; // your axiosInstance
import { UserContext } from "../../UserContext";
import "../css/Teacher.css";

const Beginner = () => {
  const { accessToken } = useContext(UserContext);

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseInput, setCourseInput] = useState("");
  const [videos, setVideos] = useState({}); // { courseTitle: [lessons] }
  const videoSectionRef = useRef(null);

  // Load courses and videos from backend on mount
  useEffect(() => {
    if (!accessToken) return;

    axiosInstance
      .post(
        "/teacher/getOwnCourses",
        {}, // no body needed here
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        if (res.data?.courses) {
          setCourses(res.data.courses);
          const videosMap = {};
          res.data.courses.forEach((course) => {
            videosMap[course.title] = course.lessons || [];
          });
          setVideos(videosMap);
          if (res.data.courses.length > 0) setSelectedCourse(res.data.courses[0].title);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch courses", err);
      });
  }, [accessToken]);

  const handleAddCourse = () => {
    const newCourseTitle = courseInput.trim();
    if (!newCourseTitle) return alert("Курсын нэр оруулна уу.");
    if (!accessToken) return alert("Нэвтрэх шаардлагатай.");

    axiosInstance
      .post(
        "/teacher/createCourse",
        {
          title: newCourseTitle,
          description: "Тайлбар оруулна уу",
          level: "beginner",
          category: "music",
          price: 0,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        if (res.data.course) {
          setCourses((prev) => [res.data.course, ...prev]);
          setVideos((prev) => ({ ...prev, [res.data.course.title]: [] }));
          setSelectedCourse(res.data.course.title);
          setCourseInput("");
        }
      })
      .catch((err) => {
        console.error("Create course failed", err);
        alert("Курс үүсгэхэд алдаа гарлаа.");
      });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!selectedCourse) return alert("Курс сонгоно уу.");

    const maxSizeMB = 50;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Видео файлын хэмжээ ${maxSizeMB}MB-с их байж болохгүй.`);
      return;
    }
    if (!file.type.startsWith("video/")) {
      alert("Зөвхөн видео файлыг оруулна уу.");
      return;
    }

    const courseObj = courses.find((c) => c.title === selectedCourse);
    if (!courseObj) return alert("Сонгогдсон курс олдсонгүй.");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("courseId", courseObj._id);
    formData.append("duration", 0); 

    axiosInstance
      .post("/teacher/uploadLesson", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.lesson) {
          setVideos((prev) => {
            const updated = { ...prev };
            if (!updated[selectedCourse]) updated[selectedCourse] = [];
            updated[selectedCourse].push(res.data.lesson);
            return updated;
          });

          setTimeout(() => {
            videoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      })
      .catch((err) => {
        console.error("Видео оруулахад алдаа гарлаа", err);
        alert("Видео оруулахад алдаа гарлаа.");
      });
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
          onKeyDown={(e) => e.key === "Enter" && handleAddCourse()}
          className="course-input"
        />
        <button className="course-button" onClick={handleAddCourse}>
          ➕ Курс нэмэх
        </button>

        <select
          value={selectedCourse || ""}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="course-select"
        >
          <option value="">-- Курс сонгох --</option>
          {courses.map((course) => (
            <option key={course._id} value={course.title}>
              {course.title}
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

      <div className="courses-card-section">
        <h3>Үүсгэсэн курсүүд</h3>
        <div className="courses-cards-container">
          {courses.map((course) => (
            <div
              key={course._id}
              className={`course-card ${
                course.title === selectedCourse ? "selected-course" : ""
              }`}
              onClick={() => setSelectedCourse(course.title)}
              style={{ cursor: "pointer" }}
            >
              <h4>{course.title}</h4>
              <p>Видео: {videos[course.title]?.length || 0}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedCourse && videos[selectedCourse]?.length > 0 && (
        <div className="video-preview-section" ref={videoSectionRef}>
          <h3>{selectedCourse} курсийн бичлэгүүд</h3>
          {videos[selectedCourse].map((vid, index) => (
            <div key={index} className="video-card">
              <p>{vid.name || vid.filename}</p>
              <video width="320" controls>
                <source src={vid.url || vid.filePath} type="video/mp4" />
                Видео дэмжихгүй байна.
              </video>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Beginner;
