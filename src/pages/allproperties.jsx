import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

const SearchResults = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [useFallback, setUseFallback] = useState(false);

  // Query params
  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get('city');
  const type = searchParams.get('type');
  const min = searchParams.get('min');
  const max = searchParams.get('max');

  // Hardcoded fallback properties
  const fallbackProperties = [
    {
      id: 1,
      title: 'Ace Green Valley',
      location: 'MR-10, Near IT Park',
      city: 'Indore',
      bhk: '2 & 3',
      area_sqft: '1100-1550',
      type: 'Apartment',
      price: 3850000,
      thumbnail_url: 'https://images.unsplash.com/photo-1705955463252-e3f670e4041b?q=80&w=1932&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Infinite Heights',
      location: 'Vijay Nagar',
      city: 'Indore',
      bhk: '3 & 4',
      area_sqft: '1650-2200',
      type: 'Villa',
      price: 6580000,
      thumbnail_url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Royal Meadows',
      location: 'AB Road, Near MR9',
      city: 'Indore',
      bhk: '4',
      area_sqft: '2200-2800',
      type: 'Villa',
      price: 9550000,
      thumbnail_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Shiv City',
      location: 'Near Silicon City',
      city: 'Indore',
      bhk: '3 & 4',
      area_sqft: '1650-2200',
      type: 'Villa',
      price: 6580000,
      thumbnail_url: "https://images.unsplash.com/photo-1590169834934-297bdaa63590?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      title: 'Star City',
      location: 'Near Silicon City',
      city: 'Indore',
      bhk: '4',
      area_sqft: '2200-2800',
      type: 'Apartment',
      price: 9550000,
      thumbnail_url: "https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
  ];

  // Fetch from backend, fallback if fails
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://endless-realty-backend.onrender.com';

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log("➡️ Fetching from:", `${API_BASE_URL}/api/properties/search?city=${city}&type=${type}&min=${min}&max=${max}`);
        const res = await fetch(`${API_BASE_URL}/api/properties/search?city=${city}&type=${type}&min=${min}&max=${max}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.warn('Backend unavailable, using fallback data.');
        setUseFallback(true);
        setProperties(fallbackProperties);
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
                  <span>{property.location}, {property.city}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm">
                  <div className="flex items-center">
                    <i className="fas fa-bed mr-1 text-blue-600"></i>
                    <span>{property.bhk} BHK</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-ruler-combined mr-1 text-blue-600"></i>
                    <span>{property.area_sqft} sq.ft.</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-building mr-1 text-blue-600"></i>
                    <span>RERA Approved</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">Starting at</span>
                    <div className="text-xl font-bold text-gray-900">
                      ₹{(property.price / 100000).toFixed(2)} Lakhs
                    </div>
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
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
