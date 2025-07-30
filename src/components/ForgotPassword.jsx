import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import '../css/Login.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Step 1: send OTP, Step 2: verify OTP, Step 3: reset password
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/login');
  };

  const requestReset = async () => {
    if (!phoneNumber.trim()) return alert('Enter your phone number.');
    setLoading(true);
    try {
      await axios.post('http://192.168.1.168:3000/user/request-reset', {
        phoneNumber: phoneNumber.trim(),
      });
      setStep(2);
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) return alert('Enter the OTP.');
    setLoading(true);
    try {
      const res = await axios.post('http://192.168.1.168:3000/user/verify-reset-otp', {
        phoneNumber: phoneNumber.trim(),
        otp: otp.trim(),
        action: 'verify', // ✅ Required by backend
      });
      setAccessToken(res.data.accessToken); // ✅ Save token returned by backend
      setStep(3);
    } catch (err) {
      alert(err?.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!newPassword.trim()) return alert('Enter a new password.');
    setLoading(true);
    try {
      await axios.post('http://192.168.1.168:3000/user/reset-password', {
        resetToken: accessToken, // ✅ Use accessToken as resetToken
        newPassword: newPassword.trim(),
      });
      alert('Password reset successful!');
      navigate('/login');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundColor: '#f8f9fa' }}>
      <button className="back-button" onClick={handleBack}>
        <ArrowLeft size={24} />
      </button>

      <div className="login-box">
        {step === 1 && (
          <>
            <h2>Forgot Password</h2>
            <p className="subtitle">Enter your phone number to receive OTP.</p>
            <input
              type="tel"
              className="input"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button className="login-btn" onClick={requestReset} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Verify OTP</h2>
            <p className="subtitle">Enter the OTP sent to {phoneNumber}.</p>
            <input
              type="text"
              className="input"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="login-btn" onClick={verifyOtp} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
            <div className="register-text">
              Didn't get code?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  requestReset();
                }}
              >
                Resend
              </a>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Reset Password</h2>
            <p className="subtitle">Enter a new password for your account.</p>
            <input
              type="password"
              className="input"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="login-btn" onClick={resetPassword} disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
