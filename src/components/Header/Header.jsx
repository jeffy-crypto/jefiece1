import React from 'react';
import './Header.css';
import llogo from '../../assets/llogo.png';
import dlogo from '../../assets/dlogo.png';

const Header = ({ isDarkMode }) => {
  const handleHireClick = () => {
    window.location.href = "mailto:jeferson.pangan@email.lcup.edu.ph";
  };

  return (
    <div className="sub-header">
      <div className="logo">
        <img src={isDarkMode ? dlogo : llogo} alt="Logo" className="logo-img" />
      </div>
      <div className="header-buttons">
        <button className="hire-btn" onClick={handleHireClick}>Hire</button>
      </div>
    </div>
  );
};

export default Header;