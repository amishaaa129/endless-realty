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
                src={`/s3/s3${num}.jpg`}
                alt={`s3 ${num}`}
                className="swiper-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>




      {/* Property Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Silicon City</h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li><strong>Plot size:</strong> 30×50 (1500 sq ft)</li>
          <li><strong>Construction:</strong> 3300 sq ft</li>
          <li>With all interior work</li>
          <li>Modular kitchen</li>
          <li>False ceiling</li>
          <li>TV Panel</li>
          <li>All bedrooms</li>
          <li>Bed wardrobe</li>
          <li>Sofa</li>
          <li>Mandir</li>
          <li>Jhoomer lights</li>
          <li><strong>Location:</strong> Pulak City, Silicon City</li>
        </ul>
      </div>
      {/* Map Section */}
      <div className="map-image">
        <img src="/s3/s3-map.png" alt="Map Location" />
      </div>





      <Footer />
    </div>
  );
};

export default Silicondetails;