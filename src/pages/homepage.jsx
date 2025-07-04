import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';
import { Link } from 'react-router-dom';
import useScrollAnimations from '../hooks/useScrollAnimations';
import Footer from '../components/footer';




const App = () => {
  useScrollAnimations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  // State for filters
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.endlessrealty.in';

  const handleSearch = () => {
    // Convert budget to min and max values
    let min = 0;
    let max = 100000000; // 10 Cr
    if (budget === '0-30') [min, max] = [0, 3000000];
    else if (budget === '30-50') [min, max] = [3000000, 5000000];
    else if (budget === '50-80') [min, max] = [5000000, 8000000];
    else if (budget === '80-100') [min, max] = [8000000, 10000000];
    else if (budget === '100+') [min, max] = [10000000, 100000000];

    // Navigate to /search with query params
    navigate(`/search?city=${city}&type=${type}&min=${min}&max=${max}`);
  };

  return (






    <header id="header" className="w-full z-50 transition-all duration-300">
      <div className="containe  r mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Endless Realty Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/properties" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Properties
            </Link>
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
                  {["Khandwa Road", "Silicon City", "Rau", "Mhow", "Pithampur", "CAT Road", "Super Corridor", "Nipania", "Ujjain Road", "AB Bypass Road", "Kanandia Road", "Bicholi"].map((city) => (
                    <Link
                      key={city}
                      to={city === "Rau" ? "/rau" : city === "CAT Road" ? "/cat-road" : city === "Silicon City" ? "/silicon-city" : city === "Pithampur" ? "/pithampur" : "/cities"}
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

            <a href="/what's-new" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              What's New
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
            {['Properties', 'About Us', "What's New", 'Our Associates', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item}
              </Link>
            ))}
            {/* Location Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  console.log('Dropdown toggled');
                  setIsLocationDropdownOpen(!isLocationDropdownOpen);
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Location
              </button>
              {isLocationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {["Khandwa Road", "Silicon City", "Rau", "Mhow", "Pithampur", "CAT Road", "Super Corridor", "Nipania", "Ujjain Road", "AB Bypass Road", "Kanandia Road", "Bicholi"].map((location) => (
                    <Link
                      key={location}
                      to={
                        location === "CAT Road"
                          ? "/location/cat-road"
                          : location === "Silicon City"
                            ? "/location/silicon-city"
                            : location === "Pithampur"
                              ? "/location/pithampur"
                              : location === "Rau"
                                ? "/location/rau"
                                : `/location/${location.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {location}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
      <div
        className="bg-gradient-to-b from-black/65 via-black/50 to-transparent bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Cards Container - Responsive Layout */}
        <div className="p-4 sm:absolute sm:inset-0 sm:p-0 z-30 relative">
          <div className="flex flex-col space-y-4 sm:hidden">
            {/* Mobile: Stacked Cards */}
            <div className="bg-gradient/30 backdrop-blur-md text-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <h2 className="text-lg font-bold mb-2 text-blue-300">Realty Alliance</h2>
              <ul className="list-disc list-inside mt-2">
                <li className="text-base">
                  <Link to="/cat-road">Vrindavan Premium</Link>
                </li>
                <li className="text-base">
                  <Link to="/pithampur">Balaji Realty</Link>
                </li>
                <li className="text-base">
                  <Link to="/shubham">Shubham Buildcon</Link>
                </li>
              </ul>
            </div>
            <div className="bg-gradient/30 backdrop-blur-md text-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <h2 className="text-lg font-bold mb-2 text-blue-300">CALL US NOW</h2>
              <div className="text-base flex items-center mt-2">
                <i className="fas fa-phone-alt mr-2 text-blue-300"></i>
                <a href="tel:+918989941900">+91 89899 41900</a>
              </div>
            </div>
          </div>
          
          {/* Desktop: Absolute Positioned Cards */}
          <div className="hidden sm:block">
            <div className="absolute top-10 left-10 bg-black/30 backdrop-blur-md text-white p-6 rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:scale-105">
              <h2 className="text-xl font-bold mb-2 text-blue-300">Realty Alliance</h2>
              <ul className="list-disc list-inside mt-4">
                <li className="text-lg">
                  <Link to="/cat-road">Vrindavan Premium</Link>
                </li>
                <li className="text-lg">
                  <Link to="/pithampur">Balaji Realty</Link>
                </li>
                <li className="text-lg">
                  <Link to="/shubham">Shubham Buildcon</Link>
                </li>
              </ul>
            </div>
            <div className="absolute top-10 right-10 bg-black/30 backdrop-blur-md text-white p-6 rounded-lg shadow-lg max-w-xs transform transition-transform duration-300 hover:scale-105">
              <h2 className="text-xl font-bold mb-2 text-blue-300">CALL US NOW</h2>
              <div className="text-lg flex items-center mt-4">
                <i className="fas fa-phone-alt mr-2 text-blue-300"></i>
                <a href="tel:+918989941900">+91 89899 41900</a>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"></h1>
      </div>
      <section className="hero-gradient text-white py-32 md:py-40 relative overflow-hidden" style={{ zIndex: 1 }}>
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
                  <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition">
                    <option value="" disabled selected>
                      Select Location
                    </option>
                    <option value="khandwa-road">Khandwa Road</option>
                    <option value="silicon-city">Silicon City</option>
                    <option value="rau">Rau</option>
                    <option value="mhow">Mhow</option>
                    <option value="pithampur">Pithampur</option>
                    <option value="cat-road">CAT Road</option>
                    <option value="super-corridor">Super Corridor</option>
                    <option value="nipania">Nipania</option>
                    <option value="ujjain-road">Ujjain Road</option>
                    <option value="ab-bypass-road">AB Bypass Road</option>
                    <option value="kanandia-road">Kanandia Road</option>
                    <option value="bicholi">Bicholi</option>
                  </select>
                </div>
                <div className="flex-1 mb-3 md:mb-0 md:mr-3">
                  <label className="block text-black text-sm font-medium mb-1 text-left pl-1">Property Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition">
                    <option value="" disabled selected>
                      Select Type
                    </option>
                    <option value="apartment">Apartment</option>
                    <option value="row-houses">Row Houses</option>
                    <option value="plot">Plot</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div className="flex-1 mb-3 md:mb-0 md:mr-3">
                  <label className="block text-black text-sm font-medium mb-1 text-left pl-1">Budget</label>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full px-4 py-3 rounded-lg text-gray-700 border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition">
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
                  <button type="button"
                    onClick={handleSearch} className="w-full md:w-auto px-8 py-3 btn-gradient text-white rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center">
                    <i className="fas fa-search mr-2"></i> Search
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
              
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg bounce-in stagger-2">
                <div className="text-4xl font-bold text-gradient mb-2">50+</div>
                <div className="text-sm font-medium text-gray-200">Projects Completed</div>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg bounce-in stagger-3">
                <div className="text-4xl font-bold text-gradient mb-2">300+</div>
                <div className="text-sm font-medium text-gray-200">Happy Families</div>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg bounce-in stagger-4">
                <div className="text-4xl font-bold text-gradient mb-2">500+</div>
                <div className="text-sm font-medium text-gray-200">Monthly Active Users</div>
              </div>
            </div>
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 slide-in stagger-5">

              <a href="tel:+918989941900" className="flex items-center justify-center">
                <span className="text-white font-medium">Talk to an Expert</span>
                <span className="text-white font-medium ml-2">+91 89899 41900</span>
                <i className="fas fa-phone ml-2 text-blue-300"></i>
              </a>
            </div>
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
        <div className=" justify-centre pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Property Card 1 */}
            <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src="/images/rau.jpeg"
                  alt="Rau"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 m-3 rounded-md text-sm font-medium">
                  Sold Out
                </div>
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
                  <span className="text-white font-bold text-xl px-4 pb-3">Silicon City Property</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                  <span>Silicon City Phase 1, Rau</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  <div className="flex items-center">
                    <i className="fas fa-bed mr-1 text-blue-600"></i>
                    <span>4 BHK</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                    <span>2000 sq.ft.</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-building mr-1 text-blue-600"></i>
                    <span>RERA Approved</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-xl font-bold text-gray-900">Sold Out</div>
                  </div>
                  <Link
                    to="/rau"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </Link>
                </div>
                {/* Marketed By */}
                <div className="text-sm text-gray-500 mb-2">
                  <span className="font-medium text-gray-700">Marketed By:</span> Endless Realty
                </div>
                {/* Developed By */}
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Developed By:</span> Rachit Homes
                </div>
              </div>
            </div>

            {/* Property Card 2 */}
            <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src="/images/vrindavan.png"
                  alt="Vrindavan premium"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 m-3 rounded-md text-sm font-medium">
                  Ready to Move
                </div>
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
                  <span className="text-white font-bold text-xl px-4 pb-3">Vrindavan Premium Row Houses</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                  <span>RR Cat , Indore</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  <div className="flex items-center">
                    <i className="fas fa-bed mr-1 text-blue-600"></i>
                    <span>3 & 4 BHK</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                    <span>1000 sq.ft.</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-building mr-1 text-blue-600"></i>
                    <span>RERA Approved</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">Starting at</span>
                    <div className="text-xl font-bold text-gray-900">₹95 Lakhs</div>
                  </div>
                  <Link
                    to="/Cat-road"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              {/* Marketed By */}
              <div className="text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-700">Marketed By:</span> Endless Realty
              </div>
              {/* Developed By */}
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Developed By:</span> Vrindavan Group
              </div>
            </div>
            {/* Property Card 2 */}
            <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src="/images/silicon.jpeg"
                  alt="Vrindavan premium"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 m-3 rounded-md text-sm font-medium">
                  Sold Out
                </div>
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
                  <span className="text-white font-bold text-xl px-4 pb-3">Silicon City</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                  <span>Silicon City Near pulak city , gate no 2</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  <div className="flex items-center">
                    <i className="fas fa-bed mr-1 text-blue-600"></i>
                    <span>2 flat & 2 BHK</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                    <span>3500 sq.ft.</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-building mr-1 text-blue-600"></i>
                    <span>RERA Approved</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>

                    <div className="text-xl font-bold text-gray-900">Sold Out </div>
                  </div>
                  <Link
                    to="/silicon-premium"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              {/* Marketed By */}
              <div className="text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-700">Marketed By:</span> Endless Realty
              </div>
              {/* Developed By */}
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Developed By:</span> Rachit Homes
              </div>
            </div>
            <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src="/images/shorya.jpeg"
                  alt="Vrindavan premium"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 m-3 rounded-md text-sm font-medium">
                  UPCOMING
                </div>
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
                  <span className="text-white font-bold text-xl px-4 pb-3">Shourya Vihar</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                  <span>Shourya Vihar</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  <div className="flex items-center">
                    <i className="fas fa-bed mr-1 text-blue-600"></i>
                    <span>2 flat & 2 BHK</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                    <span>3500 sq.ft.</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-building mr-1 text-blue-600"></i>
                    <span>RERA Approved</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>

                    <div className="text-xl font-bold text-gray-900">UPCOMING </div>
                  </div>
                  <Link
                    to="/shorya-premium"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              {/* Marketed By */}
              <div className="text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-700">Marketed By:</span> Endless Realty
              </div>
              {/* Developed By */}
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Developed By:</span> Balaji Realty
              </div>
            </div>

          </div>

        </div>

        {/* View All Properties Button */}
        <div className="text-center mt-12">
          <Link
            to="/properties"
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

        </div>
      </section>
      {/* <section id="virtual-tour" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        
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
      </section> */}

      <Footer />
    </header>

  );
};
export default App;