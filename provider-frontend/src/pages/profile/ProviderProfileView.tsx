import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Star, Award, MapPin, CheckCircle, AlertTriangle, FileCheck, Activity, Phone, Mail } from 'lucide-react';
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

  // Editable form fields only - read-only metrics are excluded
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
      <div className="flex justify-center items-center h-64 text-[#1F2A1E]/60 text-sm font-medium animate-pulse">
        Loading profile...
      </div>
    );
  }

  const MetricRow = ({ label, value, highlight }: { label: string; value: string; highlight?: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-50">
      <span className="text-xs text-[#1F2A1E]/60">{label}</span>
      <span className={`text-xs font-bold ${highlight || 'text-[#1F2A1E]'}`}>{value}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif-display text-3xl font-bold text-[#1F2A1E] tracking-tight">Profile & Trust</h1>
        <p className="text-[#1F2A1E]/70 mt-2 text-sm max-w-2xl">
          Manage your public profile. Verification status, performance metrics, and completed jobs are read-only — maintained by the SmartServe platform.
        </p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 border shadow-sm ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editable Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#1F2A1E] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#2F5233]" />
              Editable Information
            </h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">
                    Base Rate (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">
                  Service Area / Coverage
                </label>
                <input
                  type="text"
                  value={formData.service_area}
                  onChange={(e) => setFormData({ ...formData, service_area: e.target.value })}
                  placeholder="e.g. Delhi NCR, Noida, Gurgaon"
                  className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">
                  Skills & Qualifications (Professional Summary)
                </label>
                <textarea
                  rows={4}
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g. Certified Electrician, Advanced Plumbing, Fluent in English & Hindi"
                  className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm resize-none"
                />
              </div>

              {/* Read-only fields */}
              <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#2F5233]/10">
                <p className="text-[10px] font-bold text-[#1F2A1E]/40 uppercase tracking-wider mb-3">Read-Only Fields (Managed by SmartServe)</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#1F2A1E]/50 block mb-0.5">Full Name</span>
                    <span className="font-semibold text-[#1F2A1E]">{trust?.full_name}</span>
                  </div>
                  <div>
                    <span className="text-[#1F2A1E]/50 block mb-0.5">Primary Category</span>
                    <span className="font-semibold text-[#1F2A1E] text-[11px]">{trust?.category?.replace(/^\d+\.\s*/, '') || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[#1F2A1E]/50 flex items-center gap-1 mb-0.5"><Mail className="w-3 h-3" /> Email</span>
                    <span className="font-semibold text-[#1F2A1E]">{trust?.email}</span>
                  </div>
                  <div>
                    <span className="text-[#1F2A1E]/50 flex items-center gap-1 mb-0.5"><Phone className="w-3 h-3" /> Phone</span>
                    <span className="font-semibold text-[#1F2A1E]">{trust?.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#2F5233] text-white rounded-xl font-bold hover:bg-[#2F5233]/90 transition-colors shadow-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Trust & Metrics */}
        <div className="space-y-5">
          {/* Trust Identity Card */}
          <div className="bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm p-6 overflow-hidden relative">
            {trust?.is_verified && (
              <div className="absolute top-0 right-0 bg-[#2F5233] text-white px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl shadow-sm">
                Verified
              </div>
            )}

            <div className="flex flex-col items-center text-center mb-5 mt-2">
              <div className="w-20 h-20 rounded-full bg-[#FAF7F0] border-4 border-white shadow-md overflow-hidden mb-3">
                {trust?.photo_url ? (
                  <img src={trust.photo_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-full h-full p-4 text-[#1F2A1E]/30" />
                )}
              </div>
              <h3 className="font-bold text-[#1F2A1E] text-base">{trust?.full_name}</h3>
              <p className="text-xs text-[#1F2A1E]/60 mt-0.5">{trust?.category?.replace(/^\d+\.\s*/, '') || 'Service Partner'}</p>
              {trust?.service_area && (
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-[#1F2A1E]/40" />
                  <span className="text-[11px] text-[#1F2A1E]/50">{trust.service_area}</span>
                </div>
              )}
            </div>

            <div className="space-y-0.5 border-t border-[#2F5233]/10 pt-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <div className="flex items-center gap-1.5 text-xs text-[#1F2A1E]/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Verification
                </div>
                <span className={`text-xs font-bold ${trust?.is_verified ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {trust?.is_verified ? 'Approved' : 'Pending Review'}
                </span>
              </div>
              <MetricRow label="✦ Reliability Score" value={`${trust?.reliability_score}%`} highlight="text-emerald-600" />
              <MetricRow label="Acceptance Rate" value={`${trust?.acceptance_rate}%`} />
              <MetricRow label="On-Time Rate" value={`${trust?.on_time_rate}%`} />
              <MetricRow label="Cancellation Rate" value={`${trust?.cancellation_rate}%`} />
              <MetricRow label="No-Show Rate" value={`${trust?.no_show_rate}%`} />
              <MetricRow label="Response Score" value={`${trust?.response_time_score}%`} />
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-xs text-[#1F2A1E]/60 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#2F5233]" /> Completed Jobs
                </span>
                <span className="text-xs font-bold text-[#1F2A1E]">{trust?.completed_jobs_count}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-[#1F2A1E]/60 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-blue-500" /> Certificates
                </span>
                <span className="text-xs font-bold text-[#1F2A1E]">{trust?.certificates_count}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#FAF7F0] rounded-xl text-[10px] text-[#1F2A1E]/60 leading-relaxed italic text-center">
              Metrics are calculated from your platform activity and verified customer feedback. High performance scores lead to more job placements.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
