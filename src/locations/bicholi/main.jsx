import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/footer";


import Property3 from "./tsv/tsv";


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Main = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
            Featured Properties
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
           
            <Property3 />   
           
          </div>
        </div>
        
      </main>

    <Footer />
    </div>
  );
};

export default Main;