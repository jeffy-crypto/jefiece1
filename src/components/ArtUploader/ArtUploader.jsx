// src/components/ArtUploader/ArtUploader.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './ArtUploader.css';

// It now accepts props to control its visibility
const ArtUploader = ({ isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // If it's not open, render nothing
  if (!isOpen) {
    return null;
  }

  const handleAnalyze = async () => {
    if (!imageUrl) return;
    setIsLoading(true);
    setError('');
    setAnalysisResult(null);
    try {
      const response = await axios.post('/api/analyzeImage', { imageUrl });
      setAnalysisResult(response.data);
    } catch (err) {
      setError('Failed to analyze image. Check the URL and server logs.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="uploader-overlay" onClick={onClose}>
      <div className="uploader-content" onClick={(e) => e.stopPropagation()}>
        <button className="uploader-close-btn" onClick={onClose}>×</button>
        <h2>Artwork Analyzer</h2>
        <p>Paste a public image URL to get tags and colors.</p>
        <div className="input-group">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="e.g., https://i.imgur.com/your-image.png"
          />
          <button onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze Artwork'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {analysisResult && (
          <div className="results-container">
            <h3>Analysis Complete!</h3>
            <p>Copy these results into your `IMAGE_DATA` object.</p>
            <div className="result-section">
              <h4>Generated Tags:</h4>
              <div className="tags-list">
                {analysisResult.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <pre><code>"tags": {JSON.stringify(analysisResult.tags)}</code></pre>
            </div>
            <div className="result-section">
              <h4>Dominant Colors:</h4>
              <div className="palette">
                {analysisResult.colorPalette.map(hex => (
                  <div key={hex} className="color-swatch" style={{ backgroundColor: hex }} title={hex} />
                ))}
              </div>
              <pre><code>"colorPalette": {JSON.stringify(analysisResult.colorPalette)}</code></pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtUploader;