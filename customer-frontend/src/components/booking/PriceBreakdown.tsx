import { FC } from 'react';
import { AddonSelection } from '../../api/bookings';
import { formatCurrencyINR } from '../../utils/formatters';

export interface PriceBreakdownProps {
  basePrice: number;
  addons?: AddonSelection[];
  taxes?: number;
}

export const PriceBreakdown: FC<PriceBreakdownProps> = ({
  basePrice,
  addons = [],
  taxes = 0,
}) => {
  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const total = basePrice + addonsTotal + taxes;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
      <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
        Payment Summary
      </h3>

      <div className="space-y-2 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Base Service Fee</span>
          <span className="font-semibold text-slate-900">{formatCurrencyINR(basePrice)}</span>
        </div>

        {addons.map((a) => (
          <div key={a.addon_id} className="flex items-center justify-between text-xs text-slate-500">
            <span>+ {a.name}</span>
            <span className="font-medium text-slate-800">{formatCurrencyINR(a.price)}</span>
          </div>
        ))}

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Taxes & Platform Fee</span>
          <span>{taxes === 0 ? 'FREE' : formatCurrencyINR(taxes)}</span>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
        <span className="text-base font-extrabold text-slate-900">Total Payable</span>
        <span className="text-xl font-extrabold text-[#2563EB]">
          {formatCurrencyINR(total)}
        </span>
      </div>

      <div className="rounded-xl bg-slate-50 p-2.5 text-center text-xs text-slate-500 font-medium">
        💵 Pay in Cash after service completion (COD)
      </div>
    </div>
  );
};
