import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatCurrencyINR } from '../../utils/formatters';
import { CalendarCheck, ChevronRight, Clock } from 'lucide-react';

export interface RecentBookingMock {
  id: string;
  service_name: string;
  category: string;
  scheduled_time: string;
  status: 'Requested' | 'Assigned' | 'Accepted' | 'Started' | 'Completed' | 'Cancelled';
  total_price: number;
}

export interface RecentBookingStripProps {
  bookings?: RecentBookingMock[];
}

export const RecentBookingStrip: FC<RecentBookingStripProps> = ({ bookings = [] }) => {
  const sampleBookings: RecentBookingMock[] = bookings.length > 0 ? bookings : [
    {
      id: 'bk-1001',
      service_name: 'Split AC Foam Jet Deep Service',
      category: 'AC Repair',
      scheduled_time: 'Today, 4:00 PM',
      status: 'Assigned',
      total_price: 699,
    },
  ];

  const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
    Requested: 'warning',
    Assigned: 'info',
    Accepted: 'info',
    Started: 'info',
    Completed: 'success',
    Cancelled: 'danger',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Recent Booking Activity</h2>
        <Link
          to="/bookings"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition"
        >
          View All Bookings <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sampleBookings.slice(0, 2).map((b) => (
          <Link key={b.id} to={`/bookings/${b.id}`}>
            <Card hoverable className="flex items-center justify-between">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] shrink-0 border border-blue-100">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{b.service_name}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{b.scheduled_time}</span>
                  </div>
                  <Badge variant={statusVariants[b.status] || 'neutral'} size="sm">
                    {b.status}
                  </Badge>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-extrabold text-[#2563EB]">
                  {formatCurrencyINR(b.total_price)}
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400 ml-auto mt-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
