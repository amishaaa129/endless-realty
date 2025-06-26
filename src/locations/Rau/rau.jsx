
import React from 'react';
import './rau.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/footer';

const Rau = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="Rau-card">
        <img
          src="/images/rau.jpeg"
          alt="Rau Property"
          className="property-image"
        />
        {/* SOLD OUT Stamp */}
        <div className="sold-out-tag">SOLD OUT</div>
        
        
        <h2 className="property-title">Silicon city property</h2>
        <button className="know-more-button" onClick={() => navigate('/rau-premium')}>
          Click to Know More
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Rau;