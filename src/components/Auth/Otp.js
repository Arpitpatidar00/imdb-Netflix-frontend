import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Install js-cookie via npm
import { setUserData } from '../../action/authActions.js';
import { useDispatch } from 'react-redux';
import Api from "../../Api.js"


function VerifyAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize useRef hooks directly
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Utility function to get a cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  // Check for access token in cookies and redirect if present
  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      navigate('/home');
    }
  }, [navigate]);

  const handleChange = (event, index) => {
    const { value } = event.target;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        inputRefs[index + 1].current.focus();
      }

      if (value === "" && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleVerifyClick = async () => {
   
  
    try {
      const response = await fetch(`${Api}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otp.join('') }),
      });
  
      const data = await response.json();
      if (response.ok) {
        Cookies.set('accessToken', data.token); // Store token in cookies
        Cookies.set('sessionId', data.sessionId); // Store session ID in cookies
        localStorage.setItem('userData', JSON.stringify(data)); // Store user data in localStorage
  
        dispatch(setUserData(data)); // Dispatch action to store user data in Redux
  
        navigate('/home');
      } else {
        setMessage(data.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setMessage('Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${Api}/api/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setMessage('Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-page">
      <div className="verify-account-container">
        <h2>Verify Account</h2>
        <p>An OTP has been sent to your entered email</p>
        <p>{email}</p>

        <div className="otp-input-container">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleChange(e, index)}
              maxLength={1}
              ref={inputRefs[index]} // use refs initialized above
              className="otp-input-field"
            />
          ))}
        </div>

        <div className="options">
          <p>{message}</p>
          <p>Didn't receive the code?</p>
          <div className="re-ve-btn">
            <button onClick={handleResendClick} className="resend-button" disabled={isLoading}>
              Resend
            </button>
          </div>

          <button onClick={handleVerifyClick} className="verify-button" disabled={isLoading}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
