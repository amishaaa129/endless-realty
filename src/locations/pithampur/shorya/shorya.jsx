
import React from 'react';
import './shorya.css';
import { useNavigate } from 'react-router-dom';


const Rau = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className="Rau-card">
        <img
          src="/images/shorya.jpeg"
          alt="Rau Property"
          className="property-image"
        />
        {/* SOLD OUT Stamp */}
        <div className="sold-out-tag">Upcoming</div>
        
        
        <h2 className="property-title">Shourya vihar property</h2>
        <button className="know-more-button" onClick={() => navigate('/shourya-vihar')}>
          Click to Know More
        </button>
      </div>
      
    </div>
  );
};

export default Rau;