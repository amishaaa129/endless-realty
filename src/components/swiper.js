import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

const CarouselComponent = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
            <div
                className="w-screen bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative -ml-90 sm:-ml-90 lg:-ml-90"
                style={{ marginLeft: "0", marginTop: "0" }}
            >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black text-center">
                    Our Associates
                </h1>
            </div>
            <div className="mb-6 sm:mb-8 lg:mb-10"></div>

            {/* Swiper Carousel */}
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000, // Set autoplay delay (3 seconds)
                    disableOnInteraction: false, // Continue autoplay after user interaction
                }}
                pagination={{ clickable: true }} // Enable pagination
                loop={true} // Enable infinite loop
                spaceBetween={20} // Space between slides
                slidesPerView={1} // Number of slides visible at a time
            >
                {/* {/* Slide 1 */}
                {/* <SwiperSlide>
                    <div className="bg-white shadow-md rounded-lg p-5 max-w-md mx-auto">
                        <img
                            src="/images/image1.jpg"
                            alt="Associate 1"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </SwiperSlide> */}
 
                {/* Slide 2 */}
                {/* <SwiperSlide>
                    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                        <img
                            src="/images/image2.jpg"
                            alt="Associate 2"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </SwiperSlide> */}

                {/* Slide 3 */}
                {/* <SwiperSlide>
                    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                        <img
                            src="/images/image3.jpg"
                            alt="Associate 3"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </SwiperSlide> */}
                {/* Slide 4 */}
                {/* <SwiperSlide>
                    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                        <img
                            src="/images/image4.jpg"
                            alt="Associate 3"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </SwiperSlide> */}
                {/* Slide 5 */}
                {/* <SwiperSlide>
                    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                        <img
                            src="/images/image5.jpg"
                            alt="Associate 3"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </SwiperSlide> */}
                {/* Slide 6 */}
                <SwiperSlide>
                    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
                        <img
                            src="/images/image6.jpg"
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