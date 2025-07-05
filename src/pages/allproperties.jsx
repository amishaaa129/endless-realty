import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

const SearchResults = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);

  // Query params
  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get('city');
  const type = searchParams.get('type');
  const min = searchParams.get('min');
  const max = searchParams.get('max');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.endlessrealty.in';

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/properties/search?city=${city}&type=${type}&min=${min}&max=${max}`);
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setProperties([]); // fallback to empty
      }
    };

    fetchProperties();
  }, [city, type, min, max]);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {properties.length === 0 ? (
          <p className="text-center col-span-3 text-gray-600">No properties found.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} className="property-card bg-white rounded-xl overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src={property.thumbnail_url || 'https://via.placeholder.com/400x250'}
                  alt={property.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-20 flex items-end">
                  <span className="text-white font-bold text-xl px-4 pb-3">{property.title}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                  <span>{property.location}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  {property.type?.toLowerCase() !== 'plot' && (
                    <div className="flex items-center">
                      <i className="fas fa-bed mr-1 text-blue-600"></i>
                      <span>{property.bhk} BHK</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                    <span>{property.area_sqft} sq.ft.</span>
                  </div>
                  {property.price_label !== 'Coming Soon' && (
                    <div className="flex items-center">
                      <i className="fas fa-building mr-1 text-blue-600"></i>
                      <span>RERA Approved</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">Starting at</span>
                    <div className="text-xl font-bold text-gray-900">
                      {property.price_label || `₹${(property.price_value / 100000).toFixed(2)} Lakhs`}
                    </div>
                  </div>
                  <a
                    href={`/${property.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
