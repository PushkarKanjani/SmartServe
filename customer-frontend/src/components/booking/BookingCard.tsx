import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BookingItem } from '../../api/bookings';
import { StatusBadge } from './StatusBadge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrencyINR } from '../../utils/formatters';
import { Calendar, ChevronRight, UserCheck, KeyRound, Star } from 'lucide-react';

export interface BookingCardProps {
  booking: BookingItem;
  onCancelClick?: (booking: BookingItem) => void;
  onRateClick?: (booking: BookingItem) => void;
}

export const BookingCard: FC<BookingCardProps> = ({
  booking,
  onCancelClick,
  onRateClick,
}) => {
  const formattedDate = new Date(booking.scheduled_time).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <Card hoverable className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-500">Ref: {booking.booking_reference}</span>
          <StatusBadge status={booking.status} size="sm" />
        </div>
        <span className="text-xs text-slate-400 font-medium">Booked on {new Date(booking.created_at).toLocaleDateString('en-IN')}</span>
      </div>

      <div className="flex items-start gap-4">
        <img
          src={booking.service_image}
          alt={booking.service_name}
          className="h-20 w-20 rounded-xl object-cover border border-slate-200 shrink-0"
        />

        <div className="flex-1 min-w-0 space-y-1.5">
          <h3 className="text-base font-bold text-slate-900 line-clamp-1">{booking.service_name}</h3>
          
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <UserCheck className="h-3.5 w-3.5 text-slate-400" />
            <span>Provider: {booking.provider_name || 'Awaiting assignment'}</span>
          </div>

          {booking.status === 'Started' && booking.otp && (
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-extrabold text-amber-900">
              <KeyRound className="h-3.5 w-3.5 text-amber-600" />
              <span>Share OTP with Provider: {booking.otp}</span>
            </div>
          )}
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs text-slate-400 font-medium">Total</span>
          <p className="text-lg font-extrabold text-[#2563EB]">
            {formatCurrencyINR(booking.total_price)}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {booking.status === 'Requested' && onCancelClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCancelClick(booking)}
              className="text-rose-600 hover:bg-rose-50"
            >
              Cancel Booking
            </Button>
          )}

          {booking.status === 'Completed' && !booking.has_feedback && onRateClick && (
            <Button
              variant="primary"
              size="sm"
              icon={<Star className="h-3.5 w-3.5 fill-current" />}
              onClick={() => onRateClick(booking)}
            >
              Rate Service
            </Button>
          )}
        </div>

        <Link
          to={`/bookings/${booking.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition"
        >
          <span>View Details</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
};
