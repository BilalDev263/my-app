import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import styles from '@/styles/Home.module.css'; 
import Button from './button';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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

  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleClick = () => {
    toggleChatbot();
  };

  return (
    <>
      <Head>
        <title>Project X</title>
        <meta name="description" content="Page d'accueil pour Project X" />
      </Head>
      <main className={`${styles.main} ${isChatbotOpen ? styles.blur : ''}`}>
        <div className={styles.description}>
          <p>Bienvenue sur Project X : commencez votre aventure dès maintenant.</p>
        </div>
        <div className={styles.center}>
          <h1 className={styles.italic}>Project X</h1>
        </div>
        {isChatbotOpen && (
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
              <button className="send-button" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        )}
        <div className={styles.center}>
          <Button onClick={handleClick}>
            {isChatbotOpen ? 'Fermer le chatbot' : 'Commencer le chat'}
          </Button>
        </div>
      </main>
    </>
  );
}
