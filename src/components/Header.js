import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  // Define admin users
  const adminUsers = [
    { email: 'admin@gmail.com', name: 'Admin User' },
    { email: 'manager@endlessrealty.com', name: 'Manager' },
    { email: 'rohit@endlessrealty.com', name: 'Rohit Singhal' },
    { email: 'amisha@endlessrealty.com', name: 'Amisha' }
  ];

  // Check login status on component mount
  React.useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const storedUserData = localStorage.getItem('userData');
    if (loginStatus === 'true' && storedUserData) {
      const user = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setUserData(user);
      
      // Check if user is admin
      const isAdmin = adminUsers.some(adminUser => adminUser.email === user.email);
      setIsAdminUser(isAdmin);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    setShowLoginPopup(false);
    
    // Check if user is admin but don't auto-redirect - let them choose
    const isAdmin = adminUsers.some(adminUser => adminUser.email === userData.email);
    setIsAdminUser(isAdmin);
    
    // Admin users can access admin panel via direct URL /admin when needed
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setIsAdminUser(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
  };

  // Allow free navigation for all users
  const handleNavigation = (to) => {
    navigate(to);
  };

  // Handle navigation without restrictions
  const handleFreeNavigation = (e, to) => {
    e.preventDefault();
    navigate(to);
  };

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
            <a 
              href="/properties" 
              onClick={(e) => handleFreeNavigation(e, '/properties')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
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
              </a>
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
            <a 
              href="/about-us" 
              onClick={(e) => handleFreeNavigation(e, '/about-us')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              About Us
            </a>
            <a 
              href="/what's-new" 
              onClick={(e) => handleFreeNavigation(e, "/what's-new")}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              What's New 
            </a>
            <a 
              href="/our-associates" 
              onClick={(e) => handleFreeNavigation(e, '/our-associates')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Our Associates
            </a>
            <a 
              href="/contact" 
              onClick={(e) => handleFreeNavigation(e, '/contact')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  Hi, {userData?.name || 'User'}!
                </span>
                {isAdminUser && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/signin')}
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            )}
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
              <a
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => {
                  handleFreeNavigation(e, `/${item.toLowerCase().replace(/\s+/g, '-')}`);
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item}
              </a>
            ))}
            {/* Location Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
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
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700 px-4">
                    Hi, {userData?.name || 'User'}!
                  </div>
                  {isAdminUser && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 w-full"
                    >
                      Admin Panel
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/signin')}
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login/Signup Popup */}
      {showLoginPopup && !isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </h2>
                <button
                  onClick={() => setShowLoginPopup(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const userData = {
                  name: formData.get('name') || formData.get('email').split('@')[0],
                  email: formData.get('email'),
                  phone: formData.get('phone')
                };
                handleLogin(userData);
              }}>
                {isSignUp && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                {isSignUp && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>

                {isSignUp && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium"
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>

              
            </div>
          </div>
        </div>
      )}

      
    </header>
  );
};

export default Header;