import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OurAssociates = () => {
  const [brokers, setBrokers] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://endless-realty-backend.onrender.com';

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/brokers`);
        const data = await res.json();
        setBrokers(data);
      } catch (err) {
        console.error('Failed to fetch brokers:', err);
      }
    };

    fetchBrokers();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center">Our Associates</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brokers.map((broker) => (
          <div
            key={broker.id}
            className="relative bg-white shadow-md rounded-lg p-4 text-center transition-transform transform hover:scale-105"
          >
            {/* Score in top-right */}
            <div className="absolute top-2 right-2 bg-gray-100 text-sm px-2 py-1 rounded-full text-gray-700 font-semibold shadow">
              {broker.score}
            </div>

            {/* Avatar */}
            <img
              src={broker.image_url}
              alt={broker.name}
              className="w-16 h-16 mx-auto rounded-full mb-2"
            />
            <h2 className="text-md font-semibold mb-1">{broker.name}</h2>

            {/* QR code */}
            <img
              src={broker.qr_code_url}
              alt="QR Code"
              className="mx-auto my-2 w-20 h-20"
            />

            {/* Button */}
            <Link
              to={`/brokers/${broker.id}`}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurAssociates;
