// File: vrindavan.jsx
import React from 'react';
import './eleven.css';
import { useNavigate } from 'react-router-dom';


const Eleven = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="vrindavan-card">
        <img
          src="/images/eleven.jpeg"
          alt="Vrindavan Property"
          className="property-image"
        />
        <h2 className="property-title">Shubham Eleven</h2>
        <button className="know-more-button" onClick={() => navigate('/eleven-premium')}>
          Click to Know More
        </button>
      </div>
      
    </div>
  );
};

export default Eleven;