import { FC } from 'react';
import { Link } from 'react-router-dom';
import { SupportTicket, SupportTicketStatus } from '../../api/support';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ChevronRight, Clock, MessageSquare } from 'lucide-react';

export interface TicketRowProps {
  ticket: SupportTicket;
}

export const TicketRow: FC<TicketRowProps> = ({ ticket }) => {
  const statusVariants: Record<SupportTicketStatus, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
    Open: 'warning',
    'In Progress': 'info',
    Resolved: 'success',
    Closed: 'neutral',
  };

  const formattedDate = new Date(ticket.updated_at).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <Link to={`/support/${ticket.id}`}>
      <Card hoverable className="flex items-center justify-between">
        <div className="space-y-1.5 min-w-0 pr-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-slate-500">#{ticket.ticket_reference}</span>
            <Badge variant={statusVariants[ticket.status]} size="sm">
              {ticket.status}
            </Badge>
            <Badge variant={ticket.priority === 'High' || ticket.priority === 'Urgent' ? 'danger' : 'neutral'} size="sm">
              {ticket.priority} Priority
            </Badge>
          </div>

          <h3 className="text-base font-bold text-slate-900 truncate">{ticket.subject}</h3>
          <p className="text-xs text-slate-500 line-clamp-1">{ticket.description}</p>

          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-1">
            <span>Category: {ticket.category}</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Updated {formattedDate}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600 font-semibold">
              <MessageSquare className="h-3 w-3" />
              <span>{ticket.messages.length} replies</span>
            </div>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-slate-400 shrink-0 ml-2" />
      </Card>
    </Link>
  );
};
