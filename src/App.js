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
import Rdetails from "./locations/Rau/rau-details";
import Vrindavan from "./locations/Cat_road/vrindavan";
import Vdetails from "./locations/Cat_road/vrindavan-details";
import Silicon from "./locations/silicon_city/silicon";
import Sdetails from "./locations/silicon_city/silicon-details";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/what's-new" element={<Features />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/location/cat-road" element={<Vrindavan />} />
      <Route path="/location/rau" element={<Rau />} />
      <Route path="/our-associates" element={<OurAssociates />} />
      <Route path="/our-associates/:id" element={<BrokerDetails />} />
      <Route path="/rau" element={<Rau />} />
      <Route path ="/rau-premium" element={<Rdetails />} />
      <Route path="/Cat-road" element={<Vrindavan />} />
      <Route path="/vrindavan-premium-row-houses" element={<Vdetails />} />
      <Route path="/silicon-city" element={<Silicon />} />
      <Route path="/silicon-premium" element={<Sdetails />} />
    </Routes>
  );
}

export default App;