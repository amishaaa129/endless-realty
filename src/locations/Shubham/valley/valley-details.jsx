// File: vrindavanDetails.jsx
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './valley.css';
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
        <video
          src="/valley/valley_video.mp4"
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
        <h1>🏞️ Shubham Valley — Hill View Plots at Indore Rau Bypass</h1>
        <h3>RERA & TNCP Approved | By Shubham Homes Pvt. Ltd. | Marketed by Endless Realty</h3>
        <p>
          Discover an exclusive opportunity to own hill view plots adjacent to DPS School Rau, located at a **very premium location on Indore Rau Bypass**. With exceptional natural surroundings and prime urban connectivity, Shubham Valley is a perfect blend of serenity and investment value.
        </p>

        <h3>📍 Prime Location</h3>
        <p>
          Strategically located next to DPS School, Rau, the project offers easy access to Indore city, educational institutes, and major highways. Its proximity to the bypass ensures smooth connectivity while maintaining a peaceful environment.
        </p>

        <h3>🏡 Project Amenities:</h3>
        <ul>
          <li>30 ft and 35 ft wide internal roads</li>
          <li>Underground utilities like water supply, drainage, and stormwater line</li>
          <li>Dedicated nature walk areas</li>
          <li>Sewer Treatment Plant (STP)</li>
          <li>Attractive entrance gates for a grand entry</li>
          <li>Full boundary wall for colony safety and security</li>
          <li>Main road-facing commercial plots available</li>
          <li>Easy finance options available</li>
          <li>Scenic views of Ahilya Hills and the city</li>
        </ul>

        <h3>📐 Plot Sizes</h3>
        <p>
          Available plot sizes range from <strong>600 sq.ft. to 1200 sq.ft.</strong> to suit every need.
        </p>

        <h3>📑 Legal & Approval</h3>
        <p>
          All required approvals in place — <strong>TNCP and RERA approved</strong>. 60% of development work is already completed.
          For accurate plot positioning and on-ground view, we recommend scheduling a site visit.
        </p>

        <h3>🏗️ Project & Developer Details</h3>
        <ul>
          <li>Project by: <strong>Shubham Homes Pvt. Ltd.</strong></li>
          <li>Developer: <strong>Mr. Sumit Mantri</strong></li>
          <li>Marketed by: <strong>ENDLESS REALTY </strong></li>
          <li>Office: Caps Town, Indore, MP 452010</li>
        </ul>

        <p className="mt-4">
          📞 <strong>For booking & site visits, contact ENDLESS REALTY today!</strong><br />
          📱 Call: +91 89899 41900<br />
          🌐 <a href="https://www.endlessrealty.in" target="_blank" rel="noopener noreferrer">www.endlessrealty.in</a><br />
          📸 Follow us on Facebook & Instagram
        </p>
      </div>

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
      </div>

      {/* Map Section */}
      <div className="map-image">
        <img src="/vrindavan/vrindavan-map.jpeg" alt="Map Location" />
      </div>
      <Footer />
    </div>
  );
};

export default VrindavanDetails;