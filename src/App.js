import React from 'react';

const HomePage = () => {
  return (
    <main className="space-y-20 bg-white text-gray-800">

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1470&q=80')]">
        <div className="text-center animate-fadeIn bg-black/50 p-8 rounded-xl">
          <h1 className="text-5xl font-bold text-white mb-4">Find Your Dream Home</h1>
          <p className="text-lg text-white">Luxury apartments, cozy houses, and investment properties.</p>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center animate-slideIn">Featured Properties</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1572120360610-d971b9b78825?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
          ].map((imgUrl, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 animate-slideInLeft">
              <img
                src={imgUrl}
                alt={`Property ${idx + 1}`}
                className="rounded-xl mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold">Modern Apartment #{idx + 1}</h3>
              <p className="text-gray-600 mt-2">2 bed, 2 bath in downtown.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="bg-gray-100 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 animate-slideInRight">Why Invest With Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'High ROI', desc: 'Enjoy strong returns on your real estate investments.' },
              { title: 'Trusted Developers', desc: 'We work with only the most reputable builders.' },
              { title: 'Smart Tools', desc: 'Use our data tools to make informed decisions.' }
            ].map((benefit, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-md animate-bounceIn">
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center animate-slideIn">Take a Virtual Tour</h2>
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-xl animate-fadeIn">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/4cH6gk1VnEY"
            title="Virtual Tour"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 bg-blue-600 text-white animate-fadeIn">
        <h2 className="text-4xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-lg mb-8">Explore listings or speak to an expert today.</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>
    </main>
  );
};

export default HomePage;