import React from 'react';
import { useAuth } from '../../store/AuthContext';
import { Navbar } from '../../components/common/Navbar';
import { formatINR } from '../../utils/currency';
import { ShieldCheck, Users, AlertTriangle, TrendingUp, FileText, CheckCircle, XCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const pendingVerifications = [
    { id: 'cert-101', name: 'Vikram Mehta', service: 'Master HVAC Technician', document: 'Govt_HVAC_Certification.pdf', submitted: '10 mins ago' },
    { id: 'cert-102', name: 'Rohan Sharma', service: 'Certified Electrician', document: 'State_Electrical_Licence.pdf', submitted: '35 mins ago' },
    { id: 'cert-103', name: 'Anita Roy', service: 'Deep Cleaning Specialist', document: 'Identity_Background_Check.pdf', submitted: '2 hours ago' },
  ];

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
                Platform Governance & Administration
              </h1>
              <span className="badge badge-admin">Super Admin</span>
            </div>
            <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '2px' }}>
              Welcome, {user?.full_name || 'Administrator'}. Monitor platform metrics, verification queues, and dispute escalations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" style={{ fontSize: '13px' }}>
              <Users size={14} />
              <span>User Directory</span>
            </button>
            <button className="btn btn-primary" style={{ fontSize: '13px' }}>
              <TrendingUp size={14} />
              <span>Full Analytics</span>
            </button>
          </div>
        </div>

        {/* System Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Active Bookings</span>
              <TrendingUp size={16} color="#4F46E5" />
            </div>
            <div className="stat-value">1,284</div>
            <div className="stat-subtext" style={{ color: '#059669' }}>+12.4% vs last week</div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Verified Providers</span>
              <ShieldCheck size={16} color="#059669" />
            </div>
            <div className="stat-value">482 Pros</div>
            <div className="stat-subtext">98.2% compliance rate</div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Fraud Alerts</span>
              <AlertTriangle size={16} color="#059669" />
            </div>
            <div className="stat-value" style={{ color: '#059669' }}>0 Active</div>
            <div className="stat-subtext">Kafka detector nominal</div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="stat-label">Total GMV (MTD)</span>
              <TrendingUp size={16} color="#4F46E5" />
            </div>
            <div className="stat-value">{formatINR(84250)}</div>
            <div className="stat-subtext">Avg ticket {formatINR(680)}</div>
          </div>
        </div>

        {/* Verification Queue */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
              Provider Certificate Verification Queue ({pendingVerifications.length})
            </h2>
            <span style={{ fontSize: '12px', color: '#4F46E5', cursor: 'pointer', fontWeight: 500 }}>
              View All Submissions →
            </span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Skill Category</th>
                  <th>Submitted Document</th>
                  <th>Timestamp</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingVerifications.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: '#111827' }}>
                      {item.name}
                    </td>
                    <td style={{ color: '#4B5563' }}>
                      {item.service}
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#4F46E5', cursor: 'pointer' }}>
                        <FileText size={14} />
                        <span>{item.document}</span>
                      </span>
                    </td>
                    <td style={{ color: '#6B7280' }}>
                      {item.submitted}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button className="btn btn-danger" style={{ padding: '4px 8px', fontSize: '12px' }}>
                          <XCircle size={13} />
                          <span>Reject</span>
                        </button>
                        <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                          <CheckCircle size={13} />
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
