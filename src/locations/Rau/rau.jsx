import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './rau.css';
import Header from '../../components/Header';

const PropertyCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/rau/property-details'); 
  };

  return (
    <div className="property-card" onClick={handleClick}>
      <img src="../../images/rau.jpeg" alt="Property" />
      <div className="property-info">
        <h2>Beautiful Property</h2>
        <p>Click to view details</p>
      </div>
    </div>
  );
};

const HomePage = () => (
  <div className="home-page">
    <Header />
    <div className="property-list">
      <PropertyCard />
    </div>
  </div>
);

const PropertyDetailsPage = () => (
  <div className="property-details-page">
    <Header />
    <h2>Property Details</h2>
    <p>Here are the details of the property...</p>
  </div>
);

const Rau = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/property-details" element={<PropertyDetailsPage />} />
  </Routes>
);

export default Rau;