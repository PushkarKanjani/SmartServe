import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  FileText,
  Briefcase,
  Award,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';
import {
  getCategoryRequirements,
  listAllCategoryRequirements,
  getServicesByCategory,
  submitOnboarding,
  type CategoryRequirement,
  type CatalogServiceItem,
  type OnboardingPayload,
} from '../../api/onboarding';
import { useAuth } from '../../context/AuthContext';

export const ProviderOnboardingView: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthSession } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedResult, setSubmittedResult] = useState<any | null>(null);

  // Available categories & requirements
  const [categoryList, setCategoryList] = useState<CategoryRequirement[]>([]);
  const [catalogServices, setCatalogServices] = useState<CatalogServiceItem[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(false);
  const [currentReq, setCurrentReq] = useState<CategoryRequirement | null>(null);

  // Form State
  // Step 1: Personal Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [skillsDesc, setSkillsDesc] = useState('');
  const [serviceArea, setServiceArea] = useState('Delhi NCR & Gurgaon');

  // Step 2: Identity & KYC
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarDocUrl, setAadhaarDocUrl] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [panDocUrl, setPanDocUrl] = useState('');

  // Step 3: NDA & Undertaking
  const [ndaSigned, setNdaSigned] = useState<boolean>(false);
  const [undertakingDocUrl, setUndertakingDocUrl] = useState('');

  // Step 4: Service Selection
  const [selectedCategory, setSelectedCategory] = useState<string>('5. Electrician, Plumber, Carpenter & Home Repairs');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  // Step 5: Category-Aware Skill Evidence
  const [evidenceType, setEvidenceType] = useState<string>('');
  const [evidenceUrl, setEvidenceUrl] = useState<string>('');
  const [evidenceDescription, setEvidenceDescription] = useState<string>('');

  // Load available categories on mount
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const cats = await listAllCategoryRequirements();
        setCategoryList(cats);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCats();
  }, []);

  // Whenever selectedCategory changes, fetch its specific requirements and catalog services
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!selectedCategory) return;
      setLoadingServices(true);
      try {
        const req = await getCategoryRequirements(selectedCategory);
        setCurrentReq(req);
        setEvidenceType(req.required_evidence_type);

        const svcs = await getServicesByCategory(selectedCategory);
        setCatalogServices(svcs);
        // Clear selected services if they don't belong to new category
        setSelectedServiceIds([]);
      } catch (err) {
        console.error('Failed to fetch category data:', err);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchCategoryData();
  }, [selectedCategory]);

  const handleToggleService = (svcId: string) => {
    if (selectedServiceIds.includes(svcId)) {
      setSelectedServiceIds(selectedServiceIds.filter((id) => id !== svcId));
    } else {
      if (selectedServiceIds.length >= 3) {
        setErrorMsg('You can select a maximum of 3 catalog services.');
        return;
      }
      setErrorMsg(null);
      setSelectedServiceIds([...selectedServiceIds, svcId]);
    }
  };

  const handleNext = () => {
    setErrorMsg(null);
    if (step === 1) {
      if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
        setErrorMsg('Please complete all personal details.');
        return;
      }
      if (skillsDesc.trim().length < 20) {
        setErrorMsg('Please enter a genuine Skills & Professional Description (at least 20 characters, no placeholder text).');
        return;
      }
    } else if (step === 2) {
      if (!aadhaarNumber.trim() || !aadhaarDocUrl.trim() || !panNumber.trim() || !panDocUrl.trim()) {
        setErrorMsg('Please provide valid Aadhaar and PAN documents for verification.');
        return;
      }
    } else if (step === 3) {
      if (!ndaSigned || !undertakingDocUrl.trim()) {
        setErrorMsg('You must sign the Partner Undertaking and attach the executed document.');
        return;
      }
    } else if (step === 4) {
      if (selectedServiceIds.length === 0) {
        setErrorMsg('Please select at least 1 service (maximum 3) from the Admin catalog.');
        return;
      }
    } else if (step === 5) {
      if (!evidenceType.trim() || !evidenceUrl.trim()) {
        setErrorMsg(`Please upload the required ${currentReq?.required_evidence_type || 'skill evidence'}.`);
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setErrorMsg(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setErrorMsg(null);
    setLoading(true);

    const payload: OnboardingPayload = {
      personal_info: {
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password,
        photo_url: photoUrl.trim() || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400',
        experience_years: Number(experienceYears),
        skills_description: skillsDesc.trim(),
        service_area: serviceArea.trim(),
      },
      identity_kyc: {
        aadhaar_number: aadhaarNumber.trim(),
        aadhaar_doc_url: aadhaarDocUrl.trim(),
        pan_number: panNumber.trim().toUpperCase(),
        pan_doc_url: panDocUrl.trim(),
      },
      nda_undertaking: {
        signed: ndaSigned,
        undertaking_doc_url: undertakingDocUrl.trim(),
      },
      service_selection: {
        category: selectedCategory,
        service_ids: selectedServiceIds,
      },
      skill_evidence: {
        evidence_type: evidenceType.trim(),
        evidence_url: evidenceUrl.trim(),
        description: evidenceDescription.trim(),
      },
    };

    try {
      const res = await submitOnboarding(payload);
      setSubmittedResult(res);
      // Initialize provider session
      setAuthSession(res.access_token, {
        user_id: res.provider_id,
        email: res.email,
        role: 'provider',
        role_name: 'provider',
        permissions: ['provider:profile'],
        is_active: true,
      });
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Failed to submit onboarding application. Please verify all fields.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // SUCCESS / PENDING STATE
  // -------------------------------------------------------------
  if (submittedResult) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#2F5233]/15 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF7F0] flex items-center justify-center border-2 border-[#C9A15A] mb-6">
            <Clock className="w-10 h-10 text-[#C9A15A] animate-pulse" />
          </div>

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF7F0] text-[#C9A15A] border border-[#C9A15A]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C9A15A]"></span>
            Application Status: Pending Verification
          </span>

          <h2 className="font-serif-display text-3xl font-bold text-[#1F2A1E] mb-3">
            Application Received, {submittedResult.full_name}!
          </h2>

          <p className="text-sm text-[#1F2A1E]/70 leading-relaxed mb-6">
            Your partner onboarding application has been submitted to SmartServe Operations.
            Per platform governance policy, new service providers cannot operate or self-approve until our admin team verifies your KYC credentials, NDA undertaking, and category skill evidence.
          </p>

          <div className="bg-[#FAF7F0] rounded-2xl p-5 text-left text-xs space-y-2 mb-8 border border-[#2F5233]/10">
            <div className="flex justify-between py-1 border-b border-[#2F5233]/10">
              <span className="text-[#1F2A1E]/60">Provider ID:</span>
              <span className="font-mono font-semibold text-[#1F2A1E]">{submittedResult.provider_id}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#2F5233]/10">
              <span className="text-[#1F2A1E]/60">Primary Category:</span>
              <span className="font-semibold text-[#2F5233]">{submittedResult.category}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#2F5233]/10">
              <span className="text-[#1F2A1E]/60">Selected Catalog Services:</span>
              <span className="font-semibold text-[#1F2A1E]">{submittedResult.selected_services_count} Service(s)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#1F2A1E]/60">Uploaded Documents:</span>
              <span className="font-semibold text-[#1F2A1E]">{submittedResult.documents_submitted_count} files (Pending Review)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-full bg-[#2F5233] hover:bg-[#3D6B42] text-white font-semibold text-sm transition-all shadow-md shadow-[#2F5233]/20"
            >
              Go to Partner Dashboard
            </button>
            <Link
              to="/login"
              className="px-6 py-3 rounded-full border border-[#2F5233]/20 text-[#1F2A1E] hover:bg-[#FAF7F0] font-semibold text-sm transition-all"
            >
              Sign In to Existing Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MULTI-STEP WIZARD
  // -------------------------------------------------------------
  const steps = [
    { num: 1, title: 'Personal Info', icon: User },
    { num: 2, title: 'Identity & KYC', icon: ShieldCheck },
    { num: 3, title: 'NDA Undertaking', icon: FileText },
    { num: 4, title: 'Service Selection', icon: Briefcase },
    { num: 5, title: 'Skill Evidence', icon: Award },
    { num: 6, title: 'Review & Submit', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2F5233] text-white flex items-center justify-center font-bold text-xl shadow-md">
              S
            </div>
            <div>
              <h1 className="font-serif-display text-2xl font-bold text-[#1F2A1E]">SmartServe</h1>
              <p className="text-xs text-[#7A9E6E] font-medium tracking-wide uppercase">Partner Onboarding Portal</p>
            </div>
          </div>
          <Link
            to="/login"
            className="text-xs font-semibold text-[#2F5233] hover:underline flex items-center gap-1"
          >
            Already a partner? Sign in <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Wizard Progress Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#2F5233]/10 mb-8">
          <div className="grid grid-cols-6 gap-2">
            {steps.map((s) => {
              const Icon = s.icon;
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center text-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-[#2F5233] text-white'
                        : isCurrent
                        ? 'bg-[#2F5233] text-white ring-4 ring-[#2F5233]/20 font-bold'
                        : 'bg-[#FAF7F0] text-[#1F2A1E]/40 border border-[#2F5233]/15'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-[11px] mt-1.5 font-medium hidden sm:block ${
                      isCurrent ? 'text-[#2F5233] font-bold' : isCompleted ? 'text-[#1F2A1E]' : 'text-[#1F2A1E]/40'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#2F5233]/10">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>{errorMsg}</div>
            </div>
          )}

          {/* STEP 1: PERSONAL INFO */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#7A9E6E] uppercase tracking-wider">Step 1 of 6</span>
                <h2 className="font-serif-display text-2xl font-bold text-[#1F2A1E] mt-1">
                  Personal Information & Professional Bio
                </h2>
                <p className="text-xs text-[#1F2A1E]/60 mt-1">
                  Provide your legal name, contact details, and an authentic description of your professional skills.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rohan Gupta"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F5233] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rohan.gupta@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F5233] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Phone Number (+91) *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F5233] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Account Password *</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F5233] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Profile Photo URL</label>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F5233] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Years of Industry Experience *</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F5233] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Service Coverage Area *</label>
                <input
                  type="text"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  placeholder="e.g. South Delhi, Noida & Greater Noida"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F5233] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">
                  Skills & Professional Description (No placeholder text) *
                </label>
                <textarea
                  rows={4}
                  value={skillsDesc}
                  onChange={(e) => setSkillsDesc(e.target.value)}
                  placeholder="Describe your technical background, specific expertise, past projects, equipment used, and service standards..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F5233] text-sm"
                />
                <p className="text-[11px] text-[#1F2A1E]/50 mt-1">
                  Minimum 20 characters. Generic placeholder words like 'test' or 'lorem ipsum' are strictly rejected by the backend validation layer.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: IDENTITY & KYC */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#7A9E6E] uppercase tracking-wider">Step 2 of 6</span>
                <h2 className="font-serif-display text-2xl font-bold text-[#1F2A1E] mt-1">
                  Government Identity & KYC Documents
                </h2>
                <p className="text-xs text-[#1F2A1E]/60 mt-1">
                  Required under platform trust & safety guidelines. Documents will undergo automated OCR and manual administrative review.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#2F5233]/15 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2F5233]">
                  <ShieldCheck className="w-4 h-4" /> 1. Aadhaar Card Verification
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#1F2A1E] mb-1">Aadhaar Number *</label>
                    <input
                      type="text"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                      placeholder="e.g. 4499-1234-5678"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#2F5233]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1F2A1E] mb-1">Aadhaar Document URL *</label>
                    <input
                      type="text"
                      value={aadhaarDocUrl}
                      onChange={(e) => setAadhaarDocUrl(e.target.value)}
                      placeholder="https://storage.smartserve.dev/kyc/aadhaar.pdf"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#2F5233]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#2F5233]/15 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2F5233]">
                  <ShieldCheck className="w-4 h-4" /> 2. Permanent Account Number (PAN) Card
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#1F2A1E] mb-1">PAN Number *</label>
                    <input
                      type="text"
                      maxLength={10}
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      placeholder="e.g. ABCDE1234F"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#2F5233] uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1F2A1E] mb-1">PAN Document URL *</label>
                    <input
                      type="text"
                      value={panDocUrl}
                      onChange={(e) => setPanDocUrl(e.target.value)}
                      placeholder="https://storage.smartserve.dev/kyc/pan.pdf"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#2F5233]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-2">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <span>All documents are encrypted at rest and accessible exclusively by authorized SmartServe verification officers.</span>
              </div>
            </div>
          )}

          {/* STEP 3: NDA & UNDERTAKING */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#7A9E6E] uppercase tracking-wider">Step 3 of 6</span>
                <h2 className="font-serif-display text-2xl font-bold text-[#1F2A1E] mt-1">
                  Partner NDA & Code of Conduct Undertaking
                </h2>
                <p className="text-xs text-[#1F2A1E]/60 mt-1">
                  Uploading a file ≠ verified. Both document upload and signed contractual affirmation are mandatory.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#2F5233]/15 text-xs text-[#1F2A1E]/80 space-y-3 leading-relaxed max-h-48 overflow-y-auto">
                <h4 className="font-bold text-[#2F5233]">Platform Service Agreement Summary:</h4>
                <p>
                  1. <strong>Confidentiality:</strong> Partner agrees to maintain strict confidentiality regarding customer premises, personal details, contact numbers, and internal service rates.
                </p>
                <p>
                  2. <strong>Direct Solicitation Prohibition:</strong> Service partners must not solicit off-platform bookings from customers discovered through the SmartServe marketplace.
                </p>
                <p>
                  3. <strong>Quality & Safety Guarantee:</strong> All services must be executed adhering to industry safety codes, genuine replacement components, and professional etiquette.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Signed Undertaking Document URL *</label>
                <input
                  type="text"
                  value={undertakingDocUrl}
                  onChange={(e) => setUndertakingDocUrl(e.target.value)}
                  placeholder="https://storage.smartserve.dev/nda/signed-undertaking.pdf"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2F5233]"
                />
              </div>

              <label className="flex items-start gap-3 p-4 rounded-xl border border-[#2F5233]/20 bg-white cursor-pointer hover:bg-[#FAF7F0]/60 transition-colors">
                <input
                  type="checkbox"
                  checked={ndaSigned}
                  onChange={(e) => setNdaSigned(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#2F5233] focus:ring-[#2F5233]"
                />
                <span className="text-xs text-[#1F2A1E] leading-relaxed">
                  I solemnly affirm that I have read, signed, and unconditionally accept the SmartServe Service Partner Non-Disclosure Agreement and Code of Conduct Undertaking.
                </span>
              </label>
            </div>
          )}

          {/* STEP 4: SERVICE SELECTION */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#7A9E6E] uppercase tracking-wider">Step 4 of 6</span>
                <h2 className="font-serif-display text-2xl font-bold text-[#1F2A1E] mt-1">
                  Service Selection (Admin Master Catalog)
                </h2>
                <p className="text-xs text-[#1F2A1E]/60 mt-1">
                  Choose up to 3 services strictly from the existing Admin catalog. Providers cannot create, rename, or price new services.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Select Primary Category *</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#2F5233]"
                >
                  {categoryList.map((cat) => (
                    <option key={cat.category} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#1F2A1E]">
                    Choose 1 to 3 Services ({selectedServiceIds.length} / 3 selected) *
                  </label>
                  <span className="text-[11px] text-[#7A9E6E] font-medium">Pulled from Authentic Catalog</span>
                </div>

                {loadingServices ? (
                  <div className="text-center py-10 text-xs text-[#1F2A1E]/50">Loading master catalog services...</div>
                ) : catalogServices.length === 0 ? (
                  <div className="text-center py-10 text-xs text-[#1F2A1E]/50">No services found for this category.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                    {catalogServices.map((svc) => {
                      const isSelected = selectedServiceIds.includes(svc.id);
                      return (
                        <div
                          key={svc.id}
                          onClick={() => handleToggleService(svc.id)}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-2 ${
                            isSelected
                              ? 'bg-[#2F5233]/5 border-[#2F5233] ring-1 ring-[#2F5233]'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-[#1F2A1E]">{svc.name}</div>
                            <div className="text-[11px] text-[#1F2A1E]/50">{svc.subcategory}</div>
                            <div className="text-xs font-semibold text-[#2F5233] mt-1">₹{svc.base_price}</div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                              isSelected ? 'bg-[#2F5233] border-[#2F5233] text-white' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: CATEGORY-AWARE SKILL EVIDENCE */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#7A9E6E] uppercase tracking-wider">Step 5 of 6</span>
                <h2 className="font-serif-display text-2xl font-bold text-[#1F2A1E] mt-1">
                  Category-Aware Skill Evidence
                </h2>
                <p className="text-xs text-[#1F2A1E]/60 mt-1">
                  The evidence required depends strictly on your category: <strong className="text-[#2F5233]">{selectedCategory}</strong>.
                  Never reused across categories.
                </p>
              </div>

              {currentReq && (
                <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#2F5233]/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2F5233]">
                    <Award className="w-4 h-4 text-[#C9A15A]" /> Mandatory Evidence Type:
                  </div>
                  <div className="text-sm font-bold text-[#1F2A1E]">{currentReq.required_evidence_type}</div>
                  <p className="text-xs text-[#1F2A1E]/70 leading-relaxed">{currentReq.description}</p>
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-[#1F2A1E]/60 uppercase tracking-wider">Accepted Credentials:</span>
                    <ul className="mt-1 space-y-1">
                      {currentReq.document_types_accepted.map((doc, idx) => (
                        <li key={idx} className="text-xs text-[#2F5233] flex items-center gap-1.5 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#7A9E6E]" /> {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Evidence Credential Title *</label>
                <input
                  type="text"
                  value={evidenceType}
                  onChange={(e) => setEvidenceType(e.target.value)}
                  placeholder="e.g. Electrical License Grade A or Salon Experience Certificate"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2F5233]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Evidence Document / Video / Portfolio URL *</label>
                <input
                  type="text"
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  placeholder="https://storage.smartserve.dev/evidence/trade-credential.pdf"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2F5233]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Credential Details & Verification Context</label>
                <textarea
                  rows={3}
                  value={evidenceDescription}
                  onChange={(e) => setEvidenceDescription(e.target.value)}
                  placeholder="Issuing authority, license number, registration date, or video link explanation..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#2F5233]"
                />
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW & SUBMIT */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#7A9E6E] uppercase tracking-wider">Step 6 of 6</span>
                <h2 className="font-serif-display text-2xl font-bold text-[#1F2A1E] mt-1">
                  Review & Submit Application
                </h2>
                <p className="text-xs text-[#1F2A1E]/60 mt-1">
                  Carefully verify your submission. Upon submission, your account will enter <strong className="text-[#C9A15A]">Pending</strong> status awaiting administrative approval.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Info Summary */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#2F5233]/15 space-y-1.5 text-xs">
                  <h4 className="font-bold text-[#2F5233] uppercase text-[11px] tracking-wider mb-2">1. Personal Info</h4>
                  <div><strong className="text-[#1F2A1E]/60">Name:</strong> {fullName}</div>
                  <div><strong className="text-[#1F2A1E]/60">Email:</strong> {email}</div>
                  <div><strong className="text-[#1F2A1E]/60">Phone:</strong> {phone}</div>
                  <div><strong className="text-[#1F2A1E]/60">Experience:</strong> {experienceYears} years</div>
                  <div><strong className="text-[#1F2A1E]/60">Area:</strong> {serviceArea}</div>
                  <div className="mt-2 text-[11px] text-[#1F2A1E]/80 italic line-clamp-2">"{skillsDesc}"</div>
                </div>

                {/* Identity & KYC Summary */}
                <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#2F5233]/15 space-y-1.5 text-xs">
                  <h4 className="font-bold text-[#2F5233] uppercase text-[11px] tracking-wider mb-2">2. Identity & Legal</h4>
                  <div><strong className="text-[#1F2A1E]/60">Aadhaar:</strong> {aadhaarNumber}</div>
                  <div><strong className="text-[#1F2A1E]/60">PAN:</strong> {panNumber}</div>
                  <div><strong className="text-[#1F2A1E]/60">NDA Status:</strong> {ndaSigned ? 'Signed & Attached' : 'Unsigned'}</div>
                </div>
              </div>

              {/* Service Selection Summary */}
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#2F5233]/15 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#2F5233] uppercase text-[11px] tracking-wider">3. Selected Catalog Services</h4>
                  <span className="text-[11px] font-semibold text-[#7A9E6E]">{selectedCategory}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {catalogServices
                    .filter((s) => selectedServiceIds.includes(s.id))
                    .map((s) => (
                      <div key={s.id} className="bg-white p-2.5 rounded-xl border border-[#2F5233]/10">
                        <div className="font-bold text-[#1F2A1E] text-xs truncate">{s.name}</div>
                        <div className="text-[#2F5233] font-semibold text-[11px] mt-0.5">₹{s.base_price}</div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Skill Evidence Summary */}
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#2F5233]/15 text-xs space-y-1.5">
                <h4 className="font-bold text-[#2F5233] uppercase text-[11px] tracking-wider mb-1">4. Category Skill Evidence</h4>
                <div><strong className="text-[#1F2A1E]/60">Type:</strong> {evidenceType}</div>
                <div><strong className="text-[#1F2A1E]/60">Document URL:</strong> <span className="font-mono truncate">{evidenceUrl}</span></div>
                {evidenceDescription && <div><strong className="text-[#1F2A1E]/60">Notes:</strong> {evidenceDescription}</div>}
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All documents will be cataloged with PENDING review flags in the authoritative PostgreSQL database.</span>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-[#1F2A1E] text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-[#2F5233] hover:bg-[#3D6B42] text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 rounded-full bg-[#2F5233] hover:bg-[#3D6B42] disabled:opacity-50 text-white text-sm font-semibold transition-all shadow-md shadow-[#2F5233]/20 flex items-center gap-2"
              >
                {loading ? 'Submitting Application...' : 'Submit Onboarding Application'}
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
