import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { UserRole } from '../../types/auth';
import { Sparkles, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Briefcase, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, setDemoSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectByRole = (role: UserRole) => {
    // If there is a redirect path from state, use it
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

  // Demo Login helper to test role-based routes before backend merge
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
      padding: '24px',
      background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15), transparent 70%), #0a0e1a'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)',
            marginBottom: '16px'
          }}>
            <Sparkles size={28} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
            Welcome to SmartServe
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '6px' }}>
            AI-Powered Multi-Service Booking & Management
          </p>
        </div>

        {/* Login Form Panel */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              padding: '12px 14px',
              color: '#f87171',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Login Notice:</strong> {error}
                <div style={{ fontSize: '11px', color: '#fca5a5', marginTop: '4px' }}>
                  (Tip: Use the Demo Account buttons below to test role routing while backend auth is being merged)
                </div>
              </div>
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
                  style={{ paddingLeft: '40px' }}
                />
                <Mail size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="password">Password</label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '40px' }}
                />
                <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ width: '100%', padding: '12px', marginTop: '8px', fontSize: '15px' }}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Selector for testing role-based shells */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', textAlign: 'center' }}>
              ⚡ Quick Demo Role Logins (Instant Test)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleQuickDemo('customer', 'customer@smartserve.dev', 'Aastha (Customer)')}
                style={{ padding: '8px 4px', fontSize: '11px', flexDirection: 'column', gap: '4px' }}
              >
                <UserCheck size={16} color="#60a5fa" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleQuickDemo('provider', 'provider@smartserve.dev', 'Pushkar (Provider)')}
                style={{ padding: '8px 4px', fontSize: '11px', flexDirection: 'column', gap: '4px' }}
              >
                <Briefcase size={16} color="#34d399" />
                <span>Provider</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleQuickDemo('admin', 'admin@smartserve.dev', 'Deepak Sharma (Admin)')}
                style={{ padding: '8px 4px', fontSize: '11px', flexDirection: 'column', gap: '4px' }}
              >
                <ShieldCheck size={16} color="#c084fc" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#94a3b8' }}>
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: '#818cf8', fontWeight: 600, textDecoration: 'none' }}>
              Create Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
