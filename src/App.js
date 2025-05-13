import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Features from './pages/features';
import About from './pages/aboutus';
import Contact from './pages/contactus';
import Properties from './pages/properties';
import SignIn from './Login/signin';
import SignUp from './Login/signup'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/aboutus" element={<About />} />
        <Route path = "/contactus" element={<Contact />} />
        <Route path ="/allproperties" element = {<Properties />} />
        <Route path ="/signin" element = {<SignIn />} />
        <Route path ="/signup" element = {<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;