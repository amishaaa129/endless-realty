import React from 'react';
 // import './main.css';
import Header from '../components/Header';
import Footer from '../components/footer';
import Property1 from '../locations/Cat_road/vrindavan';
import Property2 from '../locations/Rau/shorya/shorya';
import Property3 from '../locations/Rau/silicon/rau';
import Property4 from '../locations/Shubham/arcadia/arcadia';
import Property5 from '../locations/Shubham/valley/valley';
import Property6 from '../locations/Shubham/tsv/tsv';
import Property7 from '../locations/Shubham/eleven/eleven';
import Property8 from '../locations/silicon_city/silicon/silicon';
import Property9 from '../locations/silicon_city/silicon1/silicon1';
import Property10 from '../locations/silicon_city/silicon2/silicon2';
import Property11 from '../locations/silicon_city/silicon3/silicon3';

const Properties = () => {
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
            <Property2 />
            <Property3 />
            <Property4 />
            <Property5 />
            <Property6 />
            <Property7 />
            <Property8 />
            <Property9 />
            <Property10 />
            <Property11 />
             
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;