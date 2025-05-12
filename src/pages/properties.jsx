import React from 'react';
import Header from '../components/Header'; 

const Properties = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <Header />

      <section className="hero-gradient text-white py-32 md:py-40 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                Find Your Dream Home with <span className="text-blue-400">Endless</span>Realty
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-200">
                Discover premium properties with modern amenities and convenient locations at affordable prices
              </p>

              {/* Search Box */}
              <div className="bg-white rounded-lg p-2 search-box-shadow slide-in">
                <form className="flex flex-col md:flex-row">
                  <div className="flex-1 mb-3 md:mb-0 md:mr-2">
                  <label className="block text-black text-sm font-medium mb-1 text-left pl-1">Location</label>
                    <select className="w-full px-4 py-3 rounded-md text-gray-700 border-0 focus:ring-blue-500">
                      <option value="" disabled selected>
                        Select City
                      </option>
                      <option value="indore">Indore</option>
                      <option value="bhopal">Bhopal</option>
                      <option value="ujjain">Ujjain</option>
                      <option value="Rau">Rau</option>
                      <option value="Dewas">Dewas</option>
                    </select>
                  </div>
                  <div className="flex-1 mb-3 md:mb-0 md:mr-2">
                  <label className="block text-black text-sm font-medium mb-1 text-left pl-1">Property Type</label>
                    <select className="w-full px-4 py-3 rounded-md text-gray-700 border-0 focus:ring-blue-500">
                      <option value="" disabled selected>
                        Select Type
                      </option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="plot">Plot</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                  <div className="flex-1 mb-3 md:mb-0 md:mr-2">
                  <label className="block text-black text-sm font-medium mb-1 text-left pl-1">Budget</label>
                    <select className="w-full px-4 py-3 rounded-md text-gray-700 border-0 focus:ring-blue-500">
                    
                      <option value="" disabled selected>
                        Budget
                      </option>
                      <option value="0-30">Under ₹30 Lakhs</option>
                      <option value="30-50">₹30-50 Lakhs</option>
                      <option value="50-80">₹50-80 Lakhs</option>
                      <option value="80-100">₹80 Lakhs-1 Crore</option>
                      <option value="100+">Above ₹1 Crore</option>
                    </select>
                  </div>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    <i className="fas fa-search mr-2"></i> Search
                  </button>
                </form>
              </div>

              {/* Quick Stats */}
              <div
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center slide-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="bg-black bg-opacity-30 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
                  <div className="text-3xl font-bold text-blue-400 mb-1">10+</div>
                  <div className="text-sm text-gray-200">Cities</div>
                </div>
                <div className="bg-black bg-opacity-30 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
                  <div className="text-3xl font-bold text-blue-400 mb-1">50+</div>
                  <div className="text-sm text-gray-200">Projects</div>
                </div>
                <div className="bg-black bg-opacity-30 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
                  <div className="text-3xl font-bold text-blue-400 mb-1">3000+</div>
                  <div className="text-sm text-gray-200">Happy Families</div>
                </div>
                <div className="bg-black bg-opacity-30 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
                  <div className="text-3xl font-bold text-blue-400 mb-1">98%</div>
                  <div className="text-sm text-gray-200">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
  );
};

export default Properties;