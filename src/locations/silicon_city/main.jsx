import React from 'react';
import './main.css';
import Header from '../../components/Header';
import Footer from '../../components/footer';
import Property1 from './silicon/silicon';
import Property2 from './silicon1/silicon1';
import Property3 from './silicon2/silicon2';
import Property4 from './silicon3/silicon3';

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <Property1 />
            <Property4 />
            <Property2 />
            <Property3 />
            
             
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SiliconCityMain;