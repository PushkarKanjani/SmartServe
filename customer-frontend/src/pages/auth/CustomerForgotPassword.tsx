import { FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/auth';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { validateEmail } from '../../utils/validators';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const CustomerForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setSubmitted(true);
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
        <h3 className="text-xl font-extrabold text-slate-900">Check your inbox</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          If an account exists for <span className="font-semibold text-slate-900">{email}</span>, we've sent password reset instructions to your email address.
        </p>
        <div className="pt-4">
          <Link to="/login">
            <Button variant="secondary" fullWidth icon={<ArrowLeft className="h-4 w-4" />}>
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900">Reset password</h3>
        <p className="mt-1 text-sm text-slate-500">Enter your email and we'll send you reset instructions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          leftIcon={<Mail className="h-4 w-4" />}
        />

        <Button type="submit" variant="primary" fullWidth loading={loading}>
          Send Reset Link
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

export default CustomerForgotPassword;
