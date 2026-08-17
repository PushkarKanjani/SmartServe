export interface ProviderProfile {
  user_id: string;
  full_name: string;
  photo_url?: string | null;
  category?: string | null;
  skills?: string | null;
  experience_years: number;
  base_price: string | number;
  service_area?: string | null;
  is_verified: boolean;
  reliability_score: number;
  acceptance_rate: number;
  cancellation_rate: number;
  no_show_rate: number;
  on_time_rate: number;
  response_time_score: number;
  created_at: string;
  updated_at: string;
}

export interface ProviderProfileUpdate {
  full_name?: string;
  photo_url?: string;
  category?: string;
  skills?: string;
  experience_years?: number;
  base_price?: string | number;
  service_area?: string;
}

export interface Certificate {
  id: string;
  provider_id: string;
  document_url: string;
  certificate_type: string;
  verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verified_by?: string | null;
  uploaded_at: string;
  verified_at?: string | null;
}

export interface CertificateCreate {
  document_url: string;
  certificate_type: string;
}

export interface AvailabilitySlot {
  id: string;
  provider_id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
}

export interface AvailabilityCreate {
  slot_date: string;
  start_time: string;
  end_time: string;
}

export interface ProviderServiceOffering {
  id: string;
  provider_id: string;
  service_id: string;
  price: string | number;
  duration_minutes: number;
  active: boolean;
  created_at: string;
}

export interface ProviderServiceCreate {
  service_id: string;
  price: string | number;
  duration_minutes?: number;
  active?: boolean;
}

export interface ProviderServiceUpdate {
  price?: string | number;
  duration_minutes?: number;
  active?: boolean;
}
