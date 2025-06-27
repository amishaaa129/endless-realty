// File: AboutUs.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import './about.css';

const team = [
  {
    name: 'Sachin Sahu',
    title: 'Founder | Visionary Leader | Mechanical Engineer',
    bio: 'From losing his father young to building 6 townships, Sachin\'s journey is one of resilience, vision, and integrity. From rental homes to developing 200+ homes and selling 1000+ plots, he created Endless Realty as a reflection of trust. He doesn\'t just sell plots – he builds possibilities, prosperity, and pride.',
    image: '/about/sachin.jpg' 
  },
  {
    name: 'Abhijeet Geete',
    title: 'Entrepreneur | Real Estate Consultant',
    bio: 'A commerce graduate with a decade of entrepreneurial success in the solar energy sector. Entered real estate in 2022 with a mission to create secure investment avenues for others. Known for his ethical approach, deep client trust, and results-focused mindset.',
    image: '/about/abhijeet.jpg' 
  },
  {
    name: 'Abhishek Sahu',
    title: 'Civil Engineer | Real Estate Consultant',
    bio: 'A B.E. (Civil) graduate with 9 years of experience as a Senior Bridge Engineer. Joined Endless Realty to pursue financial freedom and fulfil his parents\' dreams. Bringing technical expertise, discipline, and sharp execution skills to the real estate field.',
    image: '/about/abhishekS.jpg' 
  },
  {
    name: 'Lalit Sahu',
    title: 'MBA (Marketing & Finance) | Real Estate Consultant',
    bio: 'A management graduate with a dual specialization in Marketing and Finance. Brings 4 years of hands-on experience in real estate and civil construction projects. Known for his strategic thinking, on-ground knowledge, and client-focused approach.',
    image: '/about/lalit.jpg'
  },
  {
    name: 'Pratik Sahu',
    title: 'B.Tech (IT) | Real Estate Consultant',
    bio: 'An IT graduate with 5 years of experience in the tech industry. Transitioned into civil construction and worked hands-on for the last 4 years. Brings a rare blend of technical mindset and field-level execution.',
    image: '/about/pratik.jpg' 
  },
  {
    name: 'Abhishek Mishra',
    title: 'Corporate Trainer | Realty Coach',
    bio: 'A seasoned Corporate Trainer and Life Coach with 25+ years of experience. Blends strategic sales techniques with deep human understanding to empower realty professionals. Mentors the Endless Realty team with clarity, confidence, and vision.',
    image: '/about/abhishek.jpg' 
  }
];

const AboutUs = () => {
  return (
    <>
      <Header />

      {/* Team Grid */}
      <section className="team-section">
        <h2 className="team-heading">Meet Our Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="team-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-content">
                <h3>{member.name}</h3>
                <h4>{member.title}</h4>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder's Story Section */}
      <section className="founder-story-section">
        <div className="founder-story">
          <h2>🛤️ Our Founder's Story</h2>
          <p>
            Sachin Sahu's journey is not just inspiring — it's transformational. Losing his father at a young age, Sachin was introduced early to the realities of life. But instead of surrendering to circumstances, he chose to rise. With limited resources and unshakable will, he completed his engineering education — a journey marked by silent struggles and sleepless nights.
          </p>
          <p>
            After gaining experience at reputed companies for 5 years, Sachin realized something vital: jobs gave stability, but not fulfillment. His dreams were bigger than his designation. He wanted growth, not survival. And that's when he took a bold leap — into the unknown world of real estate.
          </p>
          <p>
            No background. No mentor. No capital. He started by helping people find homes for rent — door to door, client by client, learning the business with every step. Soon, confidence replaced confusion. From rental brokering, he moved into construction — learning not from books, but brick by brick.
          </p>
          <p>
            In just over a decade, Sachin built 200+ homes, sold 1000+ plots, and became a trusted name in the Indore realty space. Today, he's leading the development of 6 townships funded by his own savings and the belief of close friends — a testament to the trust he's earned.
          </p>
          <p>
            What sets Sachin apart isn't just what he's built — it's how he's built it: with integrity over shortcuts, people over profits, and dreams over doubt. Endless Realty is a reflection of Sachin's core belief: "We don't just develop land. We develop dreams & lives."
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;