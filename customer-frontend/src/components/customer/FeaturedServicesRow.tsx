import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '../../api/catalog';
import { ServiceCard } from './ServiceCard';
import { ChevronRight } from 'lucide-react';

export interface FeaturedServicesRowProps {
  services: ServiceItem[];
}

export const FeaturedServicesRow: FC<FeaturedServicesRowProps> = ({ services }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Featured Services</h2>
          <p className="text-xs text-slate-500">Top-rated professional services near you</p>
        </div>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition"
        >
          Explore All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.slice(0, 3).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
