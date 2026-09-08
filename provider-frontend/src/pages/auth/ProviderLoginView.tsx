import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProviderLoginView: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Invalid email or password. Please verify your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#2F5233]/15">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#2F5233] text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md mb-3">
            S
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-[#1F2A1E]">Partner Workspace</h2>
          <p className="text-xs text-[#1F2A1E]/60 mt-1">Sign in to manage your services, schedule, and jobs</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Partner Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. amit.kumar@smartserve.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F5233] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1F2A1E] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2F5233] text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-full bg-[#2F5233] hover:bg-[#3D6B42] text-white text-sm font-semibold transition-all shadow-md shadow-[#2F5233]/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In to Workspace'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-[#1F2A1E]/70">
            Want to become a service partner?{' '}
            <Link to="/onboarding" className="font-semibold text-[#2F5233] hover:underline">
              Start Onboarding
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
