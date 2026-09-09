import React, { useState, useEffect } from 'react';
import { 
  LifeBuoy, 
  Plus, 
  MessageCircle, 
  Send, 
  X, 
  Clock, 
  CheckCircle, 
  Search, 
  FileText, 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
} from 'lucide-react';
import { apiClient } from '../../api/client';

export const ProviderSupportView: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Create form state
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Payment Issue');
  const [bookingId, setBookingId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await apiClient.get('/providers/me/tickets');
      setTickets(res.data || []);
    } catch (err) {
      console.error('Failed to load tickets', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;
    setSubmitting(true);
    try {
      const payload = {
        subject: subject.trim(),
        description: description.trim(),
        category,
        priority: 'Medium',
        booking_id: bookingId.trim() || null
      };
      await apiClient.post('/providers/me/tickets', payload);
      setShowCreateForm(false);
      setSubject('');
      setDescription('');
      setCategory('Payment Issue');
      setBookingId('');
      await fetchTickets();
    } catch (err) {
      console.error('Failed to create ticket', err);
      alert('Failed to create support ticket. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    try {
      const res = await apiClient.post(`/providers/me/tickets/${selectedTicket.id}/reply`, {
        message_text: replyText.trim()
      });
      setSelectedTicket({
        ...selectedTicket,
        messages: [...(selectedTicket.messages || []), res.data]
      });
      setReplyText('');
      fetchTickets();
    } catch (err) {
      console.error('Failed to reply', err);
      alert('Failed to send reply.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': 
        return 'bg-amber-50/80 text-amber-800 border-amber-200';
      case 'In Progress': 
        return 'bg-blue-50/80 text-blue-800 border-blue-200';
      case 'Resolved':
      case 'Closed': 
        return 'bg-emerald-50/80 text-emerald-800 border-emerald-200';
      default: 
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const filteredTickets = tickets.filter(t => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.subject?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q) ||
      t.booking_id?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-r from-[#1F2A1E] via-[#243523] to-[#2F5233] text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-[#E5DEC9]/20">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-radial from-[#C9A15A]/15 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A15A]/20 border border-[#C9A15A]/40 text-[#FAF7F0] text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A15A]" />
              SmartServe Partner Care Desk
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F0]">
              Partner Help & Support
            </h1>
            <p className="text-white/75 mt-2 text-sm max-w-xl leading-relaxed">
              Direct assistance with payouts, booking disputes, customer verifications, and onboarding compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { setShowCreateForm(true); setSelectedTicket(null); }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#C9A15A] text-[#1F2A1E] rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#d8b066] transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" /> Raise Ticket
            </button>
          </div>
        </div>

        {/* Quick Contacts Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div className="w-8 h-8 rounded-lg bg-[#2F5233] flex items-center justify-center text-[#C9A15A] shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/50 text-[10px] uppercase font-semibold">Partner Hotline</p>
              <p className="text-white font-semibold">1800-419-7378 (24x7)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div className="w-8 h-8 rounded-lg bg-[#2F5233] flex items-center justify-center text-[#C9A15A] shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/50 text-[10px] uppercase font-semibold">WhatsApp Desk</p>
              <p className="text-white font-semibold">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div className="w-8 h-8 rounded-lg bg-[#2F5233] flex items-center justify-center text-[#C9A15A] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/50 text-[10px] uppercase font-semibold">Response Time</p>
              <p className="text-white font-semibold">&lt; 2 Hours for Active Jobs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[560px]">
        {/* Left Ticket List (4 cols) */}
        <div className={`lg:col-span-4 flex flex-col bg-white rounded-3xl border border-[#E5DEC9] shadow-xs overflow-hidden ${selectedTicket || showCreateForm ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-[#E5DEC9] bg-[#FAF7F0]/80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif-display font-bold text-[#1F2A1E] text-base">Your Tickets</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FAF7F0] border border-[#E5DEC9] text-[#1F2A1E]/70">
                {tickets.length} total
              </span>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-[#1F2A1E]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ticket subject, id..." 
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5DEC9] rounded-xl text-xs text-[#1F2A1E] placeholder:text-[#1F2A1E]/40 focus:outline-none focus:border-[#2F5233] transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[580px]">
            {loading ? (
              <div className="p-8 text-center text-xs text-[#1F2A1E]/60 animate-pulse">
                Loading support tickets...
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] border border-[#E5DEC9] flex items-center justify-center mx-auto mb-3 text-[#2F5233]">
                  <LifeBuoy className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-sm text-[#1F2A1E]">No tickets found</h4>
                <p className="text-xs text-[#1F2A1E]/60 mt-1 max-w-xs mx-auto">
                  {searchQuery ? 'Try matching another search query.' : 'Raise a new ticket if you need assistance with bookings or payments.'}
                </p>
                <button
                  onClick={() => { setShowCreateForm(true); setSelectedTicket(null); }}
                  className="mt-4 px-4 py-2 bg-[#2F5233] text-white text-xs font-semibold rounded-xl hover:bg-[#3D6B42] transition-colors"
                >
                  Create New Ticket
                </button>
              </div>
            ) : (
              filteredTickets.map(ticket => {
                const isSelected = selectedTicket?.id === ticket.id;
                return (
                  <button
                    key={ticket.id}
                    onClick={() => { setSelectedTicket(ticket); setShowCreateForm(false); }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all text-xs ${
                      isSelected 
                        ? 'border-[#2F5233] bg-[#FAF7F0] shadow-xs ring-1 ring-[#2F5233]' 
                        : 'border-[#E5DEC9]/80 hover:border-[#2F5233]/40 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h4 className="font-bold text-[#1F2A1E] text-xs line-clamp-1 flex-1">{ticket.subject}</h4>
                      <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-[#1F2A1E]/65 line-clamp-2 mb-3 leading-relaxed">
                      {ticket.description}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#1F2A1E]/50 font-medium pt-2 border-t border-[#E5DEC9]/50">
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-[#C9A15A]" /> {ticket.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(ticket.created_at).toLocaleDateString()}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Detail / Create Panel (8 cols) */}
        <div className={`lg:col-span-8 flex flex-col bg-white rounded-3xl border border-[#E5DEC9] shadow-xs overflow-hidden ${!selectedTicket && !showCreateForm ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Default Empty State */}
          {!selectedTicket && !showCreateForm && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[#FAF7F0]/40">
              <div className="w-16 h-16 rounded-3xl bg-[#FAF7F0] border border-[#E5DEC9] flex items-center justify-center text-[#2F5233] mb-4 shadow-2xs">
                <MessageCircle className="w-8 h-8 opacity-70" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#1F2A1E]">Support Discussion</h3>
              <p className="text-xs text-[#1F2A1E]/60 max-w-sm mt-1.5 leading-relaxed">
                Select an existing ticket from the left panel to review responses, or create a new support request.
              </p>
              <button
                onClick={() => { setShowCreateForm(true); setSelectedTicket(null); }}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#2F5233] text-white text-xs font-bold rounded-xl hover:bg-[#3D6B42] transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Start New Ticket
              </button>
            </div>
          )}

          {/* Create Ticket View */}
          {showCreateForm && (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-[#E5DEC9] flex justify-between items-center bg-[#FAF7F0]/90">
                <div>
                  <h2 className="font-serif-display text-xl font-bold text-[#1F2A1E]">Create Support Ticket</h2>
                  <p className="text-xs text-[#1F2A1E]/60 mt-0.5">Please provide specific details so our partner desk can assist promptly.</p>
                </div>
                <button 
                  onClick={() => setShowCreateForm(false)} 
                  className="p-2 text-[#1F2A1E]/50 hover:text-[#1F2A1E] rounded-xl hover:bg-[#FAF7F0] transition-colors"
                >
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <form id="ticket-form" onSubmit={handleCreateTicket} className="max-w-xl space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                      Issue Category <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl text-xs text-[#1F2A1E] font-medium focus:outline-none focus:border-[#2F5233]"
                    >
                      <option value="Payment Issue">Payment Issue / Payout Query</option>
                      <option value="Booking Dispute">Booking Dispute / Cancellation</option>
                      <option value="Technical Issue">Technical / Mobile App Issue</option>
                      <option value="Account & Profile">Account Verification & Profile</option>
                      <option value="Other">Other Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                      Ticket Subject <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Delayed payout for booking #BK-8902"
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl text-xs text-[#1F2A1E] focus:outline-none focus:border-[#2F5233]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                      Booking Reference ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      placeholder="e.g. 748fb2c1..."
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl text-xs text-[#1F2A1E] focus:outline-none focus:border-[#2F5233]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                      Detailed Description <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what happened, customer details, and any steps you have already attempted..."
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl text-xs text-[#1F2A1E] focus:outline-none focus:border-[#2F5233] resize-none leading-relaxed"
                    />
                  </div>
                </form>
              </div>

              <div className="p-4 border-t border-[#E5DEC9] bg-[#FAF7F0] flex justify-end gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setShowCreateForm(false)} 
                  className="px-5 py-2.5 text-xs font-bold text-[#1F2A1E]/70 hover:bg-[#E5DEC9]/40 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  form="ticket-form" 
                  type="submit" 
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#2F5233] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#3D6B42] transition-colors shadow-xs disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </div>
            </div>
          )}

          {/* Selected Ticket Conversation View */}
          {selectedTicket && !showCreateForm && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-[#E5DEC9] bg-[#FAF7F0]/90 shrink-0">
                <div className="flex justify-between items-start mb-3 gap-3">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setSelectedTicket(null)} 
                      className="lg:hidden p-1.5 -ml-2 text-[#1F2A1E]/60 hover:text-[#1F2A1E] rounded-lg hover:bg-[#E5DEC9]/50"
                    >
                      <X className="w-4 h-4"/>
                    </button>
                    <div>
                      <span className="text-[10px] font-bold text-[#C9A15A] uppercase tracking-wider">Ticket #{selectedTicket.id?.slice?.(0, 8) || selectedTicket.id}</span>
                      <h2 className="font-serif-display text-lg sm:text-xl font-bold text-[#1F2A1E]">{selectedTicket.subject}</h2>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-[#1F2A1E]/70 font-medium">
                  <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[#C9A15A]" /> {selectedTicket.category}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#1F2A1E]/40" /> {new Date(selectedTicket.created_at).toLocaleString()}</span>
                  {selectedTicket.booking_id && (
                    <span className="flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-lg border border-[#E5DEC9] text-[11px]">
                      Booking Ref: <span className="font-bold text-[#1F2A1E]">{selectedTicket.booking_id}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#FAF7F0]/20">
                {/* Original Description */}
                <div className="flex flex-col items-end">
                  <div className="text-[10px] text-[#1F2A1E]/50 mb-1 px-1 font-bold uppercase tracking-wider">
                    You (Initial Request)
                  </div>
                  <div className="bg-[#2F5233] text-white p-4 rounded-2xl rounded-tr-xs max-w-[85%] shadow-xs">
                    <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{selectedTicket.description}</p>
                  </div>
                  <span className="text-[10px] text-[#1F2A1E]/40 mt-1 font-medium">{new Date(selectedTicket.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {/* Replies */}
                {selectedTicket.messages?.map((msg: any) => {
                  const isProvider = msg.sender_role === 'provider';
                  return (
                    <div key={msg.id} className={`flex flex-col ${isProvider ? 'items-end' : 'items-start'}`}>
                      <div className="text-[10px] text-[#1F2A1E]/50 mb-1 px-1 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        {!isProvider && <ShieldCheck className="w-3 h-3 text-[#2F5233]" />}
                        {isProvider ? 'You' : 'SmartServe Support Desk'}
                      </div>
                      <div className={`p-4 rounded-2xl max-w-[85%] shadow-xs text-xs sm:text-sm whitespace-pre-wrap leading-relaxed ${
                        isProvider 
                          ? 'bg-[#2F5233] text-white rounded-tr-xs' 
                          : 'bg-white text-[#1F2A1E] border border-[#E5DEC9] rounded-tl-xs'
                      }`}>
                        {msg.message_text}
                      </div>
                      <span className="text-[10px] text-[#1F2A1E]/40 mt-1 font-medium">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  );
                })}
              </div>

              {/* Reply Box */}
              <div className="p-4 border-t border-[#E5DEC9] bg-[#FAF7F0] shrink-0">
                {selectedTicket.status === 'Closed' || selectedTicket.status === 'Resolved' ? (
                  <div className="text-center p-3 bg-white rounded-xl text-slate-600 text-xs font-semibold flex items-center justify-center gap-2 border border-[#E5DEC9]">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    This ticket has been resolved. If you need further help, please create a new ticket.
                  </div>
                ) : (
                  <form onSubmit={handleReply} className="flex gap-3">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your response to support..."
                      className="flex-1 px-4 py-2.5 bg-white border border-[#E5DEC9] rounded-xl focus:outline-none focus:border-[#2F5233] text-xs text-[#1F2A1E] shadow-2xs"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="px-5 bg-[#2F5233] text-white rounded-xl flex items-center justify-center hover:bg-[#3D6B42] transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
