import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import Features from './pages/features';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </Router>
  );
}

export default App;