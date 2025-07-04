// File: vrindavanDetails.jsx
import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './tsv.css';
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
          src="/vrindavan/vrandavan_video.mp4"
          title="Property Video"
          autoPlay
          muted
          loop
          playsInline
          className="video-player"
        />
      </div> */}

      {/* Property Content Section */}
      <div className="property-info-section">
        <h1>🌳 Treasure Shubham – Vihar (TSV Asrawad, Bicholi)</h1>
        <h3>Spacious 3200 Sq.ft. Plot | Peaceful Living | Excellent Connectivity</h3>
        <p>
          Located in the serene and upcoming area of Asrawad-Bicholi, Treasure Shubham – Vihar (TSV) offers a rare opportunity to own a large residential plot in Indore with modern landscaping and spiritual harmony. Ideal for families looking for a balance of space, greenery, and proximity to the city.
        </p>

        <h3>📐 Plot Size</h3>
        <p>
          Each plot spans a generous <strong>3200 sq.ft.</strong>, offering ample space for your dream home, lawn, and future expansion.
        </p>

        <h3>🏞️ Amenities</h3>
        <ul>
          <li>Temple for spiritual wellness</li>
          <li>Front plot boundary wall (Front Facia)</li>
          <li>Lushgreen landscaped gardens</li>
          <li><strong>1 Acre Central Park</strong> at the heart of the project</li>
        </ul>

        <h3>📍 Location Advantage</h3>
        <p>
          Located just <strong>6.8 km from the Bypass</strong>, near Vidyasagar School, Indore. The site ensures peace and greenery while being well connected to urban amenities and key areas of the city.
        </p>

        

        <p className="mt-4">
          📞 <strong>For booking & site visits, contact ENDLESS REALTY  today!</strong><br />
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

      {/* Map Section */}
      <div className="map-image">
        <img src="/tsv/tsv_map.png" alt="Map Location" />
      </div>
      <Footer />
    </div>
  );
};

export default VrindavanDetails;