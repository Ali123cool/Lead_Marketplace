import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';  // Access authentication context
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

function App() {
  const { user, role, logout } = useAuth();  // Removed loading and isEmailVerified from AuthContext
  const navigate = useNavigate();

  // Handle navigation based on account role
  const handleAccountClick = () => {
    if (!user) {
      navigate('/login');
    } else if (role === 'vendor') {
      navigate('/vendor-dashboard');
    } else if (role === 'customer') {
      navigate('/customer-dashboard');
    }
  };

  // Handle logoff asynchronously
  const handleLogoff = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error during logoff:', error);
    }
  };

  // Monitor app's state from AuthContext (No longer needed for loading)
  useEffect(() => {
    console.log('User role:', role);
  }, [role]);

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

          {/* Vendor Dashboard (Protected Route) */}
          <Route element={<ProtectedRoute roleRequired="vendor" />}>
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          </Route>

          {/* Customer Dashboard (Protected Route) */}
          <Route element={<ProtectedRoute roleRequired="customer" />}>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          </Route>

          {/* Other Routes */}
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
