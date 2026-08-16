import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { UserRole } from '../../types/auth';
import { Sparkles, Lock, Mail, User as UserIcon, Phone, AlertCircle, ArrowRight, UserCheck, Briefcase } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await register({
        full_name: fullName,
        email,
        password,
        role,
        phone: phone || undefined,
      });

      if (role === 'provider') navigate('/provider', { replace: true });
      else navigate('/customer', { replace: true });
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { detail?: string | { msg: string }[] } }; message?: string };
      const detail = apiErr.response?.data?.detail;
      const errorMsg = typeof detail === 'string'
        ? detail
        : Array.isArray(detail)
        ? detail[0]?.msg
        : apiErr.message || 'Registration failed. Please check your details.';
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
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
      <div style={{ width: '100%', maxWidth: '480px' }}>
        
        {/* Header */}
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
            Create Your Account
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '6px' }}>
            Join SmartServe as a Customer or Service Provider
          </p>
        </div>

        {/* Register Panel */}
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
                <strong>Registration Notice:</strong> {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Role Selector Tabs */}
            <div className="form-group">
              <label className="form-label">I want to join as</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: role === 'customer' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${role === 'customer' ? '#6366f1' : 'rgba(255, 255, 255, 0.08)'}`,
                    color: role === 'customer' ? '#818cf8' : '#94a3b8',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}
                >
                  <UserCheck size={20} />
                  <span>Customer (Book Services)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('provider')}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: role === 'provider' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${role === 'provider' ? '#10b981' : 'rgba(255, 255, 255, 0.08)'}`,
                    color: role === 'provider' ? '#34d399' : '#94a3b8',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    fontSize: '13px'
                  }}
                >
                  <Briefcase size={20} />
                  <span>Provider (Offer Services)</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="fullName"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alex Johnson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{ paddingLeft: '40px' }}
                />
                <UserIcon size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="regEmail">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="regEmail"
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
              <label className="form-label" htmlFor="regPhone">Phone Number (Optional)</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="regPhone"
                  type="tel"
                  className="form-input"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
                <Phone size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="regPassword">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="regPassword"
                  type="password"
                  className="form-input"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
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
              {isSubmitting ? 'Creating Account...' : 'Register & Continue'}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Footer Link */}
          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#94a3b8' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#818cf8', fontWeight: 600, textDecoration: 'none' }}>
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
