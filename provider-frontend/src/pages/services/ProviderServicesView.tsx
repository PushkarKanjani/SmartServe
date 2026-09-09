import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, AlertTriangle, ChevronRight, Briefcase } from 'lucide-react';
import { apiClient } from '../../api/client';

interface ProviderService {
  id: string;
  service_id: string;
  price: number;
  duration_minutes: number;
  active: boolean;
  service_name: string;
  category: string;
  subcategory: string;
  base_price: number;
  is_emergency_eligible: boolean;
  distinct_features: string[];
  suggested_addons: string[];
}

export const ProviderServicesView: React.FC = () => {
  const [services, setServices] = useState<ProviderService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await apiClient.get('/providers/me/services');
        setServices(res.data);
      } catch (err) {
        console.error('Failed to load services', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-[#1F2A1E]/60 text-sm font-semibold space-y-3">
        <div className="w-8 h-8 border-4 border-[#2F5233] border-t-transparent rounded-full animate-spin" />
        <span>Loading approved catalog services...</span>
      </div>
    );
  }

  // Group by Category -> Subcategory
  const grouped = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = {};
    const catGroup = acc[service.category]!;
    if (!catGroup[service.subcategory]) catGroup[service.subcategory] = [];
    catGroup[service.subcategory]!.push(service);
    return acc;
  }, {} as Record<string, Record<string, ProviderService[]>>);

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      {/* ── Header Banner ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DEC9] shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2A1E] tracking-tight">
              My Offered Services
            </h1>
            <span className="text-xs font-bold text-[#2F5233] bg-[#F2EDE1] px-3 py-1 rounded-full border border-[#E5DEC9]">
              {services.length} Approved Services
            </span>
          </div>
          <p className="text-sm text-[#1F2A1E]/65 font-medium mt-1 max-w-2xl leading-relaxed">
            These services are active in your marketplace portfolio. Rates and duration are verified and synchronized with the SmartServe Master Catalog.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto bg-[#FAF7F0] border border-[#E5DEC9] px-4 py-2.5 rounded-2xl text-xs font-bold text-emerald-800 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Catalog Synced</span>
        </div>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E5DEC9] shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF7F0] border border-[#E5DEC9] flex items-center justify-center text-[#2F5233] mx-auto">
            <Briefcase className="w-7 h-7 text-[#2F5233]/40" />
          </div>
          <h3 className="font-serif-display text-xl font-bold text-[#1F2A1E]">No Approved Services Linked</h3>
          <p className="text-xs text-[#1F2A1E]/60 max-w-md mx-auto leading-relaxed">
            You don't have any verified services linked to your account yet. Complete your onboarding or contact support to request category additions.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, subcategories]) => (
            <div key={category} className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xs overflow-hidden">
              <div className="bg-[#FAF7F0] px-6 py-4 border-b border-[#E5DEC9] flex items-center justify-between">
                <h2 className="font-serif-display text-lg sm:text-xl font-bold text-[#1F2A1E]">
                  {category}
                </h2>
                <span className="text-[10px] font-bold text-[#7A9E6E] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#E5DEC9]">
                  Verified Category
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {Object.entries(subcategories).map(([subcategory, items]) => (
                  <div key={subcategory} className="p-6">
                    <h3 className="text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <ChevronRight className="w-4 h-4 text-[#C9A15A]" />
                      <span>{subcategory}</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 sm:pl-5">
                      {items.map((svc) => (
                        <div
                          key={svc.id}
                          className="border border-[#E5DEC9] rounded-2xl p-5 hover:border-[#2F5233]/40 transition-all bg-[#FAF7F0]/40 relative overflow-hidden group shadow-2xs"
                        >
                          {svc.is_emergency_eligible && (
                            <div className="absolute top-0 right-0 bg-rose-50 text-rose-700 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl border-l border-b border-rose-200 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Emergency Eligible
                            </div>
                          )}

                          <div className="flex justify-between items-start mb-3 pr-20">
                            <h4 className="font-bold text-[#1F2A1E] text-base">{svc.service_name}</h4>
                          </div>

                          <div className="flex flex-wrap gap-2.5 mb-4 text-xs">
                            <div className="flex items-center gap-1.5 text-[#2F5233] bg-[#F2EDE1] px-3 py-1 rounded-xl font-bold border border-[#E5DEC9]">
                              <span className="text-[#1F2A1E]/50 font-normal">Base Rate:</span>
                              <span>₹{Number(svc.base_price).toFixed(0)}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#1F2A1E]/70 bg-white px-3 py-1 rounded-xl border border-[#E5DEC9] font-medium">
                              <Clock className="w-3.5 h-3.5 text-[#C9A15A]" />
                              <span>{svc.duration_minutes} mins</span>
                            </div>
                          </div>

                          {(Boolean(svc.distinct_features) || Boolean(svc.suggested_addons)) && (
                            <div className="mt-3 pt-3 border-t border-[#E5DEC9]/60 space-y-2">
                              {Array.isArray(svc.distinct_features) && svc.distinct_features.length > 0 && (
                                <div>
                                  <span className="text-[10px] font-bold text-[#1F2A1E]/50 uppercase tracking-wider block mb-1">
                                    Service Inclusions
                                  </span>
                                  <ul className="text-xs text-[#1F2A1E]/75 space-y-1 pl-4 list-disc marker:text-[#2F5233]">
                                    {svc.distinct_features.map((f: any, i: number) => (
                                      <li key={i}>{typeof f === 'string' ? f : f.title || f.name || f.text}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {Array.isArray(svc.suggested_addons) && svc.suggested_addons.length > 0 && (
                                <div>
                                  <span className="text-[10px] font-bold text-[#1F2A1E]/50 uppercase tracking-wider block mb-1">
                                    Standard Add-ons
                                  </span>
                                  <div className="flex flex-wrap gap-1.5 mt-1">
                                    {svc.suggested_addons.map((a: any, i: number) => {
                                      const label = typeof a === 'string' ? a : a.name || a.title || 'Add-on';
                                      return (
                                        <span
                                          key={i}
                                          className="text-[10px] bg-white text-[#2F5233] px-2.5 py-0.5 rounded-full font-semibold border border-[#E5DEC9]"
                                        >
                                          + {label}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderServicesView;
