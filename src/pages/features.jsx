import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
const Features = () => {
  return (
    <div>
      {/* Render the Header component */}
      <Header />

      <main className="py-10 px-4 md:px-12 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Activities',
              desc: 'Engage in a variety of activities designed to enhance your experience.',
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
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h2>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;