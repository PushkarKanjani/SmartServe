import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../../api/catalog';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ChevronRight } from 'lucide-react';

export interface CategoryCardProps {
  category: CategoryItem;
}

export const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/explore/category/${category.slug}`}>
      <Card padding="none" hoverable className="overflow-hidden group h-full flex flex-col justify-between">
        <div className="relative h-40 w-full overflow-hidden bg-slate-100">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="neutral" size="sm">
              {category.service_count} services
            </Badge>
          </div>
        </div>

        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2563EB] transition">
              {category.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Explore specialized providers</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#2563EB] group-hover:text-white transition">
            <ChevronRight className="h-5 w-5" />
          </div>
        </div>
      </Card>
    </Link>
  );
};
