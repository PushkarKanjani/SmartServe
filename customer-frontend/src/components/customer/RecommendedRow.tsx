import { FC } from 'react';
import { RecommendationItem } from '../../api/catalog';
import { ServiceCard } from './ServiceCard';
import { Sparkles } from 'lucide-react';

export interface RecommendedRowProps {
  recommendations: RecommendationItem[];
}

export const RecommendedRow: FC<RecommendedRowProps> = ({ recommendations }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Recommended For You</h2>
          <p className="text-xs text-slate-500">AI-curated recommendations based on season and preferences</p>
        </div>
      </div>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="relative">
              <div className="mb-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-blue-200">
                <Sparkles className="h-3 w-3" />
                <span>{rec.reason}</span>
              </div>
              <ServiceCard service={rec.service} compact />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-6 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-slate-400 mb-2" />
          <p className="text-sm font-semibold text-slate-700">Learning your preferences</p>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Book your first service to unlock personalized SmartServe AI recommendations tailored to your home.
          </p>
        </div>
      )}
    </div>
  );
};
