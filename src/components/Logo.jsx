import React, { useState, useContext } from 'react';
import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axiosInstance from '../axiosInstance';
import { UserContext } from '../UserContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const res = await axiosInstance.post('/user/login', {
        phoneNumber: phoneNumber.trim(),
        password: password.trim(),
      });

      const { accessToken, refreshToken, user } = res.data;

      if (!accessToken || !refreshToken || !user) {
        setError('Нэвтрэхэд алдаа гарлаа');
        setIsLoading(false);
        return;
      }

      login(user, accessToken, refreshToken);

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      navigate('/student-portal');
    } catch (err) {
      setError(err.response?.data?.message || 'Нэвтрэхэд алдаа гарлаа');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <button
      className="logoo"
      onClick={() => navigate('/')}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        textDecoration: 'none',
        color: 'inherit',
      }}
      aria-label="Go to Home"
    >
      e-Drum
    </button>
  );
}

export default Login;
