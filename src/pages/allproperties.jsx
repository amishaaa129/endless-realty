import Header from '../components/Header'; 

const SearchResults = () => {
  return (
    <div>
      <Header />
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
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        </div>
    </div>
    
  );
};

export default SearchResults;