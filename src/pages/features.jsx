import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import Header from '../components/Header';
import Footer from '../components/footer';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.endlessrealty.in';

const Features = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [activitiesImages, setActivitiesImages] = useState([]);
  const [propertyNewsImages, setPropertyNewsImages] = useState([]);
  const [updatesImages, setUpdatesImages] = useState([]);
  const [showActivitySwiper, setShowActivitySwiper] = useState(false);
  const [showNewsSwiper, setShowNewsSwiper] = useState(false);
  const [showGallerySwiper, setShowGallerySwiper] = useState(false);
  const [showUpdatesSwiper, setShowUpdatesSwiper] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isAdminUser = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const [gallery, activities, news, updates] = await Promise.all([
          fetch(`${API_BASE_URL}/api/uploads/gallery`).then(res => res.json()),
          fetch(`${API_BASE_URL}/api/uploads/activities`).then(res => res.json()),
          fetch(`${API_BASE_URL}/api/uploads/property-news`).then(res => res.json()),
          fetch(`${API_BASE_URL}/api/uploads/updates`).then(res => res.json()),
        ]);
        setGalleryImages(gallery);
        setActivitiesImages(activities);
        setPropertyNewsImages(news);
        setUpdatesImages(updates);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    fetchAllImages();
  }, []);

  const handleDeleteImage = async (category, filename) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/uploads/${category}/${filename}`, { method: 'DELETE' });
      window.location.reload(); // quick refresh, or manually update state instead
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const featureCards = [
    { title: 'Activities', desc: 'Engage in a variety of activities designed to enhance your experience.', isActivity: true, src: '/images/whats-new/activities.JPG' },
    { title: 'Property News', desc: 'Stay updated with the latest trends and news in the real estate market.', isNews: true, src: '/images/whats-new/property-news.jpeg' },
    { title: 'Gallery', desc: 'Browse through our collection of images showcasing our properties and events.', isGallery: true, src: '/images/whats-new/gallery.jpeg' },
    { title: 'Updates', desc: 'Get the latest updates about our platform and services.', isUpdates: true, src: '/images/whats-new/updates.jpeg' },
    { title: 'Testimonials', desc: 'Hear what our satisfied customers have to say about us.', src: '/images/whats-new/testimonials.jpeg' },
  ];

  return (
    <div>
      <Header />

      <main className="py-10 px-4 md:px-12 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCards.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item.isActivity) setShowActivitySwiper(true);
                if (item.isNews) setShowNewsSwiper(true);
                if (item.isGallery) setShowGallerySwiper(true);
                if (item.isUpdates) setShowUpdatesSwiper(true);
              }}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:bg-blue-50"
            >
              {item.src && <img src={item.src} alt={item.title} className="w-full h-49 object-cover rounded-md mb-4" />}
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h2>
              <p className="text-gray-600">{item.desc}</p>
              {item.isActivity && <div className="mt-4 text-blue-600 text-sm font-medium">Click to view activities →</div>}
              {item.isNews && <div className="mt-4 text-blue-600 text-sm font-medium">Click to view property news →</div>}
              {item.isGallery && <div className="mt-4 text-blue-600 text-sm font-medium">Click to view gallery →</div>}
              {item.isUpdates && <div className="mt-4 text-blue-600 text-sm font-medium">Click to view updates →</div>}
            </div>
          ))}
        </div>
      </main>

      {renderModalSwiper(showActivitySwiper, setShowActivitySwiper, activitiesImages, "Our Activities", setCurrentSlide, isAdminUser, handleDeleteImage, "activities")}
      {renderModalSwiper(showNewsSwiper, setShowNewsSwiper, propertyNewsImages, "Property News", null, isAdminUser, handleDeleteImage, "property-news")}
      {renderModalSwiper(showGallerySwiper, setShowGallerySwiper, galleryImages, "Gallery", null, isAdminUser, handleDeleteImage, "gallery")}
      {renderModalSwiper(showUpdatesSwiper, setShowUpdatesSwiper, updatesImages, "Updates", null, isAdminUser, handleDeleteImage, "updates")}

      <Footer />
    </div>
  );
};

function renderModalSwiper(show, setShow, images, title, setCurrentSlide, isAdminUser, handleDeleteImage, category) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto relative">
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          onSlideChange={setCurrentSlide ? ({ activeIndex }) => setCurrentSlide(activeIndex) : undefined}
        >
          {images.map((imgPath, index) => (
            <SwiperSlide key={index}>
              <div className="p-6 relative">
                <div className="bg-gray-200 rounded-lg overflow-hidden mb-4 flex justify-center items-center relative">
                  <img
                    src={imgPath.startsWith('uploads') ? `${API_BASE_URL}/${imgPath}` : imgPath}
                    alt={`${title} ${index + 1}`}
                    className="w-full h-auto max-h-[80vh] object-contain"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'; }}
                  />
                  {isAdminUser && (
                    <button
                      onClick={() => handleDeleteImage(category, imgPath.split('/').pop())}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Features;
