import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { UserRole } from '../../types/auth';
import { Wrench, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Briefcase, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, setDemoSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectByRole = (role: UserRole) => {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
    if (from && from !== '/login' && from !== '/register') {
      navigate(from, { replace: true });
      return;
    }

    if (role === 'customer') navigate('/customer', { replace: true });
    else if (role === 'provider') navigate('/provider', { replace: true });
    else if (role === 'admin') navigate('/admin', { replace: true });
    else navigate('/customer', { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await login({ email, password });
      const userRole = res.user?.role || (localStorage.getItem('user_role') as UserRole) || 'customer';
      redirectByRole(userRole);
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { detail?: string | { msg: string }[] } }; message?: string };
      const detail = apiErr.response?.data?.detail;
      const errorMsg = typeof detail === 'string'
        ? detail
        : Array.isArray(detail)
        ? detail[0]?.msg
        : apiErr.message || 'Authentication failed. Please verify your credentials.';
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = (role: UserRole, demoEmail: string, demoName: string) => {
    setDemoSession(role, demoEmail, demoName);
    redirectByRole(role);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      background: '#F9FAFB'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '8px',
            background: '#4F46E5',
            color: '#FFFFFF',
            marginBottom: '12px'
          }}>
            <Wrench size={22} />
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
            Sign in to SmartServe
          </h1>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
            Service Booking & Management Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="card" style={{ padding: '24px' }}>
          
          {error && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '6px',
              padding: '10px 12px',
              color: '#991B1B',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: '36px' }}
                />
                <Mail size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '36px' }}
                />
                <Lock size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ width: '100%', padding: '10px', marginTop: '6px', fontSize: '14px' }}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Selector */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px', textAlign: 'center' }}>
              Quick Demo Accounts
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleQuickDemo('customer', 'customer@smartserve.dev', 'Aastha (Customer)')}
                style={{ padding: '6px 4px', fontSize: '11px', flexDirection: 'column', gap: '3px' }}
              >
                <UserCheck size={14} color="#4F46E5" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleQuickDemo('provider', 'provider@smartserve.dev', 'Pushkar (Provider)')}
                style={{ padding: '6px 4px', fontSize: '11px', flexDirection: 'column', gap: '3px' }}
              >
                <Briefcase size={14} color="#059669" />
                <span>Provider</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleQuickDemo('admin', 'admin@smartserve.dev', 'Deepak Sharma (Admin)')}
                style={{ padding: '6px 4px', fontSize: '11px', flexDirection: 'column', gap: '3px' }}
              >
                <ShieldCheck size={14} color="#4B5563" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: '#6B7280' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#4F46E5', fontWeight: 500, textDecoration: 'none' }}>
              Create one
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
