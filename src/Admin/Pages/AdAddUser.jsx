import React, { useState } from "react";
import "../../css/Login.css";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function AdAddUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddUser = async () => {
    setError("");
    setSuccess("");

    if (password.trim() !== repeatPassword.trim()) {
      setError("Нууц үг таарахгүй байна");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      // console.log("Sending token:", token);

      const res = await axiosInstance.post(
        "/admin/create",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phoneNumber: phoneNumber.trim(),
          password: password.trim(),
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Хэрэглэгч амжилттай нэмэгдlee!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setRepeatPassword("");
      setRole("teacher");
    } catch (err) {
      console.error("Full error response:", err.response);
      setError(err.response?.data?.message || "Хэрэглэгч нэмэхэд алдаа гарлаа");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddUser();
  };

  return (
    <div className="login-container admin-login-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <div className="login-box">
        <h2>Шинэ хэрэглэгч нэмэх</h2>
        <p className="subtitle">Хэрэглэгчийн мэдээлэл оруулна уу</p>

        <input
          type="text"
          placeholder="Овог"
          className="input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Нэр"
          className="input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="И-мэйл"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Утасны дугаар"
          className="input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Нууц үг"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Нууц үг давтах"
          className="input"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />

        <select
          className="input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={isLoading}
        >
          <option value="teacher">teacher</option>
          <option value="store">store</option>
        </select>

        {error && <div className="error-text">{error}</div>}
        {success && <div className="success-text">{success}</div>}

        <button
          className="login-btn"
          onClick={handleAddUser}
          disabled={
            isLoading ||
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !phoneNumber.trim() ||
            !password.trim()
          }
        >
          {isLoading ? "Нэмэгдэж байна..." : "Нэмэх"}
        </button>
      </div>
    </div>
  );
}

export default AdAddUser;
