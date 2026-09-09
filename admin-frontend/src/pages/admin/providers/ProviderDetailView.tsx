import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  ShieldAlert, 
  Star, 
  Award, 
  MapPin, 
  Loader2, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Briefcase, 
  ChevronRight,
  Phone,
  Mail,
  X,
  History,
  AlertCircle,
  Wrench,
  Calendar,
  Clock,
  Siren,
  CalendarCheck,
  ArrowUpRight
} from 'lucide-react';
import { 
  getProviderDetail, 
  verifyProviderDocuments, 
  requestDocumentReplacement,
  updateProviderAccountStatus, 
  estimateProviderEta 
} from '../../../api/providers';
import type { ProviderItem, ProviderEtaEstimate } from '../../../api/providers';
import { getAuthenticatedAdmin } from '../../../api/admins';
import type { SessionAdminInfo } from '../../../api/admins';
import { hasPermission } from '../../../utils/rbac';
import { formatCurrencyINR } from '../../../utils/formatters';

export const ProviderDetailView: React.FC = () => {
  const params = useParams<{ providerId?: string; providerUserId?: string }>();
  const providerUserId = params.providerId || params.providerUserId;
  const navigate = useNavigate();

  const [provider, setProvider] = useState<ProviderItem | null>(null);
  const [eta, setEta] = useState<ProviderEtaEstimate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [adminSession, setAdminSession] = useState<SessionAdminInfo | null>(null);

  // Modals & Action States
  const [verifyModalOpen, setVerifyModalOpen] = useState<boolean>(false);
  const [verifyActionType, setVerifyActionType] = useState<'Approved' | 'Rejected'>('Approved');
  const [verifyReason, setVerifyReason] = useState<string>('');
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);
  const [statusActionType, setStatusActionType] = useState<boolean>(false); // true = reactivate, false = suspend
  const [statusReason, setStatusReason] = useState<string>('');
  const [statusLoading, setStatusLoading] = useState<boolean>(false);

  const [replacementModalOpen, setReplacementModalOpen] = useState<boolean>(false);
  const [replacementReason, setReplacementReason] = useState<string>('');
  const [replacementLoading, setReplacementLoading] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'warning' | 'error' } | null>(null);
  const [slotFilter, setSlotFilter] = useState<'all' | 'occupied' | 'free'>('all');

  const canManageProviders = hasPermission(adminSession, 'providers:manage');

  const getSlotStatusBadge = (statusStr: string, isOccupied: boolean) => {
    if (isOccupied) {
      return 'bg-amber-100 text-amber-900 border-amber-300';
    }
    switch (statusStr.toUpperCase()) {
      case 'FREE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'RESERVED':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'BOOKED':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'UNAVAILABLE':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-[#F2EDE1] text-slate-700 border-[#E5DEC9]';
    }
  };

  const getBookingStatusBadge = (statusStr: string) => {
    switch (statusStr?.toLowerCase()) {
      case 'requested':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'assigned':
        return 'bg-[#F2EDE1] text-[#2F5233] border-[#E5DEC9]';
      case 'accepted':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'started':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'completed':
      case 'paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'cancelled':
      case 'rejected':
      case 'expired':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-[#F2EDE1] text-slate-700 border-[#E5DEC9]';
    }
  };

  const showToast = (text: string, type: 'success' | 'warning' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 5000);
  };

  const fetchProviderData = async () => {
    if (!providerUserId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getProviderDetail(providerUserId);
      setProvider(data);

      try {
        const etaData = await estimateProviderEta(providerUserId, 5.2);
        setEta(etaData);
      } catch (etaErr) {
        setEta(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load provider details from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviderData();
    getAuthenticatedAdmin().then((s) => setAdminSession(s)).catch(() => {});
  }, [providerUserId]);

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) return;
    setVerifyLoading(true);
    try {
      await verifyProviderDocuments(provider.id, verifyActionType, verifyReason);
      showToast(`Provider verification status updated to ${verifyActionType}.`, 'success');
      setVerifyModalOpen(false);
      setVerifyReason('');
      fetchProviderData();
    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Verification action failed.', 'error');
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) return;
    setStatusLoading(true);
    try {
      await updateProviderAccountStatus(provider.id, statusActionType, statusReason);
      const actStr = statusActionType ? 'reactivated' : 'suspended';
      showToast(`Provider account successfully ${actStr}.`, 'success');
      setStatusModalOpen(false);
      setStatusReason('');
      fetchProviderData();
    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Account status action failed.', 'error');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleReplacementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provider) return;
    setReplacementLoading(true);
    try {
      await requestDocumentReplacement(provider.id, replacementReason);
      showToast('Document replacement request logged and marked in audit trail.', 'warning');
      setReplacementModalOpen(false);
      setReplacementReason('');
      fetchProviderData();
    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Document replacement action failed.', 'error');
    } finally {
      setReplacementLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#2F5233]" />
        <p className="text-sm font-semibold text-slate-600">Loading Provider Profile & AI OCR Signals...</p>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-rose-200 rounded-3xl text-center space-y-4 shadow-sm">
        <ShieldAlert className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold font-serif text-[#1F2A1E]">Provider Not Found</h3>
        <p className="text-xs text-slate-600">{error || 'Unable to retrieve requested provider account.'}</p>
        <button
          onClick={() => navigate('/admin/providers')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2F5233] text-white rounded-2xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Provider Directory</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-3 px-5 py-3.5 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/admin/providers" className="hover:text-[#2F5233] flex items-center gap-1 transition-colors">
          <Users className="w-3.5 h-3.5" />
          <span>People</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <Link to="/admin/providers" className="hover:text-[#2F5233] transition-colors">
          Providers
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-slate-900 font-bold">{provider.full_name}</span>
      </nav>

      {/* Profile Header Banner */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5DEC9] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start md:items-center gap-5">
          <button
            onClick={() => navigate('/admin/providers')}
            className="p-2.5 rounded-2xl bg-[#F2EDE1] hover:bg-[#E5DEC9] text-slate-600 transition-colors"
            title="Back to Directory"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-[#F2EDE1] text-[#2F5233] font-extrabold text-2xl flex items-center justify-center border border-[#E5DEC9] shadow-xs flex-shrink-0">
            {provider.full_name.charAt(0)}
          </div>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#1F2A1E] tracking-tight">
                {provider.full_name}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                provider.is_verified
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {provider.is_verified ? 'Verified Provider' : 'Pending Verification'}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                provider.is_active
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {provider.is_active ? 'Account Active' : 'Account Suspended'}
              </span>
            </div>

            <p className="text-sm text-slate-500 font-semibold mt-1 flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400" /> {provider.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-400" /> {provider.phone}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-slate-400" /> {provider.category}</span>
            </p>
          </div>
        </div>

        {/* Header Quick Admin Actions */}
        <div className="flex items-center gap-2.5 flex-wrap justify-end">
          {canManageProviders ? (
            <>
              {provider.is_verified ? (
                <button
                  onClick={() => {
                    setVerifyActionType('Rejected');
                    setVerifyModalOpen(true);
                  }}
                  className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-2xl border border-rose-200 text-xs transition-colors"
                >
                  Reject Verification
                </button>
              ) : (
                <button
                  onClick={() => {
                    setVerifyActionType('Approved');
                    setVerifyModalOpen(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xs text-xs transition-colors"
                >
                  Approve Verification
                </button>
              )}

              <button
                onClick={() => setReplacementModalOpen(true)}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-2xl border border-amber-300 text-xs transition-colors"
              >
                Request Correction
              </button>

              {provider.is_active ? (
                <button
                  onClick={() => {
                    setStatusActionType(false);
                    setStatusModalOpen(true);
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-xs text-xs transition-colors"
                >
                  Suspend Provider
                </button>
              ) : (
                <button
                  onClick={() => {
                    setStatusActionType(true);
                    setStatusModalOpen(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xs text-xs transition-colors"
                >
                  Reactivate Account
                </button>
              )}
            </>
          ) : (
            <button
              disabled
              title="Provider verification and account suspension requires 'providers:manage' permission."
              className="px-4 py-2 bg-[#F2EDE1] text-slate-400 font-bold rounded-2xl border border-[#E5DEC9] text-xs cursor-not-allowed opacity-70"
            >
              🔒 Actions Restricted (View Only)
            </button>
          )}
        </div>
      </div>

      {/* Grid Layout of Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile & Account Information */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E5DEC9] shadow-sm space-y-4">
            <h3 className="text-base font-bold font-serif text-[#1F2A1E] border-b border-[#E5DEC9]/60 pb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#2F5233]" />
              <span>Profile Information</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Provider ID (UUID)</span>
                <p className="font-mono font-bold text-slate-800 text-xs bg-[#FAF7F0] p-2 rounded-xl border border-[#E5DEC9] mt-1 select-all">
                  {provider.id}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-slate-400 font-semibold block">Experience</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{provider.experience_years} Years</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Base Hourly Rate</span>
                  <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">₹{provider.base_price}/hr</p>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-slate-400 font-semibold block">Member Since</span>
                <p className="font-medium text-slate-700 mt-0.5">
                  {provider.created_at ? new Date(provider.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '15 Jan 2026'}
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic ETA Estimation Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#E5DEC9] shadow-sm space-y-4">
            <h3 className="text-base font-bold font-serif text-[#1F2A1E] border-b border-[#E5DEC9]/60 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-500" />
              <span>Real-Time ETA & Dispatch Signal</span>
            </h3>

            {eta ? (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">Estimated Arrival</span>
                    <p className="text-xl font-extrabold text-emerald-900 mt-0.5">{eta.total_eta_minutes} min</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
                    Window: {eta.estimated_arrival_window}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-600 font-medium">
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Distance</span>
                    <p className="font-bold text-slate-800">{eta.distance_km} km</p>
                  </div>
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Prep Buffer</span>
                    <p className="font-bold text-slate-800">{eta.prep_buffer_minutes} min</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#FAF7F0] rounded-2xl text-center text-xs text-slate-500 font-semibold">
                ETA unavailable
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Performance, Ranking & Verification Documents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance & Provider Ranking Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5DEC9] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5DEC9]/60 pb-3">
              <h3 className="text-lg font-bold font-serif text-[#1F2A1E] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#2F5233]" />
                <span>Performance & Provider Composite Ranking</span>
              </h3>
              <span className="text-xs font-bold text-[#2F5233] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {provider.rank_tier}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E5DEC9]">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Rating</span>
                <p className="text-lg font-bold text-slate-900 mt-1 flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{provider.rating}</span>
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E5DEC9]">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Reliability Score</span>
                <p className="text-lg font-bold text-emerald-600 mt-1">{provider.reliability_score}%</p>
              </div>

              <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E5DEC9]">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Acceptance Rate</span>
                <p className="text-lg font-bold text-blue-600 mt-1">{provider.acceptance_rate}%</p>
              </div>

              <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E5DEC9]">
                <span className="text-[10px] text-slate-400 font-bold uppercase">On-Time Arrival</span>
                <p className="text-lg font-bold text-emerald-600 mt-1">{provider.on_time_rate}%</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">
                Composite Ranking Score: <strong className="text-[#2F5233] text-sm">{provider.composite_rank_score}</strong>
              </span>
              <span className="text-slate-500 font-medium">
                Formula: (Reliability × 0.4) + (Acceptance × 0.3) + (On-Time × 0.2) - (Cancellation × 0.1)
              </span>
            </div>
          </div>

          {/* Selected Catalog Services Offered */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5DEC9] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5DEC9]/60 pb-3">
              <h3 className="text-lg font-bold font-serif text-[#1F2A1E] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#2F5233]" />
                <span>Selected Catalog Services</span>
              </h3>
              <span className="text-xs font-bold text-[#2F5233] bg-[#F2EDE1] px-3 py-1 rounded-full border border-[#E5DEC9]">
                {(provider.services || []).length} Services Selected
              </span>
            </div>

            {(!provider.services || provider.services.length === 0) ? (
              <div className="p-6 bg-[#FAF7F0] rounded-2xl text-center text-xs font-semibold text-slate-500">
                No catalog services linked to this provider account yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {provider.services.map((svc) => (
                  <div key={svc.id} className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E5DEC9] space-y-2 hover:border-[#2F5233]/40 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 text-sm">{svc.name}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {svc.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{svc.category}</p>
                    <div className="pt-2 border-t border-[#E5DEC9]/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Catalog Price</span>
                      <span className="font-mono font-bold text-[#2F5233] text-sm">₹{svc.base_price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Verification Documents & AI-Assisted OCR Signals */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5DEC9] shadow-sm space-y-5">
            <h3 className="text-lg font-bold font-serif text-[#1F2A1E] border-b border-[#E5DEC9]/60 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2F5233]" />
              <span>Verification Documents & AI OCR Signals</span>
            </h3>

            {provider.documents.length === 0 ? (
              <div className="p-6 bg-[#FAF7F0] rounded-2xl text-center text-xs font-semibold text-slate-500">
                No verification documents submitted.
              </div>
            ) : (
              <div className="space-y-4">
                {provider.documents.map((doc) => (
                  <div key={doc.id} className="p-5 bg-[#FAF7F0] rounded-2xl border border-[#E5DEC9] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DEC9]/60 pb-3">
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">{doc.certificate_type}</span>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mt-0.5 flex-wrap">
                          <span>Doc #: {doc.document_number || 'N/A'}</span>
                          {doc.uploaded_at && (
                            <span className="text-[11px] text-slate-400 font-sans">
                              Uploaded: {new Date(doc.uploaded_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          )}
                          {doc.verified_at && (
                            <span className="text-[11px] text-emerald-600 font-sans">
                              Verified: {new Date(doc.verified_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-bold self-start border ${
                        doc.verification_status === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : doc.verification_status === 'Rejected'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : doc.verification_status === 'Correction Requested'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {doc.verification_status}
                      </span>
                    </div>

                    {/* Document link / preview banner */}
                    {doc.document_url && (
                      <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-xl border border-[#E5DEC9] text-xs">
                        <span className="text-slate-500 truncate font-mono">{doc.document_url}</span>
                        <a
                          href={doc.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2F5233] font-bold hover:underline shrink-0 ml-2"
                        >
                          View Document ↗
                        </a>
                      </div>
                    )}

                    {/* AI-Assisted Signal Box */}
                    {doc.ai_scan_signal && (
                      <div className="p-4 bg-white rounded-xl border border-blue-200/80 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-[#2F5233] font-bold">
                          <Sparkles className="w-4 h-4" />
                          <span>AI-Assisted Signal (Automated Document Scan)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-slate-700 font-medium pt-1">
                          <p>Extracted Name: <strong className="text-slate-900">{doc.ai_scan_signal.extracted_name || 'N/A'}</strong></p>
                          <p>Doc Number: <strong className="text-slate-900 font-mono">{doc.ai_scan_signal.document_number || 'N/A'}</strong></p>
                          <p>Validity Signal: <strong className={doc.ai_scan_signal.validity_signal === 'Valid' ? 'text-emerald-600' : 'text-amber-600'}>{doc.ai_scan_signal.validity_signal}</strong></p>
                          <p>Duplicate Check: <strong className={doc.ai_scan_signal.duplicate_detected ? 'text-rose-600' : 'text-emerald-600'}>
                            {doc.ai_scan_signal.duplicate_detected ? 'Duplicate Detected' : 'Clean (No Duplicates)'}
                          </strong></p>
                          {doc.ai_scan_signal.risk_score !== undefined && (
                            <p>Risk Score: <strong className={doc.ai_scan_signal.risk_score <= 0.2 ? 'text-emerald-600' : doc.ai_scan_signal.risk_score <= 0.45 ? 'text-amber-600' : 'text-rose-600'}>
                              {doc.ai_scan_signal.risk_score} ({doc.ai_scan_signal.risk_level || 'LOW'})
                            </strong></p>
                          )}
                          {doc.ai_scan_signal.engine_used && (
                            <p>OCR Engine: <span className="text-slate-600 font-mono text-[11px]">{doc.ai_scan_signal.engine_used}</span></p>
                          )}
                        </div>
                        {doc.ai_scan_signal.risk_factors && doc.ai_scan_signal.risk_factors.length > 0 && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-[11px] text-amber-800 space-y-0.5">
                            <span className="font-bold">Detected Flags / Risk Triggers:</span>
                            <ul className="list-disc list-inside">
                              {doc.ai_scan_signal.risk_factors.map((factor: string, fIdx: number) => (
                                <li key={fIdx}>{factor}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-[#E5DEC9]/60">
                          <span className="italic">Scoring: {doc.ai_scan_signal.scoring_method || 'Transparent Heuristic Risk Engine'}</span>
                          {doc.ai_scan_signal.recommendation && (
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              doc.ai_scan_signal.recommendation === 'CLEAR_FOR_ADMIN_APPROVAL' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {doc.ai_scan_signal.recommendation === 'CLEAR_FOR_ADMIN_APPROVAL' ? '✓ Clear Precheck' : '⚠️ Manual Review Req.'}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Administrative Audit Trail */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5DEC9] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5DEC9]/60 pb-3">
              <h3 className="text-lg font-bold font-serif text-[#1F2A1E] flex items-center gap-2">
                <History className="w-5 h-5 text-[#2F5233]" />
                <span>Verification & Administrative Audit Trail</span>
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                Immutable Compliance Logs
              </span>
            </div>

            {(!provider.audit_logs || provider.audit_logs.length === 0) ? (
              <div className="p-6 bg-[#FAF7F0] rounded-2xl text-center text-xs font-semibold text-slate-500">
                No administrative actions logged yet for this provider.
              </div>
            ) : (
              <div className="space-y-3">
                {provider.audit_logs.map((log) => (
                  <div key={log.id} className="p-3.5 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{log.action}</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        By <span className="font-semibold text-slate-700">{log.actor_email}</span> ({log.actor_role})
                        {log.metadata_json?.reason && (
                          <span className="italic ml-1 text-slate-600">— Reason: "{log.metadata_json.reason}"</span>
                        )}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono self-start sm:self-center shrink-0">
                      {log.created_at ? new Date(log.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Provider Availability & Schedule Slots (Read-Only Admin View) */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5DEC9] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DEC9]/60 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-serif text-[#1F2A1E] flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#2F5233]" />
              <span>Availability & Schedule Slots</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Read-only operations view • Slot status, provider ownership & booking occupancy
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#2F5233] bg-[#F2EDE1] px-3 py-1 rounded-full border border-[#E5DEC9]">
              {(provider.slots || []).length} Total Slots
            </span>
            <div className="flex items-center bg-[#F2EDE1] p-1 rounded-xl border border-[#E5DEC9] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSlotFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${slotFilter === 'all' ? 'bg-white text-[#2F5233] shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                All ({(provider.slots || []).length})
              </button>
              <button
                type="button"
                onClick={() => setSlotFilter('occupied')}
                className={`px-3 py-1 rounded-lg transition-colors ${slotFilter === 'occupied' ? 'bg-white text-amber-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Occupied ({(provider.slots || []).filter(s => s.is_occupied).length})
              </button>
              <button
                type="button"
                onClick={() => setSlotFilter('free')}
                className={`px-3 py-1 rounded-lg transition-colors ${slotFilter === 'free' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Free ({(provider.slots || []).filter(s => !s.is_occupied && s.status.toUpperCase() === 'FREE').length})
              </button>
            </div>
          </div>
        </div>

        {(!provider.slots || provider.slots.length === 0) ? (
          <div className="p-8 bg-[#FAF7F0] rounded-2xl text-center text-xs font-semibold text-slate-500">
            No availability slots published by this provider yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-slate-600 font-bold uppercase text-[10px] border-b border-[#E5DEC9]">
                <tr>
                  <th className="py-3 px-4">Date & Day</th>
                  <th className="py-3 px-4">Time Window</th>
                  <th className="py-3 px-4">Owner (Provider)</th>
                  <th className="py-3 px-4">Slot Status</th>
                  <th className="py-3 px-4">Occupying Booking</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(provider.slots || [])
                  .filter((s) => {
                    if (slotFilter === 'occupied') return s.is_occupied;
                    if (slotFilter === 'free') return !s.is_occupied && s.status.toUpperCase() === 'FREE';
                    return true;
                  })
                  .map((slot) => {
                    const slotDateObj = new Date(`${slot.slot_date}T00:00:00`);
                    const dayName = slotDateObj.toLocaleDateString('en-IN', { weekday: 'short' });
                    const formattedDate = slotDateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
                    const timeRange = `${slot.start_time.substring(0, 5)} - ${slot.end_time.substring(0, 5)}`;

                    return (
                      <tr
                        key={slot.id}
                        className={`transition-colors ${
                          slot.is_occupied ? 'bg-amber-50/40 hover:bg-amber-50/70' : 'hover:bg-[#FAF7F0]/80'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{formattedDate}</span>
                          <span className="text-[11px] text-slate-400 font-medium">{dayName}</span>
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {timeRange}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-700">
                          <span className="font-bold block">{slot.provider_name}</span>
                          <span className="font-mono text-[10px] text-slate-400">{slot.provider_id.substring(0, 8)}...</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${getSlotStatusBadge(slot.status, slot.is_occupied)}`}>
                            {slot.is_occupied ? 'OCCUPIED' : slot.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          {slot.occupied_booking ? (
                            <div className="p-2.5 bg-white rounded-xl border border-amber-200 shadow-xs space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono font-extrabold text-slate-900 text-xs">
                                  {slot.occupied_booking.booking_reference}
                                </span>
                                {slot.occupied_booking.emergency_flag && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
                                    <Siren className="w-2.5 h-2.5 text-rose-600 animate-pulse" />
                                    <span>{slot.occupied_booking.emergency_flag}</span>
                                  </span>
                                )}
                                <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  {slot.occupied_booking.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 font-medium">
                                <strong className="text-slate-800">{slot.occupied_booking.service_name}</strong> • Cust: {slot.occupied_booking.customer_name}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                Scheduled: {new Date(slot.occupied_booking.scheduled_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} • ₹{slot.occupied_booking.total_price}
                              </p>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs italic">
                              Free / Open Slot
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          {slot.occupied_booking ? (
                            <Link
                              to={`/admin/bookings/${slot.occupied_booking.booking_id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#F2EDE1] hover:bg-[#2F5233] hover:text-white text-slate-700 font-bold rounded-xl text-xs transition-colors"
                            >
                              <span>Inspect</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium">Available</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Provider Assigned Bookings & Service Operations */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E5DEC9] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DEC9]/60 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-serif text-[#1F2A1E] flex items-center gap-2.5">
              <CalendarCheck className="w-5 h-5 text-[#2F5233]" />
              <span>Assigned Bookings & Service Operations</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Read-only operations log • Complete lifecycle audit, requested slot & emergency signals
            </p>
          </div>

          <span className="text-xs font-bold text-[#2F5233] bg-[#F2EDE1] px-3.5 py-1 rounded-full border border-[#E5DEC9] self-start sm:self-auto">
            {(provider.bookings || []).length} Total Bookings
          </span>
        </div>

        {(!provider.bookings || provider.bookings.length === 0) ? (
          <div className="p-8 bg-[#FAF7F0] rounded-2xl text-center text-xs font-semibold text-slate-500">
            No bookings assigned to this provider yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F0] text-slate-600 font-bold uppercase text-[10px] border-b border-[#E5DEC9]">
                <tr>
                  <th className="py-3 px-4">Booking Ref & ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Requested Slot</th>
                  <th className="py-3 px-4">Priority / Flag</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(provider.bookings || []).map((b) => (
                  <tr key={b.id} className="hover:bg-[#FAF7F0]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-extrabold text-slate-900 block text-xs">
                        {b.booking_reference || `#${b.id.substring(0, 8).toUpperCase()}`}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">ID: {b.id.substring(0, 8)}...</span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <span>{b.customer_name}</span>
                      {b.customer_phone && (
                        <span className="block text-[11px] text-slate-400 font-normal">{b.customer_phone}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#2F5233]">
                      {b.service_name}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">
                        {b.requested_slot || (b.scheduled_time ? new Date(b.scheduled_time).toLocaleString('en-IN') : 'N/A')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {b.emergency_flag ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
                          <Siren className="w-3 h-3 text-rose-600 animate-pulse" />
                          <span>{b.emergency_flag}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px] font-semibold">Standard</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getBookingStatusBadge(b.status)}`}>
                        {b.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-extrabold text-slate-900">
                      {formatCurrencyINR(b.total_price)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/bookings/${b.id}`}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#F2EDE1] hover:bg-[#2F5233] hover:text-white text-slate-700 font-bold rounded-xl transition-colors text-xs"
                      >
                        <span>Inspect Booking</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Verification Approve/Reject Modal */}
      {verifyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleVerifySubmit} className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-[#E5DEC9] p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#E5DEC9]/60 pb-3">
              <h3 className="text-base font-bold font-serif text-[#1F2A1E]">
                {verifyActionType === 'Approved' ? 'Approve' : 'Reject'} Provider Verification
              </h3>
              <button type="button" onClick={() => setVerifyModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Update verification status for <strong>{provider.full_name}</strong>. The backend will persist this decision in PostgreSQL audit logs.
            </p>

            {verifyActionType === 'Rejected' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rejection Reason *</label>
                <textarea
                  value={verifyReason}
                  onChange={(e) => setVerifyReason(e.target.value)}
                  placeholder="Explain reason for rejection (e.g. Expired document, name mismatch)..."
                  className="w-full bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
                  rows={3}
                  required
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setVerifyModalOpen(false)}
                className="px-4 py-2 bg-[#F2EDE1] text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={verifyLoading}
                className={`px-5 py-2 text-white font-bold rounded-xl text-xs shadow-sm ${
                  verifyActionType === 'Approved' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {verifyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : `Confirm ${verifyActionType}`}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Account Status Suspend/Reactivate Modal */}
      {statusModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleStatusSubmit} className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-[#E5DEC9] p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#E5DEC9]/60 pb-3">
              <h3 className="text-base font-bold font-serif text-[#1F2A1E]">
                {statusActionType ? 'Reactivate' : 'Suspend'} Provider Account
              </h3>
              <button type="button" onClick={() => setStatusModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Are you sure you want to {statusActionType ? 'reactivate' : 'suspend'} <strong>{provider.full_name}</strong>? {statusActionType ? 'They will regain access to booking dispatches.' : 'They will be temporarily blocked from accepting new bookings. Existing records will not be deleted.'}
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Reason / Notes (Optional)</label>
              <textarea
                value={statusReason}
                onChange={(e) => setStatusReason(e.target.value)}
                placeholder="Internal administrative note..."
                className="w-full bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233]"
                rows={2}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStatusModalOpen(false)}
                className="px-4 py-2 bg-[#F2EDE1] text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={statusLoading}
                className={`px-5 py-2 text-white font-bold rounded-xl text-xs shadow-sm ${
                  statusActionType ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {statusLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : `Confirm ${statusActionType ? 'Reactivation' : 'Suspension'}`}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Document Replacement Request Modal (Return-for-Correction) */}
      {replacementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleReplacementSubmit} className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-[#E5DEC9] p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#E5DEC9]/60 pb-3">
              <h3 className="text-base font-bold font-serif text-[#1F2A1E] flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Request Document Correction</span>
              </h3>
              <button type="button" onClick={() => setReplacementModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Specify correction details for <strong>{provider.full_name}</strong>. Their account will remain intact with status <em>Correction Requested</em> rather than being deleted.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Correction Instructions / Reason *</label>
              <textarea
                value={replacementReason}
                onChange={(e) => setReplacementReason(e.target.value)}
                placeholder="e.g. Identity document is blurry or unreadable. Please re-upload a clear copy of your Aadhaar/PAN..."
                className="w-full bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                rows={3}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReplacementModalOpen(false)}
                className="px-4 py-2 bg-[#F2EDE1] text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={replacementLoading}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-sm"
              >
                {replacementLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Correction Request'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
