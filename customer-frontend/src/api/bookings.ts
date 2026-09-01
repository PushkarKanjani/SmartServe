import { apiClient } from './client';
import { BookingStatus } from '../utils/bookingStatus';
import { MOCK_SERVICES } from './catalog';

export interface AddonSelection {
  addon_id: string;
  name: string;
  price: number;
}

export interface CreateBookingPayload {
  service_id: string;
  scheduled_time: string; // ISO or human format
  address: string;
  instructions?: string;
  addons?: AddonSelection[];
  total_price: number;
  emergency_flag?: 'ASAP' | null;
}

export interface TimelineEvent {
  status: BookingStatus;
  timestamp: string;
  note?: string;
}

export interface BookingItem {
  id: string;
  booking_reference: string;
  customer_id: string;
  service_id: string;
  service_name: string;
  service_image: string;
  category: string;
  status: BookingStatus;
  scheduled_time: string;
  address: string;
  instructions?: string;
  addons?: AddonSelection[];
  total_price: number;
  provider_id?: string;
  provider_name?: string;
  provider_phone?: string;
  provider_rating?: number;
  timeline: TimelineEvent[];
  otp?: string;
  payment_status: 'Pending' | 'Completed';
  payment_method: 'COD';
  created_at: string;
  has_feedback?: boolean;
}

export interface FeedbackPayload {
  rating: number;
  review_text?: string;
  image_urls?: string[];
}

// Local memory storage for offline dev persistence
// platform:web
const STORAGE_KEY = 'smartserve_customer_bookings_store';

const getInitialBookings = (): BookingItem[] => {
  // platform:web
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as BookingItem[];
    } catch {
      // ignore
    }
  }

  const defaultMock: BookingItem[] = [
    {
      id: 'bk-1001',
      booking_reference: 'SS-98214',
      customer_id: 'cust-mock-uuid-1001',
      service_id: 'srv-ac-101',
      service_name: 'Split AC Foam Jet Deep Service',
      service_image: MOCK_SERVICES[0]!.image_url,
      category: 'AC Repair',
      status: 'Assigned',
      scheduled_time: '2026-09-02T14:00:00Z',
      address: 'Flat 402, Green Valley Heights, Sector 62, Noida, UP',
      instructions: 'Please call before arrival.',
      addons: [{ addon_id: 'add-1', name: 'Anti-bacterial spray coating', price: 199 }],
      total_price: 898,
      provider_id: 'pro-501',
      provider_name: 'Ramesh Kumar',
      provider_phone: '+91 9812345678',
      provider_rating: 4.9,
      otp: '4829',
      payment_status: 'Pending',
      payment_method: 'COD',
      created_at: '2026-08-31T10:00:00Z',
      timeline: [
        { status: 'Requested', timestamp: '2026-08-31 10:00 AM', note: 'Booking created by customer' },
        { status: 'Assigned', timestamp: '2026-08-31 10:15 AM', note: 'Assigned to provider Ramesh Kumar' },
      ],
    },
    {
      id: 'bk-1002',
      booking_reference: 'SS-98215',
      customer_id: 'cust-mock-uuid-1001',
      service_id: 'srv-clean-201',
      service_name: 'Full Home Deep Cleaning (2 BHK)',
      service_image: MOCK_SERVICES[1]!.image_url,
      category: 'Deep Cleaning',
      status: 'Completed',
      scheduled_time: '2026-08-25T09:00:00Z',
      address: 'Flat 402, Green Valley Heights, Sector 62, Noida, UP',
      total_price: 3499,
      provider_id: 'pro-502',
      provider_name: 'Sunil Sharma Cleaning Services',
      provider_phone: '+91 9876501234',
      provider_rating: 4.8,
      payment_status: 'Completed',
      payment_method: 'COD',
      created_at: '2026-08-24T18:00:00Z',
      has_feedback: true,
      timeline: [
        { status: 'Requested', timestamp: '2026-08-24 06:00 PM' },
        { status: 'Accepted', timestamp: '2026-08-24 06:30 PM' },
        { status: 'Started', timestamp: '2026-08-25 09:05 AM' },
        { status: 'Completed', timestamp: '2026-08-25 01:10 PM' },
      ],
    },
  ];

  // platform:web
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMock));
  return defaultMock;
};

