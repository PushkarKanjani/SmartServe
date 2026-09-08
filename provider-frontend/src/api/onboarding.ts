import { apiClient } from './client';

export interface CategoryRequirement {
  category: string;
  required_evidence_type: string;
  description: string;
  document_types_accepted: string[];
}

export interface CatalogServiceItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  base_price: number;
}

export interface OnboardingPayload {
  personal_info: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    photo_url?: string;
    experience_years: number;
    skills_description: string;
    service_area: string;
  };
  identity_kyc: {
    aadhaar_number: string;
    aadhaar_doc_url: string;
    pan_number: string;
    pan_doc_url: string;
  };
  nda_undertaking: {
    signed: boolean;
    undertaking_doc_url: string;
  };
  service_selection: {
    category: string;
    service_ids: string[];
  };
  skill_evidence: {
    evidence_type: string;
    evidence_url: string;
    description?: string;
  };
}

export interface OnboardingSubmitResponse {
  status: string;
  message: string;
  provider_id: string;
  email: string;
  full_name: string;
  category: string;
  verification_status: string;
  selected_services_count: number;
  documents_submitted_count: number;
  access_token: string;
  token_type: string;
}

export const getCategoryRequirements = async (category?: string): Promise<CategoryRequirement> => {
  const url = category
    ? `/provider/onboarding/requirements?category=${encodeURIComponent(category)}`
    : '/provider/onboarding/requirements';
  const res = await apiClient.get<CategoryRequirement>(url);
  return res.data;
};

export const listAllCategoryRequirements = async (): Promise<CategoryRequirement[]> => {
  const res = await apiClient.get<CategoryRequirement[]>('/provider/onboarding/categories-list');
  return res.data;
};

export const getServicesByCategory = async (category: string): Promise<CatalogServiceItem[]> => {
  const res = await apiClient.get<{ items: CatalogServiceItem[] }>(`/services/?category=${encodeURIComponent(category)}&limit=100`);
  return res.data.items || [];
};

export const submitOnboarding = async (payload: OnboardingPayload): Promise<OnboardingSubmitResponse> => {
  const res = await apiClient.post<OnboardingSubmitResponse>('/provider/onboarding/submit', payload);
  return res.data;
};
