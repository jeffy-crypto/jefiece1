import React from 'react';
// Import the icons you want to use
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section gradient-section">
      <div className="section-content">
        <h2 className="section-title">Let's Create Together</h2>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Tell me about your project" rows="5"></textarea>
          <button type="submit">Send Message</button>
        </form>

        {/* --- ADDED THIS SECTION --- */}
        <div className="social-media-links">
          <a
            href="YOUR_GITHUB_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="YOUR_LINKEDIN_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="YOUR_TWITTER_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>
        {/* --- END OF ADDED SECTION --- */}

      </div>
    </section>
  );
};

export default Contact;