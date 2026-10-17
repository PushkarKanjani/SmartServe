import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export const CustomerFooter: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-[#1F2A1E] text-[#FAF7F0] pt-14 pb-8 font-sans border-t border-[#2F5233]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-[#C9A15A]/40 bg-[#FAF7F0] flex items-center justify-center shadow-xs p-1 flex-shrink-0">
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
              <div className="flex flex-col">
                <div className="flex items-baseline font-serif">
                  {i18n.language.startsWith('hi') ? (
                    <>
                      <span className="font-bold text-white text-xl tracking-tight leading-none">स्मार्ट</span>
                      <span className="font-bold text-[#C9A15A] text-xl tracking-tight leading-none ml-0.5">सर्व</span>
                      <span className="text-xs text-[#FAF7F0]/40 font-mono font-medium ml-2">SmartServe</span>
                    </>
                  ) : i18n.language.startsWith('gu') ? (
                    <>
                      <span className="font-bold text-white text-xl tracking-tight leading-none">સ્માર્ટ</span>
                      <span className="font-bold text-[#C9A15A] text-xl tracking-tight leading-none ml-0.5">સર્વ</span>
                      <span className="text-xs text-[#FAF7F0]/40 font-mono font-medium ml-2">SmartServe</span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-white text-xl tracking-tight leading-none">Smart</span>
                      <span className="font-bold text-[#C9A15A] text-xl tracking-tight leading-none ml-0.5">Serve</span>
                    </>
                  )}
                </div>
                <span className="text-[10px] text-[#C9A15A] font-bold tracking-wider mt-0.5">
                  {t('footer.brand_subtitle', { defaultValue: 'स्मार्ट होम सेवाएं' })}
                </span>
              </div>
            </div>
            <p className="text-[#FAF7F0]/70 text-sm font-normal leading-relaxed max-w-sm">
              {t('footer.portal_desc', {
                defaultValue:
                  "India's premier verified home and urban services marketplace. Professional salon, deep cleaning, AC repair, plumbing, electrical, and lifestyle services delivered to your doorstep.",
              })}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('footer.verified_badge', { defaultValue: '100% Verified Service Professionals & Standard Upfront Pricing' })}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">
              {t('footer.quick_nav', { defaultValue: 'Quick Navigation' })}
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF7F0]/75">
              <li><Link to="/home" className="hover:text-white transition-colors">{t('footer.nav_home', { defaultValue: 'Home Marketplace' })}</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors">{t('footer.nav_catalog', { defaultValue: 'Full Catalog' })}</Link></li>
              <li><Link to="/bookings" className="hover:text-white transition-colors">{t('footer.nav_bookings', { defaultValue: 'My Bookings' })}</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">{t('footer.nav_support', { defaultValue: 'Support Center' })}</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">{t('footer.nav_profile', { defaultValue: 'Account Profile' })}</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">
              {t('footer.top_categories', { defaultValue: 'Top Categories' })}
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF7F0]/75">
              <li><Link to="/catalog?category=Cleaning" className="hover:text-white transition-colors">{t('footer.cat_cleaning', { defaultValue: 'Deep Cleaning' })}</Link></li>
              <li><Link to="/catalog?category=AC" className="hover:text-white transition-colors">{t('footer.cat_ac', { defaultValue: 'AC & Appliance Repair' })}</Link></li>
              <li><Link to="/catalog?category=Electrician" className="hover:text-white transition-colors">{t('footer.cat_electrician', { defaultValue: 'Electrician & Repairs' })}</Link></li>
              <li><Link to="/catalog?category=Plumbing" className="hover:text-white transition-colors">{t('footer.cat_plumbing', { defaultValue: 'Plumbing Solutions' })}</Link></li>
              <li><Link to="/catalog?category=Beauty" className="hover:text-white transition-colors">{t('footer.cat_salon', { defaultValue: 'Salon & Spa at Home' })}</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">
              {t('footer.need_help', { defaultValue: 'Need Help?' })}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F0]/75">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A15A] flex-shrink-0" />
                <span>
                  {t('footer.toll_free_contact', {
                    phone: '+91 1800 200 4000',
                    label: t('footer.toll_free', { defaultValue: 'Toll Free' }),
                    defaultValue: '+91 1800 200 4000 (Toll Free)'
                  })}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9A15A] flex-shrink-0" />
                <span>{t('footer.support_email', { defaultValue: 'support@smartserve.in' })}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A15A] flex-shrink-0" />
                <span>{t('footer.office_address', { defaultValue: 'SmartServe Tower, Noida Sector 62' })}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#FAF7F0]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F0]/50 gap-4">
          <p>{t('footer.copyright', { year: new Date().getFullYear(), defaultValue: `© ${new Date().getFullYear()} SmartServe. All rights reserved.` })}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#FAF7F0] cursor-pointer">{t('footer.privacy_policy', { defaultValue: 'Privacy Policy' })}</span>
            <span className="hover:text-[#FAF7F0] cursor-pointer">{t('footer.terms_of_service', { defaultValue: 'Terms of Service' })}</span>
            <span className="hover:text-[#FAF7F0] cursor-pointer">{t('footer.refund_policy', { defaultValue: 'Refund Policy' })}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default CustomerFooter;
