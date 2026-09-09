import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
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
      <div className="flex justify-center items-center h-64 text-[#1F2A1E]/60 text-sm font-medium animate-pulse">
        Loading services...
      </div>
    );
  }

  // Group by Category -> Subcategory
  const grouped = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = {};
    if (!acc[service.category][service.subcategory]) acc[service.category][service.subcategory] = [];
    acc[service.category][service.subcategory].push(service);
    return acc;
  }, {} as Record<string, Record<string, ProviderService[]>>);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="font-serif-display text-3xl font-bold text-[#1F2A1E] tracking-tight">My Services</h1>
        <p className="text-[#1F2A1E]/70 mt-2 text-sm max-w-2xl">
          These are the services you are verified to perform. Prices, durations, and add-ons are synchronized with the SmartServe Master Catalog to ensure consistency across the platform. Contact support to request additional service approvals.
        </p>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#2F5233]/10 shadow-sm">
          <ShieldCheck className="w-12 h-12 text-[#2F5233]/30 mx-auto mb-4" />
          <h3 className="font-serif-display text-xl font-bold text-[#1F2A1E]">No Approved Services</h3>
          <p className="text-[#1F2A1E]/60 mt-2 max-w-md mx-auto">
            You don't have any verified services linked to your account yet. Our onboarding team is reviewing your profile.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, subcategories]) => (
            <div key={category} className="bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm overflow-hidden">
              <div className="bg-[#FAF7F0] px-6 py-4 border-b border-[#2F5233]/10">
                <h2 className="font-serif-display text-xl font-bold text-[#2F5233] uppercase tracking-wide">{category}</h2>
              </div>
              
              <div className="divide-y divide-[#2F5233]/5">
                {Object.entries(subcategories).map(([subcategory, items]) => (
                  <div key={subcategory} className="p-6">
                    <h3 className="text-sm font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      {subcategory}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                      {items.map((svc) => (
                        <div key={svc.id} className="border border-[#2F5233]/10 rounded-2xl p-5 hover:border-[#2F5233]/30 transition-colors bg-white relative overflow-hidden group">
                          {svc.is_emergency_eligible && (
                            <div className="absolute top-0 right-0 bg-red-50 text-red-600 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl border-l border-b border-red-100 flex items-center gap-1 shadow-sm">
                              <AlertTriangle className="w-3 h-3" />
                              Emergency Eligible
                            </div>
                          )}
                          
                          <div className="flex justify-between items-start mb-3 pr-24">
                            <h4 className="font-bold text-[#1F2A1E] text-base">{svc.service_name}</h4>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 mb-4 text-xs">
                            <div className="flex items-center gap-1.5 text-[#2F5233] bg-[#2F5233]/5 px-2 py-1 rounded-md font-semibold">
                              <span className="text-[#1F2A1E]/50">Base:</span>
                              ₹{svc.base_price.toFixed(2)}
                            </div>
                            <div className="flex items-center gap-1.5 text-[#1F2A1E]/70 bg-slate-50 px-2 py-1 rounded-md">
                              <Clock className="w-3.5 h-3.5 text-[#1F2A1E]/40" />
                              {svc.duration_minutes} mins
                            </div>
                          </div>
                          
                          {(svc.distinct_features?.length > 0 || svc.suggested_addons?.length > 0) && (
                            <div className="mt-4 pt-4 border-t border-[#2F5233]/5 space-y-3">
                              {svc.distinct_features?.length > 0 && (
                                <div>
                                  <span className="text-[10px] font-bold text-[#1F2A1E]/40 uppercase tracking-wider block mb-1">Features</span>
                                  <ul className="text-xs text-[#1F2A1E]/70 space-y-1 pl-3 list-disc marker:text-[#2F5233]/30">
                                    {svc.distinct_features.map((f, i) => <li key={i}>{f}</li>)}
                                  </ul>
                                </div>
                              )}
                              {svc.suggested_addons?.length > 0 && (
                                <div>
                                  <span className="text-[10px] font-bold text-[#1F2A1E]/40 uppercase tracking-wider block mb-1">Standard Add-ons</span>
                                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    {svc.suggested_addons.map((a, i) => (
                                      <span key={i} className="text-[10px] bg-[#FAF7F0] text-[#7A9E6E] px-2 py-0.5 rounded-full font-medium border border-[#2F5233]/10">
                                        {a}
                                      </span>
                                    ))}
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
