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
  TrendingUp,
  IndianRupee,
  Zap,
  ChevronRight,
  Bell,
  Star,
  Activity,
  Package,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';

interface DashboardStats {
  today_bookings_count: number;
  active_jobs_count: number;
  completed_jobs_count: number;
  pending_requests_count: number;
  total_earnings: string;
  pipeline_count: number;
  urgent_alerts_count: number;
  recent_activity: {
    booking_id: string;
    reference: string;
    service_name: string;
    status: string;
    customer_name: string;
    amount: number;
    timestamp: string;
    is_emergency: boolean;
  }[];
}

interface ProfileTrust {
  full_name: string;
  email: string;
  phone?: string;
  photo_url?: string;
  category?: string;
  skills?: string;
  experience_years: number;
  service_area?: string;
  is_verified: boolean;
  reliability_score: string;
  acceptance_rate: string;
  cancellation_rate: string;
  on_time_rate: string;
  response_time_score: string;
  completed_jobs_count: number;
  certificates_count: number;
}

const STATUS_STYLES: Record<string, string> = {
  Requested: 'bg-amber-50 text-amber-700 border-amber-200',
  Accepted: 'bg-blue-50 text-blue-700 border-blue-200',
  Started: 'bg-violet-50 text-violet-700 border-violet-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Cancelled: 'bg-slate-100 text-slate-500 border-slate-200',
};

