import React from 'react';
import { useAuth } from '../../store/AuthContext';
import { Navbar } from '../../components/common/Navbar';
import { Search, Calendar, Clock, MapPin, Star, ShieldCheck, Sparkles, Wrench, Zap, Droplet, Home } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();

  const serviceCategories = [
    { name: 'Plumbing & Pipes', icon: Droplet, count: '24 Pros Available', color: '#60a5fa' },
    { name: 'Electrical & Power', icon: Zap, count: '18 Pros Available', color: '#f59e0b' },
    { name: 'Home Repairs', icon: Wrench, count: '32 Pros Available', color: '#10b981' },
    { name: 'House Cleaning', icon: Home, count: '40 Pros Available', color: '#c084fc' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0e1a' }}>
      <Navbar />

      <main className="container" style={{ flex: 1 }}>
        {/* Welcome Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Welcome back, {user?.full_name || 'Customer'}!
              </h1>
              <span className="badge badge-customer">Customer Hub</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '15px', marginTop: '4px' }}>
              Discover top-rated, AI-recommended verified service professionals in your area.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary">
              <Calendar size={16} />
              <span>My Bookings</span>
            </button>
            <button className="btn btn-primary">
              <Sparkles size={16} />
              <span>Book New Service</span>
            </button>
          </div>
        </div>

        {/* Search & Location Bar */}
        <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 300px', background: 'rgba(15, 23, 42, 0.6)', padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Search size={18} color="#818cf8" />
            <input
              type="text"
              placeholder="What service do you need? (e.g. Leak repair, AC maintenance)"
              style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '14px', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '0 1 240px', background: 'rgba(15, 23, 42, 0.6)', padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <MapPin size={18} color="#10b981" />
            <span style={{ fontSize: '14px', color: '#cbd5e1' }}>Within 10 km (GPS Active)</span>
          </div>

          <button className="btn btn-primary" style={{ padding: '10px 24px' }}>
            Search Verified Pros
          </button>
        </div>

        {/* Categories Grid */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>
            Popular Service Categories
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {serviceCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: `${cat.color}1a`,
                    border: `1px solid ${cat.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={22} color={cat.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{cat.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{cat.count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Booking Mock Card */}
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', marginBottom: '16px' }}>
            Active Service Request
          </h2>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-verified" style={{ marginBottom: '6px' }}>
                  <ShieldCheck size={12} /> Confirmed Booking #BK-9821
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>Master Plumbing & Emergency Pipe Repair</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#10b981' }}>$65.00</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Pay-After-Service / COD</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={18} color="#818cf8" />
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Scheduled Time</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Today, 03:30 PM</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={18} color="#f59e0b" />
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Live Provider ETA</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f59e0b' }}>12 mins away (En Route)</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Star size={18} color="#fbbf24" fill="#fbbf24" />
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Assigned Provider</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Pushkar K. (4.9 ★)</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                Contact Provider
              </button>
              <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                Live GPS Map & Tracking
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};
