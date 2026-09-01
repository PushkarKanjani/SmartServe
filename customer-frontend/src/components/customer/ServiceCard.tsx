import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '../../api/catalog';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Rating } from '../ui/Rating';
import { formatCurrencyINR, formatDuration } from '../../utils/formatters';
import { Zap, Clock, ChevronRight } from 'lucide-react';

export interface ServiceCardProps {
  service: ServiceItem;
  compact?: boolean;
}

export const ServiceCard: FC<ServiceCardProps> = ({ service, compact = false }) => {
  return (
    <Card padding="none" hoverable className="overflow-hidden group flex flex-col justify-between h-full">
      <div>
        <div className="relative h-36 w-full overflow-hidden bg-slate-100">
          <img
            src={service.image_url}
            alt={service.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          {service.is_emergency && (
            <div className="absolute top-2.5 left-2.5">
              <Badge variant="danger" size="sm" icon={<Zap className="h-3 w-3 fill-current" />}>
                ASAP Emergency
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-600 truncate">{service.category}</span>
            <div className="flex items-center gap-1 shrink-0">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>{formatDuration(service.duration_minutes)}</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-[#2563EB] transition">
            {service.name}
          </h3>

          <div className="flex items-center gap-2">
            <Rating value={service.rating} size="sm" />
            <span className="text-xs text-slate-500 font-medium">({service.review_count})</span>
          </div>

          {!compact && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {service.description}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
        <div>
          <span className="text-xs text-slate-400 font-medium">Starts from</span>
          <p className="text-lg font-extrabold text-[#2563EB]">
            {formatCurrencyINR(service.base_price)}
          </p>
        </div>

        <Link to={`/service/${service.id}`}>
          <Button variant="secondary" size="sm" icon={<ChevronRight className="h-4 w-4" />}>
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};
