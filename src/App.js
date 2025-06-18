import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Features from './pages/features';
import About from './pages/aboutus';
import Contact from './pages/contactus';
import Properties from './pages/properties';
import SignIn from './Login/signin';
import SignUp from './Login/signup'
import SearchResults from './pages/allproperties';
import Associates from "./pages/associates";
import Rau from "./locations/Rau/rau";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about-us" element={<About />} />
        <Route path = "/contact" element={<Contact />} />
        <Route path ="/cities" element = {<Properties />} />
        <Route path ="/signin" element = {<SignIn />} />
        <Route path ="/signup" element = {<SignUp />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/our-associates" element={<Associates />} />
        <Route path = '/rau' element={<Rau />} />
      </Routes>
    </Router>
  );
}

export default App;