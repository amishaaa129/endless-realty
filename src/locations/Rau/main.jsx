import React from 'react';
import './main.css';
import Header from '../../components/Header';
import Footer from '../../components/footer';
import Property1 from './silicon/rau';
import Property2 from './shorya/shorya';

const SiliconCityMain = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
            
        </div>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
            Featured Properties
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <Property1 />
            <Property2 />
             
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SiliconCityMain;