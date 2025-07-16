import React, { useState, } from 'react';
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
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showAuthWarning, setShowAuthWarning] = useState(false);

  // Define admin users
  const adminUsers = [
    { email: 'admin@gmail.com', name: 'Admin User' },
    { email: 'manager@endlessrealty.com', name: 'Manager' },
    { email: 'rohit@endlessrealty.com', name: 'Rohit Singhal' },
    { email: 'amisha@endlessrealty.com', name: 'Amisha' }
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  // State for filters
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');

  // Check login status on component mount and scroll to top
  React.useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    const loginStatus = localStorage.getItem('isLoggedIn');
    const storedUserData = localStorage.getItem('userData');
    if (loginStatus === 'true' && storedUserData) {
      const user = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setUserData(user);
      
      // Check if user is admin
      const isAdmin = adminUsers.some(adminUser => adminUser.email === user.email);
      setIsAdminUser(isAdmin);
    } else {
      // Show popup after 3 seconds if not logged in
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Add scroll protection for non-logged-in users
  React.useEffect(() => {
    const handleScroll = (e) => {
      if (!isLoggedIn && window.scrollY > 100) {
        e.preventDefault();
        window.scrollTo(0, 100);
        setShowAuthWarning(true);
        setTimeout(() => setShowAuthWarning(false), 3000);
        setShowLoginPopup(true);
      }
    };

    const handleKeyDown = (e) => {
      // Prevent scroll with keyboard if not logged in
      if (!isLoggedIn && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'PageDown' || e.key === 'PageUp' || e.key === 'End' || e.key === 'Home')) {
        e.preventDefault();
        setShowAuthWarning(true);
        setTimeout(() => setShowAuthWarning(false), 3000);
        setShowLoginPopup(true);
      }
    };

    if (!isLoggedIn) {
      window.addEventListener('scroll', handleScroll, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoggedIn]);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    setShowLoginPopup(false);
    
    // Check if user is admin
    const isAdmin = adminUsers.some(adminUser => adminUser.email === userData.email);
    setIsAdminUser(isAdmin);
    
    // Don't auto-redirect admins - let them choose to access admin panel or stay on main site
    // Admin users can access admin panel via direct URL /admin when needed
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setIsAdminUser(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
  };

  // Check authentication before navigation
  const checkAuthAndNavigate = (to) => {
    if (!isLoggedIn) {
      setShowAuthWarning(true);
      setTimeout(() => setShowAuthWarning(false), 3000);
      return false;
    }
    navigate(to);
    return true;
  };

  // Handle protected navigation
  const handleProtectedNavigation = (e, to) => {
    e.preventDefault();
    if (!checkAuthAndNavigate(to)) {
      setShowLoginPopup(true);
    }
  };

  const handleSearch = () => {
    if (!isLoggedIn) {
      setShowAuthWarning(true);
      setTimeout(() => setShowAuthWarning(false), 3000);
      setShowLoginPopup(true);
      return;
    }

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
            <a 
              href="/properties" 
              onClick={(e) => handleProtectedNavigation(e, '/properties')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Properties
            </a>
            <div className="relative">
              <a
                href="#cities"
                onClick={(e) => {
                  e.preventDefault();
                  if (isLoggedIn) {
                    toggleDropdown();
                  } else {
                    handleProtectedNavigation(e, '/locations');
                  }
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
              {isDropdownOpen && isLoggedIn && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                  {["Silicon City", "Rau", "Mhow", "Pithampur", "CAT Road", "Ujjain Road", "AB Bypass Road", "Bicholi"].map((city) => (
                    <Link
                      key={city}
                      to={city === "Rau" ? "/rau" : city === "CAT Road" ? "/cat-road" : city === "Silicon City" ? "/silicon-city" : city === "Pithampur" ? "/pithampur" : city === "Bicholi" ? "/bicholi" : city === "Ujjain Road" ? "/ujjain" : city === "AB Bypass Road" ? "/bypass" : city === "Mhow" ? "/mhow" : "/cities"}
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
              onClick={(e) => handleProtectedNavigation(e, '/about-us')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              About Us
            </a>

            <a 
              href="/what's-new" 
              onClick={(e) => handleProtectedNavigation(e, "/what's-new")}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              What's New
            </a>

            <a 
              href="/our-associates" 
              onClick={(e) => handleProtectedNavigation(e, '/our-associates')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Our Associates
            </a>
            <a 
              href="/contact" 
              onClick={(e) => handleProtectedNavigation(e, '/contact')}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </a>
          </nav>

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
                onClick={(e) => handleProtectedNavigation(e, `/${item.toLowerCase().replace(/\s+/g, '-')}`)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item}
              </a>
            ))}
            {/* Location Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    setIsLocationDropdownOpen(!isLocationDropdownOpen);
                  } else {
                    handleProtectedNavigation({ preventDefault: () => {} }, '/locations');
                  }
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Location
              </button>
              {isLocationDropdownOpen && isLoggedIn && (
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
                  <a href="/cat-road" onClick={(e) => handleProtectedNavigation(e, '/cat-road')}>Vrindavan Premium</a>
                </li>
                <li className="text-base">
                  <a href="/pithampur" onClick={(e) => handleProtectedNavigation(e, '/pithampur')}>Balaji Realty</a>
                </li>
                <li className="text-base">
                  <a href="/shubham" onClick={(e) => handleProtectedNavigation(e, '/shubham')}>Shubham Buildcon</a>
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
                  <a href="/cat-road" onClick={(e) => handleProtectedNavigation(e, '/cat-road')}>Vrindavan Premium</a>
                </li>
                <li className="text-lg">
                  <a href="/pithampur" onClick={(e) => handleProtectedNavigation(e, '/pithampur')}>Balaji Realty</a>
                </li>
                <li className="text-lg">
                  <a href="/shubham" onClick={(e) => handleProtectedNavigation(e, '/shubham')}>Shubham Buildcon</a>
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

        {/* Empty div placeholder for potential future content */}
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"></div>
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
                    <option value="silicon-city">Silicon City</option>
                    <option value="rau">Rau</option>
                    <option value="mhow">Mhow</option>
                    <option value="pithampur">Pithampur</option>
                    <option value="cat-road">CAT Road</option>
                    <option value="ujjain-road">Ujjain Road</option>
                    <option value="ab-bypass-road">AB Bypass Road</option>
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
              <a
                href="https://wa.me/918989941900"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-xl px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
              >
                <span className="text-white font-medium">WhatsApp Us</span>
                
                <i className="fab fa-whatsapp ml-2 text-green-400 text-2xl"></i>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Property Card 1 */}
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
                  <a
                    href="/shourya-vihar"
                    onClick={(e) => handleProtectedNavigation(e, '/shourya-vihar')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </a>
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
                  <a
                    href="/vrindavan-premium-row-houses"
                    onClick={(e) => handleProtectedNavigation(e, '/vrindavan-premium-row-houses')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </a>
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
                  <a
                    href="/silicon-premium"
                    onClick={(e) => handleProtectedNavigation(e, '/silicon-premium')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </a>
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
                  <a
                    href="/rau"
                    onClick={(e) => handleProtectedNavigation(e, '/rau')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </a>
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


          </div>

        </div>

        {/* View All Properties Button */}
        <div className="text-center mt-12">
          <a
            href="/properties"
            onClick={(e) => handleProtectedNavigation(e, '/properties')}
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
          </a>
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
                const email = formData.get('email');
                const password = formData.get('password');
                
                // Check if user is admin and use proper name
                const adminUser = adminUsers.find(admin => admin.email === email);
                
                // Check for admin credentials
                if (adminUser && password === 'admin123') {
                  const userData = {
                    name: adminUser.name,
                    email: adminUser.email,
                    phone: formData.get('phone') || ''
                  };
                  handleLogin(userData);
                  return;
                }
                
                // For regular users
                const userData = {
                  name: formData.get('name') || email.split('@')[0],
                  email: email,
                  phone: formData.get('phone') || ''
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

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleLogin({ email: 'google@example.com', name: 'Google User' })}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      

      <Footer />

      {/* Fixed Social Media Handles */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col space-y-3">
        <a
          href="https://www.instagram.com/endlessrealty_indore?igsh=MWVtdmFycWdnOHM4Mg=="
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <i className="fab fa-instagram text-lg"></i>
        </a>
        <a
          href="https://share.google/bLxJZaw0xgtrnPTBW"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <i className="fab fa-facebook-f text-lg"></i>
        </a>
        <a
          href="https://www.linkedin.com/company/endlessrealty"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <i className="fab fa-linkedin-in text-lg"></i>
        </a>
        
      </div>

      {/* Mobile Social Media - Bottom Fixed */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/endlessrealty_indore?igsh=MWVtdmFycWdnOHM4Mg=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transform transition-all duration-300"
            >
              <i className="fab fa-instagram text-sm"></i>
            </a>
            <a
              href="https://share.google/bLxJZaw0xgtrnPTBW"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transform transition-all duration-300"
            >
              <i className="fab fa-facebook-f text-sm"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/endlessrealty"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transform transition-all duration-300"
            >
              <i className="fab fa-linkedin-in text-sm"></i>
            </a>
            
          </div>
        </div>
      </div>
    </header>

  );
};
export default App;