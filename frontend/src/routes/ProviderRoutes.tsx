import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { ProviderDashboard } from '../features/provider/ProviderDashboard';

export const ProviderRoutes: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={['provider', 'admin']}>
      <Routes>
        <Route path="/" element={<ProviderDashboard />} />
        <Route path="/dashboard" element={<ProviderDashboard />} />
        {/* Placeholder for future provider sub-routes: /availability, /earnings, /tracking */}
      </Routes>
    </ProtectedRoute>
  );
};
