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

          <div className="bg-white shadow-md rounded-lg p-6 flex justify-center items-center">
            <div className="bg-white p-5 max-w-lg mx-auto">
              <img
                src="/images/image6.jpg"
                alt="Associate 1"
                className="w-full h-auto max-w-[500px] mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Associates;