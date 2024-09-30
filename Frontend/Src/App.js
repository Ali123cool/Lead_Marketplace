import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/AuthContext'; 
import Global_Footer from './Components/Layouts/Global_Footer'; 
import Global_Navbar from './Components/Layouts/Global_Navbar'; 
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'; 
import TokenProtectedRoute from './ProtectedRoutes/TokenProtectedRoute';
import ErrorPage from './Pages/General/ErrorPage';
import TOS from './Pages/Policies/TOS';
import PrivacyPolicy from './Pages/Policies/PrivacyPolicy';
import RefundPolicy from './Pages/Policies/RefundPolicy';
import FAQ from './Pages/General/FAQ';
import Home from './Pages/General/Home';
import Login from './Pages/Login_Registration/Login';
import Registration from './Pages/Login_Registration/Registration';
import EmailVerified from './Pages/Login_Registration/EmailVerified';
import ResetPassword from './Pages/Login_Registration/ResetPassword';
import ResendVerification from './Pages/Login_Registration/ResendVerification';
import VendorDashboard from './Pages/Dashboards/VendorDashboard';
import CustomerDashboard from './Pages/Dashboards/CustomerDashboard';
import NewPassword from './Pages/Login_Registration/NewPassword'; // Import NewPassword component

function App() {
  const { user, role, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (!user) {
      navigate('/login');
    } else if (role === 'vendor') {
      navigate('/vendor-dashboard');
    } else if (role === 'customer') {
      navigate('/customer-dashboard');
    }
  };

  const handleLogoff = async () => {
    await logout(); 
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
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password2" element={<ResetPassword2 />} />
          <Route path="/resend-verification" element={<ResendVerification />} />

          {/* Protected Routes for Vendor and Customer Dashboards */}
          <Route element={<ProtectedRoute roleRequired="vendor" />}>
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          </Route>

          <Route element={<ProtectedRoute roleRequired="customer" />}>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          </Route>

          {/* Token-protected route for password reset */}
          <Route element={<TokenProtectedRoute />}>
            <Route path="/new-password" element={<NewPassword />} />
          </Route>

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

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
