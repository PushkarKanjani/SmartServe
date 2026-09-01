import { FC } from 'react';
import { AddonItem } from '../../api/catalog';
import { formatCurrencyINR } from '../../utils/formatters';

export interface AddonListProps {
  addons: AddonItem[];
  selectedAddonIds: string[];
  onToggleAddon: (addonId: string) => void;
}

export const AddonList: FC<AddonListProps> = ({ addons, selectedAddonIds, onToggleAddon }) => {
  if (addons.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
        No extra add-ons available for this service.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {addons.map((addon) => {
        const isSelected = selectedAddonIds.includes(addon.addon_id);
        return (
          <div
            key={addon.addon_id}
            onClick={() => onToggleAddon(addon.addon_id)}
            className={`flex items-center justify-between rounded-2xl border p-4 transition cursor-pointer select-none ${
              isSelected
                ? 'border-[#2563EB] bg-[#EFF6FF]/60 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => {}} // handled by parent div onClick
                className="mt-1 h-5 w-5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{addon.name}</h4>
                {addon.description && (
                  <p className="text-xs text-slate-500 mt-0.5">{addon.description}</p>
                )}
              </div>
            </div>

            <span className="text-sm font-extrabold text-[#2563EB] shrink-0 ml-4">
              + {formatCurrencyINR(addon.price)}
            </span>
          </div>
        );
      })}
    </div>
  );
};
