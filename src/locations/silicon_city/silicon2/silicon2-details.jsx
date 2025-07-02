// File: vrindavanDetails.jsx
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './silicon.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Silicondetails = () => {
  return (
    <div>
      <Header />
      {/* Swiper Image Gallery */}
      <div className="swiper-container">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}

        >
          {[1, 2, 3, 4].map((num) => (
            <SwiperSlide key={num}>
              <img
                src={`/s2/s2${num}.jpeg`}
                alt={`Vrindavan ${num}`}
                className="swiper-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>






      
      {/* Property Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Silicon City Property Details</h2>
        <ul className="space-y-4 text-lg leading-relaxed list-disc list-inside">
          <li><strong>Plot Size:</strong> 20×45 (900 sq ft)</li>
          <li><strong>Construction Area:</strong> Approx. 2200 sq ft</li>
          <li><strong>Completion:</strong> Fully completed with interior work</li>
          <li><strong>Features:</strong>
            <ul className="list-disc list-inside ml-5 space-y-1">
              <li>Modular kitchen</li>
              <li>False ceiling</li>
              <li>Bed & wardrobe</li>
              <li>Sofa set</li>
              <li>TV panel</li>
              <li>Jhoomer lights</li>
              <li>Solar system</li>
            </ul>
          </li>
          <li><strong>Location:</strong> Silver Star City, Lotus</li>
        </ul>
      </div>
      {/* Map Section */}
      <div className="map-image">
        <img src="/s2/s2-map.png" alt="Map Location" />
      </div>





      <Footer />
    </div>
  );
};

export default Silicondetails;