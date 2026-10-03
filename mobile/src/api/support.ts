import apiClient from './client';

export interface MessageItem {
  id: string;
  sender_role: string;
  sender_name?: string;
  message_text: string;
  created_at: string;
}

export interface SupportTicketDetail {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  description?: string;
  created_at: string;
  messages: MessageItem[];
}

export interface CreateTicketPayload {
  subject: string;
  category: string;
  priority?: string;
  description: string;
  booking_id?: string;
}

export const supportApi = {
  /** GET /customer/support/tickets */
  getTickets: async (): Promise<SupportTicketDetail[]> => {
    const res = await apiClient.get<SupportTicketDetail[]>('/customer/support/tickets');
    return Array.isArray(res.data) ? res.data : [];
  },

  /** GET /customer/support/tickets/{ticket_id} */
  getTicketById: async (ticketId: string): Promise<SupportTicketDetail> => {
    const res = await apiClient.get<SupportTicketDetail>(`/customer/support/tickets/${ticketId}`);
    return res.data;
  },

  /** POST /customer/support/tickets */
  createTicket: async (payload: CreateTicketPayload): Promise<SupportTicketDetail> => {
    const res = await apiClient.post<SupportTicketDetail>('/customer/support/tickets', payload);
    return res.data;
  },

  /** POST /customer/support/tickets/{ticket_id}/messages */
  sendMessage: async (ticketId: string, message_text: string): Promise<MessageItem> => {
    const res = await apiClient.post<MessageItem>(
      `/customer/support/tickets/${ticketId}/messages`,
      { message_text },
    );
    return res.data;
  },

  /** GET /customer/bookings/{booking_id}/chat */
  getBookingChat: async (bookingId: string): Promise<SupportTicketDetail> => {
    const res = await apiClient.get<SupportTicketDetail>(`/customer/bookings/${bookingId}/chat`);
    return res.data;
  },

  /** POST /customer/bookings/{booking_id}/chat/messages */
  sendBookingChatMessage: async (bookingId: string, message_text: string): Promise<MessageItem> => {
    const res = await apiClient.post<MessageItem>(
      `/customer/bookings/${bookingId}/chat/messages`,
      { message_text },
    );
    return res.data;
  },
};
