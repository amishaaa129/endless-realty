import React from 'react';
import './main.css';
import Header from '../../components/Header';
import Footer from '../../components/footer';
import Property2 from './shorya/shorya';

const SiliconCityMain = () => {
  return (
    <div>
      <Header />
      
      <div className="property-grid-container">
       
        <div className="property-card">
          <Property2 />
        </div>
        
      </div>
      
      <Footer />
    </div>
  );
};

export default SiliconCityMain;