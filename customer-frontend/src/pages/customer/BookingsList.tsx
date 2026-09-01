import { FC, useEffect, useState } from 'react';
import { getCustomerBookings, cancelBooking, submitBookingFeedback, BookingItem } from '../../api/bookings';
import { BookingCard } from '../../components/booking/BookingCard';
import { BookingTabs } from '../../components/booking/BookingTabs';
import { CancelBookingModal } from '../../components/booking/CancelBookingModal';
import { FeedbackModal } from '../../components/booking/FeedbackModal';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../hooks/useToast';
import { CalendarCheck } from 'lucide-react';

export const BookingsList: FC = () => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const [allBookings, setAllBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<BookingItem | null>(null);
  const [selectedBookingForFeedback, setSelectedBookingForFeedback] = useState<BookingItem | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getCustomerBookings('all');
      setAllBookings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const counts = {
    upcoming: allBookings.filter((b) => ['Requested', 'Assigned', 'Accepted', 'Started'].includes(b.status)).length,
    active: allBookings.filter((b) => b.status === 'Started').length,
    completed: allBookings.filter((b) => b.status === 'Completed').length,
    cancelled: allBookings.filter((b) => ['Cancelled', 'Rejected', 'Expired'].includes(b.status)).length,
  };

  const filteredBookings = allBookings.filter((b) => {
    if (activeTab === 'upcoming') return ['Requested', 'Assigned', 'Accepted', 'Started'].includes(b.status);
    if (activeTab === 'active') return b.status === 'Started';
    if (activeTab === 'completed') return b.status === 'Completed';
    if (activeTab === 'cancelled') return ['Cancelled', 'Rejected', 'Expired'].includes(b.status);
    return true;
  });

  const handleConfirmCancel = async (reason: string) => {
    if (!selectedBookingForCancel) return;
    setModalLoading(true);
    try {
      await cancelBooking(selectedBookingForCancel.id, reason);
      showToast('Booking cancelled successfully', 'info');
      await fetchBookings();
    } catch {
      showToast('Failed to cancel booking', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  const handleConfirmFeedback = async (payload: { rating: number; review_text?: string }) => {
    if (!selectedBookingForFeedback) return;
    setModalLoading(true);
    try {
      await submitBookingFeedback(selectedBookingForFeedback.id, payload);
      showToast('Thank you for rating your service!', 'success');
      await fetchBookings();
    } catch {
      showToast('Failed to submit rating', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">My Bookings</h1>
        <p className="text-sm text-slate-500 mt-1">Track and manage your upcoming, active, and past service appointments</p>
      </div>

      <BookingTabs activeTab={activeTab} onChange={setActiveTab} counts={counts} />

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={160} className="rounded-2xl" />
          ))}
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancelClick={setSelectedBookingForCancel}
              onRateClick={setSelectedBookingForFeedback}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<CalendarCheck className="h-6 w-6" />}
          title={`No ${activeTab} bookings`}
          description={`You currently have no ${activeTab} bookings.`}
        />
      )}

      {/* Cancellation Modal */}
      {selectedBookingForCancel && (
        <CancelBookingModal
          isOpen={!!selectedBookingForCancel}
          onClose={() => setSelectedBookingForCancel(null)}
          onConfirm={handleConfirmCancel}
          loading={modalLoading}
        />
      )}

      {/* Feedback Rating Modal */}
      {selectedBookingForFeedback && (
        <FeedbackModal
          isOpen={!!selectedBookingForFeedback}
          onClose={() => setSelectedBookingForFeedback(null)}
          onSubmit={handleConfirmFeedback}
          serviceName={selectedBookingForFeedback.service_name}
          loading={modalLoading}
        />
      )}
    </div>
  );
};

export default BookingsList;
