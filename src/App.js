import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Features from './pages/features';
import About from './pages/aboutus';
import Contact from './pages/contactus';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/aboutus" element={<About />} />
        <Route path = "/contactus" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;