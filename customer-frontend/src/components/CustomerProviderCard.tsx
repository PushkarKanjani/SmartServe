import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  Clock, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Circle,
  Radio,
  Briefcase,
  MapPin
} from 'lucide-react';
import { ProviderProfileInfo, ProviderGpsLocation } from '../api/bookings';

interface CustomerProviderCardProps {
  provider: ProviderProfileInfo;
  serviceName: string;
  category: string;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
  providerLocation: ProviderGpsLocation | null;
  distanceKm?: number | null;
  etaMinutes?: number | null;
}

export const CustomerProviderCard: React.FC<CustomerProviderCardProps> = ({
  provider,
  serviceName,
  category,
  scheduledDate,
  scheduledTime,
  status,
  providerLocation,
  distanceKm,
  etaMinutes,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-white/30 overflow-hidden shadow-lg flex items-center justify-center text-2xl font-bold text-white">
              {provider.photo_url ? (
                <img
                  src={provider.photo_url}
                  alt={provider.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{provider.full_name.charAt(0)}</span>
              )}
            </div>
            {provider.is_verified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs" title="Verified Professional">
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                Verified Expert Partner
              </span>
              <span className="flex items-center gap-1 text-amber-300 text-xs font-bold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>★ {(provider.rating || 4.9).toFixed(1)}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
              {provider.full_name}
            </h2>

            <p className="text-xs text-emerald-100/80 font-medium">
              {provider.skills || provider.category || category} Specialist • {provider.experience_years || 5}+ years exp.
            </p>
          </div>
        </div>

        {/* Live Distance / Status Badge */}
        <div className="flex flex-col sm:items-end justify-center">
          <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">Current State</span>
          <span className="text-sm font-extrabold text-white flex items-center gap-1.5 mt-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{status}</span>
          </span>
          {providerLocation ? (
            <span className="text-[10px] text-emerald-200 font-mono mt-1 flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-300 animate-pulse" />
              <span>Live GPS: {providerLocation.latitude.toFixed(4)}, {providerLocation.longitude.toFixed(4)}</span>
            </span>
          ) : null}
          {distanceKm !== undefined && distanceKm !== null && (
            <span className="text-xs text-emerald-200 font-mono mt-0.5">
              📍 {distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m away` : `${distanceKm.toFixed(1)} km away`}
              {etaMinutes ? ` (~${etaMinutes} mins)` : ''}
            </span>
          )}
        </div>
      </div>

      {/* Detail Specifications */}
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 bg-slate-50/60 border-t border-slate-100 text-xs">
        <div>
          <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[10px]">Service</span>
          <span className="font-bold text-slate-800 text-sm block mt-0.5 truncate">{serviceName}</span>
        </div>

        <div>
          <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[10px]">Date</span>
          <span className="font-bold text-slate-800 text-sm block mt-0.5 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>{scheduledDate}</span>
          </span>
        </div>

        <div>
          <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[10px]">Slot Time</span>
          <span className="font-bold text-slate-800 text-sm block mt-0.5 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{scheduledTime}</span>
          </span>
        </div>

        <div>
          <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[10px]">Reliability</span>
          <span className="font-bold text-emerald-700 text-sm block mt-0.5 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>{(provider.reliability_score || 99).toFixed(0)}% Score</span>
          </span>
        </div>

        <div>
          <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[10px]">Experience</span>
          <span className="font-bold text-slate-800 text-sm block mt-0.5 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>{provider.experience_years || 5}+ Years</span>
          </span>
        </div>

        <div>
          <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[10px]">Skills</span>
          <span className="font-bold text-slate-800 text-sm block mt-0.5 truncate" title={provider.skills || 'Certified Professional'}>
            {provider.skills || 'Certified Professional'}
          </span>
        </div>
      </div>

      {/* Professional Information & Safety Strip */}
      <div className="px-6 py-3 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-medium text-slate-700">SmartServe Background Checked & Insured Professional</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>Service Area: <strong>{provider.service_area || 'Bengaluru, India'}</strong></span>
        </div>
      </div>
    </div>
  );
};

interface BookingTimelineProps {
  status: string;
}

export const BookingTimeline: React.FC<BookingTimelineProps> = ({ status }) => {
  const steps = [
    { key: 'Requested', label: 'Requested' },
    { key: 'Assigned', label: 'Assigned' },
    { key: 'Accepted', label: 'Accepted' },
    { key: 'On The Way', label: 'On The Way' },
    { key: 'Arrived', label: 'Arrived' },
    { key: 'OTP Verification', label: 'OTP Verification' },
    { key: 'Started', label: 'Started' },
    { key: 'Completed', label: 'Completed' },
  ];

  const getStepIndex = (st: string) => {
    const s = st.toLowerCase().trim();
    if (s === 'requested') return 0;
    if (s === 'assigned') return 1;
    if (s === 'accepted') return 2;
    if (s === 'on the way') return 3;
    if (s === 'arrived') return 4;
    if (s === 'started') return 6;
    if (s === 'completed' || s === 'paid') return 7;
    return 0;
  };

  const currentIndex = getStepIndex(status);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-7 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Booking Progress Pipeline</h3>
          <p className="text-xs text-slate-500 mt-0.5">End-to-end live job execution lifecycle</p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Step {Math.min(currentIndex + 1, steps.length)} of {steps.length}
        </span>
      </div>

      {/* Progress Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
        {steps.map((step, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex || (step.key === 'OTP Verification' && status.toLowerCase().trim() === 'arrived');

          return (
            <div
              key={step.key}
              className={`p-3 rounded-2xl border text-center transition-all ${
                isCurrent
                  ? 'bg-[#2563EB]/10 border-[#2563EB] shadow-xs'
                  : isDone
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-slate-50/60 border-slate-100 opacity-60'
              }`}
            >
              <div className="flex justify-center mb-1.5">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : isCurrent ? (
                  <div className="relative flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#2563EB] animate-ping absolute"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#2563EB] z-10"></span>
                  </div>
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <span className={`text-[11px] font-bold block leading-tight ${
                isCurrent ? 'text-[#2563EB]' : isDone ? 'text-emerald-900' : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
