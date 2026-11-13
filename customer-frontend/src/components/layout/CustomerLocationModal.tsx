import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerLocation } from '../../context/LocationContext';
import { 
  MapPin, 
  Navigation, 
  Loader2, 
  Check, 
  X, 
  AlertCircle,
  Building2
} from 'lucide-react';

interface QuickHub {
  city: string;
  state: string;
  label: string;
  lat: number;
  lng: number;
}

const POPULAR_HUBS: QuickHub[] = [
  { city: 'Noida', state: 'Uttar Pradesh', label: 'Noida & Delhi NCR', lat: 28.6280, lng: 77.3649 },
  { city: 'Ahmedabad', state: 'Gujarat', label: 'Ahmedabad, Gujarat', lat: 23.0258, lng: 72.5312 },
  { city: 'Mumbai', state: 'Maharashtra', label: 'Mumbai, Maharashtra', lat: 19.0760, lng: 72.8777 },
  { city: 'Bengaluru', state: 'Karnataka', label: 'Bengaluru, Karnataka', lat: 12.9716, lng: 77.5946 },
  { city: 'Pune', state: 'Maharashtra', label: 'Pune, Maharashtra', lat: 18.5204, lng: 73.8567 },
];

export const CustomerLocationModal: React.FC = () => {
  const { t } = useTranslation();
  const {
    location,
    isModalOpen,
    setIsModalOpen,
    detectGpsLocation,
    setManualLocation,
    isLoading,
    error,
    clearError,
  } = useCustomerLocation();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      setAddress(location?.address || '');
      setCity(location?.city || '');
      setPostalCode(location?.postal_code || '');
      setSuccessMessage(null);
      clearError();
    }
  }, [isModalOpen, location]);

  if (!isModalOpen) return null;

  const handleGpsDetect = async () => {
    setSuccessMessage(null);
    clearError();
    const res = await detectGpsLocation();
    if (res) {
      setAddress(res.address || '');
      setCity(res.city || '');
      setPostalCode(res.postal_code || '');
      setSuccessMessage(`Location detected: ${res.city || res.address}`);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 900);
    }
  };

  const handleQuickHubSelect = async (hub: QuickHub) => {
    setSuccessMessage(null);
    clearError();
    await setManualLocation({
      city: hub.city,
      state: hub.state,
      address: hub.label,
      latitude: hub.lat,
      longitude: hub.lng,
      source: 'quick_select',
    });
    setSuccessMessage(`Location set to ${hub.label}`);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 600);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() && !address.trim()) {
      return;
    }
    await setManualLocation({
      city: city.trim() || undefined,
      address: address.trim() || city.trim() || undefined,
      postal_code: postalCode.trim() || undefined,
      source: 'manual',
    });
    setSuccessMessage('Location saved successfully!');
    setTimeout(() => {
      setIsModalOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#FAF7F0] border border-[#E5DEC9] rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="location-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DEC9] bg-[#F2EDE1]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2F5233] text-white flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#C9A15A]" />
            </div>
            <div>
              <h3 id="location-modal-title" className="text-base font-bold text-[#1F2A1E]">
                {t('location.select_title', { defaultValue: 'Select Your Service Location' })}
              </h3>
              <p className="text-xs text-[#1F2A1E]/60">
                {t('location.select_subtitle', { defaultValue: 'Service availability & pricing adapt to your area' })}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 text-[#1F2A1E]/50 hover:text-[#1F2A1E] hover:bg-[#E5DEC9] rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Status Banners */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Quick Action: Browser GPS Detection */}
          <div>
            <button
              type="button"
              onClick={handleGpsDetect}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-bold text-xs bg-[#2F5233] hover:bg-[#3D6B42] text-white shadow-xs transition-all cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C9A15A]" />
                  <span>{t('location.detecting', { defaultValue: 'Detecting live GPS coordinates...' })}</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 text-[#C9A15A]" />
                  <span>{t('location.use_gps', { defaultValue: 'Use Current GPS Location' })}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Hub Chips */}
          <div>
            <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-2">
              {t('location.popular_areas', { defaultValue: 'Popular Service Hubs' })}
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_HUBS.map((hub) => {
                const isSelected = location?.city?.toLowerCase() === hub.city.toLowerCase();
                return (
                  <button
                    key={hub.city}
                    type="button"
                    onClick={() => handleQuickHubSelect(hub)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#2F5233] text-white border-[#2F5233] font-bold shadow-xs'
                        : 'bg-white border-[#E5DEC9] text-[#1F2A1E]/80 hover:bg-[#F2EDE1]'
                    }`}
                  >
                    <Building2 className={`w-3 h-3 ${isSelected ? 'text-[#C9A15A]' : 'text-[#2F5233]'}`} />
                    <span>{hub.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E5DEC9] w-full"></div>
            <span className="bg-[#FAF7F0] px-3 text-[11px] uppercase font-bold text-[#1F2A1E]/40 tracking-wider">
              {t('common.or', { defaultValue: 'OR' })}
            </span>
            <div className="border-t border-[#E5DEC9] w-full"></div>
          </div>

          {/* Manual Entry Form */}
          <form onSubmit={handleManualSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1">
                {t('location.city_region', { defaultValue: 'City / Region' })} *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., Noida, Ahmedabad, Mumbai"
                required
                className="w-full h-10 bg-white border border-[#E5DEC9] rounded-xl px-3.5 text-xs font-medium text-[#1F2A1E] focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1">
                {t('location.street_address', { defaultValue: 'Street Address / Society / Locality' })}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g., Flat 402, Sunshine Residency, Sector 62"
                className="w-full h-10 bg-white border border-[#E5DEC9] rounded-xl px-3.5 text-xs font-medium text-[#1F2A1E] focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1">
                {t('location.pincode', { defaultValue: 'Postal Code / Pincode' })}
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="e.g., 201301"
                maxLength={10}
                className="w-full h-10 bg-white border border-[#E5DEC9] rounded-xl px-3.5 text-xs font-medium text-[#1F2A1E] focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-[#1F2A1E]/60 hover:text-[#1F2A1E] rounded-xl transition-colors cursor-pointer"
              >
                {t('common.cancel', { defaultValue: 'Cancel' })}
              </button>
              <button
                type="submit"
                disabled={isLoading || (!city.trim() && !address.trim())}
                className="px-5 py-2.5 bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t('location.save', { defaultValue: 'Save Location' })}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
