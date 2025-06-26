// File: vrindavan.jsx
import React from 'react';
import './rau.css';
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
          src="/images/rau.jpeg"
          alt="Vrindavan Property"
          className="property-image"
        />
        <h2 className="property-title">Silicon city property</h2>
        <button className="know-more-button" onClick={() => navigate('/rau-premium')}>
          Click to Know More
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Vrindavan;