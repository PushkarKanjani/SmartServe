import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getProviderTickets, 
  createProviderTicket, 
  getProviderBookings, 
  getBookingChat, 
  sendBookingChatMessage, 
  SupportTicketDetail, 
  ProviderBookingItem,
  TicketMessageItem 
} from '../../api/support';
import { 
  Plus, 
  Clock, 
  ChevronRight, 
  Loader2, 
  AlertCircle, 
  RefreshCw, 
  Send, 
  X, 
  Users, 
  LifeBuoy, 
  MessageCircle, 
  User 
} from 'lucide-react';

const formatDateINR = (dateStr?: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const ProviderSupportView: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'tickets' | 'customer_chats'>('tickets');
  const [tickets, setTickets] = useState<SupportTicketDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // New Ticket Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [category, setCategory] = useState<string>('Booking Assistance');
  const [priority, setPriority] = useState<string>('Normal');
  const [description, setDescription] = useState<string>('');
  const [selectedBookingId, setSelectedBookingId] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Bookings list for dropdown & customer chat tab
  const [bookings, setBookings] = useState<ProviderBookingItem[]>([]);
  const [selectedBookingForChat, setSelectedBookingForChat] = useState<ProviderBookingItem | null>(null);
  const [chatTicket, setChatTicket] = useState<SupportTicketDetail | null>(null);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [sendingChat, setSendingChat] = useState<boolean>(false);

  // Toast
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProviderTickets();
      setTickets(data);
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data?.detail || `API Error (${err.response.status}): Failed to load support tickets.`);
      } else if (err.request) {
        setError('Unable to connect to SmartServe API. Please verify network connectivity and backend server availability.');
      } else {
        setError('An unexpected error occurred while loading your support tickets.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingsList = async () => {
    try {
      const data = await getProviderBookings();
      setBookings(data || []);
    } catch (err) {
      console.error('Failed to load bookings', err);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchBookingsList();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      showToast('Please fill in both subject and description.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const newTicket = await createProviderTicket({
        subject,
        category,
        priority,
        description,
        booking_id: selectedBookingId || null,
      });

      showToast('Support ticket submitted successfully!', 'success');
      setShowModal(false);
      setSubject('');
      setDescription('');
      setSelectedBookingId('');
      fetchTickets();
      navigate(`/support/${newTicket.id}`);
    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Failed to submit support ticket.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Customer Chat Handler ──────────────────────────────────
  const handleOpenBookingChat = async (b: ProviderBookingItem) => {
    setSelectedBookingForChat(b);
    setChatLoading(true);
    setChatTicket(null);
    try {
      const chat = await getBookingChat(b.id);
      setChatTicket(chat);
    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Failed to load booking chat.', 'error');
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendBookingChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForChat || !chatMessage.trim()) return;

    setSendingChat(true);
    try {
      const msg = await sendBookingChatMessage(selectedBookingForChat.id, chatMessage.trim());
      setChatMessage('');
      setChatTicket(prev => prev ? { ...prev, messages: [...(prev.messages || []), msg] } : prev);
    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Failed to send message.', 'error');
    } finally {
      setSendingChat(false);
    }
  };

  return (
    <div className="space-y-8 font-sans max-w-5xl mx-auto">
      
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-lg text-xs font-bold transition-all ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
        }`}>
          {toast.text}
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Support Tickets</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Submit inquiry tickets to SmartServe operations and chat with assigned customers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { fetchTickets(); fetchBookingsList(); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 shadow-2xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Sync Live</span>
          </button>
          
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ Open New Ticket</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all -mb-px ${
            activeTab === 'tickets'
              ? 'border-[#2563EB] text-[#2563EB]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <LifeBuoy className="w-4 h-4" />
          <span>Support Tickets (Admin)</span>
          {tickets.length > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-[#2563EB] rounded-full border border-blue-200">
              {tickets.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('customer_chats')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all -mb-px ${
            activeTab === 'customer_chats'
              ? 'border-[#2563EB] text-[#2563EB]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Customer Booking Chats</span>
          {bookings.length > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              {bookings.length}
            </span>
          )}
        </button>
      </div>

      {/* ── TAB 1: SUPPORT TICKETS ─────────────────────────────── */}
      {activeTab === 'tickets' && (
        <>
          {/* Error Banner */}
          {error && (
            <div className="p-8 bg-white border border-red-200 rounded-3xl text-center space-y-3 shadow-sm">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Support Center Connection Error</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">{error}</p>
              <button
                onClick={fetchTickets}
                className="px-4 py-2 bg-[#2563EB] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Connection</span>
              </button>
            </div>
          )}

          {/* Ticket List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-3">
              <Loader2 className="w-10 h-10 animate-spin text-[#2563EB]" />
              <p className="text-sm font-semibold text-slate-600">Loading support tickets from database...</p>
            </div>
          ) : tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((t) => {
                const stLower = t.status.toLowerCase();
                return (
                  <div
                    key={t.id}
                    onClick={() => navigate(`/support/${t.id}`)}
                    className="group bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                          stLower === 'open'
                            ? 'bg-blue-50 text-[#2563EB] border-blue-200'
                            : stLower === 'resolved' || stLower === 'closed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : stLower.includes('waiting')
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {t.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          {t.category || 'Support'}
                        </span>
                        {t.booking_id && (
                          <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            Booking: #{t.booking_id.substring(0, 8)}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors truncate">
                        {t.subject}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1">
                        {t.description}
                      </p>

                      <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Opened: {formatDateINR(t.created_at)}</span>
                        </span>
                        <span>•</span>
                        <span>{t.messages ? t.messages.length : 0} replies</span>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-[#2563EB] transition-colors shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto">
                <LifeBuoy className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Support Tickets Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven't opened any support tickets yet. Click the button below to reach out to SmartServe Partner Desk.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2.5 bg-[#2563EB] text-white font-bold text-xs rounded-xl inline-flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Open First Support Ticket</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* ── TAB 2: CUSTOMER BOOKING CHATS ──────────────────────── */}
      {activeTab === 'customer_chats' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
          {/* Booking List */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Assigned Bookings</h3>
              <span className="text-[11px] font-bold text-slate-400">{bookings.length} jobs</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[500px]">
              {bookings.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">No assigned bookings available for chat.</div>
              ) : bookings.map(b => (
                <button
                  key={b.id}
                  onClick={() => handleOpenBookingChat(b)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs ${
                    selectedBookingForChat?.id === b.id
                      ? 'border-[#2563EB] bg-blue-50/40 shadow-xs ring-1 ring-[#2563EB]'
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5 gap-2">
                    <h4 className="font-bold text-slate-900 text-xs truncate flex-1">{b.service_name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 uppercase">
                      {b.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>{b.customer_name || 'Customer'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                    <span className="font-mono">#{b.booking_reference}</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
            {!selectedBookingForChat ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
                <MessageCircle className="w-12 h-12 text-slate-300 mb-3" />
                <h4 className="text-base font-bold text-slate-800">Select a Booking</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Choose an assigned booking from the left to start or review the conversation with your customer.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                {/* Chat Header */}
                <div className="p-5 border-b border-slate-100 bg-[#0A1128] text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300">
                      Booking #{selectedBookingForChat.booking_reference}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{selectedBookingForChat.service_name}</h3>
                    <p className="text-xs text-slate-400">
                      Customer: <strong className="text-white">{selectedBookingForChat.customer_name || 'Customer'}</strong>
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/10 text-white border border-white/20">
                    {selectedBookingForChat.status}
                  </span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 max-h-[360px]">
                  {chatLoading ? (
                    <div className="flex items-center justify-center py-12 gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-[#2563EB]" />
                      <span className="text-xs font-semibold text-slate-500">Loading conversation...</span>
                    </div>
                  ) : !chatTicket?.messages || chatTicket.messages.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-400">No messages yet. Send a message to start the conversation!</p>
                    </div>
                  ) : (
                    chatTicket.messages.map((msg: TicketMessageItem) => {
                      const role = (msg.sender_role || '').toLowerCase().trim();
                      const isProvider = role === 'provider';
                      const isCustomer = role === 'customer';
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col max-w-md ${isProvider ? 'ml-auto items-end' : 'items-start'}`}
                        >
                          <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 px-1 ${
                            isProvider ? 'text-slate-400' : 'text-blue-600'
                          }`}>
                            {isProvider ? 'You (Provider)' : isCustomer ? `${msg.sender_name || selectedBookingForChat.customer_name || 'Customer'} (Customer)` : 'SmartServe Ops'}
                          </span>
                          <div className={`px-4 py-3 rounded-2xl text-xs font-medium leading-relaxed shadow-2xs ${
                            isProvider
                              ? 'bg-[#2563EB] text-white rounded-tr-xs'
                              : 'bg-white text-slate-900 border border-slate-200 rounded-tl-xs'
                          }`}>
                            {msg.message_text}
                          </div>
                          <span className="text-[9px] text-slate-400 mt-1 px-1">
                            {formatDateINR(msg.created_at)}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Chat Reply Form */}
                <form onSubmit={handleSendBookingChat} className="p-4 border-t border-slate-100 flex gap-3 bg-white">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder={`Message ${selectedBookingForChat.customer_name || 'customer'}...`}
                    className="flex-1 h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    disabled={sendingChat}
                  />
                  <button
                    type="submit"
                    disabled={sendingChat || !chatMessage.trim()}
                    className="h-11 px-5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
                  >
                    {sendingChat ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CREATE SUPPORT TICKET MODAL ─────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Open Support Ticket</h3>
                <p className="text-xs text-slate-500 mt-0.5">Submit an issue directly to SmartServe Partner Operations.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of your inquiry..."
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="Booking Assistance">Booking Assistance</option>
                    <option value="Payment Issue">Payment Issue / Payout Query</option>
                    <option value="Booking Dispute">Booking Dispute</option>
                    <option value="Technical Issue">Technical / App Issue</option>
                    <option value="Account & Profile">Account Verification & Profile</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Linked Booking (Optional)
                </label>
                <select
                  value={selectedBookingId}
                  onChange={(e) => setSelectedBookingId(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value="">None (General Inquiry)</option>
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      #{b.booking_reference} - {b.service_name} ({b.customer_name || 'Customer'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your issue with all relevant details..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Submit Support Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProviderSupportView;
