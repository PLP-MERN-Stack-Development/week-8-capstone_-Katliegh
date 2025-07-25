import React, { useState } from "react";
import axios from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", form);
      alert("Registered! You can login.");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
