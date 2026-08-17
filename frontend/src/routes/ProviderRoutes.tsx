import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { ProviderDashboard } from '../features/provider/ProviderDashboard';
import { ProviderProfilePage } from '../features/provider/ProviderProfilePage';
import { AvailabilityPage } from '../features/provider/AvailabilityPage';
import { CertificatesPage } from '../features/provider/CertificatesPage';

export const ProviderRoutes: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={['provider', 'admin']}>
      <Routes>
        <Route path="/" element={<ProviderDashboard />} />
        <Route path="/dashboard" element={<ProviderDashboard />} />
        <Route path="/profile" element={<ProviderProfilePage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
      </Routes>
    </ProtectedRoute>
  );
};
