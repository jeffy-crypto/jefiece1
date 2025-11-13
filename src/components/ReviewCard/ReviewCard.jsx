import React from 'react';
import TiltedCard from '../TiltedCard/TiltedCard'; // The base component
import './ReviewCard.css'; // The wrapper styles

const ReviewCard = ({ imageSrc, quote, author }) => {

  return (
    <div className="review-card-wrapper">
      <TiltedCard 
        imageSrc={imageSrc} 
        altText={`Review from ${author}`}
        
        containerHeight="1000px"
        containerWidth="400px"
        imageHeight="100%"
        imageWidth="100%"

        rotateAmplitude={12}
        scaleOnHover={1.1}
        
        displayOverlayContent={true}

        showTooltip={false}
        
        overlayContent={
          <div className="tilted-card-review-overlay">
            <p className="overlay-quote">"{quote}"</p>
            <p className="overlay-author">{author}</p>
          </div>
        }
      />
    </div>
  );
};

export default ReviewCard;