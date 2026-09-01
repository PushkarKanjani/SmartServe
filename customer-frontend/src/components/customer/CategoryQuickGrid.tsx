import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../../api/catalog';
import { ChevronRight } from 'lucide-react';

export interface CategoryQuickGridProps {
  categories: CategoryItem[];
}

export const CategoryQuickGrid: FC<CategoryQuickGridProps> = ({ categories }) => {
  const displayCategories = categories.slice(0, 8);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Popular Categories</h2>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition"
        >
          See All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
        {displayCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/explore/category/${cat.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs transition duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-200"
          >
            <div className="h-24 w-full overflow-hidden rounded-xl bg-slate-100 mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800 text-sm group-hover:text-[#2563EB] transition truncate">
                {cat.name}
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
