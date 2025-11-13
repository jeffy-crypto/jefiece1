import React from 'react';
import './About.css'

const About = () => {
  return (
    <section id="about" className="section gradient-section">
      <div className="section-content">
        <h2 className="section-title" style={{ marginTop: 0 }}>About Me</h2>
        <div className="about-content">
          {/* This now uses the direct URL for the image, which will work correctly. */}
          <img 
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1846&auto=format&fit=crop" 
            alt="A sample of digital art" 
            className="about-image" 
          />
          <div className="about-text">
            <p>I'm a passionate digital artist with a love for creating vibrant and imaginative worlds. My work is driven by storytelling and a desire to bring characters and concepts to life through illustration and design.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;