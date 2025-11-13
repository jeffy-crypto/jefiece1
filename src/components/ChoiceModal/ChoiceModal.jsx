// src/components/ChoiceModal/ChoiceModal.jsx

import React from 'react';
import './ChoiceModal.css';

const ChoiceModal = ({ isOpen, onClose, onView, onVisit, imageData }) => {
  if (!isOpen || !imageData) return null;

  return (
    <div className="choice-modal-overlay" onClick={onClose}>
      <div className="choice-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="choice-modal-close" onClick={onClose}>×</button>
        <img src={imageData.thumbnail} alt="Project Thumbnail" className="choice-modal-thumbnail" />
        <h3 className="choice-modal-title">What would you like to do?</h3>
        <div className="choice-modal-buttons">
          <button className="choice-btn view" onClick={onView}>
            View in Detail
          </button>
          <button className="choice-btn visit" onClick={onVisit}>
            Visit Live Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceModal;