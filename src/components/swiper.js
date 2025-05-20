import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const CarouselComponent = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-6xl font-bold text-gray-900 mb-6 text-center">
        Our Associates
      </h1>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // 3 seconds delay between slides
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        spaceBetween={30}
        slidesPerView={1}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Associate 1
            </h2>
            <p className="text-gray-600">
              A leading real estate developer specializing in luxury apartments
              and villas.
            </p>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Associate 2
            </h2>
            <p className="text-gray-600">
              Experts in commercial property development with a focus on
              sustainability.
            </p>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Associate 3
            </h2>
            <p className="text-gray-600">
              Renowned for their innovative designs and customer-centric
              approach.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CarouselComponent;