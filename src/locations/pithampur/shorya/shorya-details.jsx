import React from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import './shorya.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ShoryaDetails = () => {
  return (
    <div>
      <Header />

      

      {/* Property Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          SHOURYA VIHAR — Proposed Project
        </h2>

        <div className="property-info-section space-y-6 text-gray-800 text-lg leading-relaxed">
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              🏡 Shourya Vihar — A Promising Township Near Medi-Caps, Indore
            </h1>
            <h3 className="text-xl text-blue-700 font-medium mb-3">
              By Balaji Realty | Exclusively Marketed by Endless Realty
            </h3>
            <p>
              Shourya Vihar is an upcoming residential township located in the
              fast-developing AB Road corridor near Medi-Caps International
              School, Indore. Developed by Balaji Realty and marketed exclusively
              by Endless Realty, this project is designed for peaceful living,
              future growth, and long-term value.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">🚇 Strategic Location</h3>
            <p>
              Positioned close to the proposed Indore–Pithampur Metro Route and
              along the expanded Agra-Mumbai Highway, Shourya Vihar offers a
              smart investment opportunity with significant potential for
              appreciation in the coming years.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">🏗️ Project Highlights:</h3>
            <ul className="list-disc pl-6">
              <li>✅ Wide Internal Roads</li>
              <li>✅ Luscious Green Landscaping</li>
              <li>✅ Underground Electrification</li>
              <li>✅ Clean, Modern Infrastructure</li>
              <li>✅ Gated Colony</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">👨‍👩‍👧‍👦 Ideal For</h3>
            <p>
              Families looking for a peaceful residential environment and
              investors seeking long-term value and appreciation.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">📍 Location Benefits</h3>
            <ul className="list-disc pl-6">
              <li>Close to Medi-Caps International School and other institutions</li>
              <li>Near major industrial zones</li>
              <li>Excellent connectivity to Rau, Pithampur, and Indore</li>
              <li>Proximity to Outer Ring Road and upcoming infrastructure</li>
            </ul>
          </div>

          <div>
            <p>
              Shourya Vihar is not just a location—it’s a future-ready investment
              in quality living. Backed by strategic location and modern
              planning, this township is poised for rapid development.
            </p>
          </div>

          <div className="mt-6">
            <p>
              🔗 <strong>For booking & inquiries, connect with Endless Realty today!</strong>
              <br />
              📞 Call: <a href="tel:7000566820" className="text-blue-600">70005-66820</a> /{' '}
              <a href="tel:8770702367" className="text-blue-600">87707-02367</a>
              <br />
              🌐 Website:{' '}
              <a
                href="https://www.endlessrealty.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                www.endlessrealty.in
              </a>
              <br />
              📱 Follow us on Facebook & Instagram
            </p>
          </div>
        </div>
      </div>
      {/* Image Carousel */}
      <div className="swiper-container">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {[1, 2, 3, 4, 5, 6,  8, 9].map((num) => (
            <SwiperSlide key={num}>
              <img
                src={`/shorya/shorya${num}.jpeg`}
                alt={`Shorya Vihar ${num}`}
                className="swiper-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Footer />
    </div>
  );
};

export default ShoryaDetails;
