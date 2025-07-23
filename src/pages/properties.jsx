import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import PropertyCard from './PropertyCard';
import axios from 'axios';

const Properties = () => {
  const [dbProperties, setDbProperties] = useState([]);

  // 🟡 Hardcoded properties (shown first)
  const hardcodedProperties = [
    {
      id: 1,
      title: 'Vrindavan Premium Row Houses',
      address: 'RRCAT, Indore',
      bhk: '3 & 4',
      area_sqft: '1000',
      price_label: 'Ready to Move',
      thumbnail_url: '/images/vrindavan.png',
      type: 'Row Houses',
    },
    {
      id: 2,
      title: 'Shubham Valley',
      address: 'Next to DPS School,Rau',
      bhk: '',
      area_sqft: '600-1200',
      price_label: 'Ready to Move',
      thumbnail_url: '/images/valley.jpeg',
      type: 'Plot',
    },
    {
      id: 13,
      title: 'Turnkey Villa',
      address: 'Near Surya Mandir, Rau',
      bhk: '3',
      area_sqft: '1800',
      price_label: 'Ready to Move',
      thumbnail_url: '/images/turnkey.jpeg',
      type: 'Villa',
    },
    {
      id: 3,
      title: 'Shubham Arcadia',
      address: 'Indore-Ujjain Road',
      bhk: '2',
      area_sqft: '700-2400',
      price_label: 'Ready to Move',
      thumbnail_url: '/images/arcadia.jpeg',
      type: 'Plot',
    },
    {
      id: 12,
      title: 'Shubham Greens',
      address: 'Near Surya Mandir, Rau',
      bhk: '3',
      area_sqft: '1100',
      price_label: '1.28 CR',
      thumbnail_url: '/images/greens.jpeg',
      type: 'Bungalow',
    },
    {
      id: 4,
      title: 'Shubham Eleven',
      address: '2.6 km from AB Bypass, close to UNO Business Park, Indore',
      bhk: '',
      area_sqft: '1100-1500',
      price_label: 'Coming Soon',
      thumbnail_url: '/images/eleven.jpeg',
      type: 'Plot',
    },
    {
      id: 5,
      title: 'Shubham TSV',
      address: '6.8 km from the AB Bypass, near Vidyasagar School, Indore',
      bhk: '',
      area_sqft: '3200',
      price_label: 'Coming Soon',
      thumbnail_url: '/images/tsv.jpeg',
      type: 'Plot',
    },

    {
      id: 6,
      title: 'Shourya Vihar',
      address: 'Near Medicaps International School, Village Phanda, Indore',
      bhk: '',
      area_sqft: '',
      price_label: 'Coming Soon',
      thumbnail_url: '/images/shorya.jpeg',
      type: 'Plot',
    },
    {
      id: 7,
      title: 'Silicon Premium',
      address: 'Silicon City, Near Pulak City, Gate no 2',
      bhk: '2',
      area_sqft: '1120',
      price_label: 'Sold Out',
      thumbnail_url: '/images/silicon.jpeg',
    },
    {
      id: 8,
      title: 'Pulak City',
      address: 'Pulak City, Silicon City',
      bhk: '',
      area_sqft: '1500',
      price_label: 'Sold Out',
      thumbnail_url: '/images/s3.jpeg',
    },
    {
      id: 9,
      title: 'Silicon City S Sector',
      address: 'Silicon City, S Sector',
      bhk: '2',
      area_sqft: '750',
      price_label: 'Sold Out',
      thumbnail_url: '/images/s1.jpg',
      type: 'Row Houses',
    },
    {
      id: 10,
      title: 'Silver Star City Project',
      address: 'Shubham Eleven',
      bhk: '',
      area_sqft: '1100-1500',
      price_label: 'Sold Out',
      thumbnail_url: '/images/s2.jpeg',
    },
    {
      id: 11,
      title: 'Silicon City Property',
      address: 'Silicon City, Rau',
      bhk: '4',
      area_sqft: '2000',
      price_label: 'Sold Out',
      thumbnail_url: '/images/rau.jpeg',
      type: 'Row Houses',
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDbProperties();
  }, []);

  const fetchDbProperties = async () => {
    try {
      const res = await axios.get('/api/properties/all');
      // only include properties with id > 13
      const filtered = res.data;
      setDbProperties(filtered);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  // 🟢 Combine both: hardcoded first, then DB properties
  const allProperties = [...dbProperties];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
            Featured Properties
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {allProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
