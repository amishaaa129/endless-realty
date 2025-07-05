// File: vrindavan.jsx
import React from 'react';
import './valley.css';
import { useNavigate } from 'react-router-dom';


const Valley = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="vrindavan-card">
        <img
          src="/images/valley.jpeg"
          alt="Vrindavan Property"
          className="property-image"
        />
        <h2 className="property-title">Shubham Valley</h2>
        <button className="know-more-button" onClick={() => navigate('/shubham-valley')}>
          Click to Know More
        </button>
      </div>
      
    </div>
  );
};

export default Valley;