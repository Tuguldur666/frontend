import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { UserContext } from '../UserContext';
import '../css/OTPVerification.css';

function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch phoneNumber from location state
  const phoneNumber = location.state?.phoneNumber;

  // Validate that phoneNumber is passed properly
  if (!phoneNumber) {
    return <div>Error: Phone number not found.</div>;
  }

  const [otp, setOtp] = useState(''); // Correct state for OTP input
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to manage button and spinner
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    // Validate OTP input (simple check for 6 digits)
    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must be a 6-digit number.');
      setLoading(false);
      return;
    }

    try {
      // Send OTP verification request
      const response = await axiosInstance.post('/user/verify-signup-otp', {
        phoneNumber,   // Ensure the phone number is sent
        otp,           // OTP sent by the user
        action: 'verify',  // Action for verification
      });

      console.log('✅ OTP Verification Successful:', response.data);

      // Handle the response (e.g., navigate or show success)
      navigate('/login');
    } catch (err) {
      console.error('❌ OTP Verification Failed:', err);
      setError('OTP Verification failed. Please check the code and try again.');
    } finally {
      setLoading(false); // Reset loading state after the request
    }
  };

  return (
    <div className="otp-container">
      <form className="otp-box" onSubmit={handleSubmit}>
        <h2>OTP баталгаажуулалт</h2>
        <p className="subtitle">Таны дугаар: {phoneNumber}</p>

        <input
          type="text"
          className="input otp-input"
          placeholder="OTP код оруулна уу"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          maxLength={6}
          inputMode="numeric"
          pattern="\d*"
        />

        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="verify-btn" disabled={loading}>
          {loading ? 'Баталгаажуулж байна...' : 'Баталгаажуулах'}
        </button>
      </form>
    </div>
  );
}

export default OTPVerification;
