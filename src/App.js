import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Features from './pages/features';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </Router>
  );
}

export default App;