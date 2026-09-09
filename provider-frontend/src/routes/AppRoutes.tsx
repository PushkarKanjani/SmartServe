import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProviderLoginView } from '../pages/auth/ProviderLoginView';
import { ProviderOnboardingView } from '../pages/onboarding/ProviderOnboardingView';
import { ProviderDashboardView } from '../pages/dashboard/ProviderDashboardView';
import { ProviderLayout } from '../components/layout/ProviderLayout';
import { useAuth } from '../context/AuthContext';
import { ProviderApplicationStatusView } from '../pages/status/ProviderApplicationStatusView';

import { ProviderServicesView } from '../pages/services/ProviderServicesView';
import { ProviderAvailabilityView } from '../pages/availability/ProviderAvailabilityView';
import { ProviderProfileView } from '../pages/profile/ProviderProfileView';
import { ProviderSupportView } from '../pages/support/ProviderSupportView';

/**
 * ProtectedRoute: Requires a valid token.
 * If token exists but provider is NOT verified → redirect to /application-status.
 * Only verified providers gain access to operational routes.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, loading, isVerified } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-xs text-[#1F2A1E]/60">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2F5233] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Authenticating session…
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Provider is authenticated but not yet verified — send to status page
  if (isVerified === false) {
    return <Navigate to="/application-status" replace />;
  }

  // isVerified === null means we haven't determined it yet (edge case) — allow through
  return <>{children}</>;
};

/**
 * StatusRoute: Requires a token. If already verified, redirect to dashboard.
 */
const StatusRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, loading, isVerified } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-xs text-[#1F2A1E]/60">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2F5233] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading…
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Already verified — skip status, go to dashboard
  if (isVerified === true) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes — no auth required */}
      <Route path="/login" element={<ProviderLoginView />} />
      <Route path="/onboarding" element={<ProviderOnboardingView />} />

      {/* Application status — requires auth, blocks verified providers (sends them to dashboard) */}
      <Route
        path="/application-status"
        element={
          <StatusRoute>
            <ProviderApplicationStatusView />
          </StatusRoute>
        }
      />

      {/* Protected operational routes — requires verified provider */}
      <Route
        element={
          <ProtectedRoute>
            <ProviderLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<ProviderDashboardView />} />
        <Route path="/services" element={<ProviderServicesView />} />
        <Route path="/availability" element={<ProviderAvailabilityView />} />
        <Route path="/profile" element={<ProviderProfileView />} />
        <Route path="/support" element={<ProviderSupportView />} />
      </Route>

      <Route path="/" element={<Navigate to="/onboarding" replace />} />
      <Route path="*" element={<Navigate to="/onboarding" replace />} />
    </Routes>
  );
};
