import React from 'react';
import Header from '../components/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg">
            Learn more about our mission, vision, and the values that drive us.
          </p>
        </div>
      </div>

      {/* About Us Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-700 mb-6">
            At Endless Realty, we are dedicated to helping you find your dream
            home. With years of experience in the real estate industry, we
            pride ourselves on providing exceptional service and personalized
            solutions to meet your needs.
          </p>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Our mission is to make the process of buying, selling, or renting
            properties as seamless and stress-free as possible. We strive to
            build lasting relationships with our clients based on trust,
            transparency, and integrity.
          </p>
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Experienced and knowledgeable agents</li>
            <li>Personalized service tailored to your needs</li>
            <li>Extensive network of properties</li>
            <li>Commitment to excellence and customer satisfaction</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;