import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getServiceById, ServiceItem } from '../../api/catalog';
import { ServiceHero } from '../../components/customer/ServiceHero';
import { AddonList } from '../../components/customer/AddonList';
import { StickyBookingBar } from '../../components/customer/StickyBookingBar';
import { Accordion } from '../../components/ui/Accordion';
import { Tabs } from '../../components/ui/Tabs';
import { Badge } from '../../components/ui/Badge';
import { Rating } from '../../components/ui/Rating';
import { Skeleton } from '../../components/ui/Skeleton';
import { formatCurrencyINR, formatDuration } from '../../utils/formatters';
import { Zap, Clock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';

export const ServiceDetail: FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        if (serviceId) {
          const data = await getServiceById(serviceId);
          setService(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [serviceId]);

  if (loading || !service) {
    return (
      <div className="space-y-6 animate-pulse pb-24">
        <Skeleton variant="rectangular" height={300} className="rounded-3xl" />
        <Skeleton variant="text" width="60%" className="h-8" />
        <Skeleton variant="rectangular" height={200} className="rounded-2xl" />
      </div>
    );
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const addonsTotal = service.suggested_addons
    .filter((a) => selectedAddonIds.includes(a.addon_id))
    .reduce((sum, a) => sum + a.price, 0);

  const totalPrice = service.base_price + addonsTotal;

  const handleContinueToBook = () => {
    const addonQuery = selectedAddonIds.length > 0 ? `?addons=${selectedAddonIds.join(',')}` : '';
    navigate(`/book/${service.id}${addonQuery}`);
  };

  return (
    <div className="space-y-8 pb-32">
      {/* 1. Hero Image */}
      <ServiceHero imageUrl={service.image_url} title={service.name} />

      {/* 2. Title Block */}
      <div className="space-y-3">
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/home" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/explore" className="hover:text-slate-900">Explore</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/explore/category/${service.category_slug}`} className="hover:text-slate-900">{service.category}</Link>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{service.name}</h1>
              {service.is_emergency && (
                <Badge variant="danger" size="sm" icon={<Zap className="h-3 w-3 fill-current" />}>
                  ASAP Emergency
                </Badge>
              )}
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm text-slate-600">
              <Rating value={service.rating} size="sm" showValue />
              <span className="text-slate-400">·</span>
              <span>{service.review_count} reviews</span>
              <span className="text-slate-400">·</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{formatDuration(service.duration_minutes)}</span>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 font-medium">Base Price</span>
            <p className="text-3xl font-extrabold text-[#2563EB]">
              {formatCurrencyINR(service.base_price)}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        items={[
          { id: 'overview', label: 'Overview' },
          { id: 'included', label: "What's Included", count: service.process_steps.length },
          { id: 'addons', label: 'Add-ons', count: service.suggested_addons.length },
          { id: 'faqs', label: 'FAQs', count: service.faqs.length },
        ]}
      />

      {/* 4. Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Service Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>

              <h4 className="text-sm font-bold text-slate-800 pt-2">Key Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notes Callout */}
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Important Notes:</span> Please ensure a continuous power and water supply at the service location. The service provider will verify the problem before starting.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'included' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 animate-fade-in space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Step-by-Step Service Process</h3>
            <div className="relative pl-6 border-l-2 border-blue-200 space-y-8">
              {service.process_steps.map((step) => (
                <div key={step.step_number} className="relative">
                  <div className="absolute -left-[31px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white ring-4 ring-white">
                    {step.step_number}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      <Clock className="h-3 w-3 text-slate-400" />
                      ~{step.duration_minutes} mins
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'addons' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900">Customize Your Booking with Add-ons</h3>
            <AddonList
              addons={service.suggested_addons}
              selectedAddonIds={selectedAddonIds}
              onToggleAddon={toggleAddon}
            />
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
            <Accordion
              items={service.faqs.map((faq, i) => ({
                id: `faq-${i}`,
                title: faq.question,
                content: faq.answer,
              }))}
            />
          </div>
        )}
      </div>

      {/* 5. Sticky Bottom Bar */}
      <StickyBookingBar
        totalPrice={totalPrice}
        selectedAddonCount={selectedAddonIds.length}
        onBook={handleContinueToBook}
      />
    </div>
  );
};

export default ServiceDetail;
