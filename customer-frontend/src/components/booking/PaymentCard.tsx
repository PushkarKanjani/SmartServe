import { FC } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrencyINR } from '../../utils/formatters';
import { Banknote, CheckCircle2 } from 'lucide-react';

export interface PaymentCardProps {
  totalPrice: number;
  paymentStatus: 'Pending' | 'Completed';
  paymentMethod: 'COD';
  bookingStatus: string;
  onMarkPaid?: () => void;
  loading?: boolean;
}

export const PaymentCard: FC<PaymentCardProps> = ({
  totalPrice,
  paymentStatus,
  paymentMethod,
  bookingStatus,
  onMarkPaid,
  loading = false,
}) => {
  const isCompletedUnpaid = bookingStatus === 'Completed' && paymentStatus === 'Pending';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
            <Banknote className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Payment & Invoicing</h3>
            <p className="text-xs text-slate-500">Method: {paymentMethod} (Cash on Delivery)</p>
          </div>
        </div>

        <Badge variant={paymentStatus === 'Completed' ? 'success' : 'warning'}>
          {paymentStatus}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-600">Total Amount Payable</span>
        <span className="text-2xl font-extrabold text-[#2563EB]">
          {formatCurrencyINR(totalPrice)}
        </span>
      </div>

      {isCompletedUnpaid && onMarkPaid && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
          <p className="text-xs text-blue-900 leading-relaxed font-medium">
            Service has been marked completed by provider. Confirm if cash payment of{' '}
            <span className="font-extrabold">{formatCurrencyINR(totalPrice)}</span> was collected.
          </p>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            loading={loading}
            icon={<CheckCircle2 className="h-4 w-4" />}
            onClick={onMarkPaid}
          >
            Confirm Cash Payment Collected
          </Button>
        </div>
      )}
    </div>
  );
};
