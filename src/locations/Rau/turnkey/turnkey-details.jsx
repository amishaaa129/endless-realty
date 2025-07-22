// File: vrindavanDetails.jsx
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './turnkey.css';
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
      {/* YouTube Video Section 
      <div className="video-wrapper top-video">
        <div className="video-player aspect-w-16 aspect-h-9">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/lrlZGgVedNc?autoplay=1&mute=1&loop=1&playlist=lrlZGgVedNc"
            title="Property Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Property Content Section */}
      <div className="property-info-section">
        <h1>🏡 Turnkey Villa @ Suncity – Phanda, Indore</h1>
        <h3>Developed by: Karmanya Constructions | Marketed by: Endless Realty</h3>
        <p>
          Discover luxury living in this fully furnished 3,900 sq.ft. independent villa built on a spacious 1,800 sq.ft. plot in the serene surroundings of Suncity Colony, Phanda. Thoughtfully designed with modern aesthetics, full home automation, and high-end interior work, this ready-to-move bungalow offers an elegant blend of style, comfort, and functionality.
        </p>

        <h3>📐 Property Details</h3>
        <ul>
          <li><strong>Plot Area:</strong> 1800 Sq. Ft. (30x60)</li>
          <li><strong>Construction:</strong> Approx. 3900 Sq. Ft.</li>
          <li><strong>Configuration:</strong> Independent Villa with full interiors & furnishing</li>
        </ul>

        <h3>✨ Interior Highlights</h3>
        <ul>
          <li>Modular Kitchen with modern fittings</li>
          <li>False Ceiling and designer TV panel</li>
          <li>Bed & Wardrobes in all rooms</li>
          <li>Elegant Sofa Set and Mandir Unit</li>
          <li>Biometric Locks & Video Door Phone for enhanced security</li>
          <li>Complete Home Automation for smart living</li>
        </ul>

        <h3>📍 Location Advantage</h3>
        <p>
          Located in Suncity Colony, Village Phanda — just off AB Bypass Road — the project is minutes away from Medicaps International School, making it an ideal home for families. The peaceful surroundings, green landscapes, and upcoming infrastructure make this a valuable residential and investment choice.
        </p>

        <h3>🗺️ Nearby Connectivity & Landmarks</h3>
        <ul>
          <li>🏫 Medicaps University – 2 min</li>
          <li>🏫 DPS Rau & Emerald Heights – 10–15 min</li>
          <li>🚉 Rau Railway Station – ~10 min</li>
          <li>🏭 Pithampur Industrial Area – 15–20 min</li>
          <li>🛣️ AB Bypass & Super Corridor – 5–10 min</li>
          <li>✈️ Indore Airport – 30 min via Super Corridor</li>
          <li>🏞️ Simcha Island Adventure Park – 10 min</li>
          <li>🛒 Local Markets & Medical Stores – Walking distance</li>
        </ul>

        <h3>✅ Why Choose Suncity, Phanda?</h3>
        <ul>
          <li>Peaceful surroundings with clean air and low congestion</li>
          <li>Fast-developing area near major educational & industrial hubs</li>
          <li>Excellent rental prospects due to proximity to Medicaps & Pithampur</li>
          <li>Perfect balance of nature and city life</li>
          <li>Move-in ready villa — no construction or interior delays</li>
        </ul>

        <p>
          Whether you're looking for a luxurious home or a smart investment, this turnkey villa in Suncity is an opportunity you don't want to miss.
        </p>

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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26].map((num) => (
            <SwiperSlide key={num}>
              <img
                src={`/turnkey/turnkey${num}.jpeg`}
                alt={`turnkey ${num}`}
                className="swiper-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Map Section */}
      <div className="map-image">
        <img src="/turnkey/turnkey-map1.png" alt="Map Location" />
        <img src="/turnkey/turnkey-map2.png" alt="Map Location" />
      </div>
      <Footer />
    </div>
  );
};

export default VrindavanDetails;