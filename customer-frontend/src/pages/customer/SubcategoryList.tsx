import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServices, ServiceItem } from '../../api/catalog';
import { ServiceCard } from '../../components/customer/ServiceCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { ChevronRight } from 'lucide-react';

export const SubcategoryList: FC = () => {
  const { category } = useParams<{ category: string }>();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryServices = async () => {
      setLoading(true);
      try {
        const data = await getServices({ category });
        setServices(data);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryServices();
  }, [category]);

  const categoryName = category ? category.replace(/-/g, ' ').toUpperCase() : 'CATEGORY';

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link to="/home" className="hover:text-slate-900">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/explore" className="hover:text-slate-900">Explore</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#2563EB] font-bold">{categoryName}</span>
      </nav>

      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 capitalize">{categoryName} Services</h1>
        <p className="text-sm text-slate-500 mt-1">Book expert professionals in your neighborhood</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={260} className="rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((srv) => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubcategoryList;
