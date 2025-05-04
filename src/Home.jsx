import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-cover bg-center h-screen text-white flex items-center justify-center" style={{ backgroundImage: "url('img/bg1.jpg')" }}>
        <div className="bg-black bg-opacity-60 p-8 rounded-lg text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Home Today</h1>
          <p className="text-lg">Discover properties in Indore, Bhopal, Ujjain, Dewas & Rau</p>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-16 bg-white text-gray-800">
        <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Verified Listings</h3>
            <p>All our properties are thoroughly verified for your peace of mind.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
            <p>Our agents are local experts ready to help you every step of the way.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Affordable Choices</h3>
            <p>Explore properties that fit your budget and lifestyle.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Search Now</h2>
        <p className="mb-6">Explore listings in your favorite Tier 2 city with Endless Realty.</p>
        <button className="bg-white text-blue-600 px-6 py-3 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
          View Listings
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Endless Realty. All rights reserved.</p>
      </footer>
    </div>
  );
}
