import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaSpinner } from 'react-icons/fa';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(text.includes('<!DOCTYPE html>') 
          ? 'Server error occurred' 
          : text || 'Invalid server response');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset link');
      }

      setMessage({ 
        text: data.message || 'Password reset link has been sent to your email.', 
        type: 'success' 
      });
      
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage({ 
        text: error.message.startsWith('<!DOCTYPE html>')
          ? 'Server error occurred. Please try again later.'
          : error.message || 'Network error. Please try again later.', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a reset link</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <FaSpinner className="spin" /> Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </form>

        <div className="auth-footer">
          <Link to="/login" className="auth-link">
            Remember your password? Login here
          </Link>
          <Link to="/register" className="auth-link">
            Need an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;