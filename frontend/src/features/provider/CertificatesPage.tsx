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
      setSuccessMsg('Certificate submitted for admin verification.');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch {
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
      setSuccessMsg('Certificate submitted to verification queue (demo mode).');
      setTimeout(() => setSuccessMsg(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'VERIFIED') {
      return (
        <span className="badge badge-verified" style={{ gap: '4px' }}>
          <ShieldCheck size={13} />
          <span>Verified</span>
        </span>
      );
    }
    if (status === 'REJECTED') {
      return (
        <span className="badge badge-danger" style={{ gap: '4px' }}>
          <XCircle size={13} />
          <span>Rejected</span>
        </span>
      );
    }
    return (
      <span className="badge badge-warning" style={{ gap: '4px' }}>
        <Clock size={13} />
        <span>Pending Review</span>
      </span>
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F9FAFB' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, maxWidth: '960px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827' }}>
              Verification & Certifications
            </h1>
            <span className="badge badge-provider">Compliance</span>
          </div>
          <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '2px' }}>
            Submit your trade licenses and technical certifications to earn the Verified Pro badge and rank higher in customer searches.
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

        {/* Upload Form Card */}
        <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Upload size={16} color="#4F46E5" />
            <span>Upload New Verification Document</span>
          </h2>

          <form onSubmit={handleUpload}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="certType">Document / Certification Type</label>
                <select
                  id="certType"
                  className="form-input"
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                >
                  <option value="Government Trade License">Government Trade License</option>
                  <option value="Vocational / Technical Diploma">Vocational / Technical Diploma</option>
                  <option value="Commercial Liability Insurance">Commercial Liability Insurance</option>
                  <option value="Identity & Background Verification">Identity & Background Verification</option>
                  <option value="Specialist Equipment Training">Specialist Equipment Training</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="docUrl">Document Storage URL</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="docUrl"
                    type="url"
                    className="form-input"
                    value={documentUrl}
                    onChange={(e) => setDocumentUrl(e.target.value)}
                    placeholder="https://storage.smartserve.dev/..."
                    required
                    style={{ paddingLeft: '36px' }}
                  />
                  <FileText size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Lock size={13} color="#6B7280" />
                <span>Documents are encrypted in private storage and reviewed by platform admins.</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ padding: '8px 20px' }}
              >
                <Upload size={14} />
                <span>{isSubmitting ? 'Uploading...' : 'Submit Document'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Certificates List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
              Submitted Credentials ({certificates.length})
            </h2>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#6B7280' }}>Loading documents...</div>
          ) : certificates.length === 0 ? (
            <div className="card" style={{ padding: '30px', textAlign: 'center', color: '#6B7280' }}>
              No credentials uploaded yet. Upload a certificate above to boost customer trust.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {certificates.map((cert) => (
                <div key={cert.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      background: '#EEF2FF',
                      border: '1px solid #C7D2FE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4F46E5'
                    }}>
                      <FileText size={18} />
                    </div>

                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                        {cert.certificate_type}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '1px' }}>
                        Uploaded on {new Date(cert.uploaded_at).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {getStatusBadge(cert.verification_status)}

                    <a
                      href={cert.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                    >
                      <ExternalLink size={12} />
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
