// File: vrindavanDetails.jsx
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './arcadia.css';
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
        <h1>🏙️ Shubham Arcadia — Premium Township on Indore-Ujjain Road</h1>
        <h3>RERA & TNCP Approved | 31 Acres Township | Marketed by Endless Realty</h3>
        <p>
          Shubham Arcadia is a landmark premium plotting project spread across 31 acres on Indore-Ujjain Road, opposite Prestige University. With extensive recreational amenities and robust infrastructure, this township offers a balanced lifestyle in a future-forward location.
        </p>

        <h3>📍 Prime Location</h3>
        <p>
          Located directly on Indore-Ujjain Road, the township enjoys seamless access to the city’s core and outer bypasses, making it ideal for both residential and investment purposes.
        </p>

        <h3>🏡 Project Highlights & Amenities</h3>
        <ul>
          <li>Road sizes: 30 ft and 40 ft wide</li>
          <li>4 Acres of amenities including a 23,000 sq.ft. Clubhouse, Swimming Pool, and Temple</li>
          <li>53,000 sq.ft. Sports Ground with Football Field, Cricket Pitch, and multi-sport courts</li>
          <li>Dedicated Elder’s Park and Kid’s Park</li>
          <li>Amphitheatre and Eco Gym</li>
          <li>Beautifully Landscaped Gardens</li>
          <li>Underground services: electricity, water supply, drainage, sewer system, cable network, and storm line</li>
          <li>Underground sump well for water supply</li>
          <li>Sewer Treatment Plant (STP)</li>
          <li>Attractive Entrance Gates</li>
          <li>Full boundary wall for colony security</li>
          <li>Front boundary fascia on every plot</li>
          <li>Solar-powered street lights (no overhead cables)</li>
        </ul>

        <h3>📐 Plot Sizes Available</h3>
        <p>
          Choose from multiple plot sizes: <strong>700, 1000, 1125, 1800, and 2400 sq.ft.</strong>
        </p>

        <h3>🔌 Infrastructure Extras</h3>
        <ul>
          <li>Double electricity cable network till the plots</li>
          <li><strong>5 Years Clubhouse Membership</strong> from completion certificate date or until December 2030</li>
          <li><strong>2 Years Society Maintenance Charges</strong> covered from completion certificate date</li>
        </ul>

        <h3>📑 Legal Approvals & Progress</h3>
        <p>
          All necessary permissions secured — <strong>TNCP and RERA Approved</strong>. Building permission expected by <strong>June 2025</strong>. Development is in full swing. For actual site layout and progress, a site visit is recommended.
        </p>

        <h3>🏗️ Project & Developer Information</h3>
        <ul>
          <li>Project by: <strong>Shubham Group</strong></li>
          <li>Developer: <strong>Mr. Sumit Mantri</strong></li>
          <li>Marketed by: <strong>ENDLESS REALTY </strong></li>
          <li>Office: Caps Town, Indore, MP 452010</li>
        </ul>

        <p className="mt-4">
          📞 <strong>For booking & site visits, contact ENDLESS REALTY  today!</strong><br />
          📱 Call: +91 7314985600<br />
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

      {/* Map Section */}
      <div className="map-image-row">
        <img src="/arcadia/arcadia_map.jpg" alt="Map Location" />
        <img src="/arcadia/arcadia_map1.jpg" alt="Location Overview" />
      </div>
      <Footer />
    </div>
  );
};

export default VrindavanDetails;