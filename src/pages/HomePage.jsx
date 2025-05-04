import React from 'react';


const properties = [
  {
    name: 'Skyline Heights',
    location: 'Vijay Nagar, Indore',
    price: '₹65 Lakhs',
    image: 'https://source.unsplash.com/400x300/?apartment',
  },
  {
    name: 'Green Valley Villa',
    location: 'Bicholi Mardana, Indore',
    price: '₹1.2 Crore',
    image: 'https://source.unsplash.com/400x300/?villa',
  },
  {
    name: 'Sunshine Residency',
    location: 'MR-10, Indore',
    price: '₹45 Lakhs',
    image: 'https://source.unsplash.com/400x300/?residential-building',
  },
  {
    name: 'Elite Commercial Space',
    location: 'AB Road, Indore',
    price: '₹85 Lakhs',
    image: 'https://source.unsplash.com/400x300/?commercial-building',
  },
];

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-32 md:py-40 relative overflow-hidden">
        <div className="animated-bg">
          <div></div><div></div><div></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-blue-300 text-sm font-medium mb-6 fade-in">
            Indore's Premier Real Estate Platform
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 slide-in">
            Find Your Dream Home with <span className="text-gradient">Endless</span>Realty
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 slide-in stagger-1">
            Discover premium properties with modern amenities and convenient locations at affordable prices
          </p>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 search-box-shadow slide-in stagger-2">
            <form className="flex flex-col md:flex-row gap-4">
              {['Location', 'Property Type', 'Budget'].map((label) => (
                <div key={label} className="flex-1">
                  <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                    <option disabled selected>{`Select ${label}`}</option>
                  </select>
                </div>
              ))}
              <div className="md:self-end">
                <button type="submit" className="w-full md:w-auto px-8 py-3 btn-gradient text-white rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center">
                  <i className="fas fa-search mr-2"></i> Search
                </button>
              </div>
            </form>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ['10+', 'Cities'],
              ['50+', 'Projects'],
              ['3000+', 'Happy Families'],
              ['98%', 'Customer Satisfaction'],
            ].map(([value, label]) => (
              <div key={label} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="text-4xl font-bold text-gradient mb-2">{value}</div>
                <div className="text-sm font-medium text-gray-200">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Featured Properties</h2>
          <p className="mb-10 text-xl text-gray-500">Explore a curated selection of our top listings</p>
          <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {properties.map((property, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <img className="h-48 w-full object-cover" src={property.image} alt={property.name} />
                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{property.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{property.location}</p>
                  <p className="text-lg font-bold text-blue-600">{property.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest in Tier 2 Cities */}
      <section id="why-tier2" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Text Block */}
            <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Invest in cities like Indore?</h2>
              <p className="text-xl text-gray-600 mb-8">
                These cities are emerging as the next big investment destination with significant advantages over metropolitan areas.
              </p>
              <div className="space-y-5">
                {[
                  ['fa-chart-line', 'green', 'Higher ROI Potential', 'Properties in Tier 2 cities offer 15-20% higher returns compared to metro cities due to lower entry prices and rapid development.'],
                  ['fa-building', 'blue', 'Infrastructure Growth', 'Government initiatives like Smart City Mission are transforming Tier 2 cities with modern infrastructure and connectivity.'],
                  ['fa-laptop', 'purple', 'IT & Business Hubs', 'Major companies are establishing offices in Tier 2 cities, creating employment opportunities and driving real estate demand.'],
                  ['fa-heart', 'yellow', 'Better Quality of Life', 'Less congestion, lower pollution, and more space offer a healthier and more balanced lifestyle compared to metro cities.'],
                ].map(([icon, color, title, text], i) => (
                  <div key={i} className="flex items-start">
                    <div className={`w-10 h-10 rounded-full bg-${color}-100 text-${color}-600 flex items-center justify-center mr-4`}>
                      <i className={`fas ${icon}`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                      <p className="text-gray-600">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <a href="#investment-guide" className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-600 hover:text-white transition duration-300">
                  Download Investment Guide
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Image Block */}
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <img src="https://source.unsplash.com/600x400/?city,indore" alt="Tier 2 City Growth" className="w-full h-auto" />
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
      </section>

      {/* Virtual Tour Section */}
      <section className="relative bg-gray-950 text-white overflow-hidden py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900 rounded-full opacity-20 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Text */}
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 text-blue-300 text-sm font-medium mb-6">Virtual Experience</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Our Properties Virtually</h2>
              <p className="text-xl text-gray-300 mb-8">
                Take an immersive 3D tour of our properties from the comfort of your home. Explore every corner, visualize the spaces, and imagine your future lifestyle.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  ['fa-vr-cardboard', 'Immersive 360° property walkthroughs'],
                  ['fa-ruler-combined', 'Interactive floor plans with measurements'],
                  ['fa-couch', 'Virtual furniture placement'],
                  ['fa-sun', 'Daytime and nighttime lighting visualization'],
                ].map(([icon, text]) => (
                  <div key={icon} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center text-blue-300 mr-4">
                      <i className={`fas ${icon}`}></i>
                    </div>
                    <span className="text-gray-300">{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-6 py-3 btn-gradient rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition">
                  <i className="fas fa-vr-cardboard mr-2"></i> Start Virtual Tour
                </button>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition">
                  <i className="fas fa-calendar-alt mr-2"></i> Schedule Site Visit
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Virtual Tour"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Offices */}
          <div className="mt-16 w-full text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Our Offices</h3>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <a href="#" className="text-3xl font-bold text-blue-400">Endless Realty</a>
            <p className="text-gray-400 mt-2">Your trusted real estate partner for Tier 2 cities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#properties" className="text-gray-400 hover:text-blue-400">Properties</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-blue-400">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-blue-400">Contact</a></li>
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
              <div className="flex justify-center space-x-4 text-2xl">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                  <a key={platform} href="#" className="text-gray-400 hover:text-blue-400">
                    <i className={`fab fa-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm">&copy; 2025 Endless Realty. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;