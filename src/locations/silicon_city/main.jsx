import React from 'react';
import './main.css';
import Header from '../../components/Header';
import Footer from '../../components/footer';
import Property1 from './silicon/silicon';
import Property2 from './silicon1/silicon1';
import Property3 from './silicon2/silicon2';
import Property4 from './silicon3/silicon3';

const SiliconCityMain = () => {
  return (
    <div>
      <Header />
      
      <div className="property-grid-container">
        <div className="property-card">
          <Property1 />
        </div>
        <div className="property-card">
          <Property2 />
        </div>
        <div className="property-card">
          <Property3 />
        </div>
        <div className="property-card">
          <Property4 />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SiliconCityMain;