const saveBookingsToStorage = (bookings: BookingItem[]) => {
  // platform:web
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

export const createBooking = async (payload: CreateBookingPayload): Promise<BookingItem> => {
  try {
    const res = await apiClient.post<BookingItem>('/customer/bookings', payload);
    return res.data;
  } catch {
    const service = MOCK_SERVICES.find((s) => s.id === payload.service_id) || MOCK_SERVICES[0]!;
    const newId = 'bk-' + Date.now().toString().slice(-6);
    const refCode = 'SS-' + Math.floor(10000 + Math.random() * 90000);

    const newBooking: BookingItem = {
      id: newId,
      booking_reference: refCode,
      customer_id: 'cust-mock-uuid-1001',
      service_id: service.id,
      service_name: service.name,
      service_image: service.image_url,
      category: service.category,
      status: 'Requested',
      scheduled_time: payload.scheduled_time,
      address: payload.address,
      instructions: payload.instructions,
      addons: payload.addons,
      total_price: payload.total_price,
      payment_status: 'Pending',
      payment_method: 'COD',
      created_at: new Date().toISOString(),
      timeline: [
        {
          status: 'Requested',
          timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          note: payload.emergency_flag === 'ASAP' ? 'ASAP Emergency dispatch requested' : 'Standard booking request',
        },
      ],
    };

    const currentList = getInitialBookings();
    const updatedList = [newBooking, ...currentList];
    saveBookingsToStorage(updatedList);
    return newBooking;
  }
};

export const getCustomerBookings = async (statusFilter?: string): Promise<BookingItem[]> => {
  try {
    const res = await apiClient.get<BookingItem[]>('/customer/bookings', {
      params: { status_filter: statusFilter },
    });
    return res.data;
  } catch {
    const all = getInitialBookings();
    if (!statusFilter || statusFilter === 'all') return all;

    if (statusFilter === 'upcoming') {
      return all.filter((b) => ['Requested', 'Assigned', 'Accepted', 'Started'].includes(b.status));
    }
    if (statusFilter === 'active') {
      return all.filter((b) => ['Started'].includes(b.status));
    }
    if (statusFilter === 'completed') {
      return all.filter((b) => b.status === 'Completed');
    }
    if (statusFilter === 'cancelled') {
      return all.filter((b) => ['Cancelled', 'Rejected', 'Expired'].includes(b.status));
    }
    return all;
  }
};

export const getBookingDetail = async (id: string): Promise<BookingItem> => {
  try {
    const res = await apiClient.get<BookingItem>(`/customer/bookings/${id}`);
    return res.data;
  } catch {
    const all = getInitialBookings();
    const found = all.find((b) => b.id === id);
    if (found) return found;
    return all[0]!;
  }
};

export const cancelBooking = async (id: string, reason: string): Promise<BookingItem> => {
  try {
    const res = await apiClient.post<BookingItem>(`/customer/bookings/${id}/cancel`, { reason });
    return res.data;
  } catch {
    const all = getInitialBookings();
    const updated = all.map((b) => {
      if (b.id === id) {
        return {
          ...b,
          status: 'Cancelled' as BookingStatus,
          timeline: [
            ...b.timeline,
            {
              status: 'Cancelled' as BookingStatus,
              timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
              note: `Cancelled by customer: ${reason}`,
            },
          ],
        };
      }
      return b;
    });
    saveBookingsToStorage(updated);
    return updated.find((b) => b.id === id)!;
  }
};

export const submitBookingFeedback = async (id: string, payload: FeedbackPayload): Promise<void> => {
  try {
    await apiClient.post(`/customer/bookings/${id}/feedback`, payload);
  } catch {
    const all = getInitialBookings();
    const updated = all.map((b) => {
      if (b.id === id) {
        return { ...b, has_feedback: true };
      }
      return b;
    });
    saveBookingsToStorage(updated);
  }
};

export const markBookingAsPaid = async (id: string): Promise<BookingItem> => {
  const all = getInitialBookings();
  const updated = all.map((b) => {
    if (b.id === id) {
      return { ...b, payment_status: 'Completed' as const };
    }
    return b;
  });
  saveBookingsToStorage(updated);
  return updated.find((b) => b.id === id)!;
};
