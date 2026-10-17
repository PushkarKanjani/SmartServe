import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CustomerSidebar } from './CustomerSidebar';
import { CustomerFooter } from './CustomerFooter';
import { AISupportAssistant } from '../common/AISupportAssistant';
import { LanguageSelector } from '../common/LanguageSelector';
import { getBundleItems } from '../../utils/bundleCart';
import { getLocalizedCategory, getLocalizedSubcategory } from '../../utils/localizedNames';
import { Menu, Layers } from 'lucide-react';

interface CustomerLayoutProps {
  children: ReactNode;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const [bundleCount, setBundleCount] = useState<number>(0);

  useEffect(() => {
    const updateCount = () => {
      setBundleCount(getBundleItems().length);
    };
    updateCount();
    window.addEventListener('smartserve_bundle_updated', updateCount);
    window.addEventListener('storage', updateCount);
    return () => {
      window.removeEventListener('smartserve_bundle_updated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Close drawer on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen bg-[#FAF7F0] font-sans text-[#1F2A1E] selection:bg-[#2F5233] selection:text-white">
      {/* 1. DESKTOP VERTICAL SIDEBAR (Fixed / Sticky Left) */}
      <aside className="hidden lg:flex w-[260px] bg-[#FAF7F0] border-r border-[#E5DEC9] flex-col lg:fixed lg:top-0 lg:bottom-0 lg:left-0 h-screen z-30 shadow-xs">
        <CustomerSidebar />
      </aside>

      {/* 2. MOBILE DRAWER BACKDROP */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#1F2A1E]/40 backdrop-blur-xs lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 3. MOBILE RESPONSIVE DRAWER */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-[#FAF7F0] border-r border-[#E5DEC9]
          z-50 flex flex-col shadow-xl
          transition-transform duration-300 ease-in-out
          lg:hidden
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-modal="true"
        role="dialog"
      >
        <CustomerSidebar onClose={() => setDrawerOpen(false)} />
      </aside>

      {/* 4. MAIN CONTENT AREA (Occupies Remaining Width) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#FAF7F0] lg:pl-[260px]">
        {/* Universal Top Header (Visible on ALL devices) */}
        <header className="h-16 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#E5DEC9] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#1F2A1E]/70 hover:bg-[#F2EDE1] transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand Logo */}
            <Link to="/home" className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 rounded-lg border border-[#E5DEC9] bg-[#FAF7F0] flex items-center justify-center p-0.5">
                <svg className="w-full h-full" viewBox="0 0 96 96" fill="none">
                  <path
                    d="M 48 6 L 72 6 A 18 18 0 0 1 90 24 L 90 72 A 18 18 0 0 1 72 90 L 24 90 A 18 18 0 0 1 6 72 L 6 24 A 18 18 0 0 1 24 6 L 48 6 Z"
                    stroke="#C9A15A"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M 62 30 C 62 23, 34 22, 34 38 C 34 54, 62 48, 62 64 C 62 80, 34 78, 34 70"
                    stroke="#2F5233"
                    strokeWidth={7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <span className="font-serif font-bold text-[#2F5233] text-base">
                Smart<span className="text-[#C9A15A]">Serve</span>
              </span>
            </Link>

            {/* Desktop Headline / Breadcrumb */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-[#1F2A1E]/60 flex-wrap">
              <Link to="/home" className="text-[#2F5233] font-bold font-serif hover:opacity-80 transition-opacity">
                SmartServe
              </Link>
              <span>/</span>
              {location.pathname === '/catalog' ? (
                <>
                  <Link
                    to="/catalog"
                    className={`hover:text-[#2F5233] transition-colors ${!new URLSearchParams(location.search).get('category') ? 'text-[#1F2A1E] font-bold' : ''}`}
                  >
                    {t('nav.catalog', { defaultValue: 'Services' })}
                  </Link>
                  {new URLSearchParams(location.search).get('category') && (
                    <>
                      <span>/</span>
                      <Link
                        to={`/catalog?category=${encodeURIComponent(new URLSearchParams(location.search).get('category')!)}`}
                        className={`hover:text-[#2F5233] transition-colors ${!new URLSearchParams(location.search).get('subcategory') ? 'text-[#1F2A1E] font-bold' : ''}`}
                      >
                        {getLocalizedCategory(new URLSearchParams(location.search).get('category')!)}
                      </Link>
                    </>
                  )}
                  {new URLSearchParams(location.search).get('subcategory') && (
                    <>
                      <span>/</span>
                      <span className="text-[#1F2A1E] font-bold">
                        {getLocalizedSubcategory(new URLSearchParams(location.search).get('subcategory')!)}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-[#1F2A1E] font-medium">
                  {location.pathname.startsWith('/catalog/service')
                    ? t('nav.catalog', { defaultValue: 'Services' })
                    : location.pathname === '/bundle'
                    ? t('nav.bundle', { defaultValue: 'Service Bundle' })
                    : location.pathname.startsWith('/bookings')
                    ? t('nav.bookings', { defaultValue: 'My Bookings' })
                    : location.pathname === '/profile'
                    ? t('nav.profile', { defaultValue: 'Profile' })
                    : location.pathname === '/support'
                    ? t('nav.support', { defaultValue: 'Support' })
                    : t('nav.home', { defaultValue: 'Home' })}
                </span>
              )}
            </div>
          </div>

          {/* Right Header Controls: Bundle Cart + Language Switcher (Single network badge kept on sidebar only) */}
          <div className="flex items-center gap-3">
            {/* Service Bundle Cart Quick Link */}
            <Link
              to="/bundle"
              className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-[#F2EDE1] text-[#2F5233] rounded-xl border border-[#E5DEC9] text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              title="View Multi-Service Bundle Cart"
            >
              <div className="relative">
                <Layers className="w-4 h-4 text-[#2F5233]" />
                {bundleCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-[#C9A15A] text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                    {bundleCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">{t('bundle.cart_title', { defaultValue: 'Bundle Cart' })}</span>
            </Link>

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </header>

        {/* Existing Customer Page Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>

        {/* Customer Footer */}
        <CustomerFooter />

        {/* Floating AI Support Assistant */}
        <AISupportAssistant role="customer" />
      </div>
    </div>
  );
};

export default CustomerLayout;
