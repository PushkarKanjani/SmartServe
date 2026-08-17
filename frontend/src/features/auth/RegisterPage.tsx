import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { UserRole } from '../../types/auth';
import { Wrench, Lock, Mail, User as UserIcon, Phone, AlertCircle, ArrowRight, UserCheck, Briefcase } from 'lucide-react';

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
      padding: '24px 16px',
      background: '#F9FAFB'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        
        {/* Header */}
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
            Create an Account
          </h1>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
            Join SmartServe as a Customer or Service Provider
          </p>
        </div>

        {/* Register Card */}
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
            {/* Role Selector Tabs */}
            <div className="form-group">
              <label className="form-label">I want to join as</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  style={{
                    padding: '10px',
                    borderRadius: '6px',
                    background: role === 'customer' ? '#EEF2FF' : '#FFFFFF',
                    border: `1px solid ${role === 'customer' ? '#4F46E5' : '#D1D5DB'}`,
                    color: role === 'customer' ? '#4F46E5' : '#4B5563',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 500,
                    fontSize: '12px'
                  }}
                >
                  <UserCheck size={18} />
                  <span>Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('provider')}
                  style={{
                    padding: '10px',
                    borderRadius: '6px',
                    background: role === 'provider' ? '#ECFDF5' : '#FFFFFF',
                    border: `1px solid ${role === 'provider' ? '#059669' : '#D1D5DB'}`,
                    color: role === 'provider' ? '#059669' : '#4B5563',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontWeight: 500,
                    fontSize: '12px'
                  }}
                >
                  <Briefcase size={18} />
                  <span>Service Provider</span>
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
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{ paddingLeft: '36px' }}
                />
                <UserIcon size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
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
                  style={{ paddingLeft: '36px' }}
                />
                <Mail size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="regPhone">Phone Number (Optional)</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="regPhone"
                  type="tel"
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ paddingLeft: '36px' }}
                />
                <Phone size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
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
              {isSubmitting ? 'Creating account...' : 'Create Account'}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Footer Link */}
          <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: '#6B7280' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#4F46E5', fontWeight: 500, textDecoration: 'none' }}>
              Sign in
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
