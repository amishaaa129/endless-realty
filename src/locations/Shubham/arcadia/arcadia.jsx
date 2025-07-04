// File: vrindavan.jsx
import React from 'react';
import './arcadia.css';
import { useNavigate } from 'react-router-dom';


const Vrindavan = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="vrindavan-card">
        <img
          src="/images/arcadia.jpeg"
          alt="Vrindavan Property"
          className="property-image"
        />
        <h2 className="property-title">Shubham Arcadia</h2>
        <button className="know-more-button" onClick={() => navigate('/shubham-arcadia')}>
          Click to Know More
        </button>
      </div>
      
    </div>
  );
};

export default Vrindavan;