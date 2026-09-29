import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketDetail, addTicketMessage, SupportTicketDetail } from '../api/support';
import { formatDateINR } from '../utils/formatters';
import { useToast } from '../hooks/useToast';
import { ArrowLeft, Send, Clock, User, ShieldCheck, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { subscribeToRealtime } from '../utils/realtime';

export const CustomerSupportDetail: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [ticket, setTicket] = useState<SupportTicketDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newMessage, setNewMessage] = useState<string>('');
  const [replying, setReplying] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const fetchDetail = async () => {
    if (!ticketId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getTicketDetail(ticketId);
      setTicket(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load support ticket details from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
    if (!ticketId) return;

    const channels = [`ticket_${ticketId}`, 'support', 'support_tickets'];
    const unsubscribeWs = subscribeToRealtime(channels, (payload) => {
      const type = payload.type || payload.event_type || payload.event;
      if (type === 'NEW_SUPPORT_MESSAGE' || type === 'support.message') {
        const msg = payload.message || payload.data;
        if (msg && (!payload.ticket_id || String(payload.ticket_id).toLowerCase() === String(ticketId).toLowerCase())) {
          setTicket((prev) => {
            if (!prev) return prev;
            const exists = (prev.messages || []).some((m: any) => String(m.id).toLowerCase() === String(msg.id).toLowerCase());
            if (exists) return prev;
            return {
              ...prev,
              messages: [...(prev.messages || []), msg],
            };
          });
          setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
        getTicketDetail(ticketId).then((data) => setTicket(data)).catch(() => {});
      }
    });

    return () => {
      unsubscribeWs();
    };
  }, [ticketId]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId || !newMessage.trim()) return;

    setReplying(true);
    try {
      await addTicketMessage(ticketId, newMessage.trim());
      showToast('Reply sent to support!', 'success');
      setNewMessage('');
      fetchDetail();
    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Failed to send reply.', 'error');
    } finally {
      setReplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
        <Loader2 className="w-10 h-10 animate-spin text-[#2563EB]" />
        <p className="text-sm font-semibold text-slate-600">Loading conversation thread from database...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-sm">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Ticket Not Found</h3>
        <p className="text-xs text-slate-600">{error || 'The requested support ticket does not exist in the database.'}</p>
        <button
          onClick={() => navigate('/support')}
          className="px-5 py-2.5 bg-[#2563EB] text-white font-bold text-xs rounded-xl inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Support Center</span>
        </button>
      </div>
    );
  }

  const stLower = ticket.status.toLowerCase();

  return (
    <div className="space-y-8 font-sans max-w-4xl mx-auto">
      
      {/* Back button & Refresh */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/support')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#2563EB] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Support Tickets</span>
        </button>

        <button
          onClick={fetchDetail}
          className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 shadow-2xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span>Refresh Replies</span>
        </button>
      </div>

      {/* Ticket Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden space-y-6">
        
        {/* Ticket Header */}
        <div className="bg-[#0A1128] text-white p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
              stLower === 'open'
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                : stLower === 'resolved' || stLower === 'closed'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
            }`}>
              {ticket.status}
            </span>
            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">{ticket.category}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{ticket.subject}</h1>
          <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 pt-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Opened on {formatDateINR(ticket.created_at)}</span>
          </p>
        </div>

        {/* Message Thread */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Initial Ticket Description */}
          {ticket.description && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Initial Request Description</span>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">{ticket.description}</p>
            </div>
          )}

          {/* Conversation Messages */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversation History</h3>

            {ticket.messages && ticket.messages.length > 0 ? (
              ticket.messages.map((msg, idx) => {
                const role = (msg.sender_role || '').toLowerCase().trim();
                const isCustomer = role === 'customer';
                const isProvider = role === 'provider';
                const isAdmin = role === 'admin' || role === 'super_admin' || role === 'agent';

                return (
                  <div
                    key={msg.id || idx}
                    className={`flex flex-col space-y-1.5 max-w-xl ${
                      isCustomer ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div className={`flex items-center gap-2 text-xs font-bold px-1 ${
                      isCustomer ? 'text-slate-500' : isProvider ? 'text-emerald-700' : 'text-[#2563EB]'
                    }`}>
                      {isCustomer ? (
                        <>
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>You (Customer)</span>
                        </>
                      ) : isProvider ? (
                        <>
                          <User className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{msg.sender_name || 'Service Provider'} <span className="opacity-70 text-[10px] uppercase font-normal">(Provider)</span></span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>SmartServe Support Operations <span className="opacity-70 text-[10px] uppercase font-normal">({isAdmin ? 'Admin' : 'Operations'})</span></span>
                        </>
                      )}
                      <span className="text-[10px] text-slate-400 font-normal">
                        {formatDateINR(msg.created_at)}
                      </span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-2xs ${
                        isCustomer
                          ? 'bg-[#2563EB] text-white rounded-tr-xs'
                          : isProvider
                          ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-tl-xs'
                          : 'bg-blue-50 text-slate-900 border border-blue-200 rounded-tl-xs'
                      }`}
                    >
                      {msg.message_text}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 italic py-2">No response messages logged yet.</p>
            )}
          </div>

          {/* Reply Input Form */}
          {stLower !== 'closed' && (
            <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Post Reply</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your response to support..."
                  className="flex-1 h-13 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  required
                />
                <button
                  type="submit"
                  disabled={replying || !newMessage.trim()}
                  className="h-13 px-6 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
                >
                  {replying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Send Reply</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};

export default CustomerSupportDetail;
