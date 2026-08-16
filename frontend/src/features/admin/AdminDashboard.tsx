import React from 'react';
import { useAuth } from '../../store/AuthContext';
import { Navbar } from '../../components/common/Navbar';
import { ShieldCheck, Users, AlertTriangle, TrendingUp, FileText, CheckCircle, XCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const pendingVerifications = [
    { id: 'cert-101', name: 'Vikram Mehta', service: 'Master HVAC Technician', document: 'Govt_HVAC_Certification.pdf', submitted: '10 mins ago' },
    { id: 'cert-102', name: 'Rohan Sharma', service: 'Certified Electrician', document: 'State_Electrical_Licence.pdf', submitted: '35 mins ago' },
    { id: 'cert-103', name: 'Anita Roy', service: 'Deep Cleaning Specialist', document: 'Identity_Background_Check.pdf', submitted: '2 hours ago' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0e1a' }}>
      <Navbar />

      <main className="container" style={{ flex: 1 }}>
        {/* Header */}
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
                Platform Governance & Admin
              </h1>
              <span className="badge badge-admin">Super Admin</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '15px', marginTop: '4px' }}>
              Welcome, {user?.full_name || 'Administrator'}. Monitor platform metrics, verification queues, and dispute escalations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary">
              <Users size={16} />
              <span>User Directory</span>
            </button>
            <button className="btn btn-primary">
              <TrendingUp size={16} />
              <span>Full Analytics</span>
            </button>
          </div>
        </div>

        {/* System Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Active Bookings</span>
              <TrendingUp size={20} color="#6366f1" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff' }}>1,284</div>
            <div style={{ fontSize: '12px', color: '#34d399', marginTop: '4px' }}>+12.4% vs last week</div>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Verified Providers</span>
              <ShieldCheck size={20} color="#10b981" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff' }}>482 Pros</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>98.2% compliance rate</div>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Fraud & Anomaly Alerts</span>
              <AlertTriangle size={20} color="#ef4444" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#f87171' }}>0 Active</div>
            <div style={{ fontSize: '12px', color: '#34d399', marginTop: '4px' }}>Kafka detector nominal</div>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Total GMV (M-to-D)</span>
              <TrendingUp size={20} color="#c084fc" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#c084fc' }}>$84,250</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Avg ticket $68.50</div>
          </div>
        </div>

        {/* Verification Queue */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>
              📜 Provider Certificate Verification Queue ({pendingVerifications.length})
            </h2>
            <span style={{ fontSize: '13px', color: '#818cf8', cursor: 'pointer', fontWeight: 600 }}>
              View All Submissions →
            </span>
          </div>

          <div className="glass-panel" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 20px' }}>Applicant</th>
                  <th style={{ padding: '14px 20px' }}>Skill Category</th>
                  <th style={{ padding: '14px 20px' }}>Submitted Document</th>
                  <th style={{ padding: '14px 20px' }}>Timestamp</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingVerifications.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600, color: '#fff' }}>
                      {item.name}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#cbd5e1' }}>
                      {item.service}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#818cf8', cursor: 'pointer' }}>
                        <FileText size={16} />
                        <span>{item.document}</span>
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#94a3b8', fontSize: '13px' }}>
                      {item.submitted}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          <XCircle size={14} color="#f87171" />
                          <span>Reject</span>
                        </button>
                        <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          <CheckCircle size={14} />
                          <span>Approve</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};
