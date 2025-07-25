import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import { FaEnvelope } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Landing() {
  const testimonials = [
    {
      name: "Thabo M.",
      quote: "UniMate helped me find a great tutor in just a few minutes!",
      img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Lebo K.",
      quote: "I sold my old textbooks fast and easily. Highly recommended!",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Asanda P.",
      quote: "The study resources are amazing. I passed because of UniMate!",
      img: "https://randomuser.me/api/portraits/women/68.jpg"
    },
  ];

  const featuredTutors = [
    { name: "Sipho D.", subject: "Math & Physics", rating: "⭐ 4.8", img: "https://randomuser.me/api/portraits/men/10.jpg" },
    { name: "Naledi B.", subject: "English Literature", rating: "⭐ 5.0", img: "https://randomuser.me/api/portraits/women/15.jpg" },
    { name: "Kabelo T.", subject: "Computer Science", rating: "⭐ 4.9", img: "https://randomuser.me/api/portraits/men/25.jpg" },
  ];

  const featuredResources = [
    { title: "Intro to Economics Notes", type: "PDF", icon: "📘" },
    { title: "Calculus Past Papers", type: "ZIP", icon: "📦" },
    { title: "APA Referencing Guide", type: "DOCX", icon: "📄" },
  ];

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <h1>Welcome to UniMate 🎓</h1>
        <p>Your all-in-one student platform for tutoring, textbooks, and resources.</p>
        <div className="landing-buttons">
          <Link to="/register" className="landing-btn primary">Get Started</Link>
          <Link to="/login" className="landing-btn">Login</Link>
        </div>
      </div>

      <div className="landing-section">
        <h2>💬 What Students Say</h2>
        <div className="cards testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="card student-card">
              <img src={t.img} alt={t.name} className="profile-pic" />
              <p>"{t.quote}"</p>
              <strong>- {t.name}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="landing-section">
        <h2>🌟 Featured Tutors</h2>
        <div className="cards">
          {featuredTutors.map((t, i) => (
            <div key={i} className="card tutor-card">
              <img src={t.img} alt={t.name} className="profile-pic" />
              <h4>{t.name}</h4>
              <p>{t.subject}</p>
              <p>{t.rating}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="landing-section">
        <h2>📚 Popular Study Resources</h2>
        <div className="cards">
          {featuredResources.map((r, i) => (
            <div key={i} className="card resource-card">
              <div className="resource-icon">{r.icon}</div>
              <h4>{r.title}</h4>
              <p>Format: {r.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>📞 +27 62 089 2347</p>
      <p className="contact-email">
  <FaEnvelope className="contact-icon" />
  <a href="mailto:UniMate@gmail.com">UniMate@gmail.com</a>
</p>



        <h3>Follow Us</h3>
           <div className="social-icons">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FaFacebookF />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <FaTwitter />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <FaInstagram />
  </a>
</div>


        <footer>
          <p>© 2025 UniMate. All rights reserved.</p>
          <p>Developed by Katlego Lesetedi.</p>
        </footer>
      </div>
    </div>
  );
}




