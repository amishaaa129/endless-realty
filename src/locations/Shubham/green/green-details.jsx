// File: vrindavanDetails.jsx
import React, { useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './green.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const VrindavanDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />

      {/* Constant Video Section */}
      {/* YouTube Video Section */}
      <div className="video-wrapper top-video">
        <div className="video-player aspect-w-16 aspect-h-9">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/d0_FZpX5unA?autoplay=1&mute=1&loop=1&playlist=d0_FZpX5unA"
            title="Property Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Property Content Section */}
      <div className="property-info-section">
        <h1>🏡 Premium West-Facing Bungalow in Shubham Greens – CAT Road, Indore</h1>
        <h3>Location: Near Surya Mandir | Gated Campus | Garden Facing</h3>
        <p>
          Discover refined living in this meticulously designed 3 BHK bungalow nestled in the serene surroundings of Shubham Greens, one of the most premium gated societies on CAT Road, Indore. Thoughtfully crafted with Vastu compliance and modern amenities, this home blends comfort, functionality, and elegance.
        </p>

        <h3>📐 Property Details</h3>
        <ul>
          <li><strong>Plot Area:</strong> 1100 Sq. Ft. (22x50)</li>
          <li><strong>Construction:</strong> Approx. 2700 Sq. Ft.</li>
          <li><strong>Demand:</strong> ₹1.28 Cr (Negotiable)</li>
        </ul>

        <h3>✨ Property Highlights</h3>
        <ul>
          <li>West Facing with appealing garden-facing view for ample natural light and positivity</li>
          <li>3 Master Bedrooms with attached bathrooms & walk-in wardrobes</li>
          <li>1 Bedroom on the Ground Floor for convenience</li>
          <li>2 Bedrooms on the First Floor</li>
          <li>3 Attached + 1 Common Bathroom</li>
          <li>Premium Modular Kitchen with smart storage solutions</li>
          <li>Dedicated Pooja Room designed as per Vastu principles</li>
          <li>First Floor Lounge Area – ideal for Library, Home Theater, Bar, or Study Room</li>
          <li>Mini Gazebo at the Terrace – perfect for evening relaxation</li>
          <li>Biometric Main Door Lock for enhanced security</li>
          <li>CCTV Surveillance with multiple camera points for complete safety</li>
        </ul>

        <p>
          This home offers an ideal blend of style and security in one of Indore’s rapidly developing zones. A perfect choice for families looking for luxury, privacy, and proximity to the city while staying close to nature and peace.
        </p>

        <p className="mt-4">
          📞 <strong>For more details or to schedule a visit, contact ENDLESS REALTY</strong><br />
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
      </div>

      {/* Map Section 
      <div className="map-image">
        <img src="/vrindavan/vrindavan-map.jpeg" alt="Map Location" />
      </div> */}
      <Footer />
    </div>
  );
};

export default VrindavanDetails;