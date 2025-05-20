import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {  Pagination, Autoplay } from "swiper/modules";
const CarouselComponent = () => {
    return (
        <div className="container mx-auto px-6 py-10">
            <h1 className="text-7xl font-bold text-gray-900 mb-40 text-center" style={{ marginTop: "-10rem" }}>
                Our Associates
            </h1>

            {/* Swiper Carousel */}
            <Swiper
                modules={[Pagination, Autoplay]}
                

                autoplay={{
                    delay: 0, // No delay between slides
                    disableOnInteraction: false, // Continue autoplay after user interaction
                }}
                loop={true} // Enable infinite loop
                speed={5000} // Smooth transition speed (4 seconds)
                spaceBetween={0}
                slidesPerView="auto"
                freeMode={true}
                className="mySwiper"
                style={{ marginBottom: "0", paddingBottom: "0" }}
                >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="bg-white shadow-md rounded-lg p-5 max-w-md mx-auto">
                        <img
                            src="/images/image1.jpg" // Replace with the actual path to your image
                            alt="Associate 1"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                        <img
                            src="/images/image2.jpg" // Replace with the actual path to your image
                            alt="Associate 2"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                        <img
                            src="/images/image3.jpg" // Replace with the actual path to your image
                            alt="Associate 3"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </SwiperSlide>
                {/* Slide 4 */}
                <SwiperSlide>
                <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                        <img
                            src="/images/image4.jpg" // Replace with the actual path to your image
                            alt="Associate 3"
                            className="w-full h-auto rounded-lg"
                        />
                    </div> 
                </SwiperSlide>
                {/* Slide 5 */}
                <SwiperSlide>
                <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                        <img
                            src="/images/image5.jpg" // Replace with the actual path to your image
                            alt="Associate 3"
                            className="w-full h-auto rounded-lg"
                        />
                    </div> 
                </SwiperSlide>
                {/* Slide 6 */}
                <SwiperSlide>
                <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                        <img
                            src="/images/image6.jpg" // Replace with the actual path to your image
                            alt="Associate 3"
                            className="w-full h-auto rounded-lg"
                        />
                    </div> 
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default CarouselComponent;