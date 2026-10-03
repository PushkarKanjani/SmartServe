import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Wrench, 
  Tag, 
  Gift, 
  Percent, 
  Clock, 
  Star 
} from 'lucide-react';
import { CATEGORY_IMAGE_MAP, SUBCATEGORY_IMAGE_MAP } from '../../utils/serviceImages';

export interface PromoSlideData {
  id: string;
  isDiscount?: boolean;
  categoryBadge: string;
  badgeIcon: React.ElementType;
  discountTag?: string;
  promoCode?: string;
  headline: string;
  supportingText: string;
  ctaText: string;
  targetUrl: string;
  imageUrl: string;
  altText: string;
  featurePill: string;
  ratingText: string;
}

export const PROMO_SLIDES: PromoSlideData[] = [
  // 1. Service Ad: AC & Appliance Repair
  {
    id: 'ac-repair',
    isDiscount: false,
    categoryBadge: 'AC & Appliance Repair',
    badgeIcon: Wrench,
    headline: 'AC not cooling?',
    supportingText: 'Verified technicians at your doorstep with rapid diagnosis, genuine brand parts, and upfront fixed pricing.',
    ctaText: 'Book Now',
    targetUrl: `/catalog?category=${encodeURIComponent('4. AC, Appliance & Electronics Repair')}`,
    imageUrl: CATEGORY_IMAGE_MAP['4. AC, Appliance & Electronics Repair'] || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80',
    altText: 'SmartServe Certified AC & Appliance Repair Technician',
    featurePill: '⚡ 45-Min Doorstep Arrival',
    ratingText: '★ 4.8 (12k+ repaired)'
  },
  // 2. Discount Ad: Home Deep Cleaning
  {
    id: 'discount-cleaning',
    isDiscount: true,
    categoryBadge: 'Limited Time Offer',
    badgeIcon: Tag,
    discountTag: '20% OFF',
    headline: 'Home Deep Cleaning',
    supportingText: 'Fresh home. Better price. Professional deep cleaning at your doorstep with certified specialists.',
    ctaText: 'Book Now',
    targetUrl: `/catalog?category=${encodeURIComponent('2. Cleaning & Home Cleaning')}`,
    imageUrl: CATEGORY_IMAGE_MAP['2. Cleaning & Home Cleaning'] || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    altText: 'SmartServe Deep Home Cleaning Service',
    featurePill: '✨ 20% Off Cleaning',
    ratingText: '★ 4.9 (18k+ homes)'
  },
  // 3. Service Ad: Salon & Beauty
  {
    id: 'salon-beauty',
    isDiscount: false,
    categoryBadge: 'Salon & Beauty',
    badgeIcon: Sparkles,
    headline: 'Salon experience at home.',
    supportingText: 'Book trusted beauty professionals for luxury parlor facials, hair grooming, manicure, and spas.',
    ctaText: 'Explore Services',
    targetUrl: `/catalog?category=${encodeURIComponent('1. Beauty, Salon & Spa')}`,
    imageUrl: CATEGORY_IMAGE_MAP['1. Beauty, Salon & Spa'] || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    altText: 'SmartServe At-Home Salon and Spa Stylist',
    featurePill: '🌿 Sealed Single-Use Kits',
    ratingText: '★ 4.9 (24k+ appointments)'
  },
  // 4. Discount Ad: First Booking Welcome Offer
  {
    id: 'discount-first-booking',
    isDiscount: true,
    categoryBadge: 'Welcome Offer',
    badgeIcon: Gift,
    discountTag: '₹200 OFF',
    promoCode: 'Use code: SMART200',
    headline: 'On your first booking',
    supportingText: 'Experience verified doorstep home services across all categories with special first-time savings.',
    ctaText: 'Claim Offer',
    targetUrl: `/catalog`,
    imageUrl: SUBCATEGORY_IMAGE_MAP['Deep Cleaning'] || CATEGORY_IMAGE_MAP['2. Cleaning & Home Cleaning'] || 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
    altText: 'SmartServe First Booking Welcome Discount',
    featurePill: '🎁 Code: SMART200',
    ratingText: '★ 4.8 New Customer Deal'
  },
  // 5. Service Ad: Plumbing & Electrical
  {
    id: 'plumbing-electrical',
    isDiscount: false,
    categoryBadge: 'Plumbing & Electrical',
    badgeIcon: Wrench,
    headline: 'Something needs fixing?',
    supportingText: 'Get verified experts at your doorstep for everyday repairs, wiring, leaks, and switch installations.',
    ctaText: 'Get Help',
    targetUrl: `/catalog?category=${encodeURIComponent('5. Electrician, Plumber, Carpenter & Home Repairs')}`,
    imageUrl: CATEGORY_IMAGE_MAP['5. Electrician, Plumber, Carpenter & Home Repairs'] || 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80',
    altText: 'SmartServe Verified Plumber and Electrician diagnosing fixtures',
    featurePill: '🛡️ 30-Day Work Warranty',
    ratingText: '★ 4.8 (30k+ repairs)'
  },
  // 6. Discount Ad: Selected Services Offer
  {
    id: 'discount-selected',
    isDiscount: true,
    categoryBadge: 'SmartServe Specials',
    badgeIcon: Percent,
    discountTag: 'UP TO 15% OFF',
    headline: 'On selected home services',
    supportingText: 'Limited-time SmartServe offers on pest control, wall painting, and home appliance maintenance packages.',
    ctaText: 'Explore Offers',
    targetUrl: `/catalog`,
    imageUrl: CATEGORY_IMAGE_MAP['3. Painting, Waterproofing & Home Improvement'] || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    altText: 'SmartServe Seasonal Specials on selected services',
    featurePill: '🏷️ Limited-Time Offers',
    ratingText: '★ 4.9 Curated Savings'
  }
];

