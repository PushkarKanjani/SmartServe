import { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTicketDetail, addTicketMessage, SupportTicket, SupportTicketStatus } from '../../api/support';
import { MessageBubble } from '../../components/support/MessageBubble';
import { ReplyComposer } from '../../components/support/ReplyComposer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { useToast } from '../../hooks/useToast';
import { ArrowLeft, CalendarCheck } from 'lucide-react';

export const SupportTicketDetail: FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      if (ticketId) {
        const data = await getTicketDetail(ticketId);
        setTicket(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [ticketId]);

  if (loading || !ticket) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse pb-16">
        <Skeleton variant="text" width="50%" height={32} />
        <Skeleton variant="rectangular" height={140} className="rounded-2xl" />
        <Skeleton variant="rectangular" height={300} className="rounded-2xl" />
      </div>
    );
  }

  const handleSendReply = async (text: string, attachments?: string[]) => {
    try {
      await addTicketMessage(ticket.id, text, attachments);
      showToast('Reply sent', 'success');
      await fetchDetail();
    } catch {
      showToast('Failed to send reply', 'error');
    }
  };

  const statusVariants: Record<SupportTicketStatus, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
    Open: 'warning',
    'In Progress': 'info',
    Resolved: 'success',
    Closed: 'neutral',
  };

  const isClosed = ticket.status === 'Closed' || ticket.status === 'Resolved';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Back Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/support')}
          className="rounded-full p-2 text-slate-600 hover:bg-slate-100 transition"
          aria-label="Back to support"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Ticket #{ticket.ticket_reference}
            </h1>
            <Badge variant={statusVariants[ticket.status]}>{ticket.status}</Badge>
            <Badge variant={ticket.priority === 'High' ? 'danger' : 'neutral'} size="sm">
              {ticket.priority}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Category: {ticket.category}</p>
        </div>
      </div>

      {/* Ticket Details Card */}
      <Card className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">{ticket.subject}</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{ticket.description}</p>

        {ticket.booking_id && (
          <div className="flex items-center justify-between rounded-xl bg-blue-50 border border-blue-100 p-3 mt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
              <CalendarCheck className="h-4 w-4 text-[#2563EB]" />
              <span>Linked Booking ID: {ticket.booking_id}</span>
            </div>
            <Link to={`/bookings/${ticket.booking_id}`}>
              <Button variant="ghost" size="sm" className="text-xs text-[#2563EB]">
                View Booking →
              </Button>
            </Link>
          </div>
        )}
      </Card>

      {/* Messages Thread */}
      <div className="space-y-6 py-4 border-t border-b border-slate-200">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Conversation Thread ({ticket.messages.length} messages)
        </h3>

        <div className="space-y-5">
          {ticket.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>
      </div>

      {/* Reply Composer */}
      <ReplyComposer
        onSendReply={handleSendReply}
        disabled={isClosed}
        disabledReason="This ticket is resolved/closed. Create a new support ticket if you still need help."
      />
    </div>
  );
};

export default SupportTicketDetail;
