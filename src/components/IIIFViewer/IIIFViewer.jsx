// src/components/IIIFViewer/IIIFViewer.jsx

import React, { useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';
import './IIIFViewer.css';

const IIIFViewer = ({ infoJsonUrl }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    let viewer;
    if (viewerRef.current) {
      viewer = OpenSeadragon({
        element: viewerRef.current,
        prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
        tileSources: infoJsonUrl,
        sequenceMode: false,
        showNavigator: true,
        navigatorPosition: 'BOTTOM_RIGHT',
      });
    }
    return () => {
      if (viewer) viewer.destroy();
    };
  }, [infoJsonUrl]);

  return <div ref={viewerRef} style={{ width: '100%', height: '100%' }} />;
};

export default IIIFViewer;