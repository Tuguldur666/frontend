import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Tabs, Tab, Typography } from "@mui/material";
import axiosInstance from "../../axiosInstance";
import "../../Teacher/css/Teacher.css";

const AdSettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(true);

useEffect(() => {
  const fetchUser = async () => {
    setFetchLoading(true);
    try {
      const res = await axiosInstance.get("/user/getUser");
      const { firstName, lastName, email, phoneNumber } = res.data.user;
      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phone: phoneNumber || "",
        newPassword: "",
        confirmPassword: "",
      });
      setError("");
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError("Хэрэглэгчийн мэдээлэл авах үед алдаа гарлаа.");
    } finally {
      setFetchLoading(false);
    }
  };

  fetchUser();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    setError("");
    setSuccessMsg("");
  };

  const handleSave = async () => {
    setError("");
    setSuccessMsg("");

    if (
      formData.newPassword !== "" &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setError("Нууц үгнүүд тохирохгүй байна.");
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      await axiosInstance.put("/user/update", updateData);
      setSuccessMsg("Мэдээлэл амжилттай хадгалагдлаа.");

      setFormData((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      console.error("Update failed:", err);
      setError(
        err.response?.data?.message || "Мэдээлэл хадгалах үед алдаа гарлаа."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-sidebar-custom">
        <h2 className="sidebar-title">Тохиргоо</h2>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { backgroundColor: "#272654" } }}
          textColor="inherit"
          className="custom-tabs"
        >
          <Tab label="Хэрэглэгчийн мэдээлэл" />
          <Tab label="Хувийн тохиргоо" />
        </Tabs>
      </div>

      <div className="settings-content-card">
        {activeTab === 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Хэрэглэгчийн мэдээлэл
            </Typography>
            <TextField
              label="Имэйл"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Утас"
              name="phone"
              value={formData.phone}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Шинэ нууц үг"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Шинэ нууц үг давтах"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </>
        )}

        {activeTab === 1 && (
          <>
            <Typography variant="h6" gutterBottom>
              Хувийн тохиргоо
            </Typography>
            <TextField
              label="Нэр"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Овог"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        {successMsg && (
          <Typography color="success.main" sx={{ mt: 1 }}>
            {successMsg}
          </Typography>
        )}

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="contained" onClick={handleSave} disabled={loading}>
            {loading ? "Хадгалаж байна..." : "Хадгалах"}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default AdSettings;
