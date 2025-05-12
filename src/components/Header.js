import React, { useState,  } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  

  return (
    <header
      id="header"
      className={`w-full z-50 transition-all duration-300 $
        
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                Endless
              </span>
              <span className="text-3xl font-light ml-1">Realty</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a
              href="#properties"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Properties
            </a>
            <a
              href="#cities"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Cities
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-button"
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-white shadow-lg rounded-lg p-4 space-y-4"
          >
            <button
              id="close-menu-button"
              className="text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
            <a
              href="#properties"
              className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Properties
            </a>
            <a
              href="#cities"
              className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Cities
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;