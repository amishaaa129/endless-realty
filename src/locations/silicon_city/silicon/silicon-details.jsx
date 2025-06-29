// File: vrindavanDetails.jsx
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './silicon.css';


const Silicondetails = () => {
  return (
    <div>
      <Header />


       {/* Map Section */}
       <div className="map-image">
        <img src="/silicon/silicon.jpeg" alt="Map Location" />
      </div>

      

      {/* Property Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Silicon City Property Details</h2>
        <ul className="space-y-4 text-lg leading-relaxed list-disc list-inside">
          <li><strong>Plot Size:</strong> 20*56 (1120 sqfeet)</li>
          <li><strong>Construction Area:</strong> Approx. 3500 sq ft</li>
          <li><strong>Configuration:</strong> 2 flat & 2 BHK</li>
          <li><strong>Features:</strong>6 shope size 9*20 180 sq feet </li>
          <li><strong>Location:</strong> silicon City Near pulak city gate no 2</li>
        </ul>
      </div>


      

     
      <Footer />
    </div>
  );
};

export default Silicondetails;