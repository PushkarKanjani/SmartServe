import { FC } from 'react';
import { BookingStatus, getBookingStatusConfig } from '../../utils/bookingStatus';
import { Badge } from '../ui/Badge';
import { Clock, CheckCircle2, AlertCircle, Play, UserCheck, XCircle } from 'lucide-react';

export interface StatusBadgeProps {
  status: BookingStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = getBookingStatusConfig(status);

  const icons: Record<BookingStatus, JSX.Element> = {
    Requested: <Clock className="h-3 w-3" />,
    Assigned: <UserCheck className="h-3 w-3" />,
    Accepted: <UserCheck className="h-3 w-3" />,
    Started: <Play className="h-3 w-3 fill-current" />,
    Completed: <CheckCircle2 className="h-3 w-3" />,
    Cancelled: <XCircle className="h-3 w-3" />,
    Rejected: <AlertCircle className="h-3 w-3" />,
    Expired: <Clock className="h-3 w-3" />,
  };

  return (
    <Badge variant={config.variant} size={size} icon={icons[status]}>
      {config.label}
    </Badge>
  );
};
