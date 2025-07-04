// File: vrindavanDetails.jsx
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './eleven.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const VrindavanDetails = () => {
  return (
    <div>
      <Header />

      {/* Constant Video Section 
      <div className="video-wrapper top-video">
        <video
          src="/arcadia/arcadia_video.mp4"
          title="Property Video"
          autoPlay
          muted
          loop
          playsInline
          className="video-player"
        />
      </div>

      {/* Property Content Section */}
      <div className="property-info-section">
  <h1>🏙️ Your Next Dream Awaits at Dudhiya, near Bicholi</h1>
  <h3>Upcoming Wonderful Project by Shubham Group | Marketed by Endless Realty</h3>
  <p>
    Discover your future at this premium plotting development in the fast-growing locality of Dudhiya, near Bicholi. Designed for serene living and smart investment, this project offers lush surroundings and modern amenities by the trusted <strong>Shubham Group</strong>.
  </p>

  <h3>📍 Prime Location</h3>
  <p>
    Located just <strong>2.6 km from the Bypass</strong>, close to UNO Business Park, Indore — this project ensures excellent connectivity to both the city core and commercial hubs.
  </p>

  <h3>📐 Plot Sizes Available</h3>
  <p>
    Choose from thoughtfully sized plots: <strong>1100 & 1500 sq.ft.</strong>, including beautiful <strong>garden-facing views</strong>.
  </p>

  <h3>✨ Project Highlights & Amenities</h3>
  <ul>
    <li>✅ Temple & Clubhouse</li>
    <li>✅ Open Gym & Lush Green Gardens</li>
    <li>✅ 60 Ft. Wide Main Road</li>
  </ul>

  <h3>🏗️ Project & Developer Information</h3>
  <ul>
    <li>Project by: <strong>Shubham Group</strong></li>
    <li>Marketed by: <strong>ENDLESS REALTY</strong></li>
    <li>Office: Caps Town, Indore, MP 452010</li>
  </ul>

  <p className="mt-4">
    📞 <strong>For more information & site visits, contact ENDLESS REALTY today!</strong><br />
    📱 Call: +91 89899 41900<br />
    🌐 <a href="https://www.endlessrealty.in" target="_blank" rel="noopener noreferrer">www.endlessrealty.in</a><br />
    📸 Follow us on Facebook & Instagram
  </p>
</div>

      {/* Swiper Image Gallery 
      <div className="swiper-container">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}

        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <SwiperSlide key={num}>
              <img
                src={`/vrindavan/vrindavan${num}.jpeg`}
                alt={`Vrindavan ${num}`}
                className="swiper-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}

      {/* Map Section 
      <div className="map-image-row">
        <img src="/arcadia/arcadia_map.jpg" alt="Map Location" />
        <img src="/arcadia/arcadia_map1.jpg" alt="Location Overview" />
      </div> */}
      <Footer />
    </div>
  );
};

export default VrindavanDetails;