export const HomePromoCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = PROMO_SLIDES.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-scroll effect: changes slide every 4.5s unless paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Handle keyboard navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  // Touch gesture handling for smooth mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    if (e.targetTouches[0]) {
      touchStartXRef.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      touchEndXRef.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diffX = touchStartXRef.current - touchEndXRef.current;
    if (diffX > 50) {
      goToNext();
    } else if (diffX < -50) {
      goToPrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="SmartServe Promotional Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      /* SINGLE SOLID COLOR BACKGROUND (#1F2B22) - NO GRADIENTS, NO GLOWS */
      style={{ backgroundColor: '#1F2B22' }}
      className="relative rounded-3xl overflow-hidden border border-[#2D3E31]/70 shadow-md outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-[#C9A15A]"
    >
      {/* 1. SLIDES VIEWPORT TRACK */}
      <div className="relative w-full overflow-hidden" style={{ backgroundColor: '#1F2B22' }}>
        <div
          className="flex transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, backgroundColor: '#1F2B22' }}
        >
          {PROMO_SLIDES.map((slide, index) => {
            const Icon = slide.badgeIcon;
            const isCurrent = currentIndex === index;

            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${totalSlides}: ${slide.categoryBadge}`}
                aria-hidden={!isCurrent}
                style={{ backgroundColor: '#1F2B22' }}
                className="w-full flex-shrink-0 relative overflow-hidden"
              >
                {/* SLIDE CONTENT CONTAINER */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-7 pb-12 sm:px-10 sm:pt-8 sm:pb-12 lg:px-12 lg:pt-9 lg:pb-12">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: Promotional Copy & CTA */}
                    <div className="md:col-span-7 flex flex-col justify-center space-y-3.5 sm:space-y-4">
                      
                      {/* Badge and Tag/Feature Row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/12 text-white border border-white/20 backdrop-blur-xs shadow-2xs">
                          <Icon className="w-3.5 h-3.5 text-[#C9A15A]" />
                          <span>{slide.categoryBadge}</span>
                        </span>

                        {slide.promoCode && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#C9A15A]/20 text-[#DFBA73] font-mono text-[11px] font-bold border border-[#C9A15A]/30">
                            {slide.promoCode}
                          </span>
                        )}
                        
                        {!slide.promoCode && (
                          <span className="text-[11px] font-semibold text-white/90 bg-black/20 px-2.5 py-0.5 rounded-full border border-white/15 hidden sm:inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#C9A15A]" />
                            <span>{slide.featurePill}</span>
                          </span>
                        )}
                      </div>

                      {/* DISCOUNT CALLOUT (if discount slide) vs SERVICE HEADLINE */}
                      {slide.isDiscount ? (
                        <div className="space-y-1">
                          <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#C9A15A] leading-none drop-shadow-xs">
                            {slide.discountTag}
                          </div>
                          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-white leading-tight">
                            {slide.headline}
                          </h2>
                        </div>
                      ) : (
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white leading-[1.18]">
                          {slide.headline}
                        </h2>
                      )}

                      {/* Supporting Promotional Text: Soft Warm White */}
                      <p className="text-xs sm:text-sm font-normal text-[#FAF7F0]/85 leading-relaxed max-w-lg">
                        {slide.supportingText}
                      </p>

                      {/* Mobile Image: Compact clean banner on mobile */}
                      <div className="block md:hidden my-1">
                        <div 
                          onClick={() => navigate(slide.targetUrl)}
                          className="relative rounded-2xl overflow-hidden h-44 w-full border border-white/20 shadow-xs cursor-pointer group bg-black/20"
                        >
                          <img
                            src={slide.imageUrl}
                            alt={slide.altText}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                            loading={index === 0 ? 'eager' : 'lazy'}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-bold text-white drop-shadow-xs">
                            <span className="bg-[#1F2B22]/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/20">
                              {slide.discountTag || slide.featurePill}
                            </span>
                            <span className="text-[#DFBA73] font-semibold">
                              {slide.ratingText}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Action Row: SmartServe Warm Gold Button */}
                      <div className="pt-0.5 flex flex-wrap items-center gap-3.5">
                        <button
                          type="button"
                          onClick={() => navigate(slide.targetUrl)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide bg-[#C9A15A] hover:bg-[#DFBA73] text-[#1F2B22] shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                          <span>{slide.ctaText}</span>
                          <ArrowRight className="w-4 h-4 text-[#1F2B22]" />
                        </button>

                        <span className="text-xs font-semibold text-white/80 hidden sm:inline-flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-[#C9A15A] text-[#C9A15A]" />
                          <span>{slide.ratingText}</span>
                        </span>
                      </div>

                    </div>

                    {/* RIGHT COLUMN: Service Photo (Desktop & Tablet) */}
                    <div className="hidden md:flex md:col-span-5 justify-center items-center">
                      <div
                        onClick={() => navigate(slide.targetUrl)}
                        className="group relative w-full h-[220px] lg:h-[250px] rounded-2xl overflow-hidden shadow-md border border-white/20 bg-black/20 cursor-pointer"
                      >
                        <img
                          src={slide.imageUrl}
                          alt={slide.altText}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                        
                        {/* Overlay floating badge */}
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white drop-shadow-sm">
                          <span className="bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/20 text-[11px]">
                            {slide.discountTag ? `🏷️ ${slide.discountTag}` : slide.featurePill}
                          </span>
                          <span className="bg-[#1F2B22]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[#DFBA73] font-bold border border-[#C9A15A]/30 text-[11px]">
                            {slide.ratingText}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. PREVIOUS & NEXT ARROWS: Small, subtle, circular, semi-transparent */}
      <button
        type="button"
        onClick={goToPrev}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/25 hover:bg-black/45 text-white border border-white/20 shadow-xs backdrop-blur-xs items-center justify-center transition-all opacity-75 hover:opacity-100 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        aria-label="Next slide"
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/25 hover:bg-black/45 text-white border border-white/20 shadow-xs backdrop-blur-xs items-center justify-center transition-all opacity-75 hover:opacity-100 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>

      {/* 3. PAGINATION INDICATORS: Small, perfectly circular dots • • • ● • • on ONE horizontal line */}
      <div 
        role="tablist"
        aria-label="Carousel pagination dots"
        style={{
          position: 'absolute',
          bottom: '12px',
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          pointerEvents: 'auto'
        }}
      >
        {PROMO_SLIDES.map((slide, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${idx + 1}: ${slide.categoryBadge}`}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: isActive ? '8px' : '6px',
                height: isActive ? '8px' : '6px',
                minWidth: isActive ? '8px' : '6px',
                minHeight: isActive ? '8px' : '6px',
                maxWidth: isActive ? '8px' : '6px',
                maxHeight: isActive ? '8px' : '6px',
                borderRadius: '50%',
                padding: 0,
                margin: 0,
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                backgroundColor: isActive ? '#C9A15A' : 'rgba(255, 255, 255, 0.45)',
                boxShadow: isActive ? '0 0 0 2px rgba(201, 161, 90, 0.45)' : 'none',
                transition: 'all 0.25s ease',
                flexShrink: 0,
                display: 'block'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePromoCarousel;
