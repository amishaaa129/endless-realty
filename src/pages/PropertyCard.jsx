// File: components/PropertyCard.jsx
import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card bg-white rounded-xl overflow-hidden shadow-md">
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
          <div className="flex items-center">
            <i className="fas fa-bed mr-1 text-blue-600"></i>
            <span>{property.bhk || '—'} BHK</span>
          </div>
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
  );
};

export default PropertyCard;
