import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import "../Css/Teacher.css";

const TeachSettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "Амгалан",
    lastName: "Баатар",
    email: "teacher@example.com",
    phone: "99112233",
    bio: "Би хөгжмийн боловсролын чиглэлээр 5 жил ажилласан туршлагатай багш.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const handleSave = () => {
    alert("Хадгалагдлаа");
    console.log(formData);
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
          <Tab label="Нэвтрэх мэдээлэл" />
          <Tab label="Хувийн тохиргоо" />
        </Tabs>
      </div>

      <div className="settings-content-card">
        {activeTab === 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Нэвтрэх мэдээлэл
            </Typography>
            <TextField
              label="Имэйл хаяг"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Шинэ нууц үг"
              type="password"
              name="newPassword"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Шинэ нууц үг давтах"
              type="password"
              name="confirmPassword"
              fullWidth
              margin="normal"
            />
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="contained" onClick={handleSave}>
                Хадгалах{" "}
              </Button>
            </Box>
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
            <TextField
              label="Танилцуулга (Био)"
              name="bio"
              multiline
              minRows={4}
              value={formData.bio}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="contained" onClick={handleSave}>
                Хадгалах
              </Button>
            </Box>
          </>
        )}
      </div>
    </div>
  );
};

export default TeachSettings;
