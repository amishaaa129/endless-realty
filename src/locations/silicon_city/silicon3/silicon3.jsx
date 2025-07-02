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
          src="/images/s3.jpeg"
          alt="Vrindavan Property"
          className="property-image"
        />
        <div className="sold-out-tag">SOLD OUT</div>
        <h2 className="property-title">Pulak City</h2>
        <button className="know-more-button" onClick={() => navigate('/silicon3-premium')}>
          Click to Know More
        </button>
      </div>
      
    </div>
  );
};

export default Silicon;