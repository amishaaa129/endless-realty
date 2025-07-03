// File: AboutUs.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import './about.css';

const team = [
  {
    name: 'Sachin Kumar Sahu',
    title: 'Visionary Leader | Electrical Engineer',
    bio: ' Sachin\'s journey is one of resilience, vision, and integrity. From rental homes to developing 200+ homes and selling 1000+ plots, he created Endless Realty as a reflection of trust. He doesn\'t just sell plots – he builds possibilities, prosperity, and pride.',
    image: '/images/about/sachin.jpeg'
  },
  {
    name: 'Abhijeet Geete',
    title: 'Entrepreneur | Real Estate Consultant',
    bio: 'A commerce graduate with a decade of entrepreneurial success in the solar energy sector. Entered real estate in 2022 with a mission to create secure investment avenues for others. Known for his ethical approach, deep client trust, and results-focused mindset.',
    image: '/images/about/ab.jpg'
  },
  {
    name: 'Abhishek Sahu',
    title: 'Civil Engineer | Real Estate Consultant',
    bio: 'A B.E. (Civil) graduate with 9 years of experience as a Senior Bridge Engineer. Joined Endless Realty to pursue financial freedom and fulfil his parents\' dreams. Bringing technical expertise, discipline, and sharp execution skills to the real estate field.',
    image: '/images/about/abhishekS.jpeg'
  },
  {
    name: 'Lalit Sahu',
    title: 'MBA (Marketing & Finance) | Real Estate Consultant',
    bio: 'A management graduate with a dual specialization in Marketing and Finance. Brings 4 years of hands-on experience in real estate and civil construction projects. Known for his strategic thinking, on-ground knowledge, and client-focused approach.',
    image: '/images/about/lalit.JPG'
  },
  {
    name: 'Pratik Sahu',
    title: 'B.Tech (IT) | Real Estate Consultant',
    bio: 'An IT graduate with 5 years of experience in the tech industry. Transitioned into civil construction and worked hands-on for the last 4 years. Brings a rare blend of technical mindset and field-level execution.',
    image: '/images/about/pratik.JPG'
  },
  {
    name: 'Abhishek Mishra',
    title: 'Corporate Trainer | Realty Coach',
    bio: 'A seasoned Corporate Trainer and Life Coach with 25+ years of experience. Blends strategic sales techniques with deep human understanding to empower realty professionals. Mentors the Endless Realty team with clarity, confidence, and vision.',
    image: '/images/about/abhishek.JPG'
  }
];

const AboutUs = () => {
  return (
    <>
      <Header />
      <section className="founder-story-section flex justify-end">
      <div className="founder-story text-left max-w-3xl w-full mr-4">
        <h1>🏠 Endless Realty – इंदौर का भरोसेमंद Real Estate Partner</h1>
        <p><strong>हम कौन हैं:</strong><br />
          Endless Realty सिर्फ एक प्रॉपर्टी कंसल्टेंसी नहीं है — हम आपके Real Estate के सच्चे साथी हैं, जो आपकी Investment को एक मजबूत और फायदेमंद धरोहर में बदलने के लिए committed हैं।
        </p>
        <p><strong>हम क्यों सबसे अलग हैं:</strong></p>
        <ul>
          <li><strong>Local Expertise, Personal Touch:</strong> इंदौर का प्रॉपर्टी मार्केट तेजी से Grow कर रहा है और Prices रोज़ बढ़ रहे हैं। ऐसे में हम आपको clarity, confidence और control देते हैं — ताकि आप सही decision ले सकें।</li>
          <li><strong>One-stop full service:</strong> चाहे आपको Property खरीदनी हो या बेचनी हो या mortgage की मदद, Interior Designing से लेकर Property Manage करना हो — हम सब कुछ एक ही जगह पर उपलब्ध करते हैं।</li>
          <li><strong>Smart data + Local knowledge:</strong> हम सिर्फ अंदाज़े से नहीं, Market के Data के साथ काम करते हैं — जैसे की Valuation Reports और Price Trends — ताकि आप पूरी जानकारी के साथ जल्दी decision ले सकें।</li>
          <li><strong>Developer + Consultant का Experience:</strong> हमने 200+ घर और 6 township projects खुद बनाए हैं। इसलिए हमें Development की गहराई से समझ है, और Consultancy का भी पूरा अनुभव।</li>
          <li><strong>Trust & Transparency:</strong> जहाँ आज के market में कीमत अक्सर ज्यादा बताई जाती हैं और trust की कमी होती है, वहां Endless Realty का मकसद है साफ-सुथरी सलाह देना और लंबे समय तक भरोसे का रिश्ता बनाए रखना।</li>
        </ul>
        <p><strong>हमारा वादा:</strong><br />
          चाहे एक छोटा-सा घर हो, कोई प्लॉट में निवेश या विकसित township — हम जो भी Recommend करते हैं या बनाते हैं, उसमें quality की पूरी गारंटी होती है।
        </p>
        <p>हम सिर्फ deals close नहीं करते — हम सपनों को हकीकत बनाते हैं। हमारी expertise, इमानदारी और हमारे टीम के entrepreneurial जोश से हम हर client की journey को खास बनाते हैं।</p>
        <p><strong>आइए — मिलकर इंदौर की Real Estate की कहानी को आगे बढ़ाएं।<br />
          Endless Realty – जहाँ आपका investment, आपका future बनता है।</strong></p>
      </div>
    </section >

      {/* Team Grid */}
      <section className="team-section">
        <h2 className="team-heading">Meet Our Founding Team</h2>
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

      


      <Footer />
    </>
  );
};

export default AboutUs;