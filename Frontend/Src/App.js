import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Global_Footer from './Components/Global_Footer'; // Add the footer
import ErrorPage from './Pages/ErrorPage';
import TOS from './Pages/TOS';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import RefundPolicy from './Pages/RefundPolicy';
import FAQ from './Pages/FAQ';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Registration from './Pages/Registration';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-primary text-body-text">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Registration />} /> 
          <Route path="/contact-faq" element={<FAQ />} />
          <Route path="/terms-of-service" element={<TOS />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Global_Footer /> 
    </div>
  );
}

export default App;
