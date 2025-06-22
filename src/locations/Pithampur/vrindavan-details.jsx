// File: vrindavanDetails.jsx
import React from 'react';
import Header from '../../components/Header';
import './vrindavan.css';

const VrindavanDetails = () => {
  return (
    <>
      <Header />

      {/* Property Info Section */}
      <div className="property-info-section">
        <h1>Vrindavan Residency</h1>
        <p>
          Nestled in the peaceful surroundings of Vrindavan, this premium residency offers comfort and elegance. With
          state-of-the-art amenities, ample green space, and proximity to temples and markets, this is the ideal home
          for families seeking peace and luxury.
        </p>
        <ul>
          <li>3 BHK Premium Flats</li>
          <li>Gym, Garden, Temple Inside Society</li>
          <li>24x7 Water & Power Backup</li>
          <li>Parking + Security + Elevators</li>
        </ul>
      </div>

      {/* 5 Image Gallery Grid */}
      <div className="image-grid">
        {[1, 2, 3, 4, 5].map((num) => (
          <img key={num} src={`/images/vrindavan${num}.jpg`} alt={`Vrindavan ${num}`} className="gallery-image" />
        ))}
      </div>

      {/* Video + Map Section */}
      <div className="media-grid">
        <div className="video-wrapper">
          <video
            src="/videos/vrindavan-tour.mp4" // Replace with your video path
            title="Property Video"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <div className="map-image">
          <img src="/images/vrindavan-map.jpg" alt="Map Location" />
        </div>
      </div>
    </>
  );
};

export default VrindavanDetails;