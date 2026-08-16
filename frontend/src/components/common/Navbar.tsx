import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { Sparkles, LogOut, ShieldCheck, UserCheck, Briefcase } from 'lucide-react';

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

  return (
    <header style={{
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand */}
        <Link to={isAuthenticated ? getDashboardPath() : '/login'} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: '#ffffff'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)'
          }}>
            <Sparkles size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em' }}>
              Smart<span style={{ color: '#818cf8' }}>Serve</span>
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Service Marketplace
            </div>
          </div>
        </Link>

        {/* User Info & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isAuthenticated && user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f8fafc' }}>
                    {user.full_name || user.email}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {user.email}
                  </div>
                </div>

                <span className={`badge badge-${role || 'customer'}`}>
                  {role === 'admin' && <ShieldCheck size={12} />}
                  {role === 'provider' && <Briefcase size={12} />}
                  {role === 'customer' && <UserCheck size={12} />}
                  {role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: '8px 14px', fontSize: '13px' }}
                title="Log out"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
