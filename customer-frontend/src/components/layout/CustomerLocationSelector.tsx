import React from 'react';
import { useCustomerLocation } from '../../context/LocationContext';
import { MapPin, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CustomerLocationSelectorProps {
  variant?: 'navbar' | 'compact' | 'drawer';
}

export const CustomerLocationSelector: React.FC<CustomerLocationSelectorProps> = ({
  variant = 'navbar',
}) => {
  const { t } = useTranslation();
  const { formattedDisplay, setIsModalOpen, location } = useCustomerLocation();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F2EDE1]/80 hover:bg-[#E5DEC9] border border-[#E5DEC9] rounded-xl text-xs font-semibold text-[#1F2A1E] transition-all cursor-pointer max-w-[140px]"
        title={location?.address || formattedDisplay}
        aria-label="Select location"
      >
        <MapPin className="w-3.5 h-3.5 text-[#2F5233] shrink-0" />
        <span className="truncate">{formattedDisplay}</span>
      </button>
    );
  }

  if (variant === 'drawer') {
    return (
      <div className="p-3 bg-[#F2EDE1] border border-[#E5DEC9] rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F2A1E]/60">
            {t('location.service_location', { defaultValue: 'Service Location' })}
          </span>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-bold text-[#2F5233] hover:underline cursor-pointer"
          >
            {t('common.change', { defaultValue: 'Change' })}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#2F5233] text-white flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#C9A15A]" />
          </div>
          <div className="truncate">
            <span className="text-xs font-bold text-[#1F2A1E] block truncate">
              {formattedDisplay}
            </span>
            {location?.address && location.address !== formattedDisplay && (
              <span className="text-[10px] text-[#1F2A1E]/50 block truncate">
                {location.address}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default Navbar pill beside search bar
  return (
    <button
      type="button"
      onClick={() => setIsModalOpen(true)}
      className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#F2EDE1]/70 hover:bg-[#F2EDE1] hover:border-[#2F5233]/40 border border-[#E5DEC9] rounded-xl text-xs font-medium text-[#1F2A1E] transition-all cursor-pointer max-w-[190px] lg:max-w-[220px] shrink-0"
      title={location?.address || formattedDisplay}
      aria-label="Select delivery location"
    >
      <div className="w-5 h-5 rounded-md bg-[#2F5233]/10 flex items-center justify-center shrink-0">
        <MapPin className="w-3.5 h-3.5 text-[#2F5233]" />
      </div>
      <div className="text-left truncate">
        <span className="text-[9px] uppercase font-bold text-[#1F2A1E]/50 block leading-tight">
          {t('location.delivering_to', { defaultValue: 'Deliver To' })}
        </span>
        <span className="text-xs font-bold text-[#1F2A1E] block truncate leading-tight">
          {formattedDisplay}
        </span>
      </div>
      <ChevronDown className="w-3.5 h-3.5 text-[#1F2A1E]/40 shrink-0 ml-auto" />
    </button>
  );
};
