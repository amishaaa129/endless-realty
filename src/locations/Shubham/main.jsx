import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/footer";
import Property1 from "./valley/valley";
import Property2 from "./arcadia/arcadia";
import Property3 from "./tsv/tsv";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Main = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/images/shubham_logo.png"
                alt="Shubham Realty Logo"
                className="h-40 w-auto"
              />
            </a>
        </div>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
            Featured Properties
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <Property1 />
            <Property2 />
            <Property3 />   
            
          </div>
        </div>
        {/* Swiper Image Gallery */}
      <div className="w-full max-w-4xl mx-auto mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Achievements
        </h2>
        <div className="swiper-container h-96">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="h-full"
          >
            {[4, 5, 6, 7].map((num) => (
              <SwiperSlide key={num} className="flex items-center justify-center">
                <img
                  src={`/shubham_achievment/achievment${num}.jpeg`}
                  alt={`Achievement ${num}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      </main>

    <Footer />
    </div>
  );
};

export default Main;