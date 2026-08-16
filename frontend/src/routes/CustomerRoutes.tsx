import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { CustomerDashboard } from '../features/customer/CustomerDashboard';

export const CustomerRoutes: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={['customer', 'admin']}>
      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        {/* Placeholder for future customer sub-routes: /bookings, /search, /support */}
      </Routes>
    </ProtectedRoute>
  );
};
