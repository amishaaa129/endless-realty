// File: vrindavan.jsx
import React from 'react';
import './vrindavan.css';
import { useNavigate } from 'react-router-dom';


const Vrindavan = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="vrindavan-card">
        <img
          src="/images/vrindavan.png"
          alt="Vrindavan Property"
          className="property-image"
        />
        <h2 className="property-title">Vrindavan Premium Row Houses</h2>
        <button className="know-more-button" onClick={() => navigate('/vrindavan-premium-row-houses')}>
          Click to Know More
        </button>
      </div>
      
    </div>
  );
};

export default Vrindavan;