export const ProviderDashboardView: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trust, setTrust] = useState<ProfileTrust | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all');

  const fetchAll = async () => {
    try {
      const [statsRes, trustRes, bookingsRes] = await Promise.all([
        apiClient.get('/providers/me/dashboard-stats'),
        apiClient.get('/providers/me/profile-trust'),
        apiClient.get('/providers/me/bookings'),
      ]);
      setStats(statsRes.data);
      setTrust(trustRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // Auto-refresh every 60 seconds for live pipeline
    const interval = setInterval(() => {
      apiClient.get('/providers/me/dashboard-stats').then(r => setStats(r.data)).catch(() => {});
      apiClient.get('/providers/me/bookings').then(r => setBookings(r.data)).catch(() => {});
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleBookingAction = async (
    bookingId: string,
    action: 'accept' | 'reject' | 'start' | 'complete'
  ) => {
    setActionLoading(bookingId);
    setActionError(null);
    try {
      if (action === 'accept') {
        await apiClient.post(`/providers/me/bookings/${bookingId}/accept`);
      } else if (action === 'reject') {
        await apiClient.post(`/providers/me/bookings/${bookingId}/reject`, {
          reason: 'Declined by service partner',
        });
      } else if (action === 'start') {
        await apiClient.post(`/providers/me/bookings/${bookingId}/start`);
      } else if (action === 'complete') {
        await apiClient.post(`/providers/me/bookings/${bookingId}/complete`);
      }
      await fetchAll();
    } catch (err: any) {
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
          <div className="w-12 h-12 border-4 border-[#2F5233] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-[#1F2A1E]/60 font-medium">Loading partner workspace...</p>
        </div>
      </div>
    );
  }

  const isVerified = trust?.is_verified;

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return b.status === 'Requested';
    if (activeTab === 'active') return ['Accepted', 'Started'].includes(b.status);
    if (activeTab === 'completed') return b.status === 'Completed';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">

      {/* ─── Verification Status Banner ─── */}
      {!isVerified ? (
        <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-amber-900">Account Under Review</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-200 text-amber-900">Pending</span>
              </div>
              <p className="text-xs text-amber-800/80 mt-1 max-w-xl leading-relaxed">
                Credentials are pending admin review. Booking acceptance is suspended until approved.
              </p>
            </div>
          </div>
          <div className="text-xs text-amber-800 font-semibold bg-white/80 px-4 py-2 rounded-xl border border-amber-200 shrink-0">
            Admin Review SLA: ~24 hrs
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-3xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-emerald-900">Verified Service Partner</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-200 text-emerald-900">Active & Eligible</span>
                {stats && stats.urgent_alerts_count > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                    <Bell className="w-3 h-3" />
                    {stats.urgent_alerts_count} Urgent
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-800/80 mt-1">
                Your catalog and schedule are live. Customers can book your services.
              </p>
            </div>
          </div>
          <button
            onClick={fetchAll}
            className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-white/80 px-4 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-50 transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      )}

      {/* ─── Live Stats Cards ─── */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Today's Jobs",
              value: stats.today_bookings_count,
              icon: Calendar,
              color: 'bg-blue-50 text-blue-700',
              iconColor: 'text-blue-500',
            },
            {
              label: 'Active Jobs',
              value: stats.active_jobs_count,
              icon: Activity,
              color: 'bg-violet-50 text-violet-700',
              iconColor: 'text-violet-500',
            },
            {
              label: 'Completed',
              value: stats.completed_jobs_count,
              icon: CheckCircle2,
              color: 'bg-emerald-50 text-emerald-700',
              iconColor: 'text-emerald-500',
            },
            {
              label: 'Total Earnings',
              value: `₹${parseFloat(stats.total_earnings || '0').toLocaleString('en-IN')}`,
              icon: IndianRupee,
              color: 'bg-amber-50 text-amber-700',
              iconColor: 'text-amber-500',
              wide: true,
            },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-5 border border-[#2F5233]/10 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#1F2A1E]/60 uppercase tracking-wider">
                  {card.label}
                </span>
                <div className={`p-1.5 rounded-lg ${card.color}`}>
                  <card.icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#1F2A1E]">{card.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Main Content: Bookings + Sidebar ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bookings Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Bookings Table */}
          <div className="bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#2F5233]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#2F5233]" />
                <h3 className="text-sm font-bold text-[#2F5233] uppercase tracking-wider">
                  Assigned Bookings
                </h3>
                <span className="text-xs text-[#1F2A1E]/50">({bookings.length} total)</span>
              </div>
              <button
                onClick={() => apiClient.get('/providers/me/bookings').then(r => setBookings(r.data))}
                className="p-1.5 rounded-lg text-slate-400 hover:text-[#2F5233] hover:bg-[#FAF7F0] transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 px-6 pt-4 pb-0 border-b border-[#2F5233]/5">
              {(['all', 'pending', 'active', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-bold rounded-t-lg capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-[#2F5233] text-white shadow-sm'
                      : 'text-[#1F2A1E]/50 hover:text-[#2F5233]'
                  }`}
                >
                  {tab}
                  {tab !== 'all' && (() => {
                    const count = bookings.filter(b => {
                      if (tab === 'pending') return b.status === 'Requested';
                      if (tab === 'active') return ['Accepted', 'Started'].includes(b.status);
                      if (tab === 'completed') return b.status === 'Completed';
                      return false;
                    }).length;
                    return count > 0 ? (
                      <span className="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px]">
                        {count}
                      </span>
                    ) : null;
                  })()}
                </button>
              ))}
            </div>

            {actionError && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                {actionError}
              </div>
            )}

            <div className="p-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-10 rounded-2xl bg-[#FAF7F0]/60 border border-dashed border-[#2F5233]/20">
                  <Calendar className="w-8 h-8 text-[#2F5233]/30 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#1F2A1E]/60">No bookings in this view</p>
                  <p className="text-[10px] text-[#1F2A1E]/40 mt-1">
                    Bookings matching your schedule and services will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        booking.emergency_flag === 'EMERGENCY'
                          ? 'bg-red-50/40 border-red-200/60 hover:border-red-300'
                          : 'bg-[#FAF7F0] border-[#2F5233]/15 hover:border-[#2F5233]/30'
                      }`}
                    >
                      {/* Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#2F5233]">
                            {booking.booking_reference}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            STATUS_STYLES[booking.status] || 'bg-gray-50 text-gray-700 border-gray-200'
                          }`}>
                            {booking.status}
                          </span>
                          {booking.emergency_flag === 'EMERGENCY' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              Emergency
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-[#2F5233]">
                          ₹{parseFloat(booking.total_price || 0).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div>
                          <span className="text-[#1F2A1E]/50 block">Service</span>
                          <span className="font-semibold text-[#1F2A1E]">{booking.service_name}</span>
                        </div>
                        <div>
                          <span className="text-[#1F2A1E]/50 block">Customer</span>
                          <span className="font-semibold text-[#1F2A1E]">{booking.customer_name}</span>
                        </div>
                        <div>
                          <span className="text-[#1F2A1E]/50 block">Scheduled</span>
                          <span className="font-semibold text-[#1F2A1E]">
                            {booking.scheduled_time
                              ? new Date(booking.scheduled_time).toLocaleString('en-IN', {
                                  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                                })
                              : 'TBD'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#1F2A1E]/50 block">Address</span>
                          <span className="font-semibold text-[#1F2A1E] truncate block max-w-[140px]">{booking.address || 'On file'}</span>
                        </div>
                      </div>

                      {/* OTP (if started) */}
                      {booking.otp_code && booking.status === 'Started' && (
                        <div className="mb-3 flex items-center gap-2 bg-violet-50 border border-violet-200 px-3 py-2 rounded-xl">
                          <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wider">Completion OTP</span>
                          <span className="font-mono text-sm font-bold text-violet-800 ml-auto tracking-widest">{booking.otp_code}</span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-wrap">
                        {booking.status === 'Requested' && (
                          <>
                            <button
                              onClick={() => handleBookingAction(booking.id, 'accept')}
                              disabled={actionLoading === booking.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {actionLoading === booking.id ? 'Accepting...' : 'Accept'}
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking.id, 'reject')}
                              disabled={actionLoading === booking.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-xl hover:bg-red-200 transition-colors disabled:opacity-50"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {booking.status === 'Accepted' && (
                          <button
                            onClick={() => handleBookingAction(booking.id, 'start')}
                            disabled={actionLoading === booking.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500 text-white text-xs font-bold rounded-xl hover:bg-violet-600 transition-colors disabled:opacity-50"
                          >
                            <Play className="w-3.5 h-3.5" />
                            {actionLoading === booking.id ? 'Starting...' : 'Start Job'}
                          </button>
                        )}
                        {booking.status === 'Started' && (
                          <button
                            onClick={() => handleBookingAction(booking.id, 'complete')}
                            disabled={actionLoading === booking.id}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {actionLoading === booking.id ? 'Completing...' : 'Mark Complete'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Feed */}
          {stats && stats.recent_activity.length > 0 && (
            <div className="bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-[#2F5233]" />
                <h3 className="text-sm font-bold text-[#2F5233] uppercase tracking-wider">Recent Activity</h3>
              </div>
              <div className="space-y-2">
                {stats.recent_activity.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#2F5233]/5 last:border-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      item.status === 'Completed' ? 'bg-emerald-50' :
                      item.status === 'Cancelled' ? 'bg-slate-100' :
                      item.is_emergency ? 'bg-red-50' : 'bg-blue-50'
                    }`}>
                      {item.is_emergency ? (
                        <Zap className="w-4 h-4 text-red-500" />
                      ) : item.status === 'Completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Calendar className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#1F2A1E] truncate">{item.service_name}</span>
                        {item.is_emergency && (
                          <span className="text-[9px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full shrink-0">
                            Emergency
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#1F2A1E]/50">{item.customer_name} · {item.reference}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-[#2F5233]">₹{item.amount.toLocaleString('en-IN')}</div>
                      <div className={`text-[10px] font-semibold ${
                        item.status === 'Completed' ? 'text-emerald-600' :
                        item.status === 'Cancelled' ? 'text-slate-400' : 'text-blue-500'
                      }`}>{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column (1/3 width) */}
        <div className="space-y-5">

          {/* Profile & Trust Card */}
          {trust && (
            <div className="bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm p-6 relative overflow-hidden">
              {trust.is_verified && (
                <div className="absolute top-0 right-0 bg-[#2F5233] text-white px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl">
                  Verified
                </div>
              )}

              {/* Avatar */}
              <div className="flex flex-col items-center text-center mb-5">
                <div className="w-20 h-20 rounded-full border-4 border-[#2F5233]/20 shadow-sm overflow-hidden mb-3 bg-[#FAF7F0]">
                  {trust.photo_url ? (
                    <img src={trust.photo_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-full h-full p-4 text-[#1F2A1E]/30" />
                  )}
                </div>
                <h3 className="font-bold text-[#1F2A1E] text-base">{trust.full_name}</h3>
                <p className="text-xs text-[#1F2A1E]/60 mt-0.5">{trust.category?.replace(/^\d+\.\s*/, '') || 'Service Partner'}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-[#1F2A1E]/40" />
                  <span className="text-[11px] text-[#1F2A1E]/50">{trust.service_area || 'Location on file'}</span>
                </div>
              </div>

              {/* Trust Metrics */}
              <div className="space-y-2 text-xs border-t border-[#2F5233]/10 pt-4">
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/60 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-400" /> Reliability
                  </span>
                  <span className="font-bold text-emerald-600">{trust.reliability_score}%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/60">Acceptance Rate</span>
                  <span className="font-bold text-[#1F2A1E]">{trust.acceptance_rate}%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/60">On-Time Rate</span>
                  <span className="font-bold text-[#1F2A1E]">{trust.on_time_rate}%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/60">Cancellation Rate</span>
                  <span className="font-bold text-slate-500">{trust.cancellation_rate}%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/60 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Completed Jobs
                  </span>
                  <span className="font-bold text-[#1F2A1E]">{trust.completed_jobs_count}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#1F2A1E]/60 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-blue-500" /> Certificates
                  </span>
                  <span className="font-bold text-[#1F2A1E]">{trust.certificates_count}</span>
                </div>
              </div>
            </div>
          )}

          {/* Pipeline Counter */}
          {stats && stats.pipeline_count > 0 && (
            <div className="bg-[#2F5233] text-white rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-white/70" />
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">Upcoming Pipeline</span>
              </div>
              <div className="text-3xl font-bold">{stats.pipeline_count}</div>
              <p className="text-xs text-white/60 mt-1">confirmed jobs in next 7 days</p>
            </div>
          )}

          {/* Pending Requests Alert */}
          {stats && stats.pending_requests_count > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">New Requests</span>
              </div>
              <div className="text-2xl font-bold text-amber-900">{stats.pending_requests_count}</div>
              <p className="text-xs text-amber-700 mt-1">pending your acceptance</p>
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-[#2F5233]/10">
              <span className="text-[10px] font-bold text-[#1F2A1E]/40 uppercase tracking-wider">Quick Links</span>
            </div>
            {[
              { label: 'My Services', path: '/services', icon: Briefcase },
              { label: 'Availability', path: '/availability', icon: Calendar },
              { label: 'Profile & Trust', path: '/profile', icon: User },
              { label: 'Support', path: '/support', icon: Package },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between px-5 py-3 border-b border-[#2F5233]/5 last:border-0 text-xs font-semibold text-[#1F2A1E]/70 hover:bg-[#FAF7F0] hover:text-[#2F5233] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 text-[#2F5233]/60" />
                  {item.label}
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#1F2A1E]/30 group-hover:text-[#2F5233]" />
              </button>
            ))}
          </div>

          {/* Sign Out */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors rounded-2xl border border-slate-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
