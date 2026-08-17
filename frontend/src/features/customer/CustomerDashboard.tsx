import React from 'react';
import { useAuth } from '../../store/AuthContext';
import { Navbar } from '../../components/common/Navbar';
import { formatINR } from '../../utils/currency';
import { Search, Calendar, Clock, MapPin, Star, ShieldCheck, Plus, Wrench, Zap, Droplet, Home } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();

  const serviceCategories = [
    { name: 'Plumbing & Sanitary', icon: Droplet, count: '24 Pros Available', color: '#2563EB' },
    { name: 'Electrical & Power', icon: Zap, count: '18 Pros Available', color: '#D97706' },
    { name: 'Home Maintenance', icon: Wrench, count: '32 Pros Available', color: '#059669' },
    { name: 'Deep House Cleaning', icon: Home, count: '40 Pros Available', color: '#7C3AED' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F9FAFB' }}>
      <Navbar />

      <main className="container" style={{ flex: 1 }}>
        {/* Welcome Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827' }}>
                Welcome back, {user?.full_name || 'Customer'}!
              </h1>
              <span className="badge badge-customer">Customer</span>
            </div>
            <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '2px' }}>
              Find and book verified service professionals in your area.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" style={{ fontSize: '13px' }}>
              <Calendar size={14} />
              <span>My Bookings</span>
            </button>
            <button className="btn btn-primary" style={{ fontSize: '13px' }}>
              <Plus size={14} />
              <span>Book Service</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="card" style={{ padding: '12px 16px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 280px', background: '#F9FAFB', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
            <Search size={16} color="#6B7280" />
            <input
              type="text"
              placeholder="Search services (e.g. Pipe leakage, AC repair, Deep cleaning)"
              style={{ background: 'transparent', border: 'none', color: '#111827', outline: 'none', width: '100%', fontSize: '13px', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '0 1 220px', background: '#F9FAFB', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
            <MapPin size={16} color="#059669" />
            <span style={{ fontSize: '13px', color: '#374151' }}>Noida (Within 10 km)</span>
          </div>

          <button className="btn btn-primary" style={{ padding: '8px 18px' }}>
            Search Verified Pros
          </button>
        </div>

        {/* Categories Grid */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>
            Service Categories
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {serviceCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '14px 16px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: `${cat.color}14`,
                    border: `1px solid ${cat.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: cat.color
                  }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{cat.name}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>{cat.count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Booking Card */}
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>
            Active Booking
          </h2>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span className="badge badge-verified" style={{ marginBottom: '4px' }}>
                  <ShieldCheck size={12} /> Confirmed #BK-9821
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>
                  Plumbing & Pipe Leak Diagnostics
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#059669' }}>
                  {formatINR(650)}
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>Pay-After-Service / COD</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} color="#4F46E5" />
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Scheduled Time</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>Today, 03:30 PM</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#D97706" />
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Live Provider ETA</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#D97706' }}>12 mins away (En Route)</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={16} color="#D97706" />
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>Assigned Provider</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>Pushkar K. (4.9 ★)</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                Contact Provider
              </button>
              <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                Live Tracking Map
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};
