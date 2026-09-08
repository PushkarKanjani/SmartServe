import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProviderLoginView } from '../pages/auth/ProviderLoginView';
import { ProviderOnboardingView } from '../pages/onboarding/ProviderOnboardingView';
import { ProviderDashboardView } from '../pages/dashboard/ProviderDashboardView';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-xs text-[#1F2A1E]/60">
        Authenticating session...
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<ProviderLoginView />} />
      <Route path="/onboarding" element={<ProviderOnboardingView />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ProviderDashboardView />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/onboarding" replace />} />
      <Route path="*" element={<Navigate to="/onboarding" replace />} />
    </Routes>
  );
};
