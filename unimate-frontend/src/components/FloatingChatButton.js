import { useState, useEffect, useContext } from 'react';
import { FaComment, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { AuthContext } from '../api/AuthContext';
import io from 'socket.io-client';
import '../App.css';

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user, token } = useContext(AuthContext);

  // Initialize socket connection
  useEffect(() => {
    if (!token) return;

    const newSocket = io('http://localhost:5000', {
      auth: { token }
    });

    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on('message', (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const handleSendMessage = () => {
    if (message.trim() && socket && user) {
      const messageData = {
        text: message,
        sender: {
          id: user._id,
          name: user.name
        },
        timestamp: new Date()
      };

      // Emit message to server
      socket.emit('sendMessage', messageData);

      // Add to local state immediately
      setMessages(prev => [...prev, {
        ...messageData,
        isCurrentUser: true
      }]);

      setMessage('');
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
                {!msg.isCurrentUser && (
                  <span className="sender-name">{msg.sender.name}: </span>
                )}
                <span className="message-text">{msg.text}</span>
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
              placeholder="Type your message..." 
              className="chat-input"
            />
            <button 
              onClick={handleSendMessage}
              className="chat-send-button"
              disabled={!message.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="floating-chat-button"
          disabled={!user} // Disable if not logged in
          title={!user ? "Please login to chat" : "Open chat"}
        >
          <FaComment size={24} />
        </button>
      )}
    </div>
  );
};

export default FloatingChatButton;