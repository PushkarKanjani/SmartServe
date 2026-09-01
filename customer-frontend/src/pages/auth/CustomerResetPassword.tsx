import { FC, FormEvent, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../api/auth';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { validatePassword } from '../../utils/validators';
import { useToast } from '../../hooks/useToast';
import { Lock, CheckCircle2, ArrowLeft } from 'lucide-react';

export const CustomerResetPassword: FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setConfirmPasswordError('');

    const pwdCheck = validatePassword(password);
    if (!pwdCheck.valid) {
      setPasswordError(pwdCheck.error || 'Invalid password.');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      showToast('Password updated successfully!', 'success');
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Password reset failed. Link may have expired.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">Password Reset Complete</h3>
        <p className="text-sm text-slate-600">Your password has been successfully updated. You can now sign in with your new password.</p>
        <div className="pt-4">
          <Button variant="primary" fullWidth onClick={() => navigate('/login')}>
            Sign In Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900">Set new password</h3>
        <p className="mt-1 text-sm text-slate-500">Must be at least 8 characters with 1 uppercase & 1 number</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          leftIcon={<Lock className="h-4 w-4" />}
        />

        <Input
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          leftIcon={<Lock className="h-4 w-4" />}
        />

        <Button type="submit" variant="primary" fullWidth loading={loading}>
          Reset Password
        </Button>
      </form>

      <div className="border-t border-slate-100 pt-5 text-center">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default CustomerResetPassword;
