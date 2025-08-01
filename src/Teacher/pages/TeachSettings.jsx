import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";
import {
  Box,
  Button,
  TextField,
  Tabs,
  Tab,
  Typography,
  Alert,
} from "@mui/material";
import axiosInstance from "../../axiosInstance";
import "../Css/Teacher.css";

const TeachSettings = () => {
  const { accessToken } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const res = await axiosInstance.get("/user/getUser", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const {
          firstName,
          lastName,
          email,
          bio = "",
          phoneNumber = "",
        } = res.data.user;

        setFormData((prev) => ({
          ...prev,
          firstName,
          lastName,
          email,
          bio,
          phoneNumber,
        }));
      } catch (err) {
        console.error("Error fetching teacher info:", err);
      }
    };

    fetchTeacherInfo();
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    setSuccessMsg("");
  };

  const handleSave = async () => {
    setSuccessMsg("");

    if (activeTab === 0) {
      const { currentPassword, newPassword, confirmPassword } = formData;

      if (!currentPassword || !newPassword || !confirmPassword) {
        return;
      }

      if (newPassword !== confirmPassword) {
        return;
      }

      try {
        const res = await axiosInstance.post(
          "/teacher/changeTeacherPassword",
          { currentPassword, newPassword },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (res.data.success) {
          setSuccessMsg("Нууц үг амжилттай шинэчлэгдлээ.");
          setFormData((prev) => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }));
        }
      } catch (err) {
        console.error("Password change failed:", err);
      }
    } else {
      try {
        const { firstName, lastName, bio, phoneNumber } = formData;
        const res = await axiosInstance.put(
          "/teacher/updateTeacherInfo",
          { firstName, lastName, bio, phoneNumber },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (res.data.success) {
          setSuccessMsg("Хувийн мэдээлэл амжилттай шинэчлэгдлээ.");
        }
      } catch (err) {
        console.error("Failed to update teacher info:", err);
      }
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
              label="Имэйл"
              value={formData.email}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Нууц үг (хуучин)"
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="contained" onClick={handleSave}>
                Хадгалах
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
              label="Утасны дугаар"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled
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

        {successMsg && (
          <Box mt={3}>
            <Alert severity="success">{successMsg}</Alert>
          </Box>
        )}
      </div>
    </div>
  );
};

export default TeachSettings;
