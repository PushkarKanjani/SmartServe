import { FC } from 'react';
import { CustomerProfile } from '../../api/customer';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';

export interface ProfileHeaderProps {
  profile: CustomerProfile;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
      <Avatar name={profile.full_name} size="xl" className="shadow-sm" />

      <div className="space-y-2 flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
          <h2 className="text-2xl font-extrabold text-slate-900 truncate">{profile.full_name}</h2>
          <Badge variant="success" size="sm" icon={<ShieldCheck className="h-3.5 w-3.5" />}>
            Verified Customer
          </Badge>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-slate-400" />
            <span>{profile.email}</span>
          </div>
          {profile.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>{profile.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>Member since {profile.member_since}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
