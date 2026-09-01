import { FC } from 'react';
import { Search, LayoutGrid, List, Zap } from 'lucide-react';

export interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: 'price_asc' | 'price_desc' | 'name_asc') => void;
  emergencyOnly: boolean;
  onEmergencyToggle: (val: boolean) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const FilterBar: FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  emergencyOnly,
  onEmergencyToggle,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="sticky top-[72px] z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-3 sm:p-4 shadow-xs">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search catalog by service name, category, keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition"
        />
      </div>

      {/* Action Filters */}
      <div className="flex items-center gap-2 overflow-x-auto shrink-0">
        {/* Emergency Toggle */}
        <button
          onClick={() => onEmergencyToggle(!emergencyOnly)}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold border transition ${
            emergencyOnly
              ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xs'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Zap className={`h-3.5 w-3.5 ${emergencyOnly ? 'fill-current' : 'text-slate-400'}`} />
          <span>Emergency Only</span>
        </button>

        {/* Sort Select */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'price_asc' | 'price_desc' | 'name_asc')}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 cursor-pointer"
        >
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
          <option value="name_asc">Name: A → Z</option>
        </select>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-0.5">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`rounded-lg p-1.5 transition ${
              viewMode === 'grid' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`rounded-lg p-1.5 transition ${
              viewMode === 'list' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
