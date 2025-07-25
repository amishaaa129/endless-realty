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
import Vdetails from "./locations/Cat_road/vrindavan/vrindavan-details";
import Main9 from './locations/mhow/main';
import Main8 from './locations/Cat_road/main';
import Main7 from './locations/bicholi/main';
import Main6 from './locations/bypass/main';
import Main5 from './locations/ujjain/main';
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
import Greendetails from './locations/Shubham/green/green-details';
import TurnkeyDetails from './locations/Rau/turnkey/turnkey-details';
import AdminPanel from './admin/AdminPanel';

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
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/location/rau" element={<Rau />} />
      <Route path="/our-associates" element={<OurAssociates />} />
      <Route path="/our-associates/:id" element={<BrokerDetails />} />
      <Route path = '/location/cat-road' element={<Main8 />} />
      <Route path = '/location/bicholi' element={<Main7 />} />
      <Route path = '/location/bypass' element={<Main6 />} />'
      <Route path = '/location/ujjain' element={<Main5 />} />'
      <Route path = '/location/mhow' element={<Main9 />} />'
      <Route path = '/location/pithampur' element={<Main3 />} />
      <Route path = '/location/silicon-city' element={<Main1 />} />
      <Route path="/rau" element={<Rau />} />
      <Route path ="/silicon-city-property" element={<Rdetails />} />  
      <Route path="/vrindavan-premium-row-houses" element={<Vdetails />} />
      <Route path="/mhow" element={<Main9 />} />
      <Route path="/Cat-road" element={<Main8 />} />
      <Route path="/bicholi" element={<Main7 />} />
      <Route path="/bypass" element={<Main6 />} />
      <Route path="/ujjain" element={<Main5 />} />
      <Route path="/shubham" element={<Main4 />} />
      <Route path ="/pithampur" element={<Main3 />} />
      <Route path="/rau" element={<Main2 />} />
      <Route path ="/silicon-city" element={<Main1 />} />
      <Route path="/silicon-premium" element={<Sdetails />} />
      <Route path="/silicon-city-s-sector" element={<S1details />} />
      <Route path="/silver-star-city-project" element={<S2details />} />
      <Route path="/pulak-city" element={<S3details />} />
      <Route path="/shourya-vihar" element={<Shoryadetails />} />
      <Route path ="/shubham-valley" element={<Valleydetails />} />
      <Route path ="/turnkey-villa" element={<TurnkeyDetails />} />
      <Route path ="/shubham-tsv" element={<Tsvdetails />} />
      <Route path ="/shubham-arcadia" element={<Arcadiadetails />} />
      <Route path ="/shubham-eleven" element={<Elevendetails />} />
      <Route path ="/shubham-greens" element={<Greendetails />} />
    </Routes>
  );
}

export default App;