import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { Wrench, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (role === 'provider') return '/provider';
    if (role === 'admin') return '/admin';
    return '/customer';
  };

  const getRoleBadgeClass = () => {
    if (role === 'admin') return 'badge-admin';
    if (role === 'provider') return 'badge-provider';
    return 'badge-customer';
  };

  return (
    <header style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand */}
        <Link to={isAuthenticated ? getDashboardPath() : '/login'} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: '#111827'
        }}>
          <div style={{
            background: '#4F46E5',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <Wrench size={18} />
          </div>
          <div>
            <span style={{ fontWeight: 700, fontSize: '17px', color: '#111827' }}>
              SmartServe
            </span>
          </div>
        </Link>

        {/* User Info & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {isAuthenticated && user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
                    {user.full_name || user.email}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>
                    {user.email}
                  </div>
                </div>

                <span className={`badge ${getRoleBadgeClass()}`} style={{ textTransform: 'capitalize' }}>
                  {role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
                title="Log out"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
