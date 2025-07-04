
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
      {/* Constant Video Section */}
      <div className="video-wrapper top-video">
        <div className="video-player aspect-w-16 aspect-h-9">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/lSUZRCs7kvs?autoplay=1&mute=1&loop=1&playlist=lSUZRCs7kvs"
            title="Property Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>




      {/* Property Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">SHOURYA VIHAR Proposed Project</h2>

      </div>
      <div className="swiper-container">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}

        >
          {[1, 2, 3, 4, 5, 6, 8, 9].map((num) => (
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




      <Footer />
    </div>


  );
};

export default VrindavanDetails;