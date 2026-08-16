import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminDashboard } from '../features/admin/AdminDashboard';

export const AdminRoutes: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        {/* Placeholder for future admin sub-routes: /users, /verifications, /analytics */}
      </Routes>
    </ProtectedRoute>
  );
};
