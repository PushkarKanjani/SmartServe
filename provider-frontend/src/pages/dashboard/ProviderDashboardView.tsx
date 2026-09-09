import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  ShieldCheck,
  Briefcase,
  LogOut,
  FileCheck,
  Calendar,
  MapPin,
  User,
  RefreshCw,
  Play,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';

export const ProviderDashboardView: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [profRes, svcsRes, certsRes, bookingsRes] = await Promise.all([
        apiClient.get('/providers/me'),
        apiClient.get('/providers/me/services'),
        apiClient.get('/certificates'),
        apiClient.get('/providers/me/bookings'),
      ]);
      setProfile(profRes.data);
      setServices(svcsRes.data);
      setCertificates(certsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const refreshBookings = async () => {
    try {
      const res = await apiClient.get('/providers/me/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to refresh bookings:', err);
    }
  };

  const handleBookingAction = async (bookingId: string, action: 'accept' | 'reject' | 'start' | 'complete') => {
    setActionLoading(bookingId);
    setActionError(null);
    try {
      if (action === 'accept') {
        await apiClient.post(`/providers/me/bookings/${bookingId}/accept`);
      } else if (action === 'reject') {
        await apiClient.post(`/providers/me/bookings/${bookingId}/reject`, { reason: 'Declined by service partner' });
      } else if (action === 'start') {
        await apiClient.post(`/providers/me/bookings/${bookingId}/start`);
      } else if (action === 'complete') {
        await apiClient.post(`/providers/me/bookings/${bookingId}/complete`);
      }
      await refreshBookings();
    } catch (err: any) {
      console.error(`Failed to ${action} booking:`, err);
      setActionError(err.response?.data?.detail || `Failed to ${action} booking.`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2F5233] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs text-[#1F2A1E]/60 font-medium">Loading partner dashboard...</p>
        </div>
      </div>
    );
  }

  const isVerified = profile?.is_verified;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Verification Status Banner */}
        {!isVerified ? (
          <div className="mb-8 p-6 rounded-3xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-amber-900">Partner Account Under Review</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-200 text-amber-900">
                    Status: Pending
                  </span>
                </div>
                <p className="text-xs text-amber-800/80 mt-1 max-w-xl leading-relaxed">
                  Your submitted profile, KYC credentials, NDA agreement, and category evidence are currently pending administrative review.
                  Per platform policy, you will be authorized to accept live jobs once Admin approves your credentials.
                </p>
              </div>
            </div>
            <div className="text-xs text-amber-800 font-semibold bg-white/80 px-4 py-2 rounded-xl border border-amber-200 shrink-0">
              Admin Review SLA: ~24 Hours
            </div>
          </div>
        ) : (
          <div className="mb-8 p-6 rounded-3xl bg-emerald-50/80 border border-emerald-200 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-emerald-900">Verified Service Partner</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-200 text-emerald-900">
                  Active & Eligible
                </span>
              </div>
              <p className="text-xs text-emerald-800/80 mt-1">
                Your credentials are authenticated. Your active catalog services and schedule are live on the marketplace.
              </p>
            </div>
          </div>
        )}

        {/* Assigned Customer Bookings Section */}
        <div className="mb-8 bg-white rounded-3xl p-6 border border-[#2F5233]/10 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#2F5233] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#2F5233]" />
                  Assigned Customer Bookings ({bookings.length})
                </h3>
                {bookings.length > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    Live Jobs
                  </span>
                )}
              </div>
              <p className="text-xs text-[#1F2A1E]/60 mt-0.5">
                Real customer marketplace bookings matching your active catalog services and free availability slots
              </p>
            </div>
            <button
              onClick={refreshBookings}
              className="p-2 rounded-xl text-slate-500 hover:text-[#2F5233] hover:bg-[#FAF7F0] transition-colors"
              title="Refresh Bookings"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {actionError && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{actionError}</span>
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-2xl bg-[#FAF7F0]/60 border border-dashed border-[#2F5233]/20">
              <Calendar className="w-8 h-8 text-[#2F5233]/40 mx-auto mb-2" />
              <p className="text-xs font-semibold text-[#1F2A1E]/80">No incoming bookings currently</p>
              <p className="text-[11px] text-[#1F2A1E]/50 mt-1 max-w-sm mx-auto">
                When a customer books one of your active catalog services during your available slots, the order will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#2F5233]/15 hover:border-[#2F5233]/30 transition-all shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2F5233]/10 pb-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#2F5233] bg-white px-2 py-0.5 rounded-md border border-[#2F5233]/20">
                          {booking.booking_reference}
                        </span>
                        <h4 className="text-sm font-bold text-[#1F2A1E]">{booking.service_name}</h4>
                      </div>
                      <p className="text-[11px] text-[#1F2A1E]/60 mt-0.5">{booking.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#2F5233] bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                        ₹{booking.total_price}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                        booking.status === 'Requested'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : booking.status === 'Accepted'
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : booking.status === 'Started'
                          ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                          : booking.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        Status: {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#1F2A1E]/80">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#2F5233] shrink-0" />
                      <div>
                        <span className="text-[10px] text-[#1F2A1E]/50 block">Customer</span>
                        <span className="font-semibold">{booking.customer_name}</span>
                        {booking.customer_phone && (
                          <span className="text-[11px] text-[#1F2A1E]/60 block">{booking.customer_phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#2F5233] shrink-0" />
                      <div>
                        <span className="text-[10px] text-[#1F2A1E]/50 block">Schedule</span>
                        <span className="font-semibold">{booking.scheduled_date}</span>
                        <span className="text-[11px] text-[#1F2A1E]/60 block">{booking.scheduled_time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#2F5233] shrink-0" />
                      <div>
                        <span className="text-[10px] text-[#1F2A1E]/50 block">Service Location</span>
                        <span className="font-medium line-clamp-1">{booking.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Action Bar Enforcing State Machine */}
                  <div className="mt-4 pt-3 border-t border-[#2F5233]/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[11px] text-[#1F2A1E]/70 font-medium">
                      {booking.status === 'Requested' && 'New job request. Accept to confirm or decline to return to pool.'}
                      {booking.status === 'Accepted' && 'Booking accepted. Click "Start Job" when beginning service.'}
                      {booking.status === 'Started' && 'Service in progress. Mark complete when work is finished.'}
                      {booking.status === 'Completed' && 'Job successfully completed and payment reconciled.'}
                      {booking.status === 'Rejected' && 'Job was declined by you.'}
                    </div>

                    <div className="flex items-center gap-2">
                      {booking.status === 'Requested' && (
                        <>
                          <button
                            onClick={() => handleBookingAction(booking.id, 'reject')}
                            disabled={actionLoading === booking.id}
                            className="px-3.5 py-1.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking.id, 'accept')}
                            disabled={actionLoading === booking.id}
                            className="px-4 py-1.5 rounded-xl bg-[#2F5233] text-white hover:bg-[#254228] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Accept Job
                          </button>
                        </>
                      )}

                      {booking.status === 'Accepted' && (
                        <button
                          onClick={() => handleBookingAction(booking.id, 'start')}
                          disabled={actionLoading === booking.id}
                          className="px-4 py-1.5 rounded-xl bg-blue-700 text-white hover:bg-blue-800 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5" />
                          Start Job
                        </button>
                      )}

                      {booking.status === 'Started' && (
                        <button
                          onClick={() => handleBookingAction(booking.id, 'complete')}
                          disabled={actionLoading === booking.id}
                          className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Complete Job
                        </button>
                      )}

                      {booking.status === 'Completed' && (
                        <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Card & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Overview */}
          <div className="bg-white rounded-3xl p-6 border border-[#2F5233]/10 shadow-sm md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={profile?.photo_url || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400'}
                alt={profile?.full_name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#2F5233]/20 shadow-xs"
              />
              <div>
                <h2 className="font-serif-display text-xl font-bold text-[#1F2A1E]">{profile?.full_name}</h2>
                <p className="text-xs text-[#2F5233] font-medium">{profile?.category}</p>
                <p className="text-[11px] text-[#1F2A1E]/50 mt-0.5">Coverage: {profile?.service_area}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#1F2A1E]/60 font-semibold block mb-1">Skills & Professional Background:</span>
                <p className="text-[#1F2A1E]/80 bg-[#FAF7F0] p-3.5 rounded-xl border border-[#2F5233]/10 leading-relaxed italic">
                  "{profile?.skills}"
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FAF7F0] p-3 rounded-xl">
                  <span className="text-[11px] text-[#1F2A1E]/50 block">Experience</span>
                  <span className="text-sm font-bold text-[#1F2A1E]">{profile?.experience_years} Years</span>
                </div>
                <div className="bg-[#FAF7F0] p-3 rounded-xl">
                  <span className="text-[11px] text-[#1F2A1E]/50 block">Base Rate Indicator</span>
                  <span className="text-sm font-bold text-[#2F5233]">₹{profile?.base_price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance & Trust Metrics */}
          <div className="bg-white rounded-3xl p-6 border border-[#2F5233]/10 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2F5233]">Platform Metrics</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-[#1F2A1E]/60">Reliability Score:</span>
                <span className="font-bold text-emerald-600">{profile?.reliability_score}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-[#1F2A1E]/60">Acceptance Rate:</span>
                <span className="font-bold text-[#1F2A1E]">{profile?.acceptance_rate}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-[#1F2A1E]/60">On-Time Rate:</span>
                <span className="font-bold text-[#1F2A1E]">{profile?.on_time_rate}%</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#1F2A1E]/60">Cancellation Rate:</span>
                <span className="font-bold text-slate-700">{profile?.cancellation_rate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Services & Uploaded Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Selected Services */}
          <div className="bg-white rounded-3xl p-6 border border-[#2F5233]/10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2F5233] flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> Offered Services ({services.length})
              </h3>
            </div>
            {services.length === 0 ? (
              <p className="text-xs text-[#1F2A1E]/50">No services configured.</p>
            ) : (
              <div className="space-y-2.5">
                {services.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#2F5233]/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#1F2A1E]">Service ID: {svc.service_id.slice(0, 8)}...</div>
                      <div className="text-[11px] text-[#1F2A1E]/50">Estimated Duration: {svc.duration_minutes} mins</div>
                    </div>
                    <span className="font-semibold text-[#2F5233]">₹{svc.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Uploaded Documents */}
          <div className="bg-white rounded-3xl p-6 border border-[#2F5233]/10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2F5233] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" /> Submitted Credentials ({certificates.length})
              </h3>
            </div>
            {certificates.length === 0 ? (
              <p className="text-xs text-[#1F2A1E]/50">No credentials uploaded.</p>
            ) : (
              <div className="space-y-2.5">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3 rounded-xl bg-[#FAF7F0] border border-[#2F5233]/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#1F2A1E]">{cert.certificate_type}</div>
                      {cert.document_number && (
                        <div className="text-[11px] font-mono text-[#1F2A1E]/50">Doc: {cert.document_number}</div>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        cert.verification_status === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cert.verification_status === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {cert.verification_status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    </div>
  );
};
