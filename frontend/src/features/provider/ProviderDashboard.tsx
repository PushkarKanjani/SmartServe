import React, { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { Navbar } from '../../components/common/Navbar';
import { Briefcase, DollarSign, CheckCircle2, Star, ShieldCheck, MapPin, Clock, Calendar, Navigation, Power } from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0e1a' }}>
      <Navbar />

      <main className="container" style={{ flex: 1 }}>
        {/* Header with Online Status Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Provider Command Center
              </h1>
              <span className="badge badge-provider">Provider Hub</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '15px', marginTop: '4px' }}>
              Welcome, {user?.full_name || 'Provider'}. Manage your bookings, schedule, and live dispatch.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className="btn"
              style={{
                background: isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                borderColor: isOnline ? '#10b981' : '#ef4444',
                color: isOnline ? '#34d399' : '#f87171',
                padding: '8px 14px',
                fontSize: '13px'
              }}
            >
              <Power size={14} />
              <span>{isOnline ? '🟢 Online' : '🔴 Offline'}</span>
            </button>

            <a href="/provider/profile" className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
              <Briefcase size={14} />
              <span>My Profile</span>
            </a>

            <a href="/provider/certificates" className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '13px' }}>
              <ShieldCheck size={14} />
              <span>Certificates</span>
            </a>

            <a href="/provider/availability" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <Calendar size={14} />
              <span>Manage Slots</span>
            </a>
          </div>
        </div>

        {/* Stats Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Today's Earnings</span>
              <DollarSign size={20} color="#10b981" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff' }}>$240.00</div>
            <div style={{ fontSize: '12px', color: '#34d399', marginTop: '4px' }}>+18% from yesterday</div>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Reliability Score</span>
              <ShieldCheck size={20} color="#6366f1" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#818cf8' }}>
              {user?.reliability_score || 96.5}%
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Top 5% in your region</div>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Completed Jobs</span>
              <CheckCircle2 size={20} color="#f59e0b" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff' }}>148 Jobs</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>100% on-time arrival</div>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Customer Rating</span>
              <Star size={20} color="#fbbf24" fill="#fbbf24" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fbbf24' }}>4.92 ★</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Based on 132 reviews</div>
          </div>
        </div>

        {/* Incoming Dispatch Request */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>
            🔔 Incoming Booking Dispatch
          </h2>
          
          <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #6366f1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-customer" style={{ marginBottom: '6px' }}>
                  New Request • 5-min SLA Timer Active
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>
                  Emergency Electrical Short Circuit Diagnostics
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '2px' }}>
                  Customer: Aastha S. • 2.4 km away
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#10b981' }}>$85.00</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Guaranteed Payout</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px', background: 'rgba(15, 23, 42, 0.4)', padding: '16px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="#10b981" />
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Service Address</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Sector 62, Block B, Suite 402</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={18} color="#f59e0b" />
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Requested Slot</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Immediate Dispatch (ASAP)</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={18} color="#818cf8" />
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Category</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Electrical Diagnostics</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-danger" style={{ padding: '10px 20px' }}>
                Decline Request
              </button>
              <button className="btn btn-primary" style={{ padding: '10px 24px' }}>
                <Navigation size={16} />
                <span>Accept & Start Journey</span>
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};
