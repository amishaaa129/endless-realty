import React from 'react';
import Header from '../../components/Header';
import './vrindavan.css';

const VrindavanDetails = () => {
  return (
    <>
      <Header />
      <div className="property-detail-page">
        <div className="image-gallery">
          <img src="/images/vrindavan1.jpg" alt="Vrindavan 1" />
          <img src="/images/vrindavan2.jpg" alt="Vrindavan 2" />
          <img src="/images/vrindavan3.jpg" alt="Vrindavan 3" />
        </div>

        <div className="property-info">
          <h1>Vrindavan Residency</h1>
          <p>
            Nestled in the peaceful surroundings of Vrindavan, this premium
            residency offers comfort and elegance. With state-of-the-art
            amenities, ample green space, and proximity to temples and markets,
            this is the ideal home for families seeking peace and luxury.
          </p>
          <ul>
            <li>3 BHK Premium Flats</li>
            <li>Gym, Garden, Temple Inside Society</li>
            <li>24x7 Water & Power Backup</li>
            <li>Parking + Security + Elevators</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default VrindavanDetails;