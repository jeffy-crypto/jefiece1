import React from 'react';
import './NavBar.css'; // <-- IMPORT THE CSS FILE

const NavBar = () => {
  return (
    <header>
      <div className="nav-container">
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#works">Works</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;