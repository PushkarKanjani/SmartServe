import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { providerApi } from '../../api/providerApi';
import { Certificate } from '../../types/provider';
import {
  FileText,
  Upload,
  ShieldCheck,
  Clock,
  XCircle,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [documentUrl, setDocumentUrl] = useState('');
  const [certificateType, setCertificateType] = useState('Trade License / Registration');

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchCertificates = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await providerApi.getCertificates();
      setCertificates(data);
    } catch {
      // Demo fallback
      setCertificates([
        {
          id: 'cert-1',
          provider_id: 'demo-provider-1',
          document_url: 'https://storage.smartserve.dev/certs/trade_license_2026.pdf',
          certificate_type: 'Government Trade License',
          verification_status: 'VERIFIED',
          uploaded_at: '2026-08-10T10:30:00Z',
          verified_at: '2026-08-11T14:20:00Z',
        },
        {
          id: 'cert-2',
          provider_id: 'demo-provider-1',
          document_url: 'https://storage.smartserve.dev/certs/advanced_plumbing_diploma.pdf',
          certificate_type: 'Advanced Plumbing & HVAC Diploma',
          verification_status: 'PENDING',
          uploaded_at: '2026-08-16T18:00:00Z',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const newCert = await providerApi.uploadCertificate({
        document_url: documentUrl,
        certificate_type: certificateType,
      });

      setCertificates((prev) => [newCert, ...prev]);
      setDocumentUrl('');
      setSuccessMsg('Certificate metadata submitted for admin verification!');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch {
      // Demo fallback
      const demoCert: Certificate = {
        id: `cert-${Date.now()}`,
        provider_id: 'demo-provider-1',
        document_url: documentUrl,
        certificate_type: certificateType,
        verification_status: 'PENDING',
        uploaded_at: new Date().toISOString(),
      };
      setCertificates((prev) => [demoCert, ...prev]);
      setDocumentUrl('');
      setSuccessMsg('Certificate submitted to verification queue (demo mode)');
      setTimeout(() => setSuccessMsg(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'VERIFIED') {
      return (
        <span className="badge badge-verified" style={{ gap: '6px' }}>
          <ShieldCheck size={14} color="#10b981" />
          <span>Verified Pro</span>
        </span>
      );
    }
    if (status === 'REJECTED') {
      return (
        <span className="badge badge-admin" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', gap: '6px' }}>
          <XCircle size={14} color="#ef4444" />
          <span>Rejected</span>
        </span>
      );
    }
    return (
      <span className="badge badge-customer" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.3)', gap: '6px' }}>
        <Clock size={14} color="#f59e0b" />
        <span>Pending Admin Review</span>
      </span>
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0e1a' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, maxWidth: '1000px' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              Provider Verification & Certifications
            </h1>
            <span className="badge badge-provider">Trust & Safety</span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
            Upload your professional licenses, trade certificates, and insurance documents to earn the Verified Pro badge and rank higher in search algorithms.
          </p>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            color: '#34d399',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px'
          }}>
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#f87171',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px'
          }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Upload Form */}
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Upload size={18} color="#818cf8" />
            <span>Submit New Verification Document</span>
          </h2>

          <form onSubmit={handleUpload}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="certType">Document / Certification Type</label>
                <select
                  id="certType"
                  className="form-input"
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                  style={{ background: 'rgba(15, 23, 42, 0.8)' }}
                >
                  <option value="Government Trade License">Government Trade License</option>
                  <option value="Vocational / Technical Diploma">Vocational / Technical Diploma</option>
                  <option value="Commercial Liability Insurance">Commercial Liability Insurance</option>
                  <option value="Identity & Background Verification">Identity & Background Verification</option>
                  <option value="Specialist Equipment Training">Specialist Equipment Training</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="docUrl">Document Storage URL (S3 / Cloud Storage)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="docUrl"
                    type="url"
                    className="form-input"
                    value={documentUrl}
                    onChange={(e) => setDocumentUrl(e.target.value)}
                    placeholder="https://storage.smartserve.dev/..."
                    required
                    style={{ paddingLeft: '40px' }}
                  />
                  <FileText size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} color="#818cf8" />
                <span>Documents are stored in private object storage and reviewed only by verified administrators.</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ padding: '10px 24px' }}
              >
                <Upload size={16} />
                <span>{isSubmitting ? 'Submitting...' : 'Upload for Verification'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Certificates List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>
              📜 Submitted Credentials ({certificates.length})
            </h2>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading documents...</div>
          ) : certificates.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
              No credentials uploaded yet. Upload a certificate above to boost customer trust.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {certificates.map((cert) => (
                <div key={cert.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(99, 102, 241, 0.15)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FileText size={20} color="#818cf8" />
                    </div>

                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>
                        {cert.certificate_type}
                      </div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                        Uploaded: {new Date(cert.uploaded_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {getStatusBadge(cert.verification_status)}

                    <a
                      href={cert.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      <ExternalLink size={14} />
                      <span>View</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
