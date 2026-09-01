import { FC, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { validateEmail } from '../../utils/validators';
import { useToast } from '../../hooks/useToast';
import { Mail, Lock } from 'lucide-react';

export const CustomerLogin: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    let hasError = false;
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      await login({ email, password });
      showToast('Welcome back!', 'success');
      navigate('/home', { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setGeneralError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900">Sign in to your account</h3>
        <p className="mt-1 text-sm text-slate-500">Access your home service bookings and support</p>
      </div>

      {generalError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-700 font-medium animate-fade-in">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          leftIcon={<Mail className="h-4 w-4" />}
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          leftIcon={<Lock className="h-4 w-4" />}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
            />
            <span className="text-sm font-medium text-slate-600">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" fullWidth loading={loading} className="mt-2">
          Sign In
        </Button>
      </form>

      <div className="border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-[#2563EB] hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
};

export default CustomerLogin;
