// src/components/Chatbot/Chatbot.jsx

import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

// This function contains the bot's "brain". It decides what to reply.
const generateBotResponse = (userInput) => {
  const input = userInput.toLowerCase();

  if (input.includes('hello') || input.includes('hi')) {
    return "Hello there! What can I help you with? You can ask about 'services', 'projects', or 'contact'.";
  }
  if (input.includes('help')) {
    return "Sure, I can help. Ask me about the services offered, past projects, or how to get in contact.";
  }
  if (input.includes('project') || input.includes('work')) {
    return "You can see a full gallery of projects in the 'My Works' section of the portfolio!";
  }
  if (input.includes('service') || input.includes('skill')) {
    return "This portfolio showcases skills in digital art, illustration, and web design. For hiring inquiries, please use the contact form.";
  }
  if (input.includes('contact') || input.includes('email')) {
    return "The best way to get in touch is through the contact form at the bottom of the page or by clicking the 'Hire' button.";
  }
  
  return "I'm not sure how to answer that. Please try asking about 'services', 'projects', or 'contact'.";
};


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm a bot. How can I assist you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // This effect automatically scrolls to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user's message to the chat
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Get and add the bot's response after a short delay
    setTimeout(() => {
      const botResponse = { text: generateBotResponse(inputValue), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  return (
    <>
      {/* The floating chat button */}
      <button className="chatbot-button" onClick={toggleChat}>
        <span className="chatbot-icon">{isOpen ? '✖' : '💬'}</span>
      </button>

      {/* The chat window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <h3>Chat Assistant</h3>
        </div>
        <div className="messages-list">
          {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask a question..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;