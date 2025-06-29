import React from 'react';
import './main.css';
import Header from '../../components/Header';
import Footer from '../../components/footer';

import Property1 from './silicon/silicon';
import Property2 from './silicon1/silicon1';
import Property3 from './silicon2/silicon2';

const SiliconCityMain = () => {
  return (
    <div>
      <Header />

      <h1 className="property-grid-title">Explore Silicon City Properties</h1>

      <div className="property-grid-container">
        <Property1 />
        <Property2 />
        <Property3 />
      </div>

      <Footer />
    </div>
  );
};

export default SiliconCityMain;