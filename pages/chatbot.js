import React, { useState } from 'react';
import axios from 'axios';
import styles from "@/styles/Home.module.css"; 
 
function chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
 
  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);
 
      try {
        const response = await axios.post('http://localhost:5000/chat', { message: input });
        const botMessage = { sender: 'bot', text: response.data.response };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Erreur:', error);
      }
 
      setInput('');
    }
  };
 
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
 
  return (
    <div className="root-container">
      <div className="chatbot">
        <div className="chatbox">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <input
          className="chat-input"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
 
export default chatbot;