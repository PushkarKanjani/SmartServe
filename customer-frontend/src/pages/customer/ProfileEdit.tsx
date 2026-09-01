import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerProfile, updateCustomerProfile, CustomerProfile } from '../../api/customer';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { validateEmail, validatePhone } from '../../utils/validators';
import { useToast } from '../../hooks/useToast';
import { ArrowLeft, User, Mail, Phone, AlertCircle } from 'lucide-react';

export const ProfileEdit: FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getCustomerProfile();
        setProfile(data);
        setFullName(data.full_name);
        setEmail(data.email);
        setPhone(data.phone || '');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading || !profile) {
    return (
      <div className="max-w-xl mx-auto space-y-6 animate-pulse pb-16">
        <Skeleton variant="text" width="40%" height={32} />
        <Skeleton variant="rectangular" height={300} className="rounded-2xl" />
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFullNameError('');
    setEmailError('');
    setPhoneError('');

    let hasError = false;
    if (fullName.trim().length < 2) {
      setFullNameError('Please enter your full name.');
      hasError = true;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid RFC email address.');
      hasError = true;
    }
    if (phone && !validatePhone(phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number or +91 format.');
      hasError = true;
    }

    if (hasError) return;

    // Optimistic update
    const previousProfile = { ...profile };
    const optimistic: CustomerProfile = {
      ...profile,
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
    };
    setProfile(optimistic);

    setSubmitting(true);
    try {
      await updateCustomerProfile({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
      });
      showToast('Profile updated successfully!', 'success');
      navigate('/profile');
    } catch {
      // Revert optimistic update
      setProfile(previousProfile);
      showToast('Failed to update profile. Changes reverted.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-16">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/profile')}
          className="rounded-full p-2 text-slate-600 hover:bg-slate-100 transition"
          aria-label="Back to profile"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Edit Personal Profile</h1>
          <p className="text-sm text-slate-500">Update your account name, email, and mobile number</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
        <Input
          label="Full Name"
          placeholder="e.g. Pushkar Kanjani"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={fullNameError}
          leftIcon={<User className="h-4 w-4" />}
        />

        <div className="space-y-1.5">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Changing your primary email will send a re-verification link to the new inbox.</span>
          </div>
        </div>

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={phoneError}
          leftIcon={<Phone className="h-4 w-4" />}
          hint="Used by technicians to contact you prior to scheduled appointments."
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button type="button" variant="secondary" onClick={() => navigate('/profile')} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={submitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
