import { apiClient } from './client';

export interface TicketMessageItem {
  id: string;
  sender_id: string;
  sender_role: string;
  sender_name?: string;
  message_text: string;
  attachment_url?: string | null;
  created_at: string;
}

export interface SupportTicketDetail {
  id: string;
  customer_id?: string | null;
  provider_id?: string | null;
  customer_name?: string;
  booking_id?: string | null;
  subject: string;
  description: string;
  category?: string;
  priority: string;
  status: string;
  escalated_to_admin?: boolean;
  image_evidence_url?: string | null;
  created_at: string;
  updated_at?: string;
  messages: TicketMessageItem[];
}

export interface CreateTicketPayload {
  subject: string;
  description: string;
  category?: string;
  priority?: string;
  booking_id?: string | null;
}

export interface ProviderBookingItem {
  id: string;
  booking_reference: string;
  customer_name?: string;
  service_name: string;
  status: string;
  scheduled_time?: string;
  total_price?: number;
}

// ── Support Tickets (Provider ↔ Admin) ──────────────────────────
export const getProviderTickets = async (): Promise<SupportTicketDetail[]> => {
  const res = await apiClient.get<SupportTicketDetail[]>('/providers/me/tickets');
  return res.data;
};

export const getProviderTicketDetail = async (ticketId: string): Promise<SupportTicketDetail> => {
  const res = await apiClient.get<SupportTicketDetail>(`/providers/me/tickets/${ticketId}`);
  return res.data;
};

export const createProviderTicket = async (payload: CreateTicketPayload): Promise<SupportTicketDetail> => {
  const res = await apiClient.post<SupportTicketDetail>('/providers/me/tickets', payload);
  return res.data;
};

export const replyProviderTicket = async (ticketId: string, message_text: string): Promise<TicketMessageItem> => {
  const res = await apiClient.post<TicketMessageItem>(`/providers/me/tickets/${ticketId}/reply`, { message_text });
  return res.data;
};

// ── Customer Booking Chats (Provider ↔ Customer) ────────────────
export const getProviderBookings = async (): Promise<ProviderBookingItem[]> => {
  const res = await apiClient.get<ProviderBookingItem[]>('/providers/me/bookings');
  return res.data;
};

export const getBookingChat = async (bookingId: string): Promise<SupportTicketDetail> => {
  const res = await apiClient.get<SupportTicketDetail>(`/providers/me/bookings/${bookingId}/chat`);
  return res.data;
};

export const sendBookingChatMessage = async (bookingId: string, message_text: string): Promise<TicketMessageItem> => {
  const res = await apiClient.post<TicketMessageItem>(`/providers/me/bookings/${bookingId}/chat/messages`, { message_text });
  return res.data;
};

// ── Limited AI Support Assistant ──────────────────────────
export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIChatRequestPayload {
  message: string;
  history?: AIChatMessage[];
  booking_id?: string | null;
}

export interface AIChatResponseData {
  response: string;
  escalated: boolean;
  escalation_reason?: string | null;
  ticket_id?: string | null;
  ticket_reference?: string | null;
  message_count: number;
  max_messages: number;
  status: 'success' | 'escalated' | 'unavailable';
}

export const sendAIChatMessage = async (payload: AIChatRequestPayload): Promise<AIChatResponseData> => {
  const res = await apiClient.post<AIChatResponseData>('/support/ai/chat', payload);
  return res.data;
};

