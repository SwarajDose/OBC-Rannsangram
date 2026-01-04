import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { authAPI } = await import('../../services/api');
      const response = await authAPI.login(username, password);

      if (response.success) {
        // Store authentication token
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminLoginTime', new Date().toISOString());
        navigate('/admin');
      }
    } catch (error) {
      setError(error.message || 'Invalid username or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img src={logo} alt="OBC Rann Sangram Logo" className="login-logo" />
            <h1 className="login-title">Admin Login</h1>
            <p className="login-subtitle">Enter your credentials to access the admin panel</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                <FaUser className="input-icon" />
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <FaLock className="input-icon" />
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <FaSignInAlt className="button-icon" />
                  Login
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

