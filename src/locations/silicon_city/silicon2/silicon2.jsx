// File: vrindavan.jsx
import React from 'react';
import './silicon.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';

const Silicon = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="vrindavan-card">
        <img
          src="/images/s2.jpeg"
          alt="Vrindavan Property"
          className="property-image"
        />
        <div className="sold-out-tag">SOLD OUT</div>
        <h2 className="property-title">Silver Star City Project</h2>
        <button className="know-more-button" onClick={() => navigate('/silver-star-city-project')}>
          Click to Know More
        </button>
      </div>
      
    </div>
  );
};

export default Silicon;