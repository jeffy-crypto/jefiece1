// src/components/FloatingButtons/FloatingButtons.jsx

import React, { useState } from 'react';
import Chatbot from '../Chatbot/Chatbot.jsx';
import ArtUploader from '../ArtUploader/ArtUploader.jsx';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);

  // This function will now handle the click and stop it from bubbling
  const openAnalyzer = (e) => {
    e.stopPropagation(); // <-- THE FIX
    setIsAnalyzerOpen(true);
  };

  const closeAnalyzer = (e) => {
    e.stopPropagation(); // <-- Also add it here for consistency
    setIsAnalyzerOpen(false);
  };

  return (
    <>
      <div className="floating-buttons-container">
        {/* We now call our new function */}
        <button 
          className="fab analyzer-button" 
          onClick={openAnalyzer} // <-- Use the new handler
          title="Artwork Analyzer"
        >
          ✨
        </button>
        <Chatbot />
      </div>

      <ArtUploader 
        isOpen={isAnalyzerOpen} 
        onClose={closeAnalyzer} // <-- Use the new handler
      />
    </>
  );
};

export default FloatingButtons;