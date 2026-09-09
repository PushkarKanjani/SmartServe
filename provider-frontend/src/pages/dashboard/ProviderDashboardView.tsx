import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  ShieldCheck,
  Briefcase,
  FileCheck,
  Calendar,
  MapPin,
  User,
  RefreshCw,
  Play,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Zap,
  ChevronRight,
  Bell,
  Star,
  Award,
  ArrowRight,
  LifeBuoy,
} from 'lucide-react';
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
  Requested: 'bg-amber-50 text-amber-800 border-amber-300',
  Assigned: 'bg-[#F2EDE1] text-[#2F5233] border-[#E5DEC9]',
  Accepted: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Started: 'bg-purple-50 text-purple-700 border-purple-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Cancelled: 'bg-slate-100 text-slate-500 border-slate-200',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const ProviderDashboardView: React.FC = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trust, setTrust] = useState<ProfileTrust | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(() => {
      apiClient.get('/providers/me/dashboard-stats').then((r) => setStats(r.data)).catch(() => {});
      apiClient.get('/providers/me/bookings').then((r) => setBookings(r.data)).catch(() => {});
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#2F5233] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-[#1F2A1E]">Loading SmartServe Partner Workspace...</p>
      </div>
    );
  }

  const isVerified = trust?.is_verified;
  const partnerFirstName = trust?.full_name ? trust.full_name.split(' ')[0] : 'Partner';

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return b.status === 'Requested' || b.status === 'Assigned';
    if (activeTab === 'active') return ['Accepted', 'Started'].includes(b.status);
    if (activeTab === 'completed') return b.status === 'Completed';
    return true;
  });

  const metricCards = [
    {
      title: "Today's Bookings",
      value: stats ? stats.today_bookings_count : 0,
      subtext: 'Manage schedule',
      link: '/availability',
      icon: Calendar,
      iconBg: 'bg-[#F2EDE1] text-[#2F5233]',
    },
    {
      title: 'Active Jobs',
      value: stats ? stats.active_jobs_count : 0,
      subtext: 'View active pipeline',
      link: '/dashboard',
      icon: Zap,
      iconBg: 'bg-purple-50 text-purple-700',
    },
    {
      title: 'Completed Jobs',
      value: stats ? stats.completed_jobs_count : 0,
      subtext: 'View history & ratings',
      link: '/profile',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Gross Earnings',
      value: stats ? `₹${parseFloat(stats.total_earnings || '0').toLocaleString('en-IN')}` : '₹0',
      subtext: 'View earnings ledger',
      link: '/profile',
      icon: IndianRupee,
      iconBg: 'bg-[#F2EDE1] text-[#C9A15A]',
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* ══════════════════════════════════════════════════
          1. GREETING & HERO HEADER
          ════════════════════════════════════════════════*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif text-[#1F2A1E] tracking-tight capitalize">
              Good morning, {partnerFirstName}!
            </h1>
            <span className="text-2xl">👋</span>
          </div>
          <p className="text-sm sm:text-base text-[#1F2A1E]/65 font-medium mt-1">
            Here's your partner schedule, job assignments, and reliability performance today.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={fetchAll}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#F2EDE1] text-[#1F2A1E] font-semibold text-xs sm:text-sm rounded-xl border border-[#E5DEC9] shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-[#1F2A1E]/60" />
            <span>Sync Live Pipeline</span>
          </button>

          <button
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage My Services</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          2. VERIFICATION STATUS NOTIFICATION BANNER
          ════════════════════════════════════════════════*/}
      {!isVerified ? (
        <div className="p-5 rounded-3xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-amber-900 font-serif">Account Under Verification Review</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300">
                  Pending Review
                </span>
              </div>
              <p className="text-xs text-amber-800/80 mt-1 max-w-xl leading-relaxed">
                Your credentials are under manual review by the administrative verification team. You will receive booking notifications once approved.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/application-status')}
            className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            View Application Status →
          </button>
        </div>
      ) : (
        <div className="p-5 rounded-3xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-emerald-950 font-serif">Verified Partner Account</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Active & Booking-Eligible
                </span>
                {stats && stats.urgent_alerts_count > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                    <Bell className="w-3 h-3" />
                    {stats.urgent_alerts_count} Urgent Request
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-800/80 mt-1">
                Your portfolio, availability schedule, and pricing are published in the customer marketplace.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
              Auto-Dispatch: Enabled
            </span>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          3. METRIC CARDS
          ════════════════════════════════════════════════*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => navigate(card.link)}
              className="group bg-white p-5 sm:p-6 rounded-3xl border border-[#E5DEC9] shadow-xs hover:shadow-md hover:border-[#2F5233]/40 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F2A1E]/50 block mb-1">
                    {card.title}
                  </span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#1F2A1E] tracking-tight font-serif">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-2xl ${card.iconBg} flex-shrink-0 border border-[#E5DEC9]/40`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5DEC9]/60 flex items-center justify-between text-xs font-bold text-[#2F5233] group-hover:translate-x-0.5 transition-transform">
                <span>{card.subtext}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════
          4. PARTNER EXCELLENCE & INCENTIVES BANNER
          ════════════════════════════════════════════════*/}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1F2A1E] via-[#243523] to-[#2F5233] text-white p-6 sm:p-8 lg:p-10 shadow-sm border border-[#1F2A1E]">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A15A]/20 text-[#C9A15A] border border-[#C9A15A]/30 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Partner Excellence Program
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif tracking-tight leading-tight">
            Tier 1 Elite Matching Guarantee
          </h3>
          <p className="text-sm text-white/80 font-medium leading-relaxed">
            Maintain a 98%+ reliability score and under-15-minute response time to receive automated top-rank job routing and 0% cancellation penalty buffers.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="px-5 py-2.5 bg-[#C9A15A] hover:bg-[#b58f4a] text-[#1F2A1E] font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              View Trust Score Breakdown
            </button>
            <span className="text-xs text-white/60">Updated hourly from verified customer ratings</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          5. MAIN WORKSPACE: BOOKINGS + SIDEBAR
          ════════════════════════════════════════════════*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Bookings Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xs overflow-hidden">
            {/* Header with Title & Action */}
            <div className="p-6 border-b border-[#E5DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#1F2A1E] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#2F5233]" />
                  <span>Assigned Job Pipeline</span>
                </h3>
                <p className="text-xs text-[#1F2A1E]/60 mt-0.5">
                  Accept incoming requests, verify completion OTP codes, and monitor job progress.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1 bg-[#FAF7F0] p-1 rounded-2xl border border-[#E5DEC9]">
                {(['all', 'pending', 'active', 'completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-[#2F5233] text-white shadow-xs'
                        : 'text-[#1F2A1E]/60 hover:text-[#1F2A1E]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Notification */}
            {actionError && (
              <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{actionError}</span>
              </div>
            )}

            {/* Bookings List */}
            <div className="p-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 rounded-2xl bg-[#FAF7F0] border border-dashed border-[#E5DEC9] space-y-2">
                  <Calendar className="w-8 h-8 text-[#1F2A1E]/30 mx-auto" />
                  <p className="text-sm font-bold text-[#1F2A1E]">No bookings in this filter</p>
                  <p className="text-xs text-[#1F2A1E]/50 max-w-sm mx-auto">
                    New customer bookings matched to your category and schedule will automatically appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        booking.emergency_flag === 'EMERGENCY'
                          ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                          : 'bg-[#FAF7F0] border-[#E5DEC9] hover:border-[#2F5233]/40'
                      }`}
                    >
                      {/* Booking Top Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#2F5233] bg-white px-2.5 py-1 rounded-lg border border-[#E5DEC9]">
                            {booking.booking_reference}
                          </span>
                          <span
                            className={`text-[11px] font-bold px-3 py-0.5 rounded-full border ${
                              STATUS_STYLES[booking.status] || 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {booking.status}
                          </span>
                          {booking.emergency_flag === 'EMERGENCY' && (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                              <Zap className="w-3 h-3 text-rose-600" />
                              Emergency Dispatch
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-extrabold text-[#1F2A1E] font-serif">
                          ₹{parseFloat(booking.total_price || 0).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Booking Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                        <div>
                          <span className="text-[#1F2A1E]/50 block font-medium">Service</span>
                          <span className="font-bold text-[#1F2A1E] block truncate">{booking.service_name}</span>
                        </div>
                        <div>
                          <span className="text-[#1F2A1E]/50 block font-medium">Customer</span>
                          <span className="font-bold text-[#1F2A1E] block truncate">{booking.customer_name}</span>
                        </div>
                        <div>
                          <span className="text-[#1F2A1E]/50 block font-medium">Scheduled Time</span>
                          <span className="font-semibold text-[#1F2A1E]">
                            {booking.scheduled_time
                              ? new Date(booking.scheduled_time).toLocaleString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : 'TBD'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#1F2A1E]/50 block font-medium">Location</span>
                          <span className="font-semibold text-[#1F2A1E] truncate block">
                            {booking.address || 'Address on file'}
                          </span>
                        </div>
                      </div>

                      {/* OTP completion display */}
                      {booking.otp_code && booking.status === 'Started' && (
                        <div className="mb-4 flex items-center justify-between bg-purple-50 border border-purple-200 px-4 py-2.5 rounded-xl text-xs">
                          <span className="font-bold text-purple-900">Customer Completion OTP:</span>
                          <span className="font-mono text-sm font-extrabold text-purple-950 tracking-widest">
                            {booking.otp_code}
                          </span>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-wrap pt-2 border-t border-[#E5DEC9]/60">
                        {(booking.status === 'Requested' || booking.status === 'Assigned') && (
                          <>
                            <button
                              onClick={() => handleBookingAction(booking.id, 'accept')}
                              disabled={actionLoading === booking.id}
                              className="flex items-center gap-1.5 px-4 py-2 bg-[#2F5233] text-white text-xs font-bold rounded-xl hover:bg-[#3D6B42] transition-colors disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{actionLoading === booking.id ? 'Accepting...' : 'Accept Job'}</span>
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking.id, 'reject')}
                              disabled={actionLoading === booking.id}
                              className="px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl hover:bg-rose-100 transition-colors disabled:opacity-50"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {booking.status === 'Accepted' && (
                          <button
                            onClick={() => handleBookingAction(booking.id, 'start')}
                            disabled={actionLoading === booking.id}
                            className="flex items-center gap-1.5 px-4 py-2 bg-purple-700 text-white text-xs font-bold rounded-xl hover:bg-purple-800 transition-colors disabled:opacity-50"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>{actionLoading === booking.id ? 'Starting...' : 'Start Service'}</span>
                          </button>
                        )}
                        {booking.status === 'Started' && (
                          <button
                            onClick={() => handleBookingAction(booking.id, 'complete')}
                            disabled={actionLoading === booking.id}
                            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{actionLoading === booking.id ? 'Completing...' : 'Mark Complete'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Profile & Trust Card */}
        <div className="space-y-6">
          {trust && (
            <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xs p-6 relative">
              {trust.is_verified && (
                <div className="absolute top-4 right-4 bg-[#2F5233] text-white px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-2xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              )}

              {/* Avatar & Bio */}
              <div className="flex flex-col items-center text-center mb-6 pt-2">
                <div className="w-20 h-20 rounded-2xl border border-[#E5DEC9] shadow-xs overflow-hidden mb-3 bg-[#FAF7F0] flex items-center justify-center text-2xl font-serif font-bold text-[#2F5233]">
                  {trust.photo_url ? (
                    <img src={trust.photo_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{trust.full_name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="font-bold text-[#1F2A1E] text-base font-serif">{trust.full_name}</h3>
                <p className="text-xs text-[#7A9E6E] font-semibold mt-0.5">
                  {trust.category?.replace(/^\d+\.\s*/, '') || 'Service Partner'}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-[#1F2A1E]/60">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A15A]" />
                  <span>{trust.service_area || 'Bengaluru, India'}</span>
                </div>
              </div>

              {/* Trust Metrics */}
              <div className="space-y-2 text-xs border-t border-[#E5DEC9] pt-4">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/70 flex items-center gap-1.5 font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Reliability Score</span>
                  </span>
                  <span className="font-bold text-emerald-700">{trust.reliability_score}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/70 font-medium">Acceptance Rate</span>
                  <span className="font-bold text-[#1F2A1E]">{trust.acceptance_rate}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/70 font-medium">On-Time Arrival</span>
                  <span className="font-bold text-[#1F2A1E]">{trust.on_time_rate}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/70 font-medium">Cancellation Rate</span>
                  <span className="font-bold text-slate-500">{trust.cancellation_rate}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/70 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Completed Jobs</span>
                  </span>
                  <span className="font-bold text-[#1F2A1E]">{trust.completed_jobs_count}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#1F2A1E]/70 flex items-center gap-1.5 font-medium">
                    <FileCheck className="w-3.5 h-3.5 text-[#2F5233]" />
                    <span>Verified Documents</span>
                  </span>
                  <span className="font-bold text-[#2F5233]">{trust.certificates_count} on file</span>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-5 pt-3 border-t border-[#E5DEC9]">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#F2EDE1] text-[#1F2A1E] font-bold text-xs border border-[#E5DEC9] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Complete Partner Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Quick Links Card */}
          <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xs p-5 space-y-1">
            <span className="text-[10px] font-bold text-[#1F2A1E]/40 uppercase tracking-wider block px-2 mb-2">
              Partner Utilities
            </span>
            {[
              { label: 'My Offered Services', path: '/services', icon: Briefcase },
              { label: 'Calendar & Available Hours', path: '/availability', icon: Calendar },
              { label: 'Trust & Verification Dossier', path: '/profile', icon: User },
              { label: 'Support & Help Desk', path: '/support', icon: LifeBuoy },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-[#1F2A1E]/75 hover:bg-[#FAF7F0] hover:text-[#2F5233] transition-colors group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 text-[#2F5233]" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#1F2A1E]/30 group-hover:text-[#2F5233] group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboardView;
