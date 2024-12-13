import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0B1221]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;