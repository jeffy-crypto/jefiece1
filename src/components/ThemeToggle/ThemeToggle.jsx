import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <div className="theme-toggle-container">
      {/* The "active" class is now on DARK when isDarkMode is true */}
      <span className={`toggle-label dark ${isDarkMode ? 'active' : ''}`}></span>
      
      <label className="toggle-switch">
        <input 
          type="checkbox"
          // THE FIX: The switch is checked when it's NOT dark mode (i.e., when it's light mode)
          checked={!isDarkMode} 
          onChange={onToggle} 
        />
        <span className="toggle-track">
          <span className="toggle-thumb">
            {/* The sun emoji is now inside the thumb for light mode */}
            {!isDarkMode && ''}
          </span>
        </span>
      </label>

      {/* The "active" class is now on LIGHT when isDarkMode is false */}
      <span className={`toggle-label light ${!isDarkMode ? 'active' : ''}`}></span>
    </div>
  );
};

export default ThemeToggle;