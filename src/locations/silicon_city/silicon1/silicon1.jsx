// File: vrindavan.jsx
import React from 'react';
import './silicon.css';
import { useNavigate } from 'react-router-dom';


const Silicon = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="vrindavan-card">
        <img
          src="/images/s1.jpg"
          alt="Vrindavan Property"
          className="property-image"
        />
        <div className="sold-out-tag">SOLD OUT</div>
        <h2 className="property-title">Silicon City S Sector</h2>
        <button className="know-more-button" onClick={() => navigate('/silicon-city-s-sector')}>
          Click to Know More
        </button>
      </div>
      
    </div>
  );
};

export default Silicon;