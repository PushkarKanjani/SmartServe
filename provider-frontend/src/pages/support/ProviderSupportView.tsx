import React, { useState, useEffect } from 'react';
import { LifeBuoy, Plus, MessageCircle, Send, X, Clock, CheckCircle, Search, FileText } from 'lucide-react';
import { apiClient } from '../../api/client';

export const ProviderSupportView: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Create form state
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Payment Issue');
  const [bookingId, setBookingId] = useState('');

  const fetchTickets = async () => {
    try {
      const res = await apiClient.get('/providers/me/tickets');
      setTickets(res.data);
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
    try {
      const payload = {
        subject,
        description,
        category,
        priority: 'Medium',
        booking_id: bookingId || null
      };
      await apiClient.post('/providers/me/tickets', payload);
      setShowCreateForm(false);
      setSubject('');
      setDescription('');
      setCategory('Payment Issue');
      setBookingId('');
      fetchTickets();
    } catch (err) {
      console.error('Failed to create ticket', err);
      alert('Failed to create support ticket.');
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    try {
      const res = await apiClient.post(`/providers/me/tickets/${selectedTicket.id}/reply`, {
        message_text: replyText
      });
      // Append locally for immediate feedback
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
      case 'Open': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Resolved':
      case 'Closed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-[#1F2A1E]/60 text-sm font-medium animate-pulse">
        Loading support center...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 h-[calc(100vh-64px)] lg:h-screen flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 shrink-0 gap-4">
        <div>
          <h1 className="font-serif-display text-3xl font-bold text-[#1F2A1E] tracking-tight">Support Center</h1>
          <p className="text-[#1F2A1E]/70 mt-1 text-sm max-w-2xl">
            Get help with payments, bookings, or platform issues.
          </p>
        </div>
        <button
          onClick={() => { setShowCreateForm(true); setSelectedTicket(null); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2F5233] text-white rounded-xl font-bold hover:bg-[#2F5233]/90 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left List */}
        <div className={`w-full lg:w-1/3 flex flex-col bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm overflow-hidden ${selectedTicket || showCreateForm ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-[#2F5233]/10 bg-[#FAF7F0]">
            <div className="relative">
              <Search className="w-4 h-4 text-[#1F2A1E]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search tickets..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#2F5233]/10 rounded-lg text-sm focus:outline-none focus:border-[#2F5233]/30"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {tickets.length === 0 ? (
              <div className="text-center py-12 text-[#1F2A1E]/50 text-sm">
                <LifeBuoy className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No support tickets found.
              </div>
            ) : (
              tickets.map(ticket => (
                <button
                  key={ticket.id}
                  onClick={() => { setSelectedTicket(ticket); setShowCreateForm(false); }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedTicket?.id === ticket.id 
                      ? 'border-[#2F5233] bg-[#FAF7F0] shadow-sm' 
                      : 'border-[#2F5233]/5 hover:border-[#2F5233]/30 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-bold text-[#1F2A1E] text-sm line-clamp-1">{ticket.subject}</h3>
                    <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#1F2A1E]/60 mb-3 line-clamp-2">{ticket.description}</div>
                  <div className="flex items-center justify-between text-[10px] text-[#1F2A1E]/50 font-medium">
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {ticket.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(ticket.created_at).toLocaleDateString()}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className={`flex-1 flex flex-col bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm overflow-hidden ${!selectedTicket && !showCreateForm ? 'hidden lg:flex lg:items-center lg:justify-center' : 'flex'}`}>
          
          {!selectedTicket && !showCreateForm && (
            <div className="text-center p-8">
              <MessageCircle className="w-12 h-12 text-[#2F5233]/20 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1F2A1E]">Select a ticket</h3>
              <p className="text-sm text-[#1F2A1E]/60 mt-1">Choose a ticket from the list to view details or create a new one.</p>
            </div>
          )}

          {showCreateForm && (
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-[#2F5233]/10 flex justify-between items-center bg-[#FAF7F0]">
                <h2 className="text-xl font-bold text-[#1F2A1E]">Create Support Ticket</h2>
                <button onClick={() => setShowCreateForm(false)} className="lg:hidden p-2 text-[#1F2A1E]/50 hover:text-[#1F2A1E]"><X className="w-5 h-5"/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <form id="ticket-form" onSubmit={handleCreateTicket} className="max-w-2xl space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] text-sm"
                    >
                      <option value="Payment Issue">Payment Issue</option>
                      <option value="Booking Dispute">Booking Dispute</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Account & Profile">Account & Profile</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief description of the issue"
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Booking ID (Optional)</label>
                    <input
                      type="text"
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      placeholder="e.g. BKG-12345"
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Description</label>
                    <textarea
                      required
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please provide details about the issue..."
                      className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] text-sm resize-none"
                    />
                  </div>
                </form>
              </div>
              <div className="p-4 border-t border-[#2F5233]/10 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button onClick={() => setShowCreateForm(false)} className="px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
                <button form="ticket-form" type="submit" className="px-6 py-2 bg-[#2F5233] text-white text-sm font-bold rounded-xl hover:bg-[#2F5233]/90 transition-colors shadow-sm">Submit Ticket</button>
              </div>
            </div>
          )}

          {selectedTicket && !showCreateForm && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-[#2F5233]/10 bg-[#FAF7F0] shrink-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setSelectedTicket(null)} className="lg:hidden p-1 -ml-2 text-[#1F2A1E]/50 hover:text-[#1F2A1E]">
                      <X className="w-5 h-5"/>
                    </button>
                    <h2 className="text-xl font-bold text-[#1F2A1E]">{selectedTicket.subject}</h2>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-[#1F2A1E]/70 font-medium">
                  <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {selectedTicket.category}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(selectedTicket.created_at).toLocaleString()}</span>
                  {selectedTicket.booking_id && (
                    <span className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-[#2F5233]/10">
                      Booking: <span className="font-bold">{selectedTicket.booking_id}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                {/* Original Description */}
                <div className="flex flex-col items-end">
                  <div className="bg-[#2F5233] text-white p-4 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                    <p className="text-sm whitespace-pre-wrap">{selectedTicket.description}</p>
                  </div>
                  <span className="text-[10px] text-[#1F2A1E]/40 mt-1 font-medium">{new Date(selectedTicket.created_at).toLocaleString()}</span>
                </div>

                {/* Replies */}
                {selectedTicket.messages?.map((msg: any) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender_role === 'provider' ? 'items-end' : 'items-start'}`}>
                    <div className="text-[10px] text-[#1F2A1E]/50 mb-1 px-1 font-bold uppercase tracking-wider">
                      {msg.sender_role === 'provider' ? 'You' : 'Support Team'}
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm text-sm whitespace-pre-wrap ${
                      msg.sender_role === 'provider' 
                        ? 'bg-[#2F5233] text-white rounded-tr-sm' 
                        : 'bg-[#FAF7F0] text-[#1F2A1E] border border-[#2F5233]/10 rounded-tl-sm'
                    }`}>
                      {msg.message_text}
                    </div>
                    <span className="text-[10px] text-[#1F2A1E]/40 mt-1 font-medium">{new Date(msg.created_at).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="p-4 border-t border-[#2F5233]/10 bg-[#FAF7F0] shrink-0">
                {selectedTicket.status === 'Closed' || selectedTicket.status === 'Resolved' ? (
                  <div className="text-center p-3 bg-slate-100 rounded-xl text-slate-500 text-sm font-medium flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    This ticket has been resolved and is closed to new replies.
                  </div>
                ) : (
                  <form onSubmit={handleReply} className="flex gap-3">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      className="flex-1 px-4 py-3 bg-white border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm shadow-sm"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="px-5 bg-[#2F5233] text-white rounded-xl flex items-center justify-center hover:bg-[#2F5233]/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
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
