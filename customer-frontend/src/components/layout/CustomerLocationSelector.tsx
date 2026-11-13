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
  const { formattedDisplay, setIsModalOpen, location, locationStatus } = useCustomerLocation();

  const getStatusBadge = () => {
    switch (locationStatus) {
      case 'live':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live GPS
          </span>
        );
      case 'insecure':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            HTTP LAN
          </span>
        );
      case 'denied':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Denied
          </span>
        );
      case 'detecting':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            Detecting...
          </span>
        );
      case 'manual':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#1F2A1E]/60 bg-[#E5DEC9]/50 px-1.5 py-0.5 rounded-full">
            Manual
          </span>
        );
    }
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F2EDE1]/80 hover:bg-[#E5DEC9] border border-[#E5DEC9] rounded-xl text-xs font-semibold text-[#1F2A1E] transition-all cursor-pointer max-w-[170px]"
        title={location?.address || formattedDisplay}
        aria-label="Select location"
      >
        <MapPin className="w-3.5 h-3.5 text-[#2F5233] shrink-0" />
        <span className="truncate">{formattedDisplay}</span>
        {locationStatus === 'live' && (
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" title="Live GPS active" />
        )}
      </button>
    );
  }

  if (variant === 'drawer') {
    return (
      <div className="p-3 bg-[#F2EDE1] border border-[#E5DEC9] rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F2A1E]/60">
              {t('location.service_location', { defaultValue: 'Service Location' })}
            </span>
            {getStatusBadge()}
          </div>
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
      className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#F2EDE1]/70 hover:bg-[#F2EDE1] hover:border-[#2F5233]/40 border border-[#E5DEC9] rounded-xl text-xs font-medium text-[#1F2A1E] transition-all cursor-pointer max-w-[210px] lg:max-w-[240px] shrink-0"
      title={location?.address || formattedDisplay}
      aria-label="Select delivery location"
    >
      <div className="w-5 h-5 rounded-md bg-[#2F5233]/10 flex items-center justify-center shrink-0 relative">
        <MapPin className="w-3.5 h-3.5 text-[#2F5233]" />
        {locationStatus === 'live' && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-white" />
        )}
      </div>
      <div className="text-left truncate">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] uppercase font-bold text-[#1F2A1E]/50 block leading-tight">
            {t('location.delivering_to', { defaultValue: 'Deliver To' })}
          </span>
          {getStatusBadge()}
        </div>
        <span className="text-xs font-bold text-[#1F2A1E] block truncate leading-tight">
          {formattedDisplay}
        </span>
      </div>
      <ChevronDown className="w-3.5 h-3.5 text-[#1F2A1E]/40 shrink-0 ml-auto" />
    </button>
  );
};
