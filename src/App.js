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
import Rau from "./locations/Rau/main";
import Rdetails from "./locations/Rau/silicon/rau-details";
import Vrindavan from "./locations/Cat_road/vrindavan";
import Vdetails from "./locations/Cat_road/vrindavan-details";
import Main4 from  './locations/Shubham/main';
import Main3 from './locations/pithampur/main';
import Main2 from './locations/Rau/main';
import Main1 from './locations/silicon_city/main';
import Sdetails from './locations/silicon_city/silicon/silicon-details';
import S1details from './locations/silicon_city/silicon1/silicon1-details';
import S2details from './locations/silicon_city/silicon2/silicon2-details';
import S3details from './locations/silicon_city/silicon3/silicon3-details';
import Shoryadetails from './locations/Rau/shorya/shorya-details';
import Valleydetails from './locations/Shubham/valley/valley-details';
import Tsvdetails from './locations/Shubham/tsv/tsv-details';
import Arcadiadetails from './locations/Shubham/arcadia/arcadia-details';
import Elevendetails from './locations/Shubham/eleven/eleven-details';
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
      <Route path="/shubham" element={<Main4 />} />
      <Route path ="/pithampur" element={<Main3 />} />
      <Route path="/rau" element={<Main2 />} />
      <Route path ="/silicon-city" element={<Main1 />} />
      <Route path="/silicon-premium" element={<Sdetails />} />
      <Route path="/silicon-city-s-sector" element={<S1details />} />
      <Route path="/silver-star-city-project" element={<S2details />} />
      <Route path="/pulak-city" element={<S3details />} />
      <Route path="/shourya-premium" element={<Shoryadetails />} />
      <Route path ="/valley-premium" element={<Valleydetails />} />
      <Route path ="/tsv-premium" element={<Tsvdetails />} />
      <Route path ="/arcadia-premium" element={<Arcadiadetails />} />
      <Route path ="/eleven-premium" element={<Elevendetails />} />
    </Routes>
  );
}

export default App;