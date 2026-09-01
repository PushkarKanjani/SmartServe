import { apiClient } from './client';

export type SupportTicketCategory =
  | 'Booking issue'
  | 'Payment issue'
  | 'Service quality'
  | 'Account / Login'
  | 'Technical problem'
  | 'Other';

export type SupportTicketPriority = 'Low' | 'Normal' | 'High' | 'Urgent';
export type SupportTicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface TicketMessage {
  id: string;
  ticket_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'customer' | 'support';
  text: string;
  attachments?: string[];
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  ticket_reference: string;
  customer_id: string;
  booking_id?: string;
  service_name?: string;
  category: SupportTicketCategory;
  subject: string;
  description: string;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  created_at: string;
  updated_at: string;
  messages: TicketMessage[];
}

export interface CreateTicketPayload {
  category: SupportTicketCategory;
  subject: string;
  description: string;
  booking_id?: string;
  image_urls?: string[];
}

// platform:web
const TICKETS_STORAGE_KEY = 'smartserve_customer_tickets_store';

const getInitialTickets = (): SupportTicket[] => {
  // platform:web
  const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as SupportTicket[];
    } catch {
      // ignore
    }
  }

  const defaultMock: SupportTicket[] = [
    {
      id: 'tkt-2001',
      ticket_reference: 'TKT-8841',
      customer_id: 'cust-mock-uuid-1001',
      booking_id: 'bk-1001',
      service_name: 'Split AC Foam Jet Deep Service',
      category: 'Booking issue',
      subject: 'Technician arriving 15 minutes late',
      description: 'The assigned technician Ramesh informed me he is stuck in traffic and arriving slightly after the 4 PM slot.',
      priority: 'High',
      status: 'In Progress',
      created_at: '2026-08-31T11:00:00Z',
      updated_at: '2026-08-31T11:20:00Z',
      messages: [
        {
          id: 'msg-1',
          ticket_id: 'tkt-2001',
          sender_id: 'cust-mock-uuid-1001',
          sender_name: 'Customer',
          sender_role: 'customer',
          text: 'The assigned technician Ramesh informed me he is stuck in traffic and arriving slightly after the 4 PM slot.',
          timestamp: '2026-08-31 11:00 AM',
        },
        {
          id: 'msg-2',
          ticket_id: 'tkt-2001',
          sender_id: 'supp-301',
          sender_name: 'SmartServe Support (Ananya)',
          sender_role: 'support',
          text: 'Hi Pushkar, we checked with Ramesh. He is 2 km away and will reach your address by 4:15 PM max. Thank you for your patience!',
          timestamp: '2026-08-31 11:20 AM',
        },
      ],
    },
    {
      id: 'tkt-2002',
      ticket_reference: 'TKT-8842',
      customer_id: 'cust-mock-uuid-1001',
      category: 'Service quality',
      subject: 'Great service quality on full home cleaning',
      description: 'Extremely satisfied with the deep cleaning work done last week. Want to share feedback for the team.',
      priority: 'Normal',
      status: 'Resolved',
      created_at: '2026-08-26T10:00:00Z',
      updated_at: '2026-08-26T14:00:00Z',
      messages: [
        {
          id: 'msg-3',
          ticket_id: 'tkt-2002',
          sender_id: 'cust-mock-uuid-1001',
          sender_name: 'Customer',
          sender_role: 'customer',
          text: 'Extremely satisfied with the deep cleaning work done last week.',
          timestamp: '2026-08-26 10:00 AM',
        },
        {
          id: 'msg-4',
          ticket_id: 'tkt-2002',
          sender_id: 'supp-302',
          sender_name: 'SmartServe Support (Vikram)',
          sender_role: 'support',
          text: 'Thank you for your warm words! We have credited 50 SmartServe bonus points to your wallet.',
          timestamp: '2026-08-26 02:00 PM',
        },
      ],
    },
  ];

  // platform:web
  localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(defaultMock));
  return defaultMock;
};

const saveTicketsToStorage = (tickets: SupportTicket[]) => {
  // platform:web
  localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
};

export const getSupportTickets = async (): Promise<SupportTicket[]> => {
  try {
    const res = await apiClient.get<SupportTicket[]>('/customer/support/tickets');
    return res.data;
  } catch {
    return getInitialTickets();
  }
};

export const getTicketDetail = async (id: string): Promise<SupportTicket> => {
  try {
    const res = await apiClient.get<SupportTicket>(`/customer/support/tickets/${id}`);
    return res.data;
  } catch {
    const all = getInitialTickets();
    const found = all.find((t) => t.id === id);
    if (found) return found;
    return all[0]!;
  }
};

export const createSupportTicket = async (payload: CreateTicketPayload): Promise<SupportTicket> => {
  try {
    const res = await apiClient.post<SupportTicket>('/customer/support/tickets', payload);
    return res.data;
  } catch {
    const newId = 'tkt-' + Date.now().toString().slice(-6);
    const refCode = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    const priority: SupportTicketPriority = payload.category !== 'Other' && payload.booking_id ? 'High' : 'Normal';

    const newTicket: SupportTicket = {
      id: newId,
      ticket_reference: refCode,
      customer_id: 'cust-mock-uuid-1001',
      booking_id: payload.booking_id,
      category: payload.category,
      subject: payload.subject,
      description: payload.description,
      priority,
      status: 'Open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      messages: [
        {
          id: 'msg-' + Date.now(),
          ticket_id: newId,
          sender_id: 'cust-mock-uuid-1001',
          sender_name: 'Customer',
          sender_role: 'customer',
          text: payload.description,
          attachments: payload.image_urls,
          timestamp: nowStr,
        },
      ],
    };

    const currentList = getInitialTickets();
    const updatedList = [newTicket, ...currentList];
    saveTicketsToStorage(updatedList);
    return newTicket;
  }
};

export const addTicketMessage = async (
  ticketId: string,
  text: string,
  attachments?: string[]
): Promise<TicketMessage> => {
  try {
    const res = await apiClient.post<TicketMessage>(`/customer/support/tickets/${ticketId}/messages`, {
      text,
      attachments,
    });
    return res.data;
  } catch {
    const nowStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const newMsg: TicketMessage = {
      id: 'msg-' + Date.now(),
      ticket_id: ticketId,
      sender_id: 'cust-mock-uuid-1001',
      sender_name: 'Customer',
      sender_role: 'customer',
      text,
      attachments,
      timestamp: nowStr,
    };

    const all = getInitialTickets();
    const updated = all.map((t) => {
      if (t.id === ticketId) {
        return {
          ...t,
          updated_at: new Date().toISOString(),
          messages: [...t.messages, newMsg],
        };
      }
      return t;
    });

    saveTicketsToStorage(updated);
    return newMsg;
  }
};
