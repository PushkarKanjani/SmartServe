import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Sparkles,
  Send,
  X,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { sendAIChatMessage, AIChatMessage, AIChatResponseData } from '../../api/support';
import { useAuth } from '../../context/AuthContext';

interface AISupportAssistantProps {
  role?: 'customer' | 'provider';
  bookingId?: string | null;
}

const cleanAIMessageContent = (rawText: string): string => {
  if (!rawText) return '';
  return rawText
    .replace(/^.*User Safety:\s*.*$/gim, '')
    .replace(/^.*Response Safety:\s*.*$/gim, '')
    .replace(/^.*Safety:\s*(safe|unsafe).*$/gim, '')
    .replace(/^.*Checking SmartServe records.*$/gim, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export const AISupportAssistant: React.FC<AISupportAssistantProps> = ({
  role = 'provider',
  bookingId: propBookingId
}) => {
  const navigate = useNavigate();
  const params = useParams<{ bookingId?: string; id?: string }>();
  const { user } = useAuth();

  // Extract booking/job ID either from props or from route path
  const activeBookingId = propBookingId || params.bookingId || params.id || null;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [escalatedTicket, setEscalatedTicket] = useState<{
    id: string;
    reference: string;
    reason: string;
  } | null>(null);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [maxMessages, setMaxMessages] = useState(5);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen, escalatedTicket]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const displayName = (user as any)?.full_name ? (user as any).full_name.split(' ')[0] : (user?.email ? user.email.split('@')[0] : 'Partner');
      const providerWelcome = `Hello ${displayName}! I'm here to assist with your assigned jobs, schedule guidance, availability slots, and service workflows.`;
      const customerWelcome = `Hello ${displayName}! I can help you with your booking. Let me check the latest booking details or service policies for you.`;

      setMessages([
        {
          role: 'assistant',
          content: role === 'provider' ? providerWelcome : customerWelcome,
        },
      ]);
    }
  }, [role, user]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || loading) return;

    setInputMessage('');
    setIsUnavailable(false);

    // Append user message
    const updatedHistory: AIChatMessage[] = [
      ...messages,
      { role: 'user', content: textToSend },
    ];
    setMessages(updatedHistory);
    setLoading(true);

    const startTime = Date.now();
    try {
      const data: AIChatResponseData = await sendAIChatMessage({
        message: textToSend,
        history: messages,
        booking_id: activeBookingId,
      });

      // Ensure smooth typing indicator animation has a natural dwell time (~700ms)
      const elapsed = Date.now() - startTime;
      if (elapsed < 700) {
        await new Promise((resolve) => setTimeout(resolve, 700 - elapsed));
      }

      setMessageCount(data.message_count);
      if (data.max_messages) setMaxMessages(data.max_messages);

      const cleanedResponse = cleanAIMessageContent(data.response);

      if (data.status === 'unavailable') {
        setIsUnavailable(true);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: cleanedResponse },
        ]);
      } else if (data.escalated) {
        setEscalatedTicket({
          id: data.ticket_id || '',
          reference: data.ticket_reference || 'TKT-PENDING',
          reason: data.escalation_reason || 'Support team requested',
        });
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "Looks like this needs help from our support team. I've sent your issue to SmartServe Admin Support.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: cleanedResponse },
        ]);
      }
    } catch (err: any) {
      setIsUnavailable(true);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'AI Support is temporarily unavailable. Would you like to contact Admin Support?',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const displayName = (user as any)?.full_name ? (user as any).full_name.split(' ')[0] : (user?.email ? user.email.split('@')[0] : 'Partner');
    const providerWelcome = `Hello ${displayName}! I'm here to assist with your assigned jobs, schedule guidance, availability slots, and service workflows.`;
    const customerWelcome = `Hello ${displayName}! I can help you with your booking. Let me check the latest booking details or service policies for you.`;

    setMessages([
      {
        role: 'assistant',
        content: role === 'provider' ? providerWelcome : customerWelcome,
      },
    ]);
    setEscalatedTicket(null);
    setIsUnavailable(false);
    setMessageCount(0);
  };

  // Quick suggestion chips
  const providerQuickPrompts = [
    'What booking do I have next?',
    'How do I change my slots?',
    'I need human support',
  ];

  const customerQuickPrompts = [
    'Where is my provider?',
    'What is the cancellation policy?',
    'I want to speak to a human',
  ];

  const activeQuickPrompts = role === 'provider' ? providerQuickPrompts : customerQuickPrompts;

  return (
    <>
      <style>{`
        @keyframes smartserve-typing-dot {
          0%, 80%, 100% {
            opacity: 0.25;
            transform: scale(0.75);
          }
          40% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
        .smartserve-typing-dot-1 {
          animation: smartserve-typing-dot 1.4s infinite ease-in-out;
          animation-delay: 0ms;
        }
        .smartserve-typing-dot-2 {
          animation: smartserve-typing-dot 1.4s infinite ease-in-out;
          animation-delay: 200ms;
        }
        .smartserve-typing-dot-3 {
          animation: smartserve-typing-dot 1.4s infinite ease-in-out;
          animation-delay: 400ms;
        }
        @media (prefers-reduced-motion: reduce) {
          .smartserve-typing-dot-1,
          .smartserve-typing-dot-2,
          .smartserve-typing-dot-3 {
            animation: none !important;
            opacity: 0.8 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ── 1. Floating Pill Button (Subtle & Premium) ───────────── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open SmartServe Assistant"
          id="smartserve-provider-ai-support-btn"
          className="group relative flex items-center gap-2 px-3.5 py-2.5 bg-[#2F5233] hover:bg-[#3D6B42] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-[#FAF7F0]/20 cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#C9A15A]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
          </div>
          <span className="font-semibold text-xs tracking-wide text-white">
            AI Support
          </span>

          {/* Micro-label tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block whitespace-nowrap bg-[#1F2A1E] text-[#FAF7F0] text-[11px] font-medium py-1.5 px-3 rounded-xl shadow-md border border-[#E5DEC9]/20 pointer-events-none">
            AI Support • Human support available
          </div>
        </button>
      </div>

      {/* ── 2. Compact Chat Panel / Drawer ────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          id="smartserve-provider-ai-chat-panel"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[380px] sm:w-[410px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[82vh] bg-[#FAF7F0] border border-[#E5DEC9] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#2F5233] text-white p-3.5 border-b border-[#3D6B42] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#C9A15A]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight leading-tight flex items-center gap-1.5">
                  SmartServe Assistant
                </h3>
                <p className="text-[10px] text-white/80 font-medium">
                  AI Support • Human support available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Banner (If booking context attached) */}
          {activeBookingId && (
            <div className="bg-[#F2EDE1] px-3.5 py-1.5 border-b border-[#E5DEC9] flex items-center justify-between text-[11px] font-semibold text-[#1F2A1E]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2F5233]" />
                Job Context: #{activeBookingId.substring(0, 8).toUpperCase()}
              </span>
              <span className="text-[#2F5233] text-[10px] uppercase font-bold tracking-wider">
                Attached
              </span>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-[#FAF7F0]">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#2F5233] text-white rounded-br-xs font-medium shadow-xs'
                        : 'bg-white text-[#1F2A1E] border border-[#E5DEC9] rounded-bl-xs shadow-xs font-normal whitespace-pre-line space-y-1.5'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#2F5233] tracking-wide">
                        <Sparkles className="w-3.5 h-3.5 text-[#C9A15A]" />
                        <span>SmartServe Assistant</span>
                      </div>
                    )}
                    <div>{isUser ? msg.content : cleanAIMessageContent(msg.content)}</div>
                  </div>
                </div>
              );
            })}

            {/* Loading / Typing Indicator */}
            {loading && (
              <div className="flex flex-col items-start">
                <div className="bg-white border border-[#E5DEC9] p-3.5 rounded-2xl rounded-bl-xs shadow-xs space-y-2 max-w-[85%]">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#2F5233] tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A15A]" />
                    <span>SmartServe Assistant</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-0.5 px-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#2F5233] smartserve-typing-dot-1" />
                    <span className="w-2 h-2 rounded-full bg-[#2F5233] smartserve-typing-dot-2" />
                    <span className="w-2 h-2 rounded-full bg-[#2F5233] smartserve-typing-dot-3" />
                  </div>
                  <p className="text-[11px] text-[#1F2A1E]/70 font-medium">Thinking...</p>
                </div>
              </div>
            )}

            {/* Escalation Notification Card */}
            {escalatedTicket && (
              <div className="bg-[#FAF7F0] border border-[#C9A15A] rounded-2xl p-3.5 space-y-2 shadow-xs text-xs text-[#1F2A1E]">
                <div className="flex items-center gap-2 text-[#2F5233] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#C9A15A]" />
                  <span>Your issue has been sent to SmartServe Admin Support.</span>
                </div>
                <div className="bg-white px-3 py-2 rounded-xl border border-[#E5DEC9] flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Reference:</span>
                  <span className="font-mono font-bold text-[#2F5233]">
                    Ticket #{escalatedTicket.reference.replace(/^TKT-/, '')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Our operations team has received the conversation context and will follow up directly on your ticket.
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate(`/support/${escalatedTicket.id}`);
                  }}
                  className="w-full mt-1 py-2 px-3 bg-[#2F5233] hover:bg-[#3D6B42] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Ticket in Support Center</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Fallback Service Unavailable Banner */}
            {isUnavailable && !escalatedTicket && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 space-y-2 text-xs text-amber-900">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>AI Support Temporarily Unavailable</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  AI Support is temporarily unavailable. Would you like to contact Admin Support?
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/support');
                  }}
                  className="w-full py-1.5 px-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Contact Admin Support
                </button>
              </div>
            )}

            {/* Quick Suggestion Chips */}
            {messages.length <= 2 && !escalatedTicket && !loading && (
              <div className="pt-2 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
                  Suggested Questions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeQuickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[11px] font-medium bg-white hover:bg-[#F2EDE1] text-[#1F2A1E] px-3 py-1.5 rounded-full border border-[#E5DEC9] transition-colors cursor-pointer text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-[#E5DEC9] shrink-0 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your issue..."
                disabled={loading || !!escalatedTicket}
                className="flex-1 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl px-3 py-2 text-xs text-[#1F2A1E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim() || !!escalatedTicket}
                aria-label="Send message"
                className="p-2 bg-[#2F5233] hover:bg-[#3D6B42] disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0 flex items-center justify-center shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Micro-copy footer */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-normal px-1">
              <span>AI Support • Human support available</span>
              {messageCount > 0 && (
                <span className="text-slate-400">
                  Message {messageCount} of {maxMessages}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AISupportAssistant;
