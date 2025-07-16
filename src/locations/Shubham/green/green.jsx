// File: vrindavan.jsx
import React from 'react';
import './green.css';
import { useNavigate } from 'react-router-dom';


const Green = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="vrindavan-card">
        <img
          src="/images/greens.jpeg"
          alt="Vrindavan Property"
          className="property-image"
        />
        <h2 className="property-title">Shubham Greens</h2>
        <button className="know-more-button" onClick={() => navigate('/shubham-greens')}>
          Click to Know More
        </button>
      </div>
      
    </div>
  );
};

export default Green;