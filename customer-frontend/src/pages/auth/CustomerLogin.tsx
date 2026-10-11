import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Loader2, AlertCircle, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../auth/useAuth';
import { useToast } from '../../hooks/useToast';
import { CustomerLoginVideoCarousel } from '../../components/auth/CustomerLoginVideoCarousel';
import { initiateOAuth } from '../../api/auth';

export const CustomerLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('CustomerPassword123!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'apple' | 'github' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);
  const [is2FaRequired, setIs2FaRequired] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    if (is2FaRequired && !twoFactorCode.trim()) {
      setErrorMessage(isRecoveryMode ? 'Please enter your recovery code.' : 'Please enter your 6-digit authenticator code.');
      return;
    }

    setLoading(true);
    try {
      await login({
        email: email.trim(),
        password,
        ...(is2FaRequired && !isRecoveryMode ? { totp_code: twoFactorCode.trim() } : {}),
        ...(is2FaRequired && isRecoveryMode ? { recovery_code: twoFactorCode.trim() } : {}),
      });
      showToast('Welcome back to SmartServe!', 'success');
      navigate('/home', { replace: true });
    } catch (err: any) {
      if (err.response) {
        const is2FaHeader = err.response.headers?.['x-2fa-required'] === 'true';
        const detail = err.response.data?.detail || '';
        const is2FaDetail = typeof detail === 'string' && (detail.includes('Two-factor') || detail.includes('2FA'));

        if (err.response.status === 401 && (is2FaHeader || is2FaDetail) && !is2FaRequired) {
          setIs2FaRequired(true);
          setErrorMessage(null);
          return;
        }

        if (err.response.status === 401) {
          if (is2FaRequired) {
            setErrorMessage(detail || 'Invalid two-factor authentication code.');
          } else {
            setErrorMessage('Invalid email or password. Please try again.');
          }
        } else {
          setErrorMessage(detail || 'Authentication failed. Please check your credentials.');
        }
      } else if (err.request) {
        setErrorMessage('Unable to connect to SmartServe API. Please verify backend server availability.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'github') => {
    setErrorMessage(null);
    setSocialLoading(provider);
    try {
      const res = await initiateOAuth(provider);
      if (res?.authorization_url) {
        window.location.href = res.authorization_url;
      } else {
        setErrorMessage(`Unable to initialize ${provider} login. Missing authorization URL.`);
      }
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setErrorMessage(err.response.data.detail);
      } else if (err.message) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(`Unable to initialize ${provider} authentication. Please try again.`);
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const handleForgotPassword = () => {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 5000);
  };

  return (
    <div className="w-screen min-h-screen lg:h-screen flex flex-col lg:flex-row bg-[#FAF7F0] font-sans text-[#1F2A1E] lg:overflow-hidden">
      
      {/* ══════════════════════════════════════════════════════════════════
          LEFT: COMPACT CINEMATIC VIDEO PANEL (Matching Admin Exactly)
          ══════════════════════════════════════════════════════════════════*/}
      <div className="w-full lg:w-[40%] xl:w-[42%] h-[240px] sm:h-[280px] lg:h-full flex-shrink-0">
        <CustomerLoginVideoCarousel />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          RIGHT: PRIMARY LOGIN PANEL (Matching Admin Design System)
          ══════════════════════════════════════════════════════════════════*/}
      <div className="w-full lg:w-[60%] xl:w-[58%] h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-20 bg-[#FAF7F0] overflow-y-auto">
        
        {/* Top spacer */}
        <div className="hidden lg:block h-4" />

        {/* ── Central Login Content ── */}
        <div className="w-full max-w-[400px] mx-auto my-auto py-4">
          
          {/* ── SmartServe Brand Identity ── */}
          <div className="mb-8">
            {/* Authentic SmartServe Logo Emblem + Wordmark */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl border border-[#E5DEC9] bg-[#FAF7F0] flex items-center justify-center shadow-xs p-1">
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
                  <span className="text-xl font-bold text-[#2F5233] tracking-tight">Smart</span>
                  <span className="text-xl font-bold text-[#C9A15A] tracking-tight ml-0.5">Serve</span>
                </div>
              </div>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2A1E] tracking-tight mb-1.5">
              {is2FaRequired ? 'Two-Factor Verification' : 'Customer Login'}
            </h1>
            <p className="text-sm text-[#1F2A1E]/60 font-medium">
              {is2FaRequired
                ? (isRecoveryMode
                    ? 'Enter your single-use backup recovery code.'
                    : 'Enter the 6-digit code from your authenticator app.')
                : 'Sign in to book and manage your home services.'}
            </p>
          </div>

          {/* ── Error Notification ── */}
          {errorMessage && (
            <div className="mb-5 flex items-start gap-3 p-3.5 bg-red-50 border border-red-200/80 rounded-xl text-red-800 text-xs sm:text-sm font-medium animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 mt-0.5" />
              <span className="flex-1">{errorMessage}</span>
            </div>
          )}

          {/* ── Forgot Password Notification ── */}
          {forgotSent && (
            <div className="mb-5 p-3.5 bg-[#F2EDE1] border border-[#C9A15A]/30 rounded-xl text-[#1F2A1E] text-xs sm:text-sm font-medium animate-in fade-in text-center">
              Password reset instructions sent to your registered email.
            </div>
          )}

          {/* ── Login Form ── */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!is2FaRequired ? (
              <>
                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-[18px] h-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1F2A1E]/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="customer@example.com"
                      className="w-full h-12 bg-white border border-[#E5DEC9] rounded-xl pl-11 pr-4 text-sm font-medium text-[#1F2A1E] placeholder-[#1F2A1E]/30 focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] transition-all"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs font-semibold text-[#2F5233] hover:text-[#3D6B42] hover:underline transition-colors cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-[18px] h-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1F2A1E]/30" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-12 bg-white border border-[#E5DEC9] rounded-xl pl-11 pr-11 text-sm font-medium text-[#1F2A1E] placeholder-[#1F2A1E]/30 focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] transition-all"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1F2A1E]/35 hover:text-[#1F2A1E]/70 focus:outline-none p-0.5 cursor-pointer transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 2FA Input Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider">
                      {isRecoveryMode ? 'Recovery Code' : '6-Digit TOTP Code'}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecoveryMode(!isRecoveryMode);
                        setTwoFactorCode('');
                        setErrorMessage(null);
                      }}
                      className="text-xs font-semibold text-[#2F5233] hover:text-[#3D6B42] hover:underline transition-colors cursor-pointer"
                    >
                      {isRecoveryMode ? 'Use Authenticator Code' : 'Use Recovery Code'}
                    </button>
                  </div>
                  <div className="relative">
                    {isRecoveryMode ? (
                      <KeyRound className="w-[18px] h-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1F2A1E]/30" />
                    ) : (
                      <ShieldCheck className="w-[18px] h-[18px] absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1F2A1E]/30" />
                    )}
                    <input
                      type="text"
                      autoFocus
                      maxLength={isRecoveryMode ? 20 : 6}
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      placeholder={isRecoveryMode ? 'XXXX-XXXX' : '123456'}
                      className="w-full h-12 bg-white border border-[#E5DEC9] rounded-xl pl-11 pr-4 text-base font-mono tracking-widest text-[#1F2A1E] placeholder-[#1F2A1E]/30 focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] transition-all"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIs2FaRequired(false);
                      setTwoFactorCode('');
                      setErrorMessage(null);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F2A1E]/60 hover:text-[#1F2A1E] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to credentials
                  </button>
                </div>
              </>
            )}

            {/* Login Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading || !!socialLoading}
                className="w-full h-12 flex items-center justify-center gap-2 bg-[#2F5233] hover:bg-[#3D6B42] active:bg-[#244227] text-white font-bold rounded-xl text-sm shadow-xs hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>{is2FaRequired ? 'Verify & Sign In' : 'Login to SmartServe'}</span>
                )}
              </button>
            </div>

            {/* ── Social Login Section (Only shown when not in 2FA verification mode) ── */}
            {!is2FaRequired && (
              <div className="pt-1">
                {/* Subtle "OR" Divider */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E5DEC9]" />
                  </div>
                  <span className="relative bg-[#FAF7F0] px-3 text-[11px] font-bold uppercase tracking-wider text-[#1F2A1E]/50">
                    Or continue with
                  </span>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-2.5">
                  {/* Continue with Google */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    disabled={loading || !!socialLoading}
                    aria-label="Continue with Google"
                    data-testid="social-login-google"
                    className="w-full h-11 flex items-center justify-center gap-3 bg-white hover:bg-[#FAF7F0] active:bg-[#F2EDE1] text-[#1F2A1E] font-semibold text-sm rounded-xl border border-[#E5DEC9] shadow-xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {socialLoading === 'google' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#1F2A1E]/60" />
                    ) : (
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    )}
                    <span>Continue with Google</span>
                  </button>

                  {/* Continue with Apple */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('apple')}
                    disabled={loading || !!socialLoading}
                    aria-label="Continue with Apple"
                    data-testid="social-login-apple"
                    className="w-full h-11 flex items-center justify-center gap-3 bg-white hover:bg-[#FAF7F0] active:bg-[#F2EDE1] text-[#1F2A1E] font-semibold text-sm rounded-xl border border-[#E5DEC9] shadow-xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {socialLoading === 'apple' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#1F2A1E]/60" />
                    ) : (
                      <svg className="w-4 h-4 flex-shrink-0 fill-current text-[#1F2A1E]" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.76 1.05-1.81.93-2.87-1 .04-2.17.67-2.84 1.45-.58.67-1.09 1.74-.95 2.78 1.11.09 2.23-.58 2.86-1.36z" />
                      </svg>
                    )}
                    <span>Continue with Apple</span>
                  </button>

                  {/* Continue with GitHub */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('github')}
                    disabled={loading || !!socialLoading}
                    aria-label="Continue with GitHub"
                    data-testid="social-login-github"
                    className="w-full h-11 flex items-center justify-center gap-3 bg-white hover:bg-[#FAF7F0] active:bg-[#F2EDE1] text-[#1F2A1E] font-semibold text-sm rounded-xl border border-[#E5DEC9] shadow-xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {socialLoading === 'github' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#1F2A1E]/60" />
                    ) : (
                      <svg className="w-4 h-4 flex-shrink-0 fill-current text-[#1F2A1E]" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    )}
                    <span>Continue with GitHub</span>
                  </button>
                </div>
              </div>
            )}

            {/* Sign Up Link */}
            <div className="text-center pt-2 text-xs text-[#1F2A1E]/70 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-[#2F5233] hover:text-[#3D6B42] hover:underline transition-colors">
                Create account (5 steps)
              </Link>
            </div>
          </form>

        </div>

        {/* ── Minimal Footer (Matching Admin) ── */}
        <div className="text-center pt-4 pb-1">
          <p className="text-[11px] font-medium text-[#1F2A1E]/40">
            SmartServe Marketplace · Verified Home & Urban Services
          </p>
        </div>

      </div>

    </div>
  );
};

export default CustomerLogin;
