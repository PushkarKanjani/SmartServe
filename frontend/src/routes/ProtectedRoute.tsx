import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { UserRole } from '../types/auth';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#F9FAFB',
        color: '#6B7280',
        gap: '12px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid #E5E7EB',
          borderTopColor: '#4F46E5',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ fontSize: '13px', fontWeight: 500 }}>Authenticating session...</p>
      </div>
    );
  }

  // Not logged in -> Redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles specified and user role doesn't match
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Redirect to their own dashboard
    if (role === 'customer') return <Navigate to="/customer" replace />;
    if (role === 'provider') return <Navigate to="/provider" replace />;
    if (role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
};
