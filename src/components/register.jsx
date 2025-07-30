import React, { useState } from 'react';
import '../css/Register.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { FaArrowLeft } from 'react-icons/fa';

// Regular expression to validate phone number format
const validatePhoneNumber = (phoneNumber) =>
  /^(\+?\d{1,4}[\s-]?)?(\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,4})$/.test(phoneNumber);
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({
    email: '',
    phoneNumber: '',
    password: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFormError({ email: '', phoneNumber: '', password: '' });

    // Validate email and phone number formats
    if (!validateEmail(email)) {
      setFormError((prev) => ({ ...prev, email: 'Invalid email format.' }));
      setLoading(false);
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setFormError((prev) => ({
        ...prev,
        phoneNumber: 'Invalid phone number format. Please ensure it is correct (e.g., +1234567890).',
      }));
      setLoading(false);
      return;
    }

    try {
      // Sending registration data to the backend
      const res = await axiosInstance.post('/user/register', {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });

      // Success message
      console.log('✅ Registration successful:', res.data);

      // Navigate to OTP verification page
      navigate('/otp-verification', { state: { phoneNumber } });
    } catch (err) {
      // Handling registration error
      console.error('❌ Registration error:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Registration failed. Please check the information or try again later.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <form className="register-box" onSubmit={handleRegister}>
        <h2>Бүртгүүлэх</h2>
        <p className="subtitle">Шинэ бүртгэл үүсгэн хөгжмийн аялалаа эхлүүлээрэй</p>

        <div className="name-inputs">
          <input
            type="text"
            placeholder="Нэр"
            className="input name-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Овог"
            className="input name-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="И-мэйл"
            className={`input ${formError.email ? 'error' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {formError.email && <span className="error-text">{formError.email}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Утасны дугаар"
            className={`input ${formError.phoneNumber ? 'error' : ''}`}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {formError.phoneNumber && <span className="error-text">{formError.phoneNumber}</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Нууц үг"
            className={`input ${formError.password ? 'error' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {formError.password && <span className="error-text">{formError.password}</span>}
        </div>

        {/* Displaying error message if any */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          className="register-btn"
          type="submit"
          disabled={loading || !email || !phoneNumber || !password}
        >
          {loading ? 'Түр хүлээнэ үү...' : 'Бүртгүүлэх'}
        </button>
      </form>
    </div>
  );
}

export default Register;
