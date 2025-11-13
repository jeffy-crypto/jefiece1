// src/components/Content/Content.jsx

import React from 'react';
import './Content.css'; // <-- IMPORT THE NEW CSS

const Content = () => {
  return (
    <section id="home" className="hero-section">
      
      {/* Container for the large, diagonally-placed text */}
      <div className="hero-text-container">
        <div className="text-block top-left">
          <h1>CREATING<br/>WORLDS</h1>
        </div>
        <div className="text-block bottom-right">
          <h1>ONE PIXEL<br/>AT A TIME</h1>
        </div>
      </div>
      
      {/* Container for the welcome message and button */}
      <div className="hero-sub-content">
        <p>Welcome to my portfolio of digital art and illustration.</p>
        <button className="view-work-btn">View My Work</button>
      </div>

    </section>
  );
};

export default Content;