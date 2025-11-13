// src/components/AdminTools/AdminTools.jsx
import React, { useState } from 'react';
import { useAdminMode } from '../../hooks/useAdminMode';
import ArtUploader from '../ArtUploader/ArtUploader.jsx';
import './AdminTools.css';

const AdminTools = () => {
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const isAdmin = useAdminMode(); // Our secret check

  const toggleAnalyzer = () => {
    setIsAnalyzerOpen(!isAnalyzerOpen);
  };

  // If we are not in admin mode, this component renders nothing.
  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <button className="admin-fab" onClick={toggleAnalyzer} title="Open Artwork Analyzer">
        ✨
      </button>

      <ArtUploader 
        isOpen={isAnalyzerOpen} 
        onClose={toggleAnalyzer} 
      />
    </>
  );
};

export default AdminTools;