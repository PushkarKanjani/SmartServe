import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookingDetail, cancelBooking, markBookingAsPaid, submitBookingFeedback, BookingItem } from '../../api/bookings';
import { StatusBadge } from '../../components/booking/StatusBadge';
import { BookingTimeline } from '../../components/booking/BookingTimeline';
import { PaymentCard } from '../../components/booking/PaymentCard';
import { CancelBookingModal } from '../../components/booking/CancelBookingModal';
import { FeedbackModal } from '../../components/booking/FeedbackModal';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Rating } from '../../components/ui/Rating';
import { Skeleton } from '../../components/ui/Skeleton';
import { useToast } from '../../hooks/useToast';
import { formatCurrencyINR } from '../../utils/formatters';
import { ArrowLeft, Phone, LifeBuoy, Star, KeyRound, MapPin, FileText } from 'lucide-react';

export const BookingDetail: FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [booking, setBooking] = useState<BookingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      if (bookingId) {
        const data = await getBookingDetail(bookingId);
        setBooking(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [bookingId]);

  if (loading || !booking) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse pb-16">
        <Skeleton variant="text" width="50%" height={32} />
        <Skeleton variant="rectangular" height={160} className="rounded-2xl" />
        <Skeleton variant="rectangular" height={300} className="rounded-2xl" />
      </div>
    );
  }

  const handleCancelBooking = async (reason: string) => {
    setActionLoading(true);
    try {
      await cancelBooking(booking.id, reason);
      showToast('Booking cancelled', 'info');
      await fetchDetail();
    } catch {
      showToast('Failed to cancel booking', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkPaid = async () => {
    setActionLoading(true);
    try {
      await markBookingAsPaid(booking.id);
      showToast('Payment confirmed as collected', 'success');
      await fetchDetail();
    } catch {
      showToast('Failed to update payment status', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleFeedbackSubmit = async (payload: { rating: number; review_text?: string }) => {
    setActionLoading(true);
    try {
      await submitBookingFeedback(booking.id, payload);
      showToast('Thank you for rating your service!', 'success');
      await fetchDetail();
    } catch {
      showToast('Failed to submit rating', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const formattedScheduledDate = new Date(booking.scheduled_time).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/bookings')}
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 transition"
            aria-label="Back to bookings"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Booking #{booking.booking_reference}
              </h1>
              <StatusBadge status={booking.status} />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Booked on {new Date(booking.created_at).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <Link to={`/support/new?booking_id=${booking.id}`}>
          <Button variant="secondary" size="sm" icon={<LifeBuoy className="h-4 w-4" />}>
            Report Issue
          </Button>
        </Link>
      </div>

      {/* Booking Summary Card */}
      <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <img
            src={booking.service_image}
            alt={booking.service_name}
            className="h-20 w-20 rounded-2xl object-cover border border-slate-200 shrink-0"
          />
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">{booking.category}</span>
            <h2 className="text-lg font-extrabold text-slate-900">{booking.service_name}</h2>
            <p className="text-xs text-[#2563EB] font-bold">Scheduled for: {formattedScheduledDate}</p>
          </div>
        </div>

        <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between">
          <span className="text-xs text-slate-400 font-medium">Total Price</span>
          <p className="text-2xl font-extrabold text-[#2563EB]">
            {formatCurrencyINR(booking.total_price)}
          </p>
        </div>
      </Card>

      {/* OTP Display Card (when Started) */}
      {booking.status === 'Started' && booking.otp && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shrink-0">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900">Service Completion OTP</p>
              <p className="text-xs text-amber-700">Share this code with your provider once service is completed.</p>
            </div>
          </div>
          <span className="text-2xl font-mono font-extrabold text-amber-950 tracking-wider">
            {booking.otp}
          </span>
        </div>
      )}

      {/* Provider Card (if assigned) */}
      {booking.provider_name ? (
        <Card className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            Assigned Service Provider
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <Avatar name={booking.provider_name} size="lg" />
              <div>
                <p className="text-base font-bold text-slate-900">{booking.provider_name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Rating value={booking.provider_rating || 4.8} size="sm" showValue />
                  <span className="text-xs text-slate-400">· Certified Technician</span>
                </div>
              </div>
            </div>

            {booking.provider_phone && (
              <a href={`tel:${booking.provider_phone}`}>
                <Button variant="secondary" size="sm" icon={<Phone className="h-4 w-4 text-emerald-600" />}>
                  Call Provider
                </Button>
              </a>
            )}
          </div>
        </Card>
      ) : (
        <Card className="flex items-center justify-between bg-slate-50">
          <div>
            <p className="text-sm font-bold text-slate-800">Awaiting Provider Assignment</p>
            <p className="text-xs text-slate-500">Our dispatch engine is matching top-rated technicians nearby.</p>
          </div>
        </Card>
      )}

      {/* Address & Instructions */}
      <Card className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          Service Location & Details
        </h3>
        <div className="flex items-start gap-3 text-sm text-slate-700">
          <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900">Address: </span>
            <span>{booking.address}</span>
          </div>
        </div>
        {booking.instructions && (
          <div className="flex items-start gap-3 text-sm text-slate-700">
            <FileText className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900">Special Notes: </span>
              <span>{booking.instructions}</span>
            </div>
          </div>
        )}
      </Card>

      {/* Timeline & Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BookingTimeline timeline={booking.timeline} />
        <PaymentCard
          totalPrice={booking.total_price}
          paymentStatus={booking.payment_status}
          paymentMethod={booking.payment_method}
          bookingStatus={booking.status}
          onMarkPaid={handleMarkPaid}
          loading={actionLoading}
        />
      </div>

      {/* Action CTA Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div>
          {['Requested', 'Assigned'].includes(booking.status) && (
            <Button
              variant="danger"
              onClick={() => setCancelModalOpen(true)}
              loading={actionLoading}
            >
              Cancel Booking
            </Button>
          )}

          {booking.status === 'Completed' && !booking.has_feedback && (
            <Button
              variant="primary"
              icon={<Star className="h-4 w-4 fill-current" />}
              onClick={() => setFeedbackModalOpen(true)}
            >
              Rate Service & Leave Review
            </Button>
          )}
        </div>

        <Link to="/bookings">
          <Button variant="secondary">Back to Bookings List</Button>
        </Link>
      </div>

      {/* Cancellation Modal */}
      <CancelBookingModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleCancelBooking}
        loading={actionLoading}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        serviceName={booking.service_name}
        loading={actionLoading}
      />
    </div>
  );
};

export default BookingDetail;
