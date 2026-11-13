import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../auth/useAuth';
import { useCustomerLocation } from '../context/LocationContext';
import { getCatalogCategories, getCatalogServices, CategoryItem, ServiceItem } from '../api/catalog';
import { getCustomerBookings, BookingDetail } from '../api/bookings';
import { formatCurrencyINR } from '../utils/formatters';
import { getCategoryImageUrl, getServiceImage } from '../utils/serviceImages';
import { getLocalizedCategory, getLocalizedServiceName, getLocalizedDescription, getLocalizedStatus } from '../utils/localizedNames';
import { 
  Search, 
  Tag,
  ArrowRight, 
  Calendar, 
  Clock, 
  Star, 
  ChevronRight,
  MapPin
} from 'lucide-react';

import { HomePromoCarousel } from '../components/home/HomePromoCarousel';

export const CustomerHome: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [popularServices, setPopularServices] = useState<ServiceItem[]>([]);
  const [activeBookings, setActiveBookings] = useState<BookingDetail[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { location, setIsModalOpen, formattedDisplay } = useCustomerLocation();
  const effectiveLocation = location;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catData, srvData] = await Promise.all([
          getCatalogCategories().catch(() => []),
          getCatalogServices({ limit: 6 }).catch(() => [])
        ]);

        setCategories(catData.slice(0, 8));
        setPopularServices(srvData.slice(0, 6));

        if (user) {
          const bookingsData = await getCustomerBookings().catch(() => []);
          setActiveBookings(bookingsData.filter((b) => b.status.toLowerCase() !== 'completed' && b.status.toLowerCase() !== 'cancelled').slice(0, 2));
        }
      } catch (err) {
        console.error('Failed to load home marketplace data:', err);
      }
    };

    fetchData();
  }, [user]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const savedLocationDisplay = React.useMemo(() => {
    if (!effectiveLocation) return null;
    if (formattedDisplay && formattedDisplay !== 'Select Location') {
      return formattedDisplay;
    }
    const { city, state, address } = effectiveLocation;
    if (city && state) return `${city}, ${state}`;
    if (city) return city;
    if (address) return address;
    return null;
  }, [effectiveLocation, formattedDisplay]);

  return (
    <div className="space-y-8 font-sans max-w-7xl mx-auto">
      
      {/* ── 0. INCOMPLETE PROFILE REMINDER BANNER ── */}
      {user && user.is_profile_complete === false && (
        <div 
          data-testid="profile-incomplete-banner"
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-amber-50/95 border border-amber-200 rounded-2xl text-amber-950 shadow-xs animate-in fade-in"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-800">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-amber-950">
                Your profile is not complete yet
              </p>
              <p className="text-[11px] sm:text-xs text-amber-800/90 font-medium">
                You can browse services, but required details (phone number) must be completed before placing an order.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/complete-profile')}
            className="px-4 py-2 bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
          >
            <span>Complete Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── 0B. SERVICE LOCATION SECTION NEAR TOP OF DASHBOARD ── */}
      <div 
        data-testid="dashboard-location-bar"
        className="flex items-center justify-between p-3.5 sm:p-4 bg-white border border-[#E5DEC9] rounded-2xl shadow-xs"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#2F5233]/10 text-[#2F5233] flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F2A1E]/50 block">
              Service Location
            </span>
            {savedLocationDisplay ? (
              <p className="text-xs sm:text-sm font-bold text-[#1F2A1E] truncate">
                <span className="text-[#1F2A1E]/60 font-semibold mr-1">Your location:</span>
                <span className="text-[#2F5233]">{savedLocationDisplay}</span>
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-semibold text-[#1F2A1E]/70 italic">
                Location not set · Choose your service location
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          data-testid="dashboard-location-action-btn"
          className="px-3.5 py-1.5 bg-[#FAF7F0] hover:bg-[#F2EDE1] text-[#2F5233] font-bold text-xs rounded-xl border border-[#E5DEC9] transition-all flex-shrink-0 cursor-pointer"
        >
          {savedLocationDisplay ? 'Change location' : 'Add Location'}
        </button>
      </div>

      {/* 1. AUTO-SCROLLING PROMOTIONAL CAROUSEL & SEARCH */}
      <div className="space-y-4">
        <HomePromoCarousel />

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-xs border border-[#E5DEC9] transition-all focus-within:border-[#2F5233]/60 focus-within:shadow-sm">
          <div className="flex-1 flex items-center gap-3 px-3">
            <Search className="w-5 h-5 text-[#1F2A1E]/40 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("home.search_placeholder", { defaultValue: "Search AC repair, salon, deep cleaning, electrician, plumbing, pest control..." })}
              className="w-full h-11 bg-transparent text-[#1F2A1E] placeholder-[#1F2A1E]/45 font-medium text-sm focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span>{t('common.search', { defaultValue: 'Search' })}</span>
            <ArrowRight className="w-4 h-4 text-[#C9A15A]" />
          </button>
        </form>
      </div>

      {/* ACTIVE BOOKINGS BANNER */}
      {activeBookings.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-normal text-[#1F2A1E] tracking-tight flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#2F5233]" />
              <span>{t('booking.active_bookings', { defaultValue: 'Your Active Bookings' })}</span>
            </h3>
            <button onClick={() => navigate('/bookings')} className="text-xs font-bold text-[#2F5233] hover:text-[#3D6B42] hover:underline cursor-pointer">
              {t('common.view_all_count', { count: activeBookings.length, defaultValue: `View All (${activeBookings.length})` })}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBookings.map((b) => (
              <div 
                key={b.id}
                onClick={() => navigate(`/bookings/${b.id}`)}
                className="p-5 bg-white rounded-2xl border border-[#E5DEC9] hover:border-[#2F5233] shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2F5233]/10 text-[#2F5233] text-[10px] font-bold uppercase border border-[#2F5233]/20">
                      {getLocalizedStatus(b.status)}
                    </span>
                  </div>
                  <h4 className="font-bold text-[#1F2A1E] text-base">{getLocalizedServiceName(b.service_name)}</h4>
                  <p className="text-xs text-[#1F2A1E]/60 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A15A]" />
                    <span>
                      {t('booking.date_at_time', {
                        date: b.scheduled_date,
                        time: b.scheduled_time,
                        defaultValue: `${b.scheduled_date} at ${b.scheduled_time}`
                      })}
                    </span>
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FAF7F0] flex items-center justify-center text-[#1F2A1E]/40 group-hover:text-[#2F5233] group-hover:bg-[#2F5233]/10 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. CATEGORY TILES GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1F2A1E] tracking-tight">
              {t('home.popular_categories', { defaultValue: 'Explore Categories' })}
            </h2>
            <p className="text-xs text-[#1F2A1E]/60 font-medium mt-0.5">{t("home.browse_catalog_desc", { defaultValue: "Browse verified services managed in the SmartServe master catalog." })}</p>
          </div>
          <button
            onClick={() => navigate('/catalog')}
            className="text-xs font-bold text-[#2F5233] hover:text-[#3D6B42] flex items-center gap-1 cursor-pointer"
          >
            <span>{t('home.view_all', { defaultValue: 'See Full Catalog' })}</span>
            <ChevronRight className="w-4 h-4 text-[#C9A15A]" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => {
            const imgUrl = cat.image || getCategoryImageUrl(cat.name);
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/catalog?category=${encodeURIComponent(cat.name)}`)}
                className="group p-3 bg-white rounded-2xl border border-[#E5DEC9] hover:border-[#2F5233] shadow-xs hover:shadow transition-all cursor-pointer flex flex-col items-center text-center space-y-2.5"
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#FAF7F0] p-1 border border-[#E5DEC9]/60 group-hover:scale-105 transition-transform">
                  <img
                    src={imgUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#1F2A1E] group-hover:text-[#2F5233] transition-colors block line-clamp-1">
                    {getLocalizedCategory(cat.display_name || cat.name)}
                  </span>
                  <span className="text-[10px] text-[#1F2A1E]/50 font-medium block">
                    {cat.service_count ? t('common.services_count', { count: cat.service_count, defaultValue: `${cat.service_count} Services` }) : t('common.verified', { defaultValue: 'Verified Professionals' })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* PROMOTIONAL DISCOUNT BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-[#F2EDE1] border border-[#E5DEC9] text-[#1F2A1E] p-8 sm:p-10 shadow-xs">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F5233]/10 text-[#2F5233] border border-[#2F5233]/20 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-[#C9A15A]" />
            {t('home.standard_guarantee', { defaultValue: 'Standard SmartServe Guarantee' })}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#1F2A1E] leading-tight">
            {t('home.trust_warranty_banner', { defaultValue: 'Transparent Upfront Pricing & 7-Day Service Warranty' })}
          </h3>
          <p className="text-xs sm:text-sm text-[#1F2A1E]/75 font-normal leading-relaxed">{t("home.guarantee_desc", { defaultValue: "All services booked through SmartServe are executed by verified specialists with clear inclusions, standard process steps, and genuine customer protection." })}</p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/catalog')}
              className="px-6 py-3 rounded-xl bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-xs sm:text-sm shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{t('home.explore_services', { defaultValue: 'Browse All Services' })}</span>
              <ArrowRight className="w-4 h-4 text-[#C9A15A]" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. POPULAR FEATURED SERVICES */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1F2A1E] tracking-tight">
              {t('home.popular_services', { defaultValue: 'Popular Home Services' })}
            </h2>
            <p className="text-xs text-[#1F2A1E]/60 font-medium mt-0.5">{t("home.popular_services_desc", { defaultValue: "Top-rated services booked across the marketplace" })}</p>
          </div>
          <button
            onClick={() => navigate('/catalog')}
            className="text-xs font-bold text-[#2F5233] hover:text-[#3D6B42] cursor-pointer"
          >
            {t('home.view_all_services', { defaultValue: 'View All Services' })}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((srv) => {
            const imgUrl = srv.image_url || getServiceImage(srv.name, srv.category);
            return (
              <div
                key={srv.id}
                onClick={() => navigate(`/service/${srv.id}`)}
                className="group bg-white rounded-3xl border border-[#E5DEC9] hover:border-[#2F5233] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="h-44 overflow-hidden relative bg-[#F2EDE1]">
                    <img
                      src={imgUrl}
                      alt={srv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#1F2A1E] text-xs font-bold shadow-xs flex items-center gap-1 border border-[#E5DEC9]">
                      <Star className="w-3.5 h-3.5 fill-[#C9A15A] text-[#C9A15A]" />
                      <span>{srv.rating || '4.8'}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-[#2F5233] uppercase tracking-wider block">
                      {getLocalizedCategory(srv.category)}
                    </span>
                    <h3 className="font-bold text-[#1F2A1E] text-base leading-snug group-hover:text-[#2F5233] transition-colors">
                      {getLocalizedServiceName(srv.name)}
                    </h3>
                    <p className="text-xs text-[#1F2A1E]/65 line-clamp-2 leading-relaxed font-normal">
                      {getLocalizedDescription(srv.description)}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#E5DEC9]/50 mt-3">
                  <div>
                    <span className="text-[10px] text-[#1F2A1E]/50 font-semibold block uppercase">{t("home.fixed_rate", { defaultValue: "Fixed Rate" })}</span>
                    <span className="font-serif text-lg font-normal text-[#1F2A1E]">{formatCurrencyINR(srv.base_price)}</span>
                  </div>
                  <button className="px-4 py-2 bg-[#FAF7F0] border border-[#E5DEC9] text-[#2F5233] font-bold text-xs rounded-xl hover:bg-[#2F5233] hover:text-white transition-colors cursor-pointer">
                    {t("home.view_details", { defaultValue: "View Details" })}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default CustomerHome;
