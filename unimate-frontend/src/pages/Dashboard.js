// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Create this file for styling

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>What would you like to do today?</h1>
      <div className="activity-grid">
        <Link to="/textbooks" className="activity-card">
          <h2>📚 Textbooks</h2>
          <p>Browse or exchange textbooks</p>
        </Link>
        
        <Link to="/tutoring" className="activity-card">
          <h2>🎓 Tutoring</h2>
          <p>Find or offer tutoring sessions</p>
        </Link>
        
        <Link to="/new-tutoring" className="activity-card">
          <h2>➕ Post Tutoring</h2>
          <p>Offer your tutoring services</p>
        </Link>
        
        <Link to="/upload" className="activity-card">
          <h2>📤 Upload Resource</h2>
          <p>Share study materials</p>
        </Link>
      </div>
    </div>
  );
}