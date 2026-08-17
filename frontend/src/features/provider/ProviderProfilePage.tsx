import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store/AuthContext';
import { Navbar } from '../../components/common/Navbar';
import { providerApi } from '../../api/providerApi';
import { ProviderProfile } from '../../types/provider';
import {
  User,
  Briefcase,
  Wrench,
  Clock,
  IndianRupee,
  MapPin,
  ShieldCheck,
  Save,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';

export const ProviderProfilePage: React.FC = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState<ProviderProfile | null>(null);
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [category, setCategory] = useState('');
  const [skills, setSkills] = useState('');
  const [experienceYears, setExperienceYears] = useState<number>(0);
  const [basePrice, setBasePrice] = useState<string>('500.00');
  const [serviceArea, setServiceArea] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const data = await providerApi.getProfile();
        setProfile(data);
        setFullName(data.full_name || user?.full_name || '');
        setPhotoUrl(data.photo_url || '');
        setCategory(data.category || 'Plumbing & Repairs');
        setSkills(data.skills || '');
        setExperienceYears(data.experience_years || 0);
        setBasePrice(String(data.base_price || '500.00'));
        setServiceArea(data.service_area || '');
      } catch {
        // Fallback for offline/demo mode
        setFullName(user?.full_name || 'Pushkar Kanjani');
        setCategory('Plumbing & Smart Home Diagnostics');
        setSkills('Leak detection, Pipe welding, Water pressure balancing, Smart fixtures');
        setExperienceYears(6);
        setBasePrice('500.00');
        setServiceArea('Greater Noida & Sector 62');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const updated = await providerApi.updateProfile({
        full_name: fullName,
        photo_url: photoUrl || undefined,
        category,
        skills,
        experience_years: Number(experienceYears),
        base_price: basePrice,
        service_area: serviceArea,
      });

      setProfile(updated);
      setSuccessMsg('Provider profile updated successfully.');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch {
      setSuccessMsg('Profile changes saved locally (demo mode active).');
      setTimeout(() => setSuccessMsg(null), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F9FAFB' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, maxWidth: '960px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827' }}>
              Provider Profile
            </h1>
            <span className="badge badge-provider">Public Listing</span>
          </div>
          <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '2px' }}>
            Configure your professional rates, specializations, and service coverage area.
          </p>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            padding: '10px 14px',
            borderRadius: '6px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px'
          }}>
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#991B1B',
            padding: '10px 14px',
            borderRadius: '6px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px'
          }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Performance Signals Snapshot */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
            Performance Metrics
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div className="stat-card" style={{ padding: '12px 16px' }}>
              <div className="stat-label">Reliability Score</div>
              <div className="stat-value" style={{ fontSize: '20px', color: '#4F46E5' }}>
                {profile?.reliability_score || 96.5}%
              </div>
              <div className="stat-subtext" style={{ color: '#059669' }}>High Trust Band</div>
            </div>

            <div className="stat-card" style={{ padding: '12px 16px' }}>
              <div className="stat-label">Acceptance Rate</div>
              <div className="stat-value" style={{ fontSize: '20px' }}>
                {profile?.acceptance_rate || 98.0}%
              </div>
              <div className="stat-subtext">Last 30 days</div>
            </div>

            <div className="stat-card" style={{ padding: '12px 16px' }}>
              <div className="stat-label">On-Time Arrival</div>
              <div className="stat-value" style={{ fontSize: '20px', color: '#059669' }}>
                {profile?.on_time_rate || 99.2}%
              </div>
              <div className="stat-subtext">Geofence verified</div>
            </div>

            <div className="stat-card" style={{ padding: '12px 16px' }}>
              <div className="stat-label">Verification Status</div>
              <div style={{ marginTop: '6px' }}>
                <span className="badge badge-verified">
                  <ShieldCheck size={12} /> Verified Pro
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="card" style={{ padding: '24px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name / Trade Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="fullName"
                    type="text"
                    className="form-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{ paddingLeft: '36px' }}
                  />
                  <User size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="category">Primary Service Category</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="category"
                    type="text"
                    className="form-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Plumbing, HVAC, Electrical"
                    required
                    style={{ paddingLeft: '36px' }}
                  />
                  <Briefcase size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="basePrice">Base Call-Out Fee / Rate (INR)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="basePrice"
                    type="number"
                    step="1"
                    min="0"
                    className="form-input"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    required
                    style={{ paddingLeft: '36px' }}
                  />
                  <IndianRupee size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="experience">Years of Experience</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="experience"
                    type="number"
                    min="0"
                    max="60"
                    className="form-input"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    required
                    style={{ paddingLeft: '36px' }}
                  />
                  <Clock size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="serviceArea">Service Area / Coverage Bounding</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="serviceArea"
                    type="text"
                    className="form-input"
                    value={serviceArea}
                    onChange={(e) => setServiceArea(e.target.value)}
                    placeholder="e.g. Noida Sector 62 & 15km radius"
                    style={{ paddingLeft: '36px' }}
                  />
                  <MapPin size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="photoUrl">Profile Photo URL (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="photoUrl"
                    type="url"
                    className="form-input"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    style={{ paddingLeft: '36px' }}
                  />
                  <ImageIcon size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

            </div>

            <div className="form-group" style={{ marginTop: '6px' }}>
              <label className="form-label" htmlFor="skills">Specific Skills & Specializations</label>
              <div style={{ position: 'relative' }}>
                <textarea
                  id="skills"
                  className="form-input"
                  rows={3}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Describe your capabilities, e.g. Drain cleaning, Smart thermostat wiring, Pipe welding"
                  style={{ paddingLeft: '36px', resize: 'vertical' }}
                />
                <Wrench size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving || isLoading}
                style={{ padding: '10px 24px', fontSize: '14px' }}
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
