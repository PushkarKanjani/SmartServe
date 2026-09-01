import { FC } from 'react';
import { SupportTicketCategory } from '../../api/support';

export interface CategoryChipsProps {
  selectedCategory: SupportTicketCategory;
  onChange: (category: SupportTicketCategory) => void;
}

const CATEGORIES: SupportTicketCategory[] = [
  'Booking issue',
  'Payment issue',
  'Service quality',
  'Account / Login',
  'Technical problem',
  'Other',
];

export const CategoryChips: FC<CategoryChipsProps> = ({ selectedCategory, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">Select Issue Category</label>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onChange(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition border select-none ${
                isSelected
                  ? 'border-[#2563EB] bg-[#2563EB] text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
