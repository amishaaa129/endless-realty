import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Features from './pages/features';
import About from './pages/aboutus';
import Contact from './pages/contactus';
import Properties from './pages/properties';
import SignIn from './Login/signin';
import SignUp from './Login/signup';
import SearchResults from './pages/allproperties';

import OurAssociates from './pages/ourassociates';
import BrokerDetails from './pages/brokerDetails';
import Rau from "./locations/Rau/rau";
import Vrindavan from "./locations/Cat_road/vrindavan";
import Vdetails from "./locations/Cat_road/vrindavan-details";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cities" element={<Properties />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<SearchResults />} />
      
      <Route path="/our-associates" element={<OurAssociates />} />
      <Route path="/brokers/:id" element={<BrokerDetails />} />
      <Route path="/rau" element={<Rau />} />
      <Route path="/Cat-road" element={<Vrindavan />} />
      <Route path="/vrindavan-details" element={<Vdetails />} />
      
    </Routes>
  );
}

export default App;