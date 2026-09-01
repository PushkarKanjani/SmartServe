import { FC } from 'react';
import { Button } from '../ui/Button';
import { formatCurrencyINR } from '../../utils/formatters';
import { ArrowRight } from 'lucide-react';

export interface StickyBookingBarProps {
  totalPrice: number;
  onBook: () => void;
  selectedAddonCount?: number;
}

export const StickyBookingBar: FC<StickyBookingBarProps> = ({
  totalPrice,
  onBook,
  selectedAddonCount = 0,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md p-4 sm:px-8 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-500 font-medium">
            Total Price {selectedAddonCount > 0 && `(incl. ${selectedAddonCount} add-on${selectedAddonCount > 1 ? 's' : ''})`}
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-[#2563EB]">
            {formatCurrencyINR(totalPrice)}
          </p>
        </div>

        <Button
          onClick={onBook}
          variant="primary"
          size="lg"
          icon={<ArrowRight className="h-5 w-5" />}
          className="shadow-md"
        >
          Continue to Book
        </Button>
      </div>
    </div>
  );
};
