import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Star, Award, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import { apiClient } from '../../api/client';

export const ProviderProfileView: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    photo_url: '',
    category: '',
    skills: '',
    experience_years: 0,
    service_area: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await apiClient.get('/providers/me');
      setProfile(res.data);
      setFormData({
        full_name: res.data.full_name || '',
        photo_url: res.data.photo_url || '',
        category: res.data.category || '',
        skills: res.data.skills || '',
        experience_years: res.data.experience_years || 0,
        service_area: res.data.service_area || '',
      });
    } catch (err) {
      console.error('Failed to load profile', err);
      setMessage({ text: 'Failed to load profile.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      await apiClient.put('/providers/me', formData);
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      fetchProfile();
    } catch (err) {
      console.error('Update failed', err);
      setMessage({ text: 'Failed to update profile.', type: 'error' });
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

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif-display text-3xl font-bold text-[#1F2A1E] tracking-tight">Profile & Trust</h1>
        <p className="text-[#1F2A1E]/70 mt-2 text-sm max-w-2xl">
          Manage your public profile information. Your verification status and performance metrics are read-only and maintained by SmartServe.
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
        {/* Left Column: Editable Profile */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#1F2A1E] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#2F5233]" />
              Personal Information
            </h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Photo URL</label>
                  <input
                    type="url"
                    value={formData.photo_url}
                    onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Primary Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Years of Experience</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Service Area</label>
                  <input
                    type="text"
                    value={formData.service_area}
                    onChange={(e) => setFormData({ ...formData, service_area: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Skills & Qualifications</label>
                  <textarea
                    rows={3}
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm resize-none"
                    placeholder="e.g. Certified Electrician, Advanced Plumbing, Fluent in English & Hindi"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#2F5233] text-white rounded-xl font-bold hover:bg-[#2F5233]/90 transition-colors shadow-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Read-Only Trust Metrics */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm p-6 overflow-hidden relative">
            {profile?.is_verified && (
              <div className="absolute top-0 right-0 bg-[#2F5233] text-white px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl shadow-sm">
                Verified
              </div>
            )}
            
            <div className="flex flex-col items-center text-center mb-6 mt-2">
              <div className="w-20 h-20 rounded-full bg-[#FAF7F0] border-4 border-white shadow-md overflow-hidden mb-3">
                {profile?.photo_url ? (
                  <img src={profile.photo_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-full h-full p-4 text-[#1F2A1E]/30" />
                )}
              </div>
              <h3 className="font-bold text-[#1F2A1E]">{profile?.full_name}</h3>
              <p className="text-xs text-[#1F2A1E]/60">{profile?.category || 'Service Partner'}</p>
            </div>

            <div className="pt-4 border-t border-[#2F5233]/10 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-[#1F2A1E]/70 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Status
                </div>
                <span className={`text-xs font-bold uppercase ${profile?.is_verified ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {profile?.is_verified ? 'Verified' : 'Pending'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-[#1F2A1E]/70 font-medium">
                  <Star className="w-4 h-4 text-amber-500" />
                  Reliability Score
                </div>
                <span className="text-sm font-bold text-[#1F2A1E]">{profile?.reliability_score || '0.0'}/5.0</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-[#1F2A1E]/70 font-medium">
                  <Award className="w-4 h-4 text-[#2F5233]" />
                  Acceptance Rate
                </div>
                <span className="text-sm font-bold text-[#1F2A1E]">{profile?.acceptance_rate || 0}%</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-[#1F2A1E]/70 font-medium">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  Service Area
                </div>
                <span className="text-xs font-semibold text-[#1F2A1E]/80 truncate max-w-[120px]" title={profile?.service_area}>
                  {profile?.service_area || 'N/A'}
                </span>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-[#FAF7F0] rounded-xl text-[10px] text-[#1F2A1E]/60 leading-relaxed italic text-center">
              Metrics are calculated based on your platform activity and customer feedback. High performance leads to more job requests.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
