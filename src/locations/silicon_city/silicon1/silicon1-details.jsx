// File: vrindavanDetails.jsx
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './silicon.css';


const Silicondetails = () => {
  return (
    <div>
      <Header />


      {/* Constant Video Section */}
      <div className="video-wrapper top-video">
        <div className="video-player aspect-w-16 aspect-h-9">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/CWjxEU4KdQI?autoplay=1&mute=1&loop=1&playlist=CWjxEU4KdQI"
            title="Property Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      

      {/* Property Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Silicon City Property Details</h2>
        <ul className="space-y-4 text-lg leading-relaxed list-disc list-inside">
          <li><strong>Plot Size:</strong> 15*50 (750 sqfeet)</li>
          <li><strong>Construction Area:</strong> Approx. 1500 sq ft</li>
          <li><strong>Configuration:</strong> 2 flat & 2 BHK</li>
          <li><strong>Features:</strong> Modular kitchen, Fall ceiling TV Panle Unit </li>
          <li><strong>Location:</strong> silicon City S sector</li>
        </ul>
      </div>


      

     
      <Footer />
    </div>
  );
};

export default Silicondetails;