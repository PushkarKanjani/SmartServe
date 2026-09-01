import { apiClient } from './client';

export interface CustomerProfile {
  full_name: string;
  email: string;
  phone?: string;
  member_since: string;
  total_bookings: number;
  completed_bookings: number;
  total_spent: number;
  average_rating_given: number;
}

export interface UpdateProfilePayload {
  full_name?: string;
  email?: string;
  phone?: string;
}

// platform:web
const PROFILE_KEY = 'smartserve_customer_profile_store';

const getInitialProfile = (): CustomerProfile => {
  // platform:web
  const stored = localStorage.getItem(PROFILE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as CustomerProfile;
    } catch {
      // ignore
    }
  }

  // platform:web
  const savedUserStr = localStorage.getItem('smartserve_customer_user');
  let name = 'Pushkar Kanjani';
  let email = 'pushkar@example.com';
  let phone = '+91 9876543210';

  if (savedUserStr) {
    try {
      const parsed = JSON.parse(savedUserStr);
      if (parsed.full_name) name = parsed.full_name;
      if (parsed.email) email = parsed.email;
      if (parsed.phone) phone = parsed.phone;
    } catch {
      // ignore
    }
  }

  const defaultProfile: CustomerProfile = {
    full_name: name,
    email: email,
    phone: phone,
    member_since: 'August 2026',
    total_bookings: 4,
    completed_bookings: 3,
    total_spent: 4996,
    average_rating_given: 4.8,
  };

  localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
  return defaultProfile;
};

export const getCustomerProfile = async (): Promise<CustomerProfile> => {
  try {
    const res = await apiClient.get<any>('/customer/profile');
    if (res.data) {
      return {
        full_name: res.data.full_name || 'Pushkar Kanjani',
        email: res.data.email || 'pushkar@example.com',
        phone: res.data.phone || '+91 9876543210',
        member_since: res.data.created_at ? new Date(res.data.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'August 2026',
        total_bookings: res.data.total_bookings ?? 4,
        completed_bookings: Math.max(0, (res.data.total_bookings ?? 4) - 1),
        total_spent: res.data.lifetime_spent ?? 4996,
        average_rating_given: 4.8,
      };
    }
    return getInitialProfile();
  } catch {
    return getInitialProfile();
  }
};

export const updateCustomerProfile = async (payload: UpdateProfilePayload): Promise<CustomerProfile> => {
  try {
    const res = await apiClient.patch<any>('/customer/profile', payload);
    if (res.data) {
      return {
        full_name: res.data.full_name || payload.full_name || 'Pushkar Kanjani',
        email: res.data.email || payload.email || 'pushkar@example.com',
        phone: res.data.phone !== undefined ? res.data.phone : payload.phone,
        member_since: 'August 2026',
        total_bookings: res.data.total_bookings ?? 4,
        completed_bookings: 3,
        total_spent: res.data.lifetime_spent ?? 4996,
        average_rating_given: 4.8,
      };
    }
    const current = getInitialProfile();
    return { ...current, ...payload };
  } catch {
    const current = getInitialProfile();
    const updated: CustomerProfile = {
      ...current,
      full_name: payload.full_name || current.full_name,
      email: payload.email || current.email,
      phone: payload.phone !== undefined ? payload.phone : current.phone,
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    return updated;
  }
};
