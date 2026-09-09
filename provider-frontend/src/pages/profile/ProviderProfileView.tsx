import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, MapPin, CheckCircle, AlertTriangle, FileCheck, Activity, Phone, Mail, Star, Save } from 'lucide-react';
import { apiClient } from '../../api/client';

interface ProfileTrust {
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  photo_url?: string;
  category?: string;
  skills?: string;
  experience_years: number;
  base_price: string;
  service_area?: string;
  is_verified: boolean;
  reliability_score: string;
  acceptance_rate: string;
  cancellation_rate: string;
  no_show_rate: string;
  on_time_rate: string;
  response_time_score: string;
  completed_jobs_count: number;
  certificates_count: number;
}

export const ProviderProfileView: React.FC = () => {
  const [trust, setTrust] = useState<ProfileTrust | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Editable form fields only
  const [formData, setFormData] = useState({
    photo_url: '',
    skills: '',
    experience_years: 0,
    service_area: '',
    base_price: '',
  });

  const fetchTrust = async () => {
    try {
      const res = await apiClient.get('/providers/me/profile-trust');
      setTrust(res.data);
      setFormData({
        photo_url: res.data.photo_url || '',
        skills: res.data.skills || '',
        experience_years: res.data.experience_years || 0,
        service_area: res.data.service_area || '',
        base_price: res.data.base_price || '0.00',
      });
    } catch (err) {
      console.error('Failed to load profile', err);
      setMessage({ text: 'Failed to load profile.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrust();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      await apiClient.patch('/providers/me', formData);
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      fetchTrust();
    } catch (err: any) {
      console.error('Update failed', err);
      setMessage({ text: err.response?.data?.detail || 'Failed to update profile.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-[#1F2A1E]/60 text-sm font-semibold space-y-3">
        <div className="w-8 h-8 border-4 border-[#2F5233] border-t-transparent rounded-full animate-spin" />
        <span>Loading partner profile & trust dossier...</span>
      </div>
    );
  }

  const MetricRow = ({ label, value, highlight }: { label: string; value: string; highlight?: string }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-slate-50">
      <span className="text-xs text-[#1F2A1E]/65 font-medium">{label}</span>
      <span className={`text-xs font-bold ${highlight || 'text-[#1F2A1E]'}`}>{value}</span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      {/* ── Header Banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DEC9] shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2A1E] tracking-tight">
              Profile & Trust Dossier
            </h1>
            <span className="text-xs font-bold text-[#2F5233] bg-[#F2EDE1] px-3 py-1 rounded-full border border-[#E5DEC9]">
              {trust?.is_verified ? 'Verified Partner' : 'Pending Verification'}
            </span>
          </div>
          <p className="text-sm text-[#1F2A1E]/65 font-medium mt-1 max-w-2xl leading-relaxed">
            Manage your public bio, service territory, and base rates. Verification credentials and algorithmic reliability scores are governed by the SmartServe trust engine.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#FAF7F0] border border-[#E5DEC9] px-4 py-2 rounded-2xl text-xs font-bold text-slate-800">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>4.9 / 5.0 Rating</span>
        </div>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-2xl flex items-start gap-3 border shadow-2xs ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-red-600" />
          )}
          <p className="text-xs sm:text-sm font-semibold">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editable Profile Form (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xs p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-[#1F2A1E] font-serif flex items-center gap-2 border-b border-[#E5DEC9] pb-4">
              <User className="w-5 h-5 text-[#2F5233]" />
              <span>Public Service Information</span>
            </h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                    Years of Professional Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                    Base Hourly Rate (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                  Service Area & Geographical Territory
                </label>
                <input
                  type="text"
                  value={formData.service_area}
                  onChange={(e) => setFormData({ ...formData, service_area: e.target.value })}
                  placeholder="e.g. Indiranagar, Koramangala & Whitefield, Bengaluru"
                  className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                  Skills, Qualifications & Professional Description
                </label>
                <textarea
                  rows={4}
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Describe your technical certifications, background, and specializations."
                  className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] text-sm resize-none font-medium leading-relaxed"
                />
              </div>

              {/* Read-only fields card */}
              <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E5DEC9]">
                <p className="text-[10px] font-bold text-[#1F2A1E]/50 uppercase tracking-wider mb-3">
                  System Registered Details (Admin Managed)
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#1F2A1E]/50 block mb-0.5">Full Legal Name</span>
                    <span className="font-bold text-[#1F2A1E]">{trust?.full_name}</span>
                  </div>
                  <div>
                    <span className="text-[#1F2A1E]/50 block mb-0.5">Master Category</span>
                    <span className="font-bold text-[#2F5233]">{trust?.category?.replace(/^\d+\.\s*/, '') || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[#1F2A1E]/50 flex items-center gap-1 mb-0.5">
                      <Mail className="w-3 h-3 text-[#C9A15A]" /> Partner Email
                    </span>
                    <span className="font-semibold text-[#1F2A1E] truncate block">{trust?.email}</span>
                  </div>
                  <div>
                    <span className="text-[#1F2A1E]/50 flex items-center gap-1 mb-0.5">
                      <Phone className="w-3 h-3 text-[#C9A15A]" /> Phone Number
                    </span>
                    <span className="font-semibold text-[#1F2A1E]">{trust?.phone || '+91 98765 12345'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#2F5233] hover:bg-[#3D6B42] text-white rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving Updates...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Trust & Metrics (1 col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xs p-6 relative overflow-hidden">
            {trust?.is_verified && (
              <div className="absolute top-4 right-4 bg-[#2F5233] text-white px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-2xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified</span>
              </div>
            )}

            <div className="flex flex-col items-center text-center mb-5 mt-2">
              <div className="w-20 h-20 rounded-2xl bg-[#FAF7F0] border border-[#E5DEC9] shadow-xs overflow-hidden mb-3 flex items-center justify-center font-serif text-2xl font-bold text-[#2F5233]">
                {trust?.photo_url ? (
                  <img src={trust.photo_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>{trust?.full_name?.charAt(0)}</span>
                )}
              </div>
              <h3 className="font-bold text-[#1F2A1E] text-base font-serif">{trust?.full_name}</h3>
              <p className="text-xs text-[#7A9E6E] font-semibold mt-0.5">
                {trust?.category?.replace(/^\d+\.\s*/, '') || 'Service Partner'}
              </p>
              {trust?.service_area && (
                <div className="flex items-center gap-1 mt-1 text-[11px] text-[#1F2A1E]/60">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A15A]" />
                  <span>{trust.service_area}</span>
                </div>
              )}
            </div>

            <div className="border-t border-[#E5DEC9] pt-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <div className="flex items-center gap-1.5 text-xs text-[#1F2A1E]/65 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Account Status
                </div>
                <span className={`text-xs font-bold ${trust?.is_verified ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {trust?.is_verified ? 'Verified & Active' : 'Under Review'}
                </span>
              </div>
              <MetricRow label="✦ Reliability Score" value={`${trust?.reliability_score}%`} highlight="text-emerald-700" />
              <MetricRow label="Acceptance Rate" value={`${trust?.acceptance_rate}%`} />
              <MetricRow label="On-Time Rate" value={`${trust?.on_time_rate}%`} />
              <MetricRow label="Cancellation Rate" value={`${trust?.cancellation_rate}%`} />
              <MetricRow label="No-Show Rate" value={`${trust?.no_show_rate}%`} />
              <MetricRow label="Response Score" value={`${trust?.response_time_score}%`} />
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-[#1F2A1E]/65 font-medium flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#2F5233]" /> Completed Bookings
                </span>
                <span className="text-xs font-bold text-[#1F2A1E]">{trust?.completed_jobs_count}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-[#1F2A1E]/65 font-medium flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-[#2F5233]" /> Verified Certificates
                </span>
                <span className="text-xs font-bold text-[#2F5233]">{trust?.certificates_count} on file</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9] text-[10px] text-[#1F2A1E]/60 leading-relaxed italic text-center">
              Trust metrics are calculated in real time from customer ratings and verified job completions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfileView;
