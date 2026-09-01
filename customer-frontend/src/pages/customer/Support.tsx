import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSupportTickets, SupportTicket } from '../../api/support';
import { TicketRow } from '../../components/support/TicketRow';
import { FeedbackRow, FeedbackItemMock } from '../../components/support/FeedbackRow';
import { Accordion } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { LifeBuoy, Plus, Star, CheckCircle } from 'lucide-react';

export const Support: FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  const mockFeedbackList: FeedbackItemMock[] = [
    {
      id: 'fb-1',
      booking_id: 'bk-1002',
      service_name: 'Full Home Deep Cleaning (2 BHK)',
      rating: 5,
      review_text: 'Spotless cleaning! The team cleaned every corner including behind the refrigerator and window ledges.',
      date: '25 Aug 2026',
    },
  ];

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const data = await getSupportTickets();
        setTickets(data);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const activeTickets = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress');
  const resolvedTickets = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed');

  return (
    <div className="space-y-10 pb-16">
      {/* Top Title & CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Customer Support & Helpdesk</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage tickets, submit queries, and review past service feedback</p>
        </div>

        <Link to="/support/new">
          <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
            New Support Ticket
          </Button>
        </Link>
      </div>

      {/* Section A: Recent Feedback */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-400" />
          <h2 className="text-lg font-bold text-slate-900">Your Recent Service Feedback</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockFeedbackList.map((fb) => (
            <FeedbackRow key={fb.id} feedback={fb} />
          ))}
        </div>
      </section>

      {/* Section B: Active Support Tickets */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <LifeBuoy className="h-5 w-5 text-[#2563EB]" />
          <h2 className="text-lg font-bold text-slate-900">Active Support Tickets ({activeTickets.length})</h2>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={100} className="rounded-2xl" />
            ))}
          </div>
        ) : activeTickets.length > 0 ? (
          <div className="space-y-3">
            {activeTickets.map((t) => (
              <TicketRow key={t.id} ticket={t} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<LifeBuoy className="h-6 w-6" />}
            title="No active support tickets"
            description="You have no open tickets. Need help with a booking or account? Create a new support ticket."
            actionLabel="Create Support Ticket"
            onAction={() => {}}
          />
        )}
      </section>

      {/* Section C: Resolved Tickets Accordion */}
      {resolvedTickets.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">Resolved & Closed Tickets ({resolvedTickets.length})</h2>
          </div>
          <Accordion
            allowMultiple
            items={resolvedTickets.map((t) => ({
              id: t.id,
              title: `#${t.ticket_reference} — ${t.subject} (${t.category})`,
              content: (
                <div className="space-y-2 pt-2">
                  <p className="text-sm text-slate-700 font-medium">{t.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Closed on {new Date(t.updated_at).toLocaleDateString('en-IN')}</span>
                    <Link to={`/support/${t.id}`} className="font-bold text-[#2563EB] hover:underline">
                      View Full Thread →
                    </Link>
                  </div>
                </div>
              ),
            }))}
          />
        </section>
      )}
    </div>
  );
};

export default Support;
