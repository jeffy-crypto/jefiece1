// src/components/Clients/Clients.jsx

import React, { useState } from 'react';
import TiltedCard from '../TiltedCard/TiltedCard';
import './Client.css';

import reviewImg1 from '../../assets/profile.png';
import reviewImg2 from '../../assets/profile.png';
import reviewImg3 from '../../assets/profile.png';

const testimonialsData = [
  { imageSrc: reviewImg1, quote: "Their creativity and attention to detail...", author: "- Jane Doe, Art Director" },
  { imageSrc: reviewImg2, quote: "An absolute pleasure to work with...", author: "- John Smith, Game Developer" },
  { imageSrc: reviewImg3, quote: "The communication was seamless...", author: "- Emily White, Brand Manager" }
];

const Clients = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((p) => (p + 1) % testimonialsData.length);
  const handlePrev = () => setCurrentIndex((p) => (p - 1 + testimonialsData.length) % testimonialsData.length);

  const currentReview = testimonialsData[currentIndex];

  return (
    <section id="clients" className="section">
      <div className="section-content">
        <h2 className="section-title">Reviews</h2>

        <div className="review-slider-container">
          <button className="slider-arrow" onClick={handlePrev} aria-label="Previous review">
            <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
          </button>

          {/* NEW: This "stage" div creates the 3D space and defines the size. */}
          <div className="card-stage">
            <TiltedCard
              key={currentIndex}
              imageSrc={currentReview.imageSrc}
              altText={`Review from ${currentReview.author}`}
              // The TiltedCard will now fill 100% of the stage
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.1}
              displayOverlayContent={true}
              showTooltip={false}
              overlayContent={
                <>
                  <p className="overlay-quote">"{currentReview.quote}"</p>
                  <p className="overlay-author">{currentReview.author}</p>
                </>
              }
            />
          </div>

          <button className="slider-arrow" onClick={handleNext} aria-label="Next review">
            <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Clients;