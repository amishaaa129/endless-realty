import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import PropertyCard from '/PropertyCard';

const Properties = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Manually define the featured property data
  const properties = [
    {
      id: 1,
      title: 'Vrindavan Premium Row Houses',
      location: 'RRCAT, Indore',
      bhk: '3 & 4',
      area_sqft: '1000',
      price_label: 'Ready to Move',
      thumbnail_url: '/images/vrindavan.png',
    },
    {
      id: 2,
      title: 'Shubham Valley',
      location: 'Next to DPS School,Rau',
      bhk: '',
      area_sqft: '600-1200',
      price_label: 'Ready to Move',
      thumbnail_url: '/images/valley.jpeg',
    },
    {
      id: 3,
      title: 'Shubham Arcadia',
      location: 'Indore-Ujjain Road',
      bhk: '2',
      area_sqft: '700-2400',
      price_label: 'Ready to Move',
      thumbnail_url: '/images/arcadia.jpeg',
    },
    {
      id: 4,
      title: 'Shubham Eleven',
      location: 'Near UNO Business Park, Indore',
      bhk: '',
      area_sqft: '1100-1500',
      price_label: 'Coming Soon',
      thumbnail_url: '/images/eleven.jpeg',
    },
    {
      id: 5,
      title: 'Shubham TSV',
      location: '6.8 km from the AB Bypass, near Vidyasagar School, Indore',
      bhk: '',
      area_sqft: '3200',
      price_label: 'Coming Soon',
      thumbnail_url: '/images/tsv.jpeg',
    },

    {
      id: 6,
      title: 'Shourya Vihar',
      location: 'Near Medicaps International School, Village Phanda, Indore',
      bhk: '',
      area_sqft: '',
      price_label: 'Coming Soon',
      thumbnail_url: '/images/shorya.jpeg',
    },
    {
      id: 7,
      title: 'Silicon Premium',
      location: 'Silicon City, Near Pulak City, Gate no 2',
      bhk: '2',
      area_sqft: '1120',
      price_label: 'Sold Out',
      thumbnail_url: '/images/silicon.jpeg',
    },
    {
      id: 8,
      title: 'Pulak City',
      location: 'Pulak City, Silicon City',
      bhk: '',
      area_sqft: '1500',
      price_label: 'Sold Out',
      thumbnail_url: '/images/s3.jpeg',
    },
    {
      id: 9,
      title: 'Silicon City S Sector',
      location: 'Silicon City, S Sector',
      bhk: '2',
      area_sqft: '750',
      price_label: 'Sold Out',
      thumbnail_url: '/images/s1.jpg',
    },
    {
      id: 10,
      title: 'Silver Star City Project',
      location: 'Shubham Eleven',
      bhk: '',
      area_sqft: '1100-1500',
      price_label: 'Sold Out',
      thumbnail_url: '/images/s2.jpeg',
    },
    {
      id: 11,
      title: 'Rau Premium',
      location: 'Silicon City, Rau',
      bhk: '4',
      area_sqft: '2000',
      price_label: 'Sold Out',
      thumbnail_url: '/images/rau.jpeg',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
            Featured Properties
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property) => (
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
