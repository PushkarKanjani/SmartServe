import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { getCatalogCategories, getCatalogServices, CategoryItem, ServiceItem } from '../api/catalog';
import { getCustomerBookings, BookingDetail } from '../api/bookings';
import { formatCurrencyINR } from '../utils/formatters';
import { getCategoryImageUrl, getServiceImage } from '../utils/serviceImages';
import { 
  Search, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Star, 
  Loader2, 
  Tag,
  ChevronRight
} from 'lucide-react';

import { HomePromoCarousel } from '../components/home/HomePromoCarousel';

export const CustomerHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [popularServices, setPopularServices] = useState<ServiceItem[]>([]);
  const [activeBookings, setActiveBookings] = useState<BookingDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catData, srvData] = await Promise.all([
          getCatalogCategories().catch(() => []),
          getCatalogServices().catch(() => [])
        ]);

        setCategories(catData.slice(0, 8));
        setPopularServices(srvData.slice(0, 6));

        if (user) {
          const bookingsData = await getCustomerBookings().catch(() => []);
          setActiveBookings(bookingsData.filter((b) => b.status.toLowerCase() !== 'completed' && b.status.toLowerCase() !== 'cancelled').slice(0, 2));
        }
      } catch (err) {
        console.error('Failed to load home marketplace data:', err);
      } finally {
        setLoading(false);
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

  return (
    <div className="space-y-12 font-sans max-w-7xl mx-auto">
      
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
              placeholder="Search AC repair, salon, deep cleaning, electrician, plumbing, pest control..."
              className="w-full h-11 bg-transparent text-[#1F2A1E] placeholder-[#1F2A1E]/45 font-medium text-sm focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span>Search</span>
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
              <span>Your Active Bookings</span>
            </h3>
            <button onClick={() => navigate('/bookings')} className="text-xs font-bold text-[#2F5233] hover:text-[#3D6B42] hover:underline cursor-pointer">
              View All ({activeBookings.length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBookings.map((b) => (
              <div
                key={b.id}
                onClick={() => navigate(`/bookings/${b.id}`)}
                className="bg-white p-6 rounded-3xl border border-[#E5DEC9] shadow-xs hover:shadow-md hover:border-[#2F5233]/40 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2F5233]/10 text-[#2F5233] text-[10px] font-bold uppercase border border-[#2F5233]/20">
                      {b.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1F2A1E]/50">{b.booking_reference}</span>
                  </div>
                  <h4 className="font-bold text-[#1F2A1E] text-base">{b.service_name}</h4>
                  <p className="text-xs text-[#1F2A1E]/60 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A15A]" />
                    <span>{b.scheduled_date} at {b.scheduled_time}</span>
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="font-serif text-xl font-normal text-[#1F2A1E] block">₹{b.total_price || b.total_amount}</span>
                  <ChevronRight className="w-5 h-5 text-[#1F2A1E]/40 ml-auto mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORY HIGHLIGHT GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1F2A1E] tracking-tight">Explore Categories</h2>
            <p className="text-xs text-[#1F2A1E]/60 font-medium mt-0.5">Browse verified services managed in the SmartServe master catalog.</p>
          </div>
          <button
            onClick={() => navigate('/catalog')}
            className="text-xs font-bold text-[#2F5233] hover:text-[#3D6B42] flex items-center gap-1 cursor-pointer"
          >
            <span>See Full Catalog</span>
            <ChevronRight className="w-4 h-4 text-[#C9A15A]" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#2F5233]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const imgUrl = (cat.image && !cat.image.includes('photo-1621905251189-08b45d6a269e'))
                ? cat.image
                : getCategoryImageUrl(cat.name);
              return (
                <div
                  key={cat.id}
                  onClick={() => navigate(`/catalog?category=${encodeURIComponent(cat.name)}`)}
                  className="group relative rounded-3xl overflow-hidden border border-[#E5DEC9] shadow-2xs hover:shadow-md hover:border-[#2F5233]/50 transition-all cursor-pointer h-40 flex flex-col justify-end p-4 bg-[#F2EDE1]"
                >
                  <img
                    src={imgUrl}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A1E]/90 via-[#1F2A1E]/40 to-transparent" />
                  <div className="relative z-10 space-y-0.5">
                    <h3 className="font-bold text-white text-sm leading-snug drop-shadow-xs">
                      {cat.display_name || cat.name}
                    </h3>
                    <span className="text-[10px] text-[#C9A15A] font-semibold block">
                      {cat.service_count ? `${cat.service_count} Services` : 'Verified Professionals'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PROMOTIONAL DISCOUNT BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-[#F2EDE1] border border-[#E5DEC9] text-[#1F2A1E] p-8 sm:p-10 shadow-xs">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F5233]/10 text-[#2F5233] border border-[#2F5233]/20 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-[#C9A15A]" />
            Standard SmartServe Guarantee
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#1F2A1E] leading-tight">
            Transparent Upfront Pricing & 30-Day Service Warranty
          </h3>
          <p className="text-xs sm:text-sm text-[#1F2A1E]/75 font-normal leading-relaxed">
            All services booked through SmartServe are executed by verified specialists with clear inclusions, standard process steps, and genuine customer protection.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/catalog')}
              className="px-6 py-3 rounded-xl bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-xs sm:text-sm shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Browse All Services</span>
              <ArrowRight className="w-4 h-4 text-[#C9A15A]" />
            </button>
          </div>
        </div>
      </div>

      {/* POPULAR SERVICES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1F2A1E] tracking-tight">Popular Home Services</h2>
            <p className="text-xs text-[#1F2A1E]/60 font-medium mt-0.5">Top-rated services booked across the marketplace</p>
          </div>
          <button
            onClick={() => navigate('/catalog')}
            className="text-xs font-bold text-[#2F5233] hover:text-[#3D6B42] cursor-pointer"
          >
            View All Services
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((srv) => {
            const imgUrl = (srv.image_url && !srv.image_url.includes('photo-1621905251189-08b45d6a269e'))
              ? srv.image_url
              : getServiceImage(srv.category, srv.subcategory, srv.name);
            return (
              <div
                key={srv.id}
                onClick={() => navigate(`/service/${srv.id}`)}
                className="group bg-white rounded-3xl border border-[#E5DEC9] shadow-2xs hover:shadow-md hover:border-[#2F5233]/40 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
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
                      {srv.category}
                    </span>
                    <h3 className="font-bold text-[#1F2A1E] text-base leading-snug group-hover:text-[#2F5233] transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-[#1F2A1E]/65 line-clamp-2 leading-relaxed font-normal">
                      {srv.description || 'Verified service delivered by trained professionals with standard service guarantee.'}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#E5DEC9]/50 mt-3">
                  <div>
                    <span className="text-[10px] text-[#1F2A1E]/50 font-semibold block uppercase">Fixed Rate</span>
                    <span className="font-serif text-lg font-normal text-[#1F2A1E]">{formatCurrencyINR(srv.base_price)}</span>
                  </div>
                  <button className="px-4 py-2 bg-[#FAF7F0] border border-[#E5DEC9] text-[#2F5233] font-bold text-xs rounded-xl hover:bg-[#2F5233] hover:text-white transition-colors cursor-pointer">
                    View Details
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
