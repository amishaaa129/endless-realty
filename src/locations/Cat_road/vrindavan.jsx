// File: vrindavan.jsx
import React from 'react';
import './vrindavan.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/footer';

const Vrindavan = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="vrindavan-card">
        <img
          src="/images/vrindavan.png"
          alt="Vrindavan Property"
          className="property-image"
        />
        <h2 className="property-title">Vrindavan Premium</h2>
        <button className="know-more-button" onClick={() => navigate('/vrindavan-details')}>
          Click to Know More
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Vrindavan;