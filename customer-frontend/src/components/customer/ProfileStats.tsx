import { FC } from 'react';
import { CustomerProfile } from '../../api/customer';
import { Card } from '../ui/Card';
import { Rating } from '../ui/Rating';
import { formatCurrencyINR } from '../../utils/formatters';
import { CalendarCheck, CheckCircle2, IndianRupee, Star } from 'lucide-react';

export interface ProfileStatsProps {
  profile: CustomerProfile;
}

export const ProfileStats: FC<ProfileStatsProps> = ({ profile }) => {
  const stats = [
    {
      label: 'Total Bookings',
      value: profile.total_bookings,
      icon: <CalendarCheck className="h-5 w-5 text-blue-600" />,
      bg: 'bg-blue-50',
    },
    {
      label: 'Completed Services',
      value: profile.completed_bookings,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
    },
    {
      label: 'Lifetime Spent',
      value: formatCurrencyINR(profile.total_spent),
      icon: <IndianRupee className="h-5 w-5 text-indigo-600" />,
      bg: 'bg-indigo-50',
    },
    {
      label: 'Avg Rating Given',
      value: (
        <div className="flex items-center gap-1 mt-1">
          <Rating value={profile.average_rating_given} size="sm" showValue />
        </div>
      ),
      icon: <Star className="h-5 w-5 text-amber-500 fill-amber-400" />,
      bg: 'bg-amber-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} padding="sm" className="flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.bg} shrink-0`}>
            {stat.icon}
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {stat.label}
            </span>
            <div className="text-lg font-extrabold text-slate-900 leading-snug">
              {stat.value}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
