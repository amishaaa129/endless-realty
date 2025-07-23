import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import PropertyCard from './PropertyCard';
import axios from 'axios';

const Properties = () => {
  const [dbProperties, setDbProperties] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDbProperties();
  }, []);

  const fetchDbProperties = async () => {
    try {
      const res = await axios.get('/api/properties/all');
      setDbProperties(res.data); // ✅ Assuming your backend returns an array of properties
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
            Featured Properties
          </h1>

          {dbProperties.length === 0 ? (
            <p className="text-center text-gray-500">No properties available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {dbProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
