import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../api/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.post("/auth/login", form);
      login(res.data.user, res.data.token);
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login to Your Account</h2>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoComplete="username"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
        </div>

        <div className="form-options">
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
        </div>

        <button 
          type="submit" 
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className="ms-2">Logging in...</span>
            </>
          ) : "Login"}
        </button>
      </form>

      <div className="auth-footer">
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
}