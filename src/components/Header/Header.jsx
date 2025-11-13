import React from 'react';
import './Header.css';
import llogo from '../../assets/llogo.png';
import dlogo from '../../assets/dlogo.png';

const Header = ({ isDarkMode }) => {
  // This is the Gmail link you want to open.
  const mailtoLink = "https://mail.google.com/mail/?view=cm&fs=1&to=jeferson.pangan@email.lcup.edu.ph&su=Hiring%20Inquiry&body=Hi%20Jeferson,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.";

  // We no longer need the handleHireClick function.

  return (
    <div className="sub-header">
      <div className="logo">
        <img src={isDarkMode ? dlogo : llogo} alt="Logo" className="logo-img" />
      </div>
      <div className="header-buttons">
        
        {/* --- THIS IS THE CORRECTED BUTTON --- */}
        <a 
          href={mailtoLink}
          target="_blank"          // <-- This is the key change to open a new tab
          rel="noopener noreferrer"  // <-- Security best practice for new tabs
          className="hire-btn"       // <-- Use the same class to keep your styles
        >
          Hire
        </a>
        {/* --- END OF CORRECTION --- */}

      </div>
    </div>
  );
};

export default Header;