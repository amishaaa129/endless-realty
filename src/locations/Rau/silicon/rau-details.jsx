
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './rau.css';


const VrindavanDetails = () => {
  return (
    <div>
      <Header />

      {/* Constant Video Section */}
      <div className="video-wrapper top-video">
        <video
          src="/rau/rau.mp4"
          title="Property Video"
          autoPlay
          muted
          loop
          playsInline
          className="video-player"
        />
      </div>

      {/* Property Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Rau Property Details</h2>
        <ul className="space-y-4 text-lg leading-relaxed list-disc list-inside">
          <li><strong>Plot Size:</strong> 18 x 50 (900 sq ft)</li>
          <li><strong>Construction Area:</strong> Approx. 2000 sq ft</li>
          <li><strong>Configuration:</strong> 4 BHK Premium Construction</li>
          <li><strong>Features:</strong> Modular Kitchen, Personal Borewell, Fall Ceiling, TV Panel Unit</li>
          <li><strong>Location:</strong> Silicon City, Rau</li>
        </ul>
      </div>

      

      {/* Map Section */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <img
          src= "/rau/rau-map.png"
          alt="Rau Map"
          className="w-full h-auto object-contain rounded-lg shadow-lg"
        />
      </div>
      <Footer />
    </div>
      
  
  );
};

export default VrindavanDetails;