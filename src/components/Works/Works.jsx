import React, { useEffect, useRef, useState } from 'react';
import initializeGallery from './galleryLogic.js'; 
import ChoiceModal from '../ChoiceModal/ChoiceModal.jsx'; // Import the Modal
import IIIFViewer from '../IIIFViewer/IIIFViewer.jsx';   // Import the Viewer

// Define the data constant outside the component (this is fine)
const IMAGE_DATA = {
    img1: {
        iiifUrl: 'https://i.imgur.com/dVfLY3s.jpeg', // Note: IIIF viewers usually need a info.json link, but simple images might work depending on viewer config
        liveUrl: 'https://github.com/jeffy-crypto/jefiece1.git',
        thumbnail: '/thumbnails/1.png', 
        tags: ["Art", "Illustration", "Sky", "Cloud", "Blue"], 
        colorPalette: ["#1c3a5e", "#8fb2d1", "#f0e7d5"]     
    },
    img2: {
        iiifUrl: 'https://ids.lib.harvard.edu/ids/iiif/18035391/info.json',
        liveUrl: 'https://github.com/your-username/project-2',
        thumbnail: '/thumbnails/2.png',
        tags: ["Graphic Design", "Typography", "Red", "Minimalism"],
        colorPalette: ["#d92027", "#f5f5f5", "#222222"]
    },
    img4: {
        iiifUrl: 'https://iiif.lib.virginia.edu/iiif/uva-lib:2209425/info.json',
        liveUrl: 'https://www.behance.net/gallery/your-project-4',
        thumbnail: '/thumbnails/4.png',
        tags: ["Abstract", "Painting", "Texture", "Canvas"],
        colorPalette: ["#a45c3c", "#f2e8da", "#3a3a3a"]
    },
    img5: {
        iiifUrl: 'https://iiif.bodleian.ox.ac.uk/iiif/image/b8397149-16a7-444a-9354-013b3554162a/info.json',
        liveUrl: 'https://www.your-website.com/project-name-5',
        thumbnail: '/thumbnails/5.png',
        tags: ["Digital Art", "Portrait", "Sci-Fi", "Neon"],
        colorPalette: ["#ff00ff", "#00ffff", "#1a1a1a"]
    },
    img6: {
        iiifUrl: 'https://iiif.gmer.unige.ch/iiif/2/fedora_ug8082042/info.json',
        liveUrl: 'https://www.your-website.com/project-name-6',
        thumbnail: '/thumbnails/6.png',
        tags: ["Landscape", "Photography", "Mountains", "Nature"],
        colorPalette: ["#2c3e50", "#ecf0f1", "#8e44ad"]
    },
    img7: {
        iiifUrl: 'https://www.e-codices.unifr.ch/iiif/2/bc-grou-0036/info.json',
        liveUrl: 'https://www.your-website.com/project-name-7',
        thumbnail: '/thumbnails/7.png',
        tags: ["User Interface", "Web Design", "Dashboard", "Analytics"],
        colorPalette: ["#34495e", "#1abc9c", "#f1c40f"]
    },
    img8: {
        iiifUrl: 'https://www.e-codices.unifr.ch/iiif/2/sl-0317/info.json',
        liveUrl: 'https://www.your-website.com/project-name-8',
        thumbnail: '/thumbnails/8.png',
        tags: ["3D Model", "Blender", "Render", "Character Design"],
        colorPalette: ["#e67e22", "#d35400", "#bdc3c7"]
    },
    img9: {
        iiifUrl: 'https://www.e-codices.unifr.ch/iiif/2/fmb-cb-0020/info.json',
        liveUrl: 'https://www.your-website.com/project-name-9',
        thumbnail: '/thumbnails/9.png',
        tags: ["Architecture", "Drawing", "Ink", "Perspective"],
        colorPalette: ["#2d2d2d", "#ffffff", "#c0392b"]
    },
    img10: {
        iiifUrl: 'https://www.e-codices.unifr.ch/iiif/2/bge-com-0001a/info.json',
        liveUrl: 'https://www.your-website.com/project-name-10',
        thumbnail: '/thumbnails/10.png',
        tags: ["Logo Design", "Branding", "Vector", "Icon"],
        colorPalette: ["#2980b9", "#3498db", "#ecf0f1"]
    },
    img11: {
        iiifUrl: 'https://www.e-codices.unifr.ch/iiif/2/kba-0001a/info.json',
        liveUrl: 'https://www.your-website.com/project-name-11',
        thumbnail: '/thumbnails/11.png',
        tags: ["Watercolor", "Painting", "Floral", "Botany"],
        colorPalette: ["#16a085", "#f1c40f", "#e74c3c"]
    }
};

const Works = () => {
  const galleryContainerRef = useRef(null);
  
  // 1. ADDED: State to manage the modal and viewer
  const [selectedIiifUrl, setSelectedIiifUrl] = useState(null);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState(null);

  useEffect(() => {
    let galleryInstance;

    // 2. ADDED: The Callback function
    // This function will be called by galleryLogic.js when an image is clicked
    const handleImageClick = (imageKey) => {
      const data = IMAGE_DATA[imageKey]; // Look up the data using the key (e.g., 'img1')
      if (data) {
        setSelectedImageData(data);
        setIsChoiceModalOpen(true); // Open the choice modal
      }
    };

    if (galleryContainerRef.current) {
      // 3. ADDED: Pass the callback to initializeGallery
      galleryInstance = initializeGallery(galleryContainerRef.current, handleImageClick);
    }

    return () => {
      if (galleryInstance) {
        galleryInstance.destroy();
      }
    };
  }, []); 

  // 4. ADDED: Button Handlers for the Modal
  const handleViewDetail = () => {
    if (selectedImageData) {
      setSelectedIiifUrl(selectedImageData.iiifUrl);
      setIsChoiceModalOpen(false);
    }
  };

  const handleVisitLink = () => {
    if (selectedImageData) {
      window.open(selectedImageData.liveUrl, '_blank');
      setIsChoiceModalOpen(false);
    }
  };

  const closeChoiceModal = () => {
    setIsChoiceModalOpen(false);
  }

  return (
    <section id="works" className="section gradient-section">
      <div className="section-content">
        <h2 className="section-title">My Works</h2>
        <div
          ref={galleryContainerRef}
          id="gallery-container"
          style={{ height: '600px', position: 'relative', width: '100%' }}
        ></div>
      </div>

      {/* 5. ADDED: Render the Choice Modal */}
      <ChoiceModal
        isOpen={isChoiceModalOpen}
        onClose={closeChoiceModal}
        onView={handleViewDetail}
        onVisit={handleVisitLink}
        imageData={selectedImageData}
      />

      {/* 6. ADDED: Render the IIIF Viewer */}
      <IIIFViewer 
        tileSource={selectedIiifUrl} 
        onClose={() => setSelectedIiifUrl(null)} 
      />
    </section>
  );
};

export default Works;