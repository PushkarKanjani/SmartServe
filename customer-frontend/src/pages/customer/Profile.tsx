import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCustomerProfile, CustomerProfile } from '../../api/customer';
import { useAuth } from '../../auth/useAuth';
import { ProfileHeader } from '../../components/customer/ProfileHeader';
import { ProfileStats } from '../../components/customer/ProfileStats';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { useToast } from '../../hooks/useToast';
import { User, Shield, CalendarCheck, LifeBuoy, ChevronRight, LogOut } from 'lucide-react';

export const Profile: FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getCustomerProfile();
        setProfile(data);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      showToast('Signed out successfully', 'info');
      navigate('/login', { replace: true });
    } catch {
      showToast('Failed to sign out', 'error');
    }
  };

  if (loading || !profile) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse pb-16">
        <Skeleton variant="rectangular" height={160} className="rounded-3xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={80} className="rounded-2xl" />
          ))}
        </div>
        <Skeleton variant="rectangular" height={220} className="rounded-2xl" />
      </div>
    );
  }

  const quickLinks = [
    { title: 'Edit Personal Details', path: '/profile/edit', description: 'Update name, email, and mobile number', icon: <User className="h-5 w-5 text-[#2563EB]" /> },
    { title: 'Security & Active Sessions', path: '/profile/security', description: 'Change password, manage active login devices', icon: <Shield className="h-5 w-5 text-emerald-600" /> },
    { title: 'My Bookings History', path: '/bookings', description: 'View active appointments & past service invoices', icon: <CalendarCheck className="h-5 w-5 text-indigo-600" /> },
    { title: 'Helpdesk & Support Tickets', path: '/support', description: 'Track support tickets and leave reviews', icon: <LifeBuoy className="h-5 w-5 text-amber-500" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Account & Profile</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your personal information, security settings, and preferences</p>
      </div>

      {/* Header Profile Card */}
      <ProfileHeader profile={profile} />

      {/* Stats Grid */}
      <ProfileStats profile={profile} />

      {/* Quick Settings Links */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Account Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Card hoverable className="flex items-center justify-between p-5 h-full">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 shrink-0">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{link.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{link.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 shrink-0 ml-2" />
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-6 border-t border-slate-200">
        <Button
          variant="danger"
          size="lg"
          fullWidth
          icon={<LogOut className="h-5 w-5" />}
          onClick={handleSignOut}
        >
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
};

export default Profile;
