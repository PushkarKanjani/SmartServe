import { FC, useEffect, useState, FormEvent } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { getServiceById, ServiceItem, AddonItem } from '../../api/catalog';
import { createBooking } from '../../api/bookings';
import { BookingForm, BookingFormData } from '../../components/booking/BookingForm';
import { PriceBreakdown } from '../../components/booking/PriceBreakdown';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Skeleton } from '../../components/ui/Skeleton';
import { useToast } from '../../hooks/useToast';
import { formatCurrencyINR } from '../../utils/formatters';
import { ArrowLeft, CheckCircle2, CalendarCheck, Compass } from 'lucide-react';

export const CreateBooking: FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const addonIdsParam = searchParams.get('addons') || '';
  const selectedAddonIds = addonIdsParam ? addonIdsParam.split(',') : [];

  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successBookingId, setSuccessBookingId] = useState<string | null>(null);
  const [successRefCode, setSuccessRefCode] = useState<string>('');

  const [formData, setFormData] = useState<BookingFormData>({
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0] || '',
    time: '14:00',
    address: '',
    instructions: '',
    isEmergency: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        if (serviceId) {
          const data = await getServiceById(serviceId);
          setService(data);
          if (data.is_emergency) {
            setFormData((prev) => ({ ...prev, isEmergency: true }));
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  if (loading || !service) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse pb-12">
        <Skeleton variant="text" width="40%" height={32} />
        <Skeleton variant="rectangular" height={120} className="rounded-2xl" />
        <Skeleton variant="rectangular" height={300} className="rounded-2xl" />
      </div>
    );
  }

  const selectedAddons: AddonItem[] = service.suggested_addons.filter((a) =>
    selectedAddonIds.includes(a.addon_id)
  );

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = service.base_price + addonsTotal;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};
    if (!formData.isEmergency) {
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.time) newErrors.time = 'Time slot is required';
    }
    if (formData.address.trim().length < 10) {
      newErrors.address = 'Full address (at least 10 characters) is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fix the errors in the booking form.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const scheduledTimeStr = formData.isEmergency
        ? new Date().toISOString()
        : `${formData.date}T${formData.time}:00Z`;

      const result = await createBooking({
        service_id: service.id,
        scheduled_time: scheduledTimeStr,
        address: formData.address.trim(),
        instructions: formData.instructions.trim() || undefined,
        addons: selectedAddons.map((a) => ({ addon_id: a.addon_id, name: a.name, price: a.price })),
        total_price: totalPrice,
        emergency_flag: formData.isEmergency ? 'ASAP' : null,
      });

      setSuccessBookingId(result.id);
      setSuccessRefCode(result.booking_reference);
      showToast('Booking request submitted successfully!', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit booking';
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Back Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full p-2 text-slate-600 hover:bg-slate-100 transition"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Create Booking</h1>
          <p className="text-sm text-slate-500">Confirm slot and location for your service</p>
        </div>
      </div>

      {/* Service Summary Strip */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <img
            src={service.image_url}
            alt={service.name}
            className="h-16 w-16 rounded-xl object-cover border border-slate-200 shrink-0"
          />
          <div>
            <h3 className="text-base font-bold text-slate-900">{service.name}</h3>
            <p className="text-xs text-slate-500">{service.category}</p>
            {selectedAddons.length > 0 && (
              <p className="text-xs text-[#2563EB] font-semibold mt-0.5">
                Add-ons: {selectedAddons.map((a) => a.name).join(', ')}
              </p>
            )}
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs text-slate-400 font-medium">Estimated Total</span>
          <p className="text-xl font-extrabold text-[#2563EB]">
            {formatCurrencyINR(totalPrice)}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form (2 cols on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <BookingForm
            data={formData}
            onChange={setFormData}
            isEmergencyService={service.is_emergency}
            errors={errors}
          />
        </div>

        {/* Right Rail: Price Summary */}
        <div className="space-y-6">
          <PriceBreakdown
            basePrice={service.base_price}
            addons={selectedAddons.map((a) => ({ addon_id: a.addon_id, name: a.name, price: a.price }))}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={submitting}
            className="shadow-md"
          >
            Confirm Booking — Pay {formatCurrencyINR(totalPrice)} COD
          </Button>

          <p className="text-center text-xs text-slate-500 leading-relaxed">
            By confirming, you agree to allow the assigned SmartServe technician to perform service at your specified address.
          </p>
        </div>
      </form>

      {/* Success Modal */}
      {successBookingId && (
        <Modal isOpen={true} onClose={() => navigate(`/bookings/${successBookingId}`)} size="md">
          <div className="text-center space-y-5 p-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Booking Confirmed!</h3>
              <p className="text-sm font-semibold text-[#2563EB] mt-1">
                Booking Reference: {successRefCode}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Your request has been logged. A provider will be assigned shortly and arrive at your scheduled time.
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-2.5">
              <Link to={`/bookings/${successBookingId}`}>
                <Button variant="primary" fullWidth icon={<CalendarCheck className="h-4 w-4" />}>
                  View Booking Status
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="secondary" fullWidth icon={<Compass className="h-4 w-4" />}>
                  Browse More Services
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CreateBooking;
