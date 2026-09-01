import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowUpRight } from 'lucide-react';

export const EmergencyBanner: FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 p-5 sm:p-6 text-white shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shrink-0">
            <Zap className="h-6 w-6 text-yellow-300 fill-yellow-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold tracking-wide">Emergency Services Available</h3>
            <p className="text-xs text-rose-100 mt-0.5">Need urgent pipe leak, short circuit or lock fix? Technicians arrive ASAP.</p>
          </div>
        </div>

        <Link
          to="/explore?emergency=true"
          className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition shadow-sm active:scale-95 whitespace-nowrap"
        >
          <span>Find Urgent Pros</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
