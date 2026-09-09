import { apiClient } from './client';

export interface AdminAIVerificationSummary {
  recommendation: string;
  risk_level: string;
  risk_score: number;
  documents_complete: boolean;
  submitted_documents_count: number;
  required_documents_count: number;
  missing_documents: string[];
  information_mismatches: string[];
  expired_invalid_documents: string[];
  suspicious_signals: string[];
  positive_signals: string[];
  reasons: string[];
  disclaimer: string;
}

export interface ProviderItem {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  category: string;
  skills?: string;
  service_area?: string;
  experience_years: number;
  base_price: number;
  is_verified: boolean;
  is_active: boolean;
  verification_status: string; // "Verified" | "Pending" | "Rejected" | "Correction Requested"
  reliability_score: number;
  acceptance_rate: number;
  on_time_rate: number;
  cancellation_rate: number;
  rating: number;
  completed_bookings: number;
  composite_rank_score: number;
  rank_tier: string;
  created_at: string;
  ai_verification_summary?: AdminAIVerificationSummary;
  documents: Array<{
    id: string;
    document_url: string;
    certificate_type: string;
    document_number?: string;
    extracted_name?: string;
    is_duplicate: boolean;
    verification_status: string;
    uploaded_at?: string;
    verified_at?: string;
    ai_scan_signal?: any;
  }>;
  services?: Array<{
    id: string;
    name: string;
    category: string;
    subcategory?: string;
    base_price: number;
    is_active: boolean;
  }>;
  audit_logs?: Array<{
    id: string;
    action: string;
    actor_email: string;
    actor_role: string;
    created_at: string;
    metadata_json?: any;
  }>;
  slots?: AdminProviderSlotItem[];
  bookings?: AdminProviderBookingItem[];
}

export interface AdminSlotOccupiedBooking {
  booking_id: string;
  booking_reference: string;
  customer_id: string;
  customer_name: string;
  customer_phone?: string;
  service_id: string;
  service_name: string;
  status: string;
  emergency_flag?: string | null;
  scheduled_time: string;
  total_price: number;
}

export interface AdminProviderSlotItem {
  id: string;
  provider_id: string;
  provider_name: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  status: string;
  is_occupied: boolean;
  occupied_booking?: AdminSlotOccupiedBooking | null;
  created_at?: string | null;
}

export interface AdminProviderBookingItem {
  id: string;
  booking_reference: string;
  customer_id: string;
  customer_name: string;
  customer_phone?: string;
  provider_id?: string;
  provider_name?: string;
  service_id: string;
  service_name: string;
  status: string;
  emergency_flag?: string | null;
  scheduled_time: string;
  requested_slot?: string;
  address: string;
  total_price: number;
  payment_status: string;
  created_at: string;
}

export interface ProviderRanking {
  provider_user_id: string;
  full_name: string;
  category: string;
  reliability_score: number;
  acceptance_rate: number;
  on_time_rate: number;
  composite_rank_score: number;
  rank_tier: string;
  rank_position: number;
}

export interface ProviderEtaEstimate {
  provider_user_id: string;
  distance_km: number;
  traffic_multiplier: number;
  travel_minutes: number;
  prep_buffer_minutes: number;
  total_eta_minutes: number;
  estimated_arrival_window: string;
}

export const getProvidersList = async (params?: {
  search?: string;
  category?: string;
  verification_status?: string;
  is_active?: boolean;
}): Promise<ProviderItem[]> => {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.category) query.append('category', params.category);
  if (params?.verification_status) query.append('verification_status', params.verification_status);
  if (params?.is_active !== undefined) query.append('is_active', String(params.is_active));

  const response = await apiClient.get<ProviderItem[]>(`/admin/providers/?${query.toString()}`);
  return response.data;
};

export const getProviderDetail = async (providerUserId: string): Promise<ProviderItem> => {
  const response = await apiClient.get<ProviderItem>(`/admin/providers/${providerUserId}`);
  return response.data;
};

export const verifyProviderDocuments = async (
  providerUserId: string,
  verificationStatus: 'Approved' | 'Rejected',
  reason?: string
): Promise<{ status: string; verification_status: string; message: string }> => {
  const response = await apiClient.post(`/admin/providers/${providerUserId}/verify`, {
    verification_status: verificationStatus,
    reason,
  });
  return response.data;
};

export const requestDocumentReplacement = async (
  providerUserId: string,
  reason: string,
  documentId?: string
): Promise<{ status: string; verification_status: string; message: string }> => {
  const response = await apiClient.post(`/admin/providers/${providerUserId}/request-replacement`, {
    reason,
    document_id: documentId,
  });
  return response.data;
};

export const updateProviderAccountStatus = async (
  providerUserId: string,
  isActive: boolean,
  reason?: string
): Promise<{ status: string; is_active: boolean; message: string }> => {
  const response = await apiClient.post(`/admin/providers/${providerUserId}/status`, {
    is_active: isActive,
    reason,
  });
  return response.data;
};

export const getProviderRankings = async (): Promise<ProviderRanking[]> => {
  const response = await apiClient.get<ProviderRanking[]>('/admin/providers/ranking');
  return response.data;
};

export const estimateProviderEta = async (
  providerUserId?: string,
  distanceKm: number = 5.2
): Promise<ProviderEtaEstimate> => {
  const query = new URLSearchParams();
  if (providerUserId) query.append('provider_user_id', providerUserId);
  query.append('distance_km', String(distanceKm));

  const response = await apiClient.get<ProviderEtaEstimate>(`/admin/providers/eta-estimate?${query.toString()}`);
  return response.data;
};

export const getProviderSlots = async (providerUserId: string): Promise<AdminProviderSlotItem[]> => {
  const response = await apiClient.get<AdminProviderSlotItem[]>(`/admin/providers/${providerUserId}/slots`);
  return response.data;
};

export const getProviderBookings = async (providerUserId: string): Promise<AdminProviderBookingItem[]> => {
  const response = await apiClient.get<AdminProviderBookingItem[]>(`/admin/providers/${providerUserId}/bookings`);
  return response.data;
};
