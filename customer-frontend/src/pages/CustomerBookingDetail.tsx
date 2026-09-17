import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingDetail, cancelBooking, BookingDetail } from '../api/bookings';
import { getBookingChat, sendBookingChatMessage, SupportTicketDetail, MessageItem } from '../api/support';
import { formatCurrencyINR } from '../utils/formatters';
import { useToast } from '../hooks/useToast';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  KeyRound, 
  AlertCircle, 
  Loader2, 
  UserCheck, 
  XCircle,
  HelpCircle,
  Zap,
  MessageCircle,
  Send,
  User,
  ShieldCheck,
} from 'lucide-react';

export const CustomerBookingDetail: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('Change of plans / schedule conflict');

  // Chat state
  const [chatTicket, setChatTicket] = useState<SupportTicketDetail | null>(null);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [sendingChat, setSendingChat] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const fetchDetail = async () => {
    if (!bookingId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getBookingDetail(bookingId);
      setBooking(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch booking details from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
    const interval = setInterval(() => {
      if (bookingId) {
        getBookingDetail(bookingId)
          .then((data) => setBooking(data))
          .catch(() => {});
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [bookingId]);

  // Load chat when provider is assigned and chat is open
  const fetchChat = async () => {
    if (!bookingId) return;
    setChatLoading(true);
    setChatError(null);
    try {
      const data = await getBookingChat(bookingId);
      setChatTicket(data);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err: any) {
      const detail = err.response?.data?.detail || '';
      if (err.response?.status === 400 && detail.includes('No provider')) {
        setChatError('provider_not_assigned');
      } else {
        setChatError(err.response?.data?.detail || 'Failed to load chat.');
      }
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    if (showChat && bookingId) {
      fetchChat();
    }
  }, [showChat, bookingId]);

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId || !chatMessage.trim()) return;
    setSendingChat(true);
    try {
      const newMsg = await sendBookingChatMessage(bookingId, chatMessage.trim());
      setChatMessage('');
      setChatTicket(prev => prev ? { ...prev, messages: [...prev.messages, newMsg] } : prev);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Failed to send message.', 'error');
    } finally {
      setSendingChat(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!bookingId) return;

    setCancelling(true);
    try {
      await cancelBooking(bookingId, selectedReason);
      showToast('Booking cancelled successfully.', 'info');
      setShowCancelModal(false);
      fetchDetail();
    } catch (err: any) {
      showToast(err.response?.data?.detail || 'Failed to cancel booking.', 'error');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3 font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-[#2563EB]" />
        <p className="text-sm font-semibold text-slate-600">Loading booking status from database...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-sm font-sans">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Booking Record Not Found</h3>
        <p className="text-xs text-slate-600">{error || 'The requested booking ID does not exist in the database.'}</p>
        <button
          onClick={() => navigate('/bookings')}
          className="px-5 py-2.5 bg-[#2563EB] text-white font-bold text-xs rounded-xl inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Bookings</span>
        </button>
      </div>
    );
  }

  const stLower = booking.status.toLowerCase();
  const canCancel = stLower === 'requested' || stLower === 'assigned' || stLower === 'confirmed';

  return (
    <div className="space-y-8 font-sans max-w-4xl mx-auto">
      
      {/* Back button */}
      <button
        onClick={() => navigate('/bookings')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#2563EB] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Bookings</span>
      </button>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden space-y-6">
        
        {/* Header Ribbon */}
        <div className="bg-[#0A1128] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-blue-300">{booking.booking_reference}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                stLower === 'completed' || stLower === 'paid'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                  : stLower === 'cancelled'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                  : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
              }`}>
                {booking.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{booking.service_name}</h1>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 font-semibold block">Total Amount</span>
            <span className="text-2xl font-extrabold text-white font-mono">
              {formatCurrencyINR(booking.total_price || booking.total_amount || 0)}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Emergency Alert Banner */}
          {Boolean(booking.emergency_flag) && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <Zap className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">Emergency Fast-Track Service</h4>
                  <p className="text-xs text-amber-800">Priority safety dispatch auto-assigned per SmartServe safety protocols.</p>
                </div>
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 bg-amber-500 text-white rounded-lg shadow-2xs">
                Emergency Dispatch
              </span>
            </div>
          )}

          {/* OTP Code Box */}
          {booking.otp_code && stLower !== 'completed' && stLower !== 'cancelled' && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">Service OTP Verification Code</h4>
                  <p className="text-xs text-amber-800">Share this code with your technician upon arrival to begin service.</p>
                </div>
              </div>
              <span className="font-mono text-2xl font-black text-amber-950 tracking-widest bg-white px-4 py-2 rounded-xl border border-amber-300 shadow-2xs">
                {booking.otp_code}
              </span>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            
            {/* Schedule */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Scheduled Appointment</span>
              </h4>
              <p className="font-bold text-slate-900 text-base">{booking.scheduled_date}</p>
              <p className="text-xs text-slate-600">Time Slot: <strong>{booking.scheduled_time}</strong></p>
            </div>

            {/* Provider */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Assigned Service Expert</span>
              </h4>
              <p className="font-bold text-slate-900 text-base">{booking.provider_name || 'Dispatching Verified Professional...'}</p>
              <p className="text-xs text-slate-600">SmartServe Background Checked & Insured</p>
            </div>

            {/* Address */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 md:col-span-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span>Service Location Address</span>
              </h4>
              <p className="font-medium text-slate-900 leading-relaxed">
                {booking.address_line1 || booking.address || 'Address provided at booking'}
              </p>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              onClick={() => navigate('/support')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 rounded-xl text-xs flex items-center gap-2 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Need Help with this Booking?</span>
            </button>

            {canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                disabled={cancelling}
                className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {cancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-4 h-4" />}
                <span>Cancel Booking</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* ============================================ */}
      {/* PROVIDER CHAT SECTION */}
      {/* ============================================ */}
      {booking.provider_id && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
          {/* Chat Header Toggle */}
          <button
            onClick={() => setShowChat(!showChat)}
            className="w-full flex items-center justify-between p-6 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Chat with Provider</h3>
                <p className="text-xs text-slate-500">{booking.provider_name || 'Your assigned service expert'}</p>
              </div>
            </div>
            <div className={`w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-all ${showChat ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Chat Panel */}
          {showChat && (
            <div className="border-t border-slate-100">
              {chatLoading ? (
                <div className="flex items-center justify-center py-12 gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-500">Loading conversation...</span>
                </div>
              ) : chatError === 'provider_not_assigned' ? (
                <div className="p-6 text-center">
                  <p className="text-xs text-slate-500">Provider hasn't been assigned yet. Chat will be available once a provider accepts your booking.</p>
                </div>
              ) : chatError ? (
                <div className="p-6 text-center">
                  <p className="text-xs text-rose-600">{chatError}</p>
                  <button onClick={fetchChat} className="mt-2 text-xs text-emerald-600 font-semibold hover:underline">Retry</button>
                </div>
              ) : (
                <>
                  {/* Messages */}
                  <div className="max-h-96 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                    {(!chatTicket?.messages || chatTicket.messages.length === 0) ? (
                      <div className="text-center py-8">
                        <MessageCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs text-slate-400">No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      chatTicket.messages.map((msg: MessageItem) => {
                        const role = (msg.sender_role || '').toLowerCase().trim();
                        const isCustomer = role === 'customer';
                        const isProvider = role === 'provider';
                        return (
                          <div key={msg.id} className={`flex flex-col max-w-xs ${isCustomer ? 'ml-auto items-end' : 'items-start'}`}>
                            <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-1 px-1 ${
                              isCustomer ? 'text-slate-400 flex-row-reverse' : isProvider ? 'text-emerald-600' : 'text-blue-600'
                            }`}>
                              {isCustomer ? (
                                <><User className="w-3 h-3" /><span>You (Customer)</span></>
                              ) : isProvider ? (
                                <><ShieldCheck className="w-3 h-3" /><span>{msg.sender_name || booking.provider_name || 'Provider'} (Provider)</span></>
                              ) : (
                                <><ShieldCheck className="w-3 h-3" /><span>SmartServe Support (Admin)</span></>
                              )}
                            </div>
                            <div className={`px-4 py-3 rounded-2xl text-xs font-medium leading-relaxed shadow-2xs ${
                              isCustomer
                                ? 'bg-[#2563EB] text-white rounded-tr-xs'
                                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                            }`}>
                              {msg.message_text}
                            </div>
                            <span className="text-[9px] text-slate-400 mt-1 px-1">
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        );
                      })
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Send Message */}
                  <form onSubmit={handleSendChatMessage} className="p-4 border-t border-slate-100 flex gap-3 bg-white">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder={`Message ${booking.provider_name || 'your provider'}...`}
                      className="flex-1 h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
                      disabled={sendingChat}
                    />
                    <button
                      type="submit"
                      disabled={sendingChat || !chatMessage.trim()}
                      className="h-10 w-10 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 flex-shrink-0 shadow-xs"
                    >
                      {sendingChat ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Interactive In-App Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 flex-shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">Cancel Service Booking?</h3>
                <p className="text-xs text-slate-500">
                  Ref: <span className="font-mono font-bold text-slate-700">{booking.booking_reference}</span> • {booking.service_name}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Please select a reason for cancellation:
              </label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              >
                <option value="Change of plans / schedule conflict">Change of plans / schedule conflict</option>
                <option value="Booked by mistake">Booked by mistake</option>
                <option value="Found an alternative provider">Found an alternative provider</option>
                <option value="Price or timeline concern">Price or timeline concern</option>
                <option value="Other reasons">Other reasons</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Cancellation is free with zero penalties for requested bookings.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                disabled={cancelling}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={cancelling}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {cancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-4 h-4" />}
                <span>Yes, Cancel Booking</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerBookingDetail;
