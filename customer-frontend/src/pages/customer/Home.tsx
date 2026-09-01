import { FC, useEffect, useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import {
  getCategories,
  getServices,
  getRecommendations,
  CategoryItem,
  ServiceItem,
  RecommendationItem,
} from '../../api/catalog';
import { SearchHero } from '../../components/customer/SearchHero';
import { CategoryQuickGrid } from '../../components/customer/CategoryQuickGrid';
import { EmergencyBanner } from '../../components/customer/EmergencyBanner';
import { FeaturedServicesRow } from '../../components/customer/FeaturedServicesRow';
import { RecommendedRow } from '../../components/customer/RecommendedRow';
import { RecentBookingStrip } from '../../components/customer/RecentBookingStrip';
import { Skeleton } from '../../components/ui/Skeleton';

export const Home: FC = () => {
  const { customer } = useAuth();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoading(true);
      try {
        const [catData, srvData, recData] = await Promise.all([
          getCategories(),
          getServices(),
          getRecommendations(),
        ]);
        setCategories(catData);
        setServices(srvData);
        setRecommendations(recData);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <Skeleton variant="rectangular" height={220} className="rounded-3xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={100} className="rounded-2xl" />
          ))}
        </div>
        <Skeleton variant="rectangular" height={90} className="rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={260} className="rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const hasEmergencyService = services.some((s) => s.is_emergency);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Search Hero */}
      <SearchHero customerName={customer?.full_name} />

      {/* 2. Quick Category Grid */}
      <CategoryQuickGrid categories={categories} />

      {/* 3. Emergency Banner (only if emergency services available) */}
      {hasEmergencyService && <EmergencyBanner />}

      {/* 4. Featured Services */}
      <FeaturedServicesRow services={services} />

      {/* 5. Recommended For You */}
      <RecommendedRow recommendations={recommendations} />

      {/* 6. Recent Booking Activity */}
      <RecentBookingStrip />
    </div>
  );
};

export default Home;
