import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  AlertCircle,
  XCircle,
  RefreshCw,
  FileText,
  FileCheck,
  ArrowRight,
  LogOut,
  ChevronRight,
  UploadCloud,
  Send,
  Sparkles,
} from 'lucide-react';
import {
  getProviderStatus,
  resubmitApplication,
  type ProviderStatusResponse,
  type DocumentStatusItem,
} from '../../api/onboarding';
import { useAuth } from '../../context/AuthContext';

const DOC_STATUS_CONFIG: Record<string, { label: string; icon: React.FC<any>; color: string; bg: string; border: string }> = {
  PENDING: {
    label: 'Under Review',
    icon: Clock,
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  Pending: {
    label: 'Under Review',
    icon: Clock,
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  Verified: {
    label: 'Verified',
    icon: CheckCircle,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  VERIFIED: {
    label: 'Verified',
    icon: CheckCircle,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  Rejected: {
    label: 'Rejected',
    icon: XCircle,
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  REJECTED: {
    label: 'Rejected',
    icon: XCircle,
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  'Correction Requested': {
    label: 'Correction Needed',
    icon: AlertCircle,
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
};

interface DocConfig {
  label: string;
  icon: React.FC<any>;
  color: string;
  bg: string;
  border: string;
}

const DEFAULT_DOC_CONFIG: DocConfig = {
  label: 'Under Review',
  icon: Clock,
  color: 'text-amber-700',
  bg: 'bg-amber-50',
  border: 'border-amber-200',
};

const getDocConfig = (status: string): DocConfig =>
  DOC_STATUS_CONFIG[status] || DOC_STATUS_CONFIG['PENDING'] || DEFAULT_DOC_CONFIG;

type TimelineStep = {
  id: number;
  label: string;
  sublabel: string;
  icon: React.FC<any>;
  status: 'completed' | 'active' | 'pending' | 'error';
};

function buildTimeline(verificationStatus: string): TimelineStep[] {
  const sLower = (verificationStatus || '').trim().toLowerCase();
  const pending = sLower === 'pending' || sLower === 'under review' || !verificationStatus;
  const verified = sLower === 'verified';
  const rejected = sLower === 'rejected';
  const correction = sLower.includes('correction');

  return [
    {
      id: 1,
      label: 'Application Started',
      sublabel: 'Profile created & master services selected',
      icon: FileCheck,
      status: 'completed',
    },
    {
      id: 2,
      label: 'Documents Submitted',
      sublabel: 'Identity, PAN, NDA & Skill Evidence received',
      icon: FileText,
      status: 'completed',
    },
    {
      id: 3,
      label: 'Under Admin Review',
      sublabel: pending
        ? 'Verification team is reviewing documents & credentials'
        : correction
        ? 'Admin requested document corrections'
        : 'Review completed',
      icon: ShieldCheck,
      status: pending ? 'active' : correction ? 'error' : 'completed',
    },
    {
      id: 4,
      label: verified
        ? 'Approved — Welcome!'
        : rejected
        ? 'Application Rejected'
        : correction
        ? 'Changes Required'
        : 'Approved / Rejected / Changes Required',
      sublabel: verified
        ? 'Partner account verified. Dashboard unlocked'
        : rejected
        ? 'See review feedback below'
        : correction
        ? 'Please review instructions & re-submit requested documents'
        : 'Decision pending admin review',
      icon: verified ? CheckCircle : rejected ? XCircle : correction ? AlertCircle : Clock,
      status: verified ? 'completed' : rejected ? 'error' : correction ? 'error' : 'pending',
    },
  ];
}

export const ProviderApplicationStatusView: React.FC = () => {
  const navigate = useNavigate();
  const { logout, refreshVerificationStatus } = useAuth();
  const [status, setStatus] = useState<ProviderStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Re-submission form state
  const [showResubmitForm, setShowResubmitForm] = useState(false);
  const [resubmitDocType, setResubmitDocType] = useState('Identity Proof (Aadhaar)');
  const [resubmitDocUrl, setResubmitDocUrl] = useState('');
  const [resubmitDocNumber, setResubmitDocNumber] = useState('');
  const [resubmitNotes, setResubmitNotes] = useState('');
  const [resubmitting, setResubmitting] = useState(false);
  const [resubmitSuccess, setResubmitSuccess] = useState<string | null>(null);

  const fetchStatus = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await getProviderStatus();
      setStatus(data);
      // Sync auth context
      await refreshVerificationStatus();
      // If now verified, redirect to dashboard
      if (data.is_verified) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load application status. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Auto-poll every 30 seconds
    const timer = setInterval(() => {
      fetchStatus(true);
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleStartReapply = () => {
    logout();
    navigate('/onboarding');
  };

  const handleResubmitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resubmitDocUrl) {
      setError('Please provide a document URL or upload link.');
      return;
    }

    setResubmitting(true);
    setError(null);
    setResubmitSuccess(null);
    try {
      await resubmitApplication({
        updated_documents: [
          {
            certificate_type: resubmitDocType,
            document_url: resubmitDocUrl.trim(),
            document_number: resubmitDocNumber.trim() || undefined,
            description: resubmitNotes.trim() || 'Updated document submitted by provider',
          },
        ],
        notes: resubmitNotes.trim() || 'Document re-submitted for review',
      });
      setResubmitSuccess('Documents re-submitted successfully! Your status has been returned to Pending Review.');
      setShowResubmitForm(false);
      setResubmitDocUrl('');
      setResubmitDocNumber('');
      setResubmitNotes('');
      // Refresh status immediately
      await fetchStatus(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to re-submit documents. Please try again.');
    } finally {
      setResubmitting(false);
    }
  };

  if (loading && !status) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#2F5233]/20 border-t-[#2F5233] animate-spin mb-4" />
        <p className="text-sm font-semibold text-[#1F2A1E]/70">Checking your application status…</p>
      </div>
    );
  }

  if (error && !status) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg border border-red-100 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#1F2A1E] mb-2">Could Not Load Status</h2>
          <p className="text-xs text-[#1F2A1E]/60 mb-6">{error}</p>
          <div className="space-y-2">
            <button
              onClick={() => fetchStatus()}
              className="w-full py-2.5 rounded-xl bg-[#2F5233] text-white font-semibold text-xs hover:bg-[#3D6B42] transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-[#1F2A1E]/70 font-semibold text-xs hover:bg-slate-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!status) return null;

  const timeline = buildTimeline(status.verification_status);
  const isRejected = status.verification_status === 'Rejected';
  const isCorrection = status.verification_status === 'Correction Requested';
  const adminInstructions = status.correction_instructions || status.rejection_reason;

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10 px-4">
      {/* Top Navigation */}
      <div className="max-w-2xl mx-auto flex items-center justify-between mb-8">
        <Link to="/login" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl border border-[#E5DEC9] bg-[#FAF7F0] flex items-center justify-center shadow-xs p-1 flex-shrink-0 group-hover:scale-105 transition-transform">
            <svg className="w-full h-full" viewBox="0 0 96 96" fill="none">
              <path
                d="M 48 6 L 72 6 A 18 18 0 0 1 90 24 L 90 72 A 18 18 0 0 1 72 90 L 24 90 A 18 18 0 0 1 6 72 L 6 24 A 18 18 0 0 1 24 6 L 48 6 Z"
                stroke="#C9A15A"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M 62 30 C 62 23, 34 22, 34 38 C 34 54, 62 48, 62 64 C 62 80, 34 78, 34 70"
                stroke="#2F5233"
                strokeWidth={7}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-baseline font-serif">
              <span className="text-lg font-bold text-[#2F5233] tracking-tight">Smart</span>
              <span className="text-lg font-bold text-[#C9A15A] tracking-tight ml-0.5">Serve</span>
            </div>
            <div className="text-[10px] text-[#7A9E6E] font-semibold uppercase tracking-wider -mt-0.5">
              Partner Application Tracking
            </div>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E5DEC9] bg-white text-xs font-semibold text-[#1F2A1E]/80 hover:bg-[#F2EDE1] transition-colors shadow-2xs"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success toast after resubmission */}
        {resubmitSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{resubmitSuccess}</span>
          </div>
        )}

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xs border border-[#E5DEC9]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Thank You! Application Submitted</span>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                    status.verification_status === 'Verified'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : isRejected
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : isCorrection
                      ? 'bg-orange-50 text-orange-700 border-orange-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {status.verification_status === 'Verified'
                    ? 'Approved'
                    : isRejected
                    ? 'Application Rejected'
                    : isCorrection
                    ? 'Changes Required'
                    : 'Under Admin Review'}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#1F2A1E] mb-1">
                Hello, {status.full_name.split(' ')[0]}!
              </h1>
              <p className="text-sm text-[#1F2A1E]/70 leading-relaxed">
                {status.verification_status === 'Verified'
                  ? 'Your partner account has been approved. Welcome to SmartServe!'
                  : isRejected
                  ? 'Your application was not approved. Please review the reason below.'
                  : isCorrection
                  ? 'Admin has requested specific changes or additional documents for your application.'
                  : 'Your documents have been submitted. Our team is reviewing your application.'}
              </p>
            </div>
            <button
              onClick={() => fetchStatus(true)}
              disabled={refreshing}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-[#FAF7F0] transition-colors shrink-0"
              title="Refresh status"
            >
              <RefreshCw className={`w-4 h-4 text-[#2F5233] ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Application details */}
          <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#FAF7F0] rounded-xl p-3 border border-[#2F5233]/10">
              <div className="text-[#1F2A1E]/50 mb-0.5">Category</div>
              <div className="font-semibold text-[#2F5233] truncate">{status.category || '—'}</div>
            </div>
            <div className="bg-[#FAF7F0] rounded-xl p-3 border border-[#2F5233]/10">
              <div className="text-[#1F2A1E]/50 mb-0.5">Documents Submitted</div>
              <div className="font-semibold text-[#1F2A1E]">{status.documents_submitted} file(s)</div>
            </div>
          </div>
        </div>

        {/* 4-Step Application Timeline */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-[#2F5233]/10">
          <h2 className="text-sm font-bold text-[#1F2A1E] mb-6 uppercase tracking-wider">
            Application Timeline
          </h2>
          <div className="relative">
            {/* Timeline track line */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-100 -z-0" />

            <div className="space-y-7 relative z-10">
              {timeline.map((step) => {
                const Icon = step.icon;
                const isCompleted = step.status === 'completed';
                const isActive = step.status === 'active';
                const isError = step.status === 'error';

                return (
                  <div key={step.id} className="flex items-start gap-4 relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-200'
                          : isActive
                          ? 'bg-amber-400 border-amber-400 text-white shadow-md shadow-amber-200 animate-pulse'
                          : isError
                          ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200'
                          : 'bg-white border-slate-200 text-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="pt-1.5 flex-1">
                      <div
                        className={`text-sm font-bold ${
                          isCompleted
                            ? 'text-emerald-700'
                            : isActive
                            ? 'text-amber-700'
                            : isError
                            ? 'text-orange-700'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </div>
                      <div className="text-xs text-[#1F2A1E]/50 mt-0.5">{step.sublabel}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Changes Required Section with Exact Admin Instructions */}
        {isCorrection && (
          <div className="bg-orange-50 rounded-3xl p-7 border border-orange-200 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-orange-950 mb-1">
                  Admin Requested Changes
                </h3>
                <p className="text-xs text-orange-900 leading-relaxed mb-3">
                  {adminInstructions || 'Please re-upload clear or updated documents as requested by our verification team.'}
                </p>
                {!showResubmitForm && (
                  <button
                    onClick={() => setShowResubmitForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    <UploadCloud className="w-4 h-4" />
                    Upload & Re-submit Documents
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Document Re-submission Form */}
            {showResubmitForm && (
              <form onSubmit={handleResubmitSubmit} className="bg-white rounded-2xl p-5 border border-orange-200 shadow-sm space-y-4 mt-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-xs font-bold text-[#1F2A1E] flex items-center gap-1.5">
                    <UploadCloud className="w-4 h-4 text-orange-600" />
                    Re-submit Corrected Document
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowResubmitForm(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Document to Update *
                  </label>
                  <select
                    value={resubmitDocType}
                    onChange={(e) => setResubmitDocType(e.target.value)}
                    className="w-full bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="Identity Proof (Aadhaar)">Identity Proof (Aadhaar)</option>
                    <option value="Tax Identity (PAN)">Tax Identity (PAN)</option>
                    <option value="Category Skill Evidence">Category Skill Evidence / Trade Certificate</option>
                    <option value="Signed NDA & Code of Conduct Undertaking">Signed NDA & Code of Conduct Undertaking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Updated Document Number / ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={resubmitDocNumber}
                    onChange={(e) => setResubmitDocNumber(e.target.value)}
                    placeholder="e.g. 1234 5678 9012 or ABCPS1234K"
                    className="w-full bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Document Image URL / Upload Link *
                  </label>
                  <input
                    type="text"
                    required
                    value={resubmitDocUrl}
                    onChange={(e) => setResubmitDocUrl(e.target.value)}
                    placeholder="https://... or /uploads/document.jpg"
                    className="w-full bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Notes / Explanation for Admin
                  </label>
                  <textarea
                    value={resubmitNotes}
                    onChange={(e) => setResubmitNotes(e.target.value)}
                    placeholder="Explain what has been updated or corrected..."
                    rows={2}
                    className="w-full bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowResubmitForm(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-xs shadow-sm transition-all"
                  >
                    {resubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Again for Review
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Rejection Section */}
        {isRejected && (
          <div className="bg-red-50 rounded-3xl p-7 border border-red-200 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                <XCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-red-950 mb-1">
                  Application Not Approved
                </h3>
                <p className="text-xs text-red-900 leading-relaxed mb-4">
                  {status.rejection_reason || 'Your application did not meet our verification criteria. Please see details above.'}
                </p>
                <button
                  onClick={handleStartReapply}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Start New Application / Re-register
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Documents Status */}
        {status.documents.length > 0 && (
          <div className="bg-white rounded-3xl p-7 shadow-md border border-[#2F5233]/10">
            <h2 className="text-sm font-bold text-[#1F2A1E] mb-4 uppercase tracking-wider">
              Submitted Documents ({status.documents_submitted})
            </h2>
            <div className="space-y-2.5">
              {status.documents.map((doc: DocumentStatusItem, idx: number) => {
                const cfg = getDocConfig(doc.verification_status);
                const StatusIcon = cfg.icon;
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3.5 rounded-xl border ${cfg.bg} ${cfg.border}`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className={`w-4 h-4 ${cfg.color}`} />
                      <div>
                        <div className={`text-xs font-bold ${cfg.color}`}>{doc.certificate_type}</div>
                        {doc.document_number && (
                          <div className="text-[11px] text-[#1F2A1E]/50 font-mono mt-0.5">{doc.document_number}</div>
                        )}
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs font-semibold ${cfg.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {cfg.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-[#2F5233]/10 space-y-3">
          {status.is_verified ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3.5 rounded-xl bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-sm transition-all shadow-md shadow-[#2F5233]/20 flex items-center justify-center gap-2"
            >
              Enter Partner Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <div className="text-xs text-center text-[#1F2A1E]/50 pb-1">
                This page refreshes automatically every 30 seconds.
              </div>
              <button
                onClick={() => fetchStatus(true)}
                disabled={refreshing}
                className="w-full py-3 rounded-xl border border-[#2F5233]/30 text-[#2F5233] font-bold text-sm transition-all hover:bg-[#FAF7F0] flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Checking…' : 'Refresh Status'}
              </button>
              <Link
                to="/login"
                className="w-full py-3 rounded-xl border border-slate-200 text-[#1F2A1E]/60 font-semibold text-sm transition-all hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                Sign In with Different Account <ChevronRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>

        <p className="text-center text-xs text-[#1F2A1E]/40">
          Questions? Contact{' '}
          <a href="mailto:support@smartserve.dev" className="text-[#2F5233] font-semibold hover:underline">
            support@smartserve.dev
          </a>
        </p>
      </div>
    </div>
  );
};
