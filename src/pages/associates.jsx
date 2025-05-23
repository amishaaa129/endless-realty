import React from "react";
import Header from "../components/Header"; 

const Associates = () => {
  return (
    <div>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 text-center">Our Associates</h1>
        <p className="text-gray-700 text-lg mb-4">
          At Endless Realty, we are proud to collaborate with some of the most trusted and renowned associates in the real estate industry. Our partners help us deliver exceptional services and properties to our clients.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Whether you're looking for residential, commercial, or industrial properties, our associates ensure that you receive the best options tailored to your needs.
        </p>

        {/* List of Associates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

          <div className="bg-white shadow-md rounded-lg p-6">
          <div className="bg-white  p-5 max-w-md mx-auto ">
              <img
                src="/images/image3.jpg" 
                alt="Associate 1"
                
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Kalpvraksh hills</h2>
            
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="bg-white  p-5 max-w-md mx-auto ">
              <img
                src="/images/image4.jpg" 
                alt="Associate 1"
                
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">MunimJi Estate Jetpura</h2>

          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
          
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Shourya vihar</h2>
            
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
          <div className="bg-white  p-5 max-w-md mx-auto ">
              <img
                src="/images/image5.jpg" 
                alt="Associate 1"
                
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Shree swastik corridor</h2>
            
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Tulip homes</h2>
            <p className="text-gray-600">
              Renowned for their innovative designs and customer-centric approach.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
          <div className="bg-white  p-5 max-w-md mx-auto ">
              <img
                src="/images/image6.jpg" 
                alt="Associate 1"
                
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Vrindavan premium</h2>
            
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
          <div className="bg-white  p-5 max-w-md mx-auto ">
              <img
                src="/images/image1.jpg" 
                alt="Associate 1"
                
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Akashneem Vara</h2>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Associates;