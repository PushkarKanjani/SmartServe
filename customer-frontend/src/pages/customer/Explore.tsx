import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategories, getServices, CategoryItem, ServiceItem } from '../../api/catalog';
import { FilterBar } from '../../components/customer/FilterBar';
import { CategoryCard } from '../../components/customer/CategoryCard';
import { ServiceCard } from '../../components/customer/ServiceCard';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { Search } from 'lucide-react';

export const Explore: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialEmergency = searchParams.get('emergency') === 'true';

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'name_asc'>('price_asc');
  const [emergencyOnly, setEmergencyOnly] = useState(initialEmergency);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchCatalogData = async () => {
      setLoading(true);
      try {
        const [catData, srvData] = await Promise.all([
          getCategories(),
          getServices({
            q: query || undefined,
            emergency_only: emergencyOnly || undefined,
            sort_by: sortBy,
          }),
        ]);
        setCategories(catData);
        setServices(srvData);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogData();
  }, [query, sortBy, emergencyOnly]);

  const handleSearchChange = (newQuery: string) => {
    setQuery(newQuery);
    setSearchParams((prev) => {
      if (newQuery) prev.set('q', newQuery);
      else prev.delete('q');
      return prev;
    });
  };

  const handleEmergencyToggle = (val: boolean) => {
    setEmergencyOnly(val);
    setSearchParams((prev) => {
      if (val) prev.set('emergency', 'true');
      else prev.delete('emergency');
      return prev;
    });
  };

  const isFilteredSearch = !!query.trim() || emergencyOnly;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Explore Catalog</h1>
        <p className="text-sm text-slate-500 mt-1">Discover 100+ professional home services across all categories</p>
      </div>

      {/* Sticky Filter Bar */}
      <FilterBar
        searchQuery={query}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
        emergencyOnly={emergencyOnly}
        onEmergencyToggle={handleEmergencyToggle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={260} className="rounded-2xl" />
          ))}
        </div>
      ) : isFilteredSearch || viewMode === 'list' ? (
        /* Services View */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-600 font-medium">
            <span>Showing {services.length} services</span>
            {isFilteredSearch && (
              <button
                onClick={() => {
                  setQuery('');
                  setEmergencyOnly(false);
                  setSearchParams({});
                }}
                className="text-[#2563EB] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((srv) => (
                <ServiceCard key={srv.id} service={srv} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Search className="h-6 w-6" />}
              title="No matching services found"
              description={`We couldn't find any services matching "${query}". Try adjusting your search query or filters.`}
              actionLabel="Clear Filters"
              onAction={() => {
                setQuery('');
                setEmergencyOnly(false);
                setSearchParams({});
              }}
            />
          )}
        </div>
      ) : (
        /* Categories View (Default) */
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
