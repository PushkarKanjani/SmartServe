import { FC, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { validateEmail, validatePhone, validatePassword } from '../../utils/validators';
import { useToast } from '../../hooks/useToast';
import { User, Mail, Phone, Lock } from 'lucide-react';

export const CustomerRegister: FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFullNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsError('');
    setGeneralError('');

    let hasError = false;
    if (fullName.trim().length < 2) {
      setFullNameError('Please enter your full name.');
      hasError = true;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }
    if (phone && !validatePhone(phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number or +91 format.');
      hasError = true;
    }

    const pwdCheck = validatePassword(password);
    if (!pwdCheck.valid) {
      setPasswordError(pwdCheck.error || 'Invalid password.');
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      hasError = true;
    }

    if (!termsAccepted) {
      setTermsError('You must agree to the Terms & Conditions.');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      await register({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        password,
      });
      showToast('Account created successfully!', 'success');
      navigate('/home', { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setGeneralError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900">Create your account</h3>
        <p className="mt-1 text-sm text-slate-500">Book professional home services in seconds</p>
      </div>

      {generalError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-700 font-medium animate-fade-in">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Aastha Sharma"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={fullNameError}
          leftIcon={<User className="h-4 w-4" />}
        />

        <Input
          label="Email address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          leftIcon={<Mail className="h-4 w-4" />}
        />

        <Input
          label="Phone Number (Optional)"
          type="tel"
          placeholder="+91 9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={phoneError}
          leftIcon={<Phone className="h-4 w-4" />}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Min 8 chars, 1 uppercase, 1 number"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          leftIcon={<Lock className="h-4 w-4" />}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          leftIcon={<Lock className="h-4 w-4" />}
        />

        <div className="space-y-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
            />
            <span className="text-xs text-slate-600 leading-normal">
              I agree to SmartServe's <span className="font-semibold text-slate-900">Terms of Service</span> and <span className="font-semibold text-slate-900">Privacy Policy</span>.
            </span>
          </label>
          {termsError && <p className="text-xs font-medium text-rose-600 animate-fade-in">{termsError}</p>}
        </div>

        <Button type="submit" variant="primary" fullWidth loading={loading} className="mt-2">
          Create Account
        </Button>
      </form>

      <div className="border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#2563EB] hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default CustomerRegister;
