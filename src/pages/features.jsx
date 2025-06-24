import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
const Features = () => {
  return (
    <div>
      {/* Render the Header component */}
      <Header />

      {/* Main content for the Features page */}
      <main style={{ padding: '20px' }}>
        

        <section>
          <h2>Activities</h2>
          <p>Engage in a variety of activities designed to enhance your experience.</p>
        </section>

        <section>
          <h2>Property News</h2>
          <p>Stay updated with the latest trends and news in the real estate market.</p>
        </section>

        <section>
          <h2>Gallery</h2>
          <p>Browse through our collection of images showcasing our properties and events.</p>
        </section>

        <section>
          <h2>Updates</h2>
          <p>Get the latest updates about our platform and services.</p>
        </section>

        <section>
          <h2>Testimonials</h2>
          <p>Hear what our satisfied customers have to say about us.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;