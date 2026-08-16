import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store/AuthContext';
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { CustomerRoutes } from './routes/CustomerRoutes';
import { ProviderRoutes } from './routes/ProviderRoutes';
import { AdminRoutes } from './routes/AdminRoutes';

// Helper for root path redirection based on role
const RootRedirect: React.FC = () => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0a0e1a',
        color: '#94a3b8'
      }}>
        Loading SmartServe...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'provider') return <Navigate to="/provider" replace />;
  if (role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/customer" replace />;
};

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Role-based Protected Routes */}
      <Route path="/customer/*" element={<CustomerRoutes />} />
      <Route path="/provider/*" element={<ProviderRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Fallback 404 Route */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
};

export default App;
