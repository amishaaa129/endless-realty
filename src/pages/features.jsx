import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import Header from '../components/Header';
import Footer from '../components/footer';

const Features = () => {
  const [showActivitySwiper, setShowActivitySwiper] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const activityImages = [
    {
      src: '/images/activity/a1.JPG',
    },
    {
      src: '/images/activity/a2.JPG',
    },
    {
      src: '/images/activity/a3.JPG',
    },
    {
      src: '/images/activity/a4.JPG',
    },
    {
      src: '/images/activity/a5.JPG',
    },
    {
      src: '/images/activity/a6.JPG',
    },
    {
      src: '/images/activity/a7.JPG',
    },
    {
      src: '/images/activity/a8.JPG',
    },
    {
      src: '/images/activity/a9.JPG',
    },
    {
      src: '/images/activity/a10.JPG',
    },
    {
      src: '/images/activity/a11.JPG',
    },
    {
      src: '/images/activity/a12.JPG',
    },
    {
      src: '/images/activity/a13.JPG',
    },
    {
      src: '/images/activity/a14.JPG',
    }
  ];

  // Gallery images for auto-swiper
  const galleryImages = [
    {
      src: '/images/associate/DSC00507.JPG',
      
    },
    {
      src: '/images/associate/DSC00759.JPG',
      
    },
    {
      src: '/images/founding-team/DSC00751.JPG',
      
    },
    {
      src: '/images/founding-team/DSC00824.JPG',
      
    },
    {
      src: '/images/founding-team/DSC00827.JPG',
      
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activityImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activityImages.length) % activityImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleActivityClick = () => {
    setShowActivitySwiper(true);
  };

  const closeSwiperModal = () => {
    setShowActivitySwiper(false);
    setCurrentSlide(0);
  };

  const featureCards = [
    {
      title: 'Activities',
      desc: 'Engage in a variety of activities designed to enhance your experience.',
      isActivity: true
    },
    {
      title: 'Property News',
      desc: 'Stay updated with the latest trends and news in the real estate market.',
    },
    {
      title: 'Gallery',
      desc: 'Browse through our collection of images showcasing our properties and events.',
    },
    {
      title: 'Updates',
      desc: 'Get the latest updates about our platform and services.',
    },
    {
      title: 'Testimonials',
      desc: 'Hear what our satisfied customers have to say about us.',
    },
  ];

  return (
    <div>
      {/* Render the Header component */}
      <Header />

      <main className="py-10 px-4 md:px-12 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCards.map((item, index) => (
            <div
              key={index}
              onClick={item.isActivity ? handleActivityClick : undefined}
              className={`bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 animate-fade-in ${item.isActivity ? 'cursor-pointer hover:bg-blue-50' : ''
                }`}
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h2>
              <p className="text-gray-600">{item.desc}</p>
              {item.isActivity && (
                <div className="mt-4 text-blue-600 text-sm font-medium">
                  Click to view activities →
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Auto-Swiper Section using Swiper Library */}
      <section className="pt-40 pb-24 ">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          {/* Swiper Carousel */}
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            
            loop={true}
            spaceBetween={40}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            className="gallery-swiper"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className=" shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden"> {/* Changed aspect ratio */}
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTIwSDIyNVYxNDBIMjAwVjE4MEgxNzVWMTIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMjAwIDEwMEMyMTEuMDQ2IDEwMCAyMjAgMTA4Ljk1NCAyMjAgMTIwQzIyMCAxMzEuMDQ2IDIxMS4wNDYgMTQwIDIwMCAxNDBDMTg4Ljk1NCAxNDAgMTgwIDEzMS4wNDYgMTgwIDEyMEMxODAgMTA4Ljk1NCAxODguOTU0IDEwMCAyMDAgMTAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                      }}
                    />
                    {/* Gradient overlay with text */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8"> {/* Increased padding */}
                      <h3 className="text-3xl font-bold text-white mb-4">{image.title}</h3> {/* Increased font size */}
                      <p className="text-gray-200 text-lg">{image.description}</p> {/* Increased font size */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      </main>

      

      {/* Activity Modal Swiper (your existing modal) */}
      {showActivitySwiper && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">

            <button
              onClick={closeSwiperModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Swiper Header */}
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Our Activities</h2>
            </div>

            {/* Swiper Container */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {activityImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="p-6">
                      <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTIwSDIyNVYxNDBIMjAwVjE4MEgxNzVWMTIwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMjAwIDEwMEMyMTEuMDQ2IDEwMCAyMjAgMTA4Ljk1NCAyMjAgMTIwQzIyMCAxMzEuMDQ2IDIxMS4wNDYgMTQwIDIwMCAxNDBDMTg4Ljk1NCAxNDAgMTgwIDEzMS4wNDYgMTgwIDEyMEMxODAgMTA4Ljk1NCAxODguOTU0IDEwMCAyMDAgMTAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{image.title}</h3>
                      <p className="text-gray-600">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 p-6">
              {activityImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="absolute bottom-6 left-6 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentSlide + 1} / {activityImages.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Features;