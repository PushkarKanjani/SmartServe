import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveSessions, revokeSession, revokeAllOtherSessions, UserSession } from '../../api/sessions';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { validatePassword } from '../../utils/validators';
import { useToast } from '../../hooks/useToast';
import { ArrowLeft, Lock, Laptop, Smartphone, LogOut, CheckCircle2 } from 'lucide-react';

export const ProfileSecurity: FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPwdError, setCurrentPwdError] = useState('');
  const [newPwdError, setNewPwdError] = useState('');
  const [confirmPwdError, setConfirmPwdError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Sessions state
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [revokeLoading, setRevokeLoading] = useState(false);

  const fetchSessions = async () => {
    setSessionsLoading(true);
    try {
      const data = await getActiveSessions();
      setSessions(data);
    } finally {
      setSessionsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Password strength logic
  const getPasswordStrength = (pwd: string): { label: string; score: number; color: string } => {
    if (!pwd) return { label: 'None', score: 0, color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { label: 'Weak', score: 1, color: 'bg-rose-500' };
    if (score === 2 || score === 3) return { label: 'Medium', score: 2, color: 'bg-amber-500' };
    return { label: 'Strong', score: 3, color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(newPassword);

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCurrentPwdError('');
    setNewPwdError('');
    setConfirmPwdError('');

    let hasError = false;
    if (!currentPassword) {
      setCurrentPwdError('Current password is required.');
      hasError = true;
    }

    const pwdCheck = validatePassword(newPassword);
    if (!pwdCheck.valid) {
      setNewPwdError(pwdCheck.error || 'Invalid new password.');
      hasError = true;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPwdError('Passwords do not match.');
      hasError = true;
    }

    if (hasError) return;

    setPasswordLoading(true);
    try {
      // Simulate endpoint call
      await new Promise((res) => setTimeout(res, 800));
      showToast('Password changed successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      showToast('Failed to change password', 'error');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleRevokeSingle = async (id: string) => {
    setRevokeLoading(true);
    try {
      await revokeSession(id);
      showToast('Session revoked', 'info');
      await fetchSessions();
    } catch {
      showToast('Failed to revoke session', 'error');
    } finally {
      setRevokeLoading(false);
    }
  };

  const handleRevokeAllOthers = async () => {
    setRevokeLoading(true);
    try {
      await revokeAllOtherSessions();
      showToast('Signed out of all other devices', 'success');
      await fetchSessions();
    } catch {
      showToast('Failed to revoke other sessions', 'error');
    } finally {
      setRevokeLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/profile')}
          className="rounded-full p-2 text-slate-600 hover:bg-slate-100 transition"
          aria-label="Back to profile"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Security & Active Sessions</h1>
          <p className="text-sm text-slate-500">Update password and manage devices logged into your account</p>
        </div>
      </div>

      {/* Section 1: Change Password */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Change Password</h2>

        <form onSubmit={handlePasswordSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={currentPwdError}
            leftIcon={<Lock className="h-4 w-4" />}
          />

          <div className="space-y-2">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={newPwdError}
              leftIcon={<Lock className="h-4 w-4" />}
            />

            {/* Password Strength Meter */}
            {newPassword && (
              <div className="space-y-1 pt-1 animate-fade-in">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Strength: {strength.label}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                  <div className={`h-full flex-1 transition-all ${strength.score >= 1 ? strength.color : 'bg-slate-200'}`} />
                  <div className={`h-full flex-1 transition-all ${strength.score >= 2 ? strength.color : 'bg-slate-200'}`} />
                  <div className={`h-full flex-1 transition-all ${strength.score >= 3 ? strength.color : 'bg-slate-200'}`} />
                </div>
              </div>
            )}
          </div>

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPwdError}
            leftIcon={<Lock className="h-4 w-4" />}
          />

          <div className="pt-2">
            <Button type="submit" variant="primary" loading={passwordLoading}>
              Update Password
            </Button>
          </div>
        </form>
      </section>

      {/* Section 2: Active Sessions */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Active Login Sessions</h2>
            <p className="text-xs text-slate-500">Devices currently authenticated with your customer token</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRevokeAllOthers}
            loading={revokeLoading}
            className="text-rose-600 hover:bg-rose-50"
          >
            Sign out of all other devices
          </Button>
        </div>

        {sessionsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={80} className="rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((sess) => (
              <Card key={sess.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shrink-0">
                    {sess.device_name.toLowerCase().includes('phone') ? (
                      <Smartphone className="h-5 w-5" />
                    ) : (
                      <Laptop className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{sess.device_name}</h3>
                      {sess.is_current && (
                        <Badge variant="success" size="sm" icon={<CheckCircle2 className="h-3 w-3" />}>
                          This Device
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {sess.browser} · {sess.ip_address}
                    </p>
                    <p className="text-[11px] text-slate-400">Last active: {sess.last_active}</p>
                  </div>
                </div>

                {!sess.is_current && (
                  <Button
                    variant="ghost"
                    size="sm"
                    loading={revokeLoading}
                    icon={<LogOut className="h-4 w-4 text-rose-500" />}
                    onClick={() => handleRevokeSingle(sess.id)}
                  >
                    Revoke
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfileSecurity;
