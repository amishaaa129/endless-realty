import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                Endless
              </span>
              <span className="text-3xl font-light ml-1">Realty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link to="/cities" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Properties
            </Link>
            <div className="relative">
              <a
                href="#cities"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  toggleDropdown();
                }}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition flex items-center"
              >
                Cities
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
            <Link to ="/about-us" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              About Us
            </Link>
            <Link to ="/features" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Features
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
            {['Properties', 'Cities', 'About Us', 'Features', 'Our Associates', 'Contact'].map((item) => (
              <Link
                key={item}
                to ={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item}
              </Link>
            ))}
            <div className="px-4 py-4 border-t">
              <Link 
                to ="/signin"
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