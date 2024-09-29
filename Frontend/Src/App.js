import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Global_Footer from './Components/Global_Footer'; 
import Global_Navbar from './Components/Global_Navbar'; 
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
import ResetPassword2 from './Pages/ResetPassword2';
import ResendVerification from './Pages/ResendVerification';
import VendorDashboard from './Pages/VendorDashboard';
import CustomerDashboard from './Pages/CustomerDashboard';
import ChangeEmail from './Pages/ChangeEmail';
import ChangePassword from './Pages/ChangePassword';

function App() {
  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const navigate = useNavigate();

  // Fetch the session and account type
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      if (session?.user) {
        const { data, error } = await supabase
          .from('users_meta')
          .select('account_type')
          .eq('id', session.user.id)
          .single();

        if (!error) {
          setAccountType(data.account_type);
        }
      }
    };

    fetchUser();
  }, []);

  // Handle logoff
  const handleLogoff = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null); // Clear user state
      setAccountType(null); // Clear account type
      navigate('/login'); // Redirect to login page
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary text-bodyText">
      <Global_Navbar user={user} accountType={accountType} handleLogoff={handleLogoff} />
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password2" element={<ResetPassword2 />} />
          <Route path="/resend-verification" element={<ResendVerification />} />

          {/* Protected routes */}
          <Route
            path="/vendor-dashboard"
            element={user && accountType === 'vendor' ? <VendorDashboard /> : <Login />}
          />
          <Route
            path="/customer-dashboard"
            element={user && accountType === 'customer' ? <CustomerDashboard /> : <Login />}
          />
          <Route
            path="/change-email"
            element={(user && accountType === 'customer') || (user && accountType === 'vendor')  ? <ChangeEmail /> : <Login />}
          />
          <Route
            path="/change-password"
            element={(user && accountType === 'customer') || (user && accountType === 'vendor')  ? <ChangePassword /> : <Login />}
          />
          

          {/* Public routes */}
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
