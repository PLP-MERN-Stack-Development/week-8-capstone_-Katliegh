import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation
} from "react-router-dom";
import { FaComment, FaTimes, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import "./App.css";
import AuthContext from "./api/AuthContext";

// Import your pages
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TutoringList from "./pages/TutoringList";
import NewTutoring from "./pages/NewTutoring";
import Textbooks from "./pages/Textbooks";
import UploadResource from "./pages/UploadResource";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Dashboard from "./pages/Dashboard";  // Added Dashboard import
import ProtectedRoute from "./components/ProtectedRoute";

import logo from "./logo.jpg";

// Chat Component
const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  const handleSendMessage = () => {
    if (message.trim() && user) {
      const newMsg = {
        text: message,
        sender: user.name,
        isCurrentUser: true,
        timestamp: new Date()
      };
      
      setMessages([...messages, newMsg]);
      setMessage("");
    }
  };

  return (
    <div className="floating-chat-container">
      {isOpen ? (
        <div className="chat-box">
          <div className="chat-header">
            <h3>UniMate Chat</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="chat-close-button"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.isCurrentUser ? 'sent' : 'received'}`}
              >
                {!msg.isCurrentUser && <span className="sender-name">{msg.sender}: </span>}
                {msg.text}
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="chat-input"
              placeholder="Type your message..."
              disabled={!user}
            />
            <button 
              onClick={handleSendMessage}
              className="chat-send-button"
              disabled={!message.trim() || !user}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="floating-chat-button"
          disabled={!user}
          aria-label="Open chat"
          title={user ? "Open chat" : "Please login to chat"}
        >
          <FaComment size={24} />
          {!user && <span className="notification-dot"></span>}
        </button>
      )}
    </div>
  );
};

// Wrapper component to conditionally render chat based on route
const ChatWrapper = () => {
  const location = useLocation();
  return location.pathname !== "/" ? <FloatingChatButton /> : null;
};

// Navbar component
function Navbar({ token, user, logout }) {
  const location = useLocation();
  if (location.pathname === "/") return null;

  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="UniMate Logo" className="logo" />
      </Link>
      <Link to="/tutoring">Tutoring</Link>
      <Link to="/textbooks">Textbooks</Link>

      {token ? (
        <>
          <Link to="/new-tutoring">Post Tutoring</Link>
          <Link to="/upload">Upload Resource</Link>
          <Link to="/dashboard">Dashboard</Link> {/* Added Dashboard link */}
          <div className="user-profile">
            <FaUserCircle className="user-icon" />
            <span className="user-greeting">
              Welcome back, <span className="username">{user?.name}</span>
            </span>
            <button
              onClick={logout}
              className="logout-button"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <Router>
        <Navbar token={token} user={user} logout={logout} />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/tutoring" element={<TutoringList />} />
            <Route path="/textbooks" element={<Textbooks />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/new-tutoring"
              element={
                <ProtectedRoute>
                  <NewTutoring />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadResource />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <ChatWrapper />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;