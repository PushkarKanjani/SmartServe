import React, { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { Navbar } from '../../components/common/Navbar';
import { formatINR } from '../../utils/currency';
import {
  Briefcase,
  IndianRupee,
  CheckCircle2,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Calendar,
  Navigation,
  Power,
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F9FAFB' }}>
      <Navbar />

      <main className="container" style={{ flex: 1 }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827' }}>
                Provider Command Center
              </h1>
              <span className="badge badge-provider">Provider</span>
            </div>
            <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '2px' }}>
              Welcome back, {user?.full_name || 'Provider'}. Manage your bookings, schedule, and live dispatch.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className="btn btn-secondary"
              style={{
                background: isOnline ? '#ECFDF5' : '#FEF2F2',
                borderColor: isOnline ? '#A7F3D0' : '#FECACA',
                color: isOnline ? '#065F46' : '#991B1B',
                fontSize: '12px'
              }}
            >
              <Power size={14} />
              <span>{isOnline ? 'Available for Jobs' : 'Offline'}</span>
            </button>

            <a href="/provider/profile" className="btn btn-secondary" style={{ fontSize: '12px' }}>
              <Briefcase size={14} />
              <span>Profile</span>
            </a>

            <a href="/provider/certificates" className="btn btn-secondary" style={{ fontSize: '12px' }}>
              <ShieldCheck size={14} />
              <span>Certificates</span>
            </a>

            <a href="/provider/availability" className="btn btn-primary" style={{ fontSize: '12px' }}>
              <Calendar size={14} />
              <span>Manage Slots</span>
            </a>
          </div>
        </div>

        {/* Stats Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Today's Earnings</span>
              <IndianRupee size={16} color="#059669" />
            </div>
            <div className="stat-value">{formatINR(2400)}</div>
            <div className="stat-subtext" style={{ color: '#059669' }}>+18% from yesterday</div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Reliability Score</span>
              <ShieldCheck size={16} color="#4F46E5" />
            </div>
            <div className="stat-value" style={{ color: '#4F46E5' }}>
              {user?.reliability_score || 96.5}%
            </div>
            <div className="stat-subtext">Top 5% in your region</div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Completed Jobs</span>
              <CheckCircle2 size={16} color="#D97706" />
            </div>
            <div className="stat-value">148 Jobs</div>
            <div className="stat-subtext">100% on-time arrival</div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Customer Rating</span>
              <Star size={16} color="#D97706" />
            </div>
            <div className="stat-value">4.92 / 5</div>
            <div className="stat-subtext">Based on 132 reviews</div>
          </div>
        </div>

        {/* Incoming Dispatch Request */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>
            Incoming Dispatch Request
          </h2>
          
          <div className="card" style={{ borderLeft: '3px solid #4F46E5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <div>
                <span className="badge badge-warning" style={{ marginBottom: '6px' }}>
                  New Request (5-min SLA Active)
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>
                  Emergency Electrical Short Circuit Diagnostics
                </h3>
                <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '2px' }}>
                  Customer: Aastha S. • 2.4 km away
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#059669' }}>
                  {formatINR(850)}
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>Guaranteed Payout</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px', background: '#F9FAFB', padding: '12px 16px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#6B7280" />
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Service Address</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>Sector 62, Block B, Suite 402</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#6B7280" />
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Requested Slot</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>Immediate Dispatch (ASAP)</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={16} color="#6B7280" />
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Category</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>Electrical Diagnostics</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-danger" style={{ padding: '8px 16px' }}>
                Decline
              </button>
              <button className="btn btn-primary" style={{ padding: '8px 20px' }}>
                <Navigation size={14} />
                <span>Accept & Start Journey</span>
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};
