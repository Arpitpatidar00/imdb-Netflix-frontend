import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFormData, submitLogin, setError, loginSuccess } from '../../action/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file for styling
import Cookies from 'js-cookie'; // Import js-cookie
import axios from 'axios'; // Import axios
import './Auth.css';
import Api from "../../Api.js";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formData = {}, loading, error, userData } = useSelector((state) => state.auth);

  // Function to handle session-based login, memoized with useCallback
  const loginWithSession = useCallback(async (sessionId) => {
    try {
      const response = await axios.get(`${Api}/api/auth/protected-route`, {
        params: { sessionId }, // Pass sessionId as a query parameter
        withCredentials: true, // Ensure cookies are included with the request
      });

      dispatch(loginSuccess(response.data));

      Cookies.set('accessToken', response.data.token, { path: '/', secure: true, sameSite: 'Strict' });
      Cookies.set('sessionId', sessionId, { path: '/', secure: true, sameSite: 'Strict' });

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Session login failed';
      dispatch(setError(errorMessage));
    }
  }, [dispatch]); // Add dispatch to the dependency array of useCallback

  // Check for session ID in cookies and log in if present
  useEffect(() => {
    const sessionId = Cookies.get('sessionId');
    if (sessionId) {
      loginWithSession(sessionId);
    }
  }, [loginWithSession]); // Updated dependency array

  // Effect for navigating if userData is present
  useEffect(() => {
    if (userData) {
      // Navigate to the VerifyAccount page with the email state
      navigate('/VerifyAccount', { state: { email: formData.email } });
    }
  }, [navigate, userData, formData.email]);

  // Effect for showing error messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError('')); // Clear the error after showing the toast
    }
  }, [error, dispatch]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData(name, value));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(setError('Please fill all required fields'));
    } else {
      dispatch(submitLogin(formData));
    }
  };

  return (
    <div className="container-page">
      <div className="container-Auth">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6 Auth">
          {/* Form Fields */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-2.5 text-black-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password || ''}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-2.5 text-black-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-7"
              />
            </div>
          </div>

          <div className='button'>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 ">
              Don’t have an account?{' '}
              <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
