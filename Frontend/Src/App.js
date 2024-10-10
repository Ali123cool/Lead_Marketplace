import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './HelperFunctions/Authentication/AuthContext';
import Global_Footer from './Components/4_Global/Footer';
import Global_Navbar from './Components/4_Global/Navbar';
import ProtectedRoute from './RouteProtection/ProtectedRoute';
import ErrorPage from './Pages/Static/ErrorPage';
import TOS from './Pages/Static/TOS';
import PrivacyPolicy from './Pages/Static/PrivacyPolicy';
import RefundPolicy from './Pages/Static/RefundPolicy';
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
import ChangeEmail from './Pages/Authentication/ChangeEmailFromDashboard';
import ResetPasswordFromVendorDashboard from './Pages/Authentication/ResetPasswordFromVendorDashboard';

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
      <div className="pt-16 flex-grow flex items-center justify-center">
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/resend-verification" element={<ResendVerification />} />
            <Route path="/ds123" element={<DashboardComponentShowcase />} />
            <Route path="/contact-faq" element={<FAQ />} />
            <Route path="/terms-of-service" element={<TOS />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
          
            {/*Protected Routes */}
            <Route path="/vendor-dashboard" element={ <ProtectedRoute roleRequired="vendor"> <VendorDashboard /> </ProtectedRoute>}/>
            <Route path="/customer-dashboard" element={ <ProtectedRoute roleRequired="customer"> <CustomerDashboard /> </ProtectedRoute>}/>
            <Route path="/vendor-dashboard/change-email" element={ <ProtectedRoute roleRequired="vendor"> <ChangeEmail /> </ProtectedRoute>}/>
            <Route path="/vendor-dashboard/change-password" element={ <ProtectedRoute roleRequired="vendor"> <ResetPasswordFromVendorDashboard /> </ProtectedRoute> } />
            
            {/*Error Page */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
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