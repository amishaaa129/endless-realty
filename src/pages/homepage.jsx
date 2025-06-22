import React, { useState } from 'react';
import '../styles/styles.css';
import { Link } from 'react-router-dom';
import useScrollAnimations from '../hooks/useScrollAnimations';
import CarouselComponent from '../components/swiper';




const App = () => {
  useScrollAnimations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (






    <header id="header" className="w-full z-50 transition-all duration-300">
      <div className="containe  r mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Endless</span>
              <span className="text-3xl font-light ml-1">Realty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a href="#properties" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Properties
            </a>
            <div className="relative">
              <a
                href="#cities"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition flex items-center"
              >
                Locations
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </a>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                  {["Khandwa Road","Silicon City","Rau","Mhow","Pithampur","CAT Road","Super Corridor","Nipania","Ujjain Road","AB Bypass Road","Kanandia Road","Vijay Nagar"].map((city) => (
                    <Link
                      key={city}
                      to={city === "Rau" ? "/rau" : city === "Pithampur" ? "/pithampur" : "/cities"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about-us" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              About Us

            </Link>

            <a href="/features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Features
            </a>




            <Link to="/our-associates" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Our Associates
            </Link>
            <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
          </nav>

          <div className="flex items-center">

            <Link
              to="/signin"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Sign In
            </Link>

            <button
              id="mobile-menu-button"
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>


      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 md:hidden"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-medium">Menu</span>
            <button
              id="close-menu-button"
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="py-4">
            {['Properties', 'Cities', 'About Us', 'Features', 'Our Associates', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item}
              </Link>
            ))}
            <div className="px-4 py-4 border-t">
              <Link
                to="/signin"
                className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                SignIn
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black/65 via-black/50 to-transparent bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"></h1>
      </div>
      <section className="hero-gradient text-white py-32 md:py-40 relative overflow-hidden" syle={{ zIndex: 1 }}>
        <div className="animated-bg">

        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-blue-300 text-sm font-medium mb-6 fade-in">
              Indore's Premier Real Estate Platform
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 slide-in">
              Find Your Property with <span className="text-gradient">Endless</span> Realty
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 slide-in stagger-1">
              Discover premium properties with modern amenities and convenient locations at affordable prices
            </p>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 search-box-shadow slide-in stagger-2">
              <form className="flex flex-col md:flex-row">
                <div className="flex-1 mb-3 md:mb-0 md:mr-3">
                  <label className="block text-black text-sm font-medium mb-1 text-left pl-1">Location</label>
                  <select className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition">
                    <option value="" disabled selected>
                      Select Location
                    </option>
                    <option value="indore">Khandwa Road</option>
                    <option value="bhopal">Silicon City</option>
                    <option value="ujjain">Rau</option>
                    <option value="Rau">Mhow</option>
                    <option value="Dewas">Pithampur</option>
                    <option value="Pithampur">CAT Road</option>
                    <option value="CAT Road">Super Corridor</option>
                    <option value="Super Corridor">Nipania</option>
                    <option value="Nipania">Ujjain Road</option>
                    <option value="Ujjain Road">AB Bypass Road</option>
                    <option value="AB Bypass Road">Kanandia Road</option>
                    <option value="Kanandia Road">Vijay Nagar</option>
                  </select>
                </div>
                <div className="flex-1 mb-3 md:mb-0 md:mr-3">
                  <label className="block text-black text-sm font-medium mb-1 text-left pl-1">Property Type</label>
                  <select className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition">
                    <option value="" disabled selected>
                      Select Type
                    </option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="plot">Plot</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div className="flex-1 mb-3 md:mb-0 md:mr-3">
                  <label className="block text-black text-sm font-medium mb-1 text-left pl-1">Budget</label>
                  <select className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition">
                    <option value="" disabled selected>
                      Select Budget
                    </option>
                    <option value="0-30">Under ₹30 Lakhs</option>
                    <option value="30-50">₹30-50 Lakhs</option>
                    <option value="50-80">₹50-80 Lakhs</option>
                    <option value="80-100">₹80 Lakhs-1 Crore</option>
                    <option value="100+">Above ₹1 Crore</option>
                  </select>
                </div>
                <div className="md:self-end">
                  <button className="w-full md:w-auto px-8 py-3 btn-gradient text-white rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center">
                    <i className="fas fa-search mr-2"></i> Search
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg bounce-in stagger-1">
                <div className="text-4xl font-bold text-gradient mb-2">10+</div>
                <div className="text-sm font-medium text-gray-200">Cities</div>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg bounce-in stagger-2">
                <div className="text-4xl font-bold text-gradient mb-2">50+</div>
                <div className="text-sm font-medium text-gray-200">Projects</div>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg bounce-in stagger-3">
                <div className="text-4xl font-bold text-gradient mb-2">3000+</div>
                <div className="text-sm font-medium text-gray-200">Happy Families</div>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg bounce-in stagger-4">
                <div className="text-4xl font-bold text-gradient mb-2">98%</div>
                <div className="text-sm font-medium text-gray-200">Customer Satisfaction</div>
              </div>
            </div>
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 slide-in stagger-5">
              <a
                href="#virtual-tour"
                className="flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              >
                <i className="fas fa-vr-cardboard mr-2"></i>
                Take a Virtual Tour
              </a>
              <a href="#contact" className="flex items-center justify-center">
                <span className="text-white font-medium">Talk to an Expert</span>
                <i className="fas fa-long-arrow-alt-right ml-2 text-blue-300"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm font-light mb-2">Scroll to explore</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </div>
        </div>
      </section>
      {/* Featured Properties */}

      <section id="properties" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our selection of premium properties in Tier 2 cities with world-class amenities and excellent
              connectivity
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Property Card 1 */}
          <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1705955463252-e3f670e4041b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Ace Green Valley"
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-3 rounded-md text-sm font-medium">
                Featured
              </div>
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
                <span className="text-white font-bold text-xl px-4 pb-3">Ace Green Valley</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                <span>MR-10, Near IT Park, Indore</span>
              </div>
              <div className="flex justify-between mb-4 text-sm">
                <div className="flex items-center">
                  <i className="fas fa-bed mr-1 text-blue-600"></i>
                  <span>2 & 3 BHK</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                  <span>1100-1550 sq.ft.</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-building mr-1 text-blue-600"></i>
                  <span>RERA Approved</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-500 text-sm">Starting at</span>
                  <div className="text-xl font-bold text-gray-900">₹38.5 Lakhs</div>
                </div>
                <a
                  href="#"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>

          {/* Property Card 2 */}
          <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                alt="Infinite Heights"
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 m-3 rounded-md text-sm font-medium">
                Ready to Move
              </div>
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
                <span className="text-white font-bold text-xl px-4 pb-3">Infinite Heights</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                <span>Vijay Nagar, Indore</span>
              </div>
              <div className="flex justify-between mb-4 text-sm">
                <div className="flex items-center">
                  <i className="fas fa-bed mr-1 text-blue-600"></i>
                  <span>3 & 4 BHK</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                  <span>1650-2200 sq.ft.</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-building mr-1 text-blue-600"></i>
                  <span>RERA Approved</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-500 text-sm">Starting at</span>
                  <div className="text-xl font-bold text-gray-900">₹65.8 Lakhs</div>
                </div>
                <a
                  href="#"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
          {/* Property Card 3 */}
          <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Royal Meadows"
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 m-3 rounded-md text-sm font-medium">
                Premium
              </div>
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
                <span className="text-white font-bold text-xl px-4 pb-3">Royal Meadows</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                <span>AB Road, Near MR9, Indore</span>
              </div>
              <div className="flex justify-between mb-4 text-sm">
                <div className="flex items-center">
                  <i className="fas fa-bed mr-1 text-blue-600"></i>
                  <span>4 BHK</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                  <span>2200-2800 sq.ft.</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-building mr-1 text-blue-600"></i>
                  <span>RERA Approved</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-500 text-sm">Starting at</span>
                  <div className="text-xl font-bold text-gray-900">₹95.5 Lakhs</div>
                </div>
                <a
                  href="#"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Property Card 2 */}
        <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1590169834934-297bdaa63590?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Infinite Heights"
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 m-3 rounded-md text-sm font-medium">
              Ready to Move
            </div>
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
              <span className="text-white font-bold text-xl px-4 pb-3">Shiv City</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
              <span>Near Silicon City, Indore</span>
            </div>
            <div className="flex justify-between mb-4 text-sm">
              <div className="flex items-center">
                <i className="fas fa-bed mr-1 text-blue-600"></i>
                <span>3 & 4 BHK</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                <span>1650-2200 sq.ft.</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-building mr-1 text-blue-600"></i>
                <span>RERA Approved</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-500 text-sm">Starting at</span>
                <div className="text-xl font-bold text-gray-900">₹65.8 Lakhs</div>
              </div>
              <a
                href="#"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
        {/* Property Card 3 */}
        <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Royal Meadows"
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 m-3 rounded-md text-sm font-medium">
              Premium
            </div>
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
              <span className="text-white font-bold text-xl px-4 pb-3">Star City</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
              <span>Near Silicon City, Indore</span>
            </div>
            <div className="flex justify-between mb-4 text-sm">
              <div className="flex items-center">
                <i className="fas fa-bed mr-1 text-blue-600"></i>
                <span>4 BHK</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                <span>2200-2800 sq.ft.</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-building mr-1 text-blue-600"></i>
                <span>RERA Approved</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-500 text-sm">Starting at</span>
                <div className="text-xl font-bold text-gray-900">₹95.5 Lakhs</div>
              </div>
              <a
                href="#"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
              >
                View Details
              </a>
            </div>
          </div>
        </div>


        {/* View All Properties Button */}
        <div className="text-center mt-12">
          <Link
            to="/allproperties"
            className="inline-flex items-center px-8 py-4 text-base font-semibold rounded-xl text-blue-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-300 bg-transparent"
          >
            View All Properties
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </Link>
        </div>
        <section className="text-white bg-white py-32 md:py-40 relative">
          <div><CarouselComponent /></div>
        </section>
      </section>

      <section id="cities" className="py-24 bg-gradient-to-r from-blue-600 to-indigo-800 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute w-96 h-96 rounded-full bg-blue-400 opacity-10 -top-20 -left-20"></div>
          <div className="absolute w-80 h-80 rounded-full bg-indigo-500 opacity-10 bottom-10 right-10"></div>
          <div className="absolute w-40 h-40 rounded-full bg-blue-300 opacity-10 top-40 right-20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-300 font-semibold text-lg">Tier 2 Real Estate Hub</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore Growing Cities</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Discover our premium properties in India's most promising Tier 2 cities with excellent infrastructure and investment potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* City Card 1: Indore */}
            <a href="#" className="block group">
              <div className="relative rounded-xl overflow-hidden shadow-xl h-80 transition-transform duration-500 group-hover:-translate-y-2">
                <img
                  src="https://images.unsplash.com/photo-1559585888-6b01c8ea796b?q=80&w=2094&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Indore"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-3 inline-block">
                    <span className="text-white/90 text-sm font-medium">8 Projects</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Indore</h3>
                  <p className="text-blue-100 mb-4">Financial capital of MP with IT Parks & Smart City initiatives</p>
                  <div className="flex items-center text-blue-300 text-sm font-medium transition group-hover:text-white">
                    <span>View Properties</span>
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* City Card 2: Bhopal */}
            <a href="#" className="block group">
              <div className="relative rounded-xl overflow-hidden shadow-xl h-80 transition-transform duration-500 group-hover:-translate-y-2">
                <img
                  src="https://img.staticmb.com/mbcontent/images/crop/uploads/2024/5/famous-places-in-bhopal_0_1200.jpg"
                  alt="Bhopal"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-3 inline-block">
                    <span className="text-white/90 text-sm font-medium">6 Projects</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Bhopal</h3>
                  <p className="text-blue-100 mb-4">City of Lakes with expanding tech hubs & cultural heritage</p>
                  <div className="flex items-center text-blue-300 text-sm font-medium transition group-hover:text-white">
                    <span>View Properties</span>
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* City Card 3: Ujjain */}
            <a href="#" className="block group">
              <div className="relative rounded-xl overflow-hidden shadow-xl h-80 transition-transform duration-500 group-hover:-translate-y-2">
                <img
                  src="https://images.unsplash.com/photo-1699949967693-9b0084730462?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Ujjain"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-3 inline-block">
                    <span className="text-white/90 text-sm font-medium">4 Projects</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">Ujjain</h3>
                  <p className="text-blue-100 mb-4">Heritage city with growing infrastructure & tourism potential</p>
                  <div className="flex items-center text-blue-300 text-sm font-medium transition group-hover:text-white">
                    <span>View Properties</span>
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* City Card 4: Rau */}
          <a href="#" className="block group">
            <div className="relative rounded-xl overflow-hidden shadow-xl h-80 transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/427337605.jpg?k=450e656f6a4b9c89aad86a76e99675484562b31d6f6eec5b2769ecec68fd6660&o=&hp=1"
                alt="Rau"
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-3 inline-block">
                  <span className="text-white/90 text-sm font-medium">5 Projects</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Rau</h3>
                <p className="text-blue-100 mb-4">
                  Pink City with booming tourism and expanding IT sectors
                </p>
                <div className="flex items-center text-blue-300 text-sm font-medium transition group-hover:text-white">
                  <span>View Properties</span>
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </a>

          {/* City Card 5: Dewas */}
          <a href="#" className="block group">
            <div className="relative rounded-xl overflow-hidden shadow-xl h-80 transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src="https://www.thebharatah.in/wp-content/uploads/2019/01/10205518896_a70ea1c600_b.jpg"
                alt="Dewas"
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-3 inline-block">
                  <span className="text-white/90 text-sm font-medium">7 Projects</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Dewas</h3>
                <p className="text-blue-100 mb-4">
                  Planned city with high quality of life and strong infrastructure
                </p>
                <div className="flex items-center text-blue-300 text-sm font-medium transition group-hover:text-white">
                  <span>View Properties</span>
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="flex items-center mt-8 text-blue-500 text-sm font-medium">
          <span>Explore All 10+ Cities</span>
          <svg
            className="ml-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </div>
      </section>
      <section id="features" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-50 rounded-full opacity-50"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 slide-in stagger-1">
              Experience Luxury Living
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto slide-in stagger-2">
              Our properties offer premium features and amenities designed for modern, comfortable living in Tier 2 cities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="feature-card group p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 slide-in-left">
              <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center text-blue-600 bg-blue-50 text-2xl mb-6">
                <i className="fas fa-swimming-pool"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Premium Amenities
              </h3>
              <p className="text-gray-600">
                Enjoy swimming pools, clubhouse, gyms, and landscaped gardens in all our premium properties
              </p>
              <div className="mt-5 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300">
                <span>Learn more</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-card group p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 slide-in">
              <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center text-blue-600 bg-blue-50 text-2xl mb-6">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Gated Security
              </h3>
              <p className="text-gray-600">
                24/7 security with CCTV monitoring, gated entrances, and secure access control for peace of mind
              </p>
              <div className="mt-5 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300">
                <span>Learn more</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="feature-card group p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 slide-in-right">
              <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center text-blue-600 bg-blue-50 text-2xl mb-6">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Prime Locations
              </h3>
              <p className="text-gray-600">
                Strategically located near IT parks, schools, hospitals and shopping centers with excellent connectivity
              </p>
              <div className="mt-5 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300">
                <span>Learn more</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="feature-card group p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 slide-in-left stagger-1">
              <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center text-blue-600 bg-blue-50 text-2xl mb-6">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Eco-Friendly Design
              </h3>
              <p className="text-gray-600">
                Sustainable architecture with solar power, rainwater harvesting, and green spaces for cleaner living
              </p>
              <div className="mt-5 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300">
                <span>Learn more</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="feature-card group p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 slide-in stagger-1">
              <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center text-blue-600 bg-blue-50 text-2xl mb-6">
                <i className="fas fa-home"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Smart Homes
              </h3>
              <p className="text-gray-600">
                Advanced home automation systems with smart security, climate control, and energy management
              </p>
              <div className="mt-5 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300">
                <span>Learn more</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="feature-card group p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 slide-in-right stagger-1">
              <div className="feature-icon w-16 h-16 rounded-full flex items-center justify-center text-blue-600 bg-blue-50 text-2xl mb-6">
                <i className="fas fa-rupee-sign"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Affordable Luxury
              </h3>
              <p className="text-gray-600">
                Premium properties at competitive prices with flexible payment plans and financing options
              </p>
              <div className="mt-5 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300">
                <span>Learn more</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link
              to="/features"
              className="inline-flex items-center px-8 py-4 btn-gradient text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Explore All Amenities
            </Link>
          </div>
        </div>
      </section>
      <section id="why-tier2" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0 slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Why Invest in cities like Indore?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                These cities are emerging as the next big investment destination with significant advantages over metropolitan areas.
              </p>

              <div className="space-y-5">
                {[
                  {
                    iconClass: "fas fa-chart-line",
                    bgColor: "bg-green-100",
                    textColor: "text-green-600",
                    title: "Higher ROI Potential",
                    description:
                      "Properties in Tier 2 cities offer 15-20% higher returns compared to metro cities due to lower entry prices and rapid development.",
                  },
                  {
                    iconClass: "fas fa-building",
                    bgColor: "bg-blue-100",
                    textColor: "text-blue-600",
                    title: "Infrastructure Growth",
                    description:
                      "Government initiatives like Smart City Mission are transforming Tier 2 cities with modern infrastructure and connectivity.",
                  },
                  {
                    iconClass: "fas fa-laptop",
                    bgColor: "bg-purple-100",
                    textColor: "text-purple-600",
                    title: "IT & Business Hubs",
                    description:
                      "Major companies are establishing offices in Tier 2 cities, creating employment opportunities and driving real estate demand.",
                  },
                  {
                    iconClass: "fas fa-heart",
                    bgColor: "bg-yellow-100",
                    textColor: "text-yellow-600",
                    title: "Better Quality of Life",
                    description:
                      "Less congestion, lower pollution, and more space offer a healthier and more balanced lifestyle compared to metro cities.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center ${item.textColor} mr-4`}
                    >
                      <i className={item.iconClass}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <a
                  href="#investment-guide"
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  Download Investment Guide
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="lg:w-1/2 slide-in-right">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-lg rotate-6"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-yellow-100 rounded-lg -rotate-6"></div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                  <img src="" alt="Tier 2 City Growth" className="w-full h-auto" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Growth Comparison: 2023-2024</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-3xl font-bold text-white">15.8%</div>
                        <div className="text-sm text-blue-200">Tier 2 Property Appreciation</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-3xl font-bold text-white">8.3%</div>
                        <div className="text-sm text-blue-200">Metro Cities Appreciation</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-5 top-1/4 bg-white rounded-lg shadow-xl p-4 w-40 text-center transform rotate-6">
                  <div className="text-2xl font-bold text-blue-600">+62%</div>
                  <div className="text-sm text-gray-600">IT Job Growth</div>
                </div>

                <div className="absolute -left-5 bottom-1/4 bg-white rounded-lg shadow-xl p-4 w-40 text-center transform -rotate-6">
                  <div className="text-2xl font-bold text-green-600">+38%</div>
                  <div className="text-sm text-gray-600">Rental Yield</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="virtual-tour" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 slide-in-left">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 text-blue-300 text-sm font-medium mb-6">
                Virtual Experience
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Our Properties Virtually</h2>
              <p className="text-xl text-gray-300 mb-8">
                Take an immersive 3D tour of our properties from the comfort of your home. Explore every corner, visualize the spaces, and imagine your future lifestyle.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: "fas fa-vr-cardboard", text: "Immersive 360° property walkthroughs" },
                  { icon: "fas fa-ruler-combined", text: "Interactive floor plans with measurements" },
                  { icon: "fas fa-couch", text: "Virtual furniture placement" },
                  { icon: "fas fa-sun", text: "Daytime and nighttime lighting visualization" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center text-blue-300 mr-4">
                      <i className={item.icon}></i>
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-6 py-3 btn-gradient rounded-full flex items-center justify-center">
                  <i className="fas fa-vr-cardboard mr-2"></i>
                  Start Virtual Tour
                </button>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  Schedule Site Visit
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 slide-in-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Virtual Tour"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-gray-900 text-white py-10 mt-12">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-6">
              <a href="#" className="text-3xl font-bold text-blue-400">
                Endless Realty
              </a>
              <p className="text-gray-400 mt-2">Your trusted real estate partner for Tier 2 cities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/properties" className="text-gray-400 hover:text-blue-400">
                      Properties
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-blue-400">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-400 hover:text-blue-400">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Contact Us</h4>
                <p className="text-gray-400">401-405, Infinity Tower, MG Road, Indore, MP 452010</p>
                <p className="text-gray-400">Email: sales@endlessrealty.com</p>
                <p className="text-gray-400">Phone: +91 731 498 5600</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-100 mb-4">Follow Us</h4>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm">&copy; 2025 Endless Realty. All rights reserved.</p>
          </div>
        </footer>

        <div className="mt-16 w-full text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-bold text-gray-900 mb-1">Indore Head Office</h4>
              <p className="text-gray-600">Caps Town, Indore, MP 452010</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-bold text-gray-900 mb-1">Bhopal Office</h4>
              <p className="text-gray-600">203, Platinum Plaza, Zone-II, MP Nagar, Bhopal, MP 462011</p>
            </div>
          </div>
        </div>


      </section>
    </header>


  );
};

export default App;