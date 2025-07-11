import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header id="header" className="w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
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
              <Link
                to ="#cities"
                onClick={(e) => {
                  e.preventDefault(); 
                  toggleDropdown();
                }}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition flex items-center"
              >
                Location
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </Link>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                  {["Silicon City","Rau","Mhow","Pithampur","CAT Road","Ujjain Road","AB Bypass Road","Bicholi"].map((city) => (
                    <Link
                      key={city}
                      to={city === "Rau" ? "/rau" : city === "CAT Road" ? "/Cat-road" : city === "Silicon City" ? "/silicon-city" :  city === "Pithampur" ? "/pithampur" :city === "Bicholi" ? "/bicholi" : city === "Ujjain Road" ? "/ujjain" : city === "AB Bypass Road" ? "/bypass" : city === "Mhow" ? "/mhow" : "/cities"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to ="/about-us" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              About Us
            </Link>
            <Link to ="/what's-new" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              What's New 
            </Link>
            <Link to ="/our-associates" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Our Associates
            </Link >
            <Link to ="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            <Link
              to ="/signin"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              SignIn
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
                  {["Silicon City", "Rau", "Mhow", "Pithampur", "CAT Road", "Ujjain Road", "AB Bypass Road", "Bicholi"].map((location) => (
                    <Link
                      key={location}
                      to={
                        location === "CAT Road"
                          ? "/location/cat-road"
                          : location === "Silicon City"
                          ? "/location/silicon-city"
                          : location === "Pithampur"
                          ? "/location/pithampur"
                          : location === "Mhow"
                          ? "/location/mhow"
                          : location === "Ujjain Road"
                          ? "/location/ujjain"
                          : location === "AB Bypass Road"
                          ? "/location/bypass"
                          : location === "Bicholi"
                          ? "/location/bicholi"
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
    </header>
  );
};

export default Header;