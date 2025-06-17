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
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about-us" element={<About />} />
        <Route path = "/contact" element={<Contact />} />
        <Route path ="/allproperties" element = {<Properties />} />
        <Route path ="/signin" element = {<SignIn />} />
        <Route path ="/signup" element = {<SignUp />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/our-associates" element={<Associates />} />
      </Routes>
    </Router>
  );
}

export default App;