import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Global_Footer from './Components/Global_Footer'; // Global footer
import Global_Navbar from './Components/Global_Navbar'; // Global navbar
import ErrorPage from './Pages/ErrorPage';
import TOS from './Pages/TOS';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import RefundPolicy from './Pages/RefundPolicy';
import FAQ from './Pages/FAQ';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import CheckEmail from './Pages/CheckEmail';
import EmailVerified from './Pages/EmailVerified';
import ResetPassword from './Pages/ResetPassword';
import ResendVerification from './Pages/ResendVerification';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-primary text-bodyText">
      {/* Sticky Navbar at the top */}
      <Global_Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/resend-verification" element={<ResendVerification />} /> 

          <Route path="/contact-faq" element={<FAQ />} />
          <Route path="/terms-of-service" element={<TOS />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      {/* Footer at the bottom */}
      <Global_Footer />
    </div>
  );
}

export default App;
