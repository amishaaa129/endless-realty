// File: vrindavanDetails.jsx
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/footer';
import './vrindavan.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper/modules';
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
          src="/vrindavan/vrandavan_video.mp4"
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
        <h1>🌿 Vrindavan Premium — Affordable Luxury Living at CAT Road, Indore</h1>
        <h3>RERA Approved | By Vrindavan Group | Marketed by Endless Realty</h3>
        <p>
          Discover a perfect blend of affordability and premium lifestyle at Vrindavan Premium, an exclusive residential colony located on CAT Road near Surya Mandir, Indore. Developed by the trusted Vrindavan Group and marketed by Endless Realty, this RERA-approved project redefines quality living close to nature yet well-connected to the city.
        </p>

        <h3>📍 Prime Location</h3>
        <p>
          Situated strategically between Indore city and Pithampur Industrial Area, Vrindavan Premium offers unmatched connectivity, making it ideal for working professionals, families, and investors alike. The upcoming 6-lane Indore-Pithampur highway and proposed metro line will further enhance accessibility in the near future.
        </p>

        <h3>🏡 Project Highlights:</h3>
        <ul>
          <li>170+ East & West-facing plots</li>
          <li>Standard plot size: 1000 sq.ft. (20ft × 50ft)</li>
          <li>Wide internal roads for smooth traffic flow</li>
          <li>Underground electrification for a cleaner aesthetic</li>
          <li>High rental and resale demand in the area</li>
        </ul>

        <h3>📈 Investment Potential</h3>
        <p>
          With the ongoing development in the vicinity and upcoming infrastructure projects, Vrindavan Premium promises an estimated ROI of 20–22% annually, making it a smart choice for real estate investors.
        </p>

        <h3>🎓 Education & Institutions Nearby:</h3>
        <ul>
          <li>Schools: St. Norbert School, Golden International School</li>
          <li>Colleges: IIM Indore, IIST College, LNCT Indore Campus</li>
        </ul>

        <h3>🛕 Temples & Connectivity:</h3>
        <ul>
          <li>Nearby religious landmarks: Surya Mandir & Ranjit Hanuman Mandir</li>
          <li>Railway Stations: Rau & Rajendra Nagar – just 3.5 km away</li>
        </ul>

        <h3>🛍️ Lifestyle & Essentials:</h3>
        <ul>
          <li>Daily need shops within 1 km</li>
          <li>D-Mart and Kalyan Mart – within 3 km</li>
          <li>2 existing multiplexes and 3–4 upcoming shopping malls (completion expected within 2 years)</li>
        </ul>

        <p>
          Vrindavan Premium isn't just a colony—it's a vision of better living backed by trusted developers and future-ready infrastructure. Whether you’re looking to build your dream home or make a solid investment, this is the opportunity you’ve been waiting for.
        </p>

        <p>
          🔗 <strong>For booking & site visits, connect with Endless Realty today!</strong><br />
          📞 Call: 70005-66820 / 87707-02367<br />
          🌐 <a href="https://www.endlessrealty.in" target="_blank" rel="noopener noreferrer">www.endlessrealty.in</a><br />
          📱 Follow us on Facebook & Instagram
        </p>
      </div>

      {/* Swiper Image Gallery */}
      <div className="swiper-container">
        <Swiper
          modules={[ Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          
        >
          {[1, 2, 3, 4, 5].map((num) => (
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