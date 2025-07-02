
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './shorya.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const VrindavanDetails = () => {
  return (
    <div>
      <Header />
      <div className="swiper-container">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}

        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <SwiperSlide key={num}>
              <img
                src={`/shorya/shorya${num}.jpeg`}
                alt={`shorya ${num}`}
                className="swiper-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      

      {/* Property Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">SHOURYA VIHAR Proposed Project</h2>
        
      </div>

      

      
      <Footer />
    </div>
      
  
  );
};

export default VrindavanDetails;