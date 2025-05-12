import React from 'react';
import Header from '../components/Header';

const Features = () => {
  return (
    <div>
      {/* Render the Header component */}
      <Header />

      {/* Main content for the Features page */}
      <main style={{ padding: '20px' }}>
        <h1>Our Features</h1>
        <p>Explore the amazing features we offer to make your experience seamless and enjoyable.</p>

        <section>
          <h2>Feature 1: User-Friendly Interface</h2>
          <p>Our platform is designed with simplicity and ease of use in mind.</p>
        </section>

        <section>
          <h2>Feature 2: Advanced Analytics</h2>
          <p>Gain insights into your data with our powerful analytics tools.</p>
        </section>

        <section>
          <h2>Feature 3: 24/7 Support</h2>
          <p>We are here to help you anytime, anywhere.</p>
        </section>
      </main>
    </div>
  );
};

export default Features;