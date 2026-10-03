import { apiClient } from './client';

export interface MessageItem {
  id: string;
  sender_role: string;
  sender_name: string;
  message_text: string;
  created_at: string;
}

export interface SupportTicketDetail {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  description?: string;
  messages: MessageItem[];
}

export interface CreateTicketPayload {
  subject: string;
  category: string;
  priority?: string;
  description: string;
  booking_id?: string;
}

export const createSupportTicket = async (payload: CreateTicketPayload): Promise<SupportTicketDetail> => {
  const res = await apiClient.post<SupportTicketDetail>('/customer/support/tickets', payload);
  return res.data;
};

export const getCustomerTickets = async (): Promise<SupportTicketDetail[]> => {
  const res = await apiClient.get<SupportTicketDetail[]>('/customer/support/tickets');
  return res.data;
};

export const getTicketDetail = async (ticketId: string): Promise<SupportTicketDetail> => {
  const res = await apiClient.get<SupportTicketDetail>(`/customer/support/tickets/${ticketId}`);
  return res.data;
};

export const addTicketMessage = async (ticketId: string, message_text: string): Promise<MessageItem> => {
  const res = await apiClient.post<MessageItem>(`/customer/support/tickets/${ticketId}/messages`, { message_text });
  return res.data;
};

// Booking Chat (Customer ↔ Provider)
export const getBookingChat = async (bookingId: string): Promise<SupportTicketDetail> => {
  const res = await apiClient.get<SupportTicketDetail>(`/customer/bookings/${bookingId}/chat`);
  return res.data;
};

export const sendBookingChatMessage = async (bookingId: string, message_text: string): Promise<MessageItem> => {
  const res = await apiClient.post<MessageItem>(`/customer/bookings/${bookingId}/chat/messages`, { message_text });
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

