import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './HelperFunctions/Context/AuthContext';
import Global_Footer from './Components/Layouts/Global_Footer';
import Global_Navbar from './Components/Layouts/Global_Navbar';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import ErrorPage from './Pages/General/ErrorPage';
import TOS from './Pages/Policies/TOS';
import PrivacyPolicy from './Pages/Policies/PrivacyPolicy';
import RefundPolicy from './Pages/Policies/RefundPolicy';
import FAQ from './Pages/General/FAQ';
import Home from './Pages/General/Home';
import Login from './Pages/Authentication/Login';
import Registration from './Pages/Authentication/Registration';
import ResetPassword from './Pages/Authentication/ResetPassword';
import NewPassword from './Pages/Authentication/NewPassword';
import ResendVerification from './Pages/Authentication/ResendVerification';
import VendorDashboard from './Pages/Dashboards/VendorDashboard';
import CustomerDashboard from './Pages/Dashboards/CustomerDashboard';
import DashboardComponentShowcase from './Pages/DashboardComponentShowcase';

function AppContent() {
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
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logoff:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary text-bodyText">
      <Global_Navbar handleAccountClick={handleAccountClick} handleLogoff={handleLogoff} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/resend-verification" element={<ResendVerification />} />
          <Route path="/ds123" element={<DashboardComponentShowcase />} />

        {/* Vendor Dashboard - Requires 'vendor' Role */}
        <Route
        path="/vendor-dashboard"
        element={
          <ProtectedRoute roleRequired="vendor">
            <VendorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Customer Dashboard - Requires 'customer' Role */}
      <Route
        path="/customer-dashboard"
        element={
          <ProtectedRoute roleRequired="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;