import { apiClient } from './client';
import {
  ProviderProfile,
  ProviderProfileUpdate,
  Certificate,
  CertificateCreate,
  AvailabilitySlot,
  AvailabilityCreate,
  ProviderServiceOffering,
  ProviderServiceCreate,
  ProviderServiceUpdate,
} from '../types/provider';

export const providerApi = {
  /**
   * Fetch current provider profile
   * GET /api/v1/providers/me
   */
  async getProfile(): Promise<ProviderProfile> {
    const response = await apiClient.get<ProviderProfile>('/providers/me');
    return response.data;
  },

  /**
   * Update current provider profile
   * PATCH /api/v1/providers/me
   */
  async updateProfile(data: ProviderProfileUpdate): Promise<ProviderProfile> {
    const response = await apiClient.patch<ProviderProfile>('/providers/me', data);
    return response.data;
  },

  /**
   * Fetch public provider profile
   * GET /api/v1/providers/{provider_id}
   */
  async getProviderById(providerId: string): Promise<ProviderProfile> {
    const response = await apiClient.get<ProviderProfile>(`/providers/${providerId}`);
    return response.data;
  },

  /**
   * List all uploaded certificates for current provider
   * GET /api/v1/certificates
   */
  async getCertificates(): Promise<Certificate[]> {
    const response = await apiClient.get<Certificate[]>('/certificates');
    return response.data;
  },

  /**
   * Upload certificate metadata for admin verification
   * POST /api/v1/certificates
   */
  async uploadCertificate(data: CertificateCreate): Promise<Certificate> {
    const response = await apiClient.post<Certificate>('/certificates', data);
    return response.data;
  },

  /**
   * Get availability timeslots for a provider
   * GET /api/v1/providers/{provider_id}/availability
   */
  async getAvailability(providerId: string): Promise<AvailabilitySlot[]> {
    const response = await apiClient.get<AvailabilitySlot[]>(`/providers/${providerId}/availability`);
    return response.data;
  },

  /**
   * Add a new availability timeslot
   * POST /api/v1/providers/me/availability
   */
  async addAvailability(data: AvailabilityCreate): Promise<AvailabilitySlot> {
    const response = await apiClient.post<AvailabilitySlot>('/providers/me/availability', data);
    return response.data;
  },

  /**
   * Delete an availability timeslot
   * DELETE /api/v1/providers/me/availability/{id}
   */
  async deleteAvailability(slotId: string): Promise<void> {
    await apiClient.delete(`/providers/me/availability/${slotId}`);
  },

  /**
   * List services offered by a provider
   * GET /api/v1/providers/{provider_id}/services
   */
  async getServices(providerId: string): Promise<ProviderServiceOffering[]> {
    const response = await apiClient.get<ProviderServiceOffering[]>(`/providers/${providerId}/services`);
    return response.data;
  },

  /**
   * Add a customized service offering
   * POST /api/v1/providers/me/services
   */
  async addService(data: ProviderServiceCreate): Promise<ProviderServiceOffering> {
    const response = await apiClient.post<ProviderServiceOffering>('/providers/me/services', data);
    return response.data;
  },

  /**
   * Update a service offering
   * PATCH /api/v1/providers/me/services/{id}
   */
  async updateService(serviceId: string, data: ProviderServiceUpdate): Promise<ProviderServiceOffering> {
    const response = await apiClient.patch<ProviderServiceOffering>(`/providers/me/services/${serviceId}`, data);
    return response.data;
  },
};
