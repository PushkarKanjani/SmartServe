import { FC } from 'react';
import { TimelineEvent } from '../../api/bookings';
import { StatusBadge } from './StatusBadge';

export interface BookingTimelineProps {
  timeline: TimelineEvent[];
}

export const BookingTimeline: FC<BookingTimelineProps> = ({ timeline }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
      <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
        Service Lifecycle Timeline
      </h3>

      <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
        {timeline.map((event, index) => {
          const isLatest = index === timeline.length - 1;
          return (
            <div key={index} className="relative">
              <div
                className={`absolute -left-[31px] top-0 flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-white ${
                  isLatest ? 'bg-[#2563EB] text-white shadow-sm' : 'bg-slate-200 text-slate-600'
                }`}
              >
                <span className="text-xs font-bold">{index + 1}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <StatusBadge status={event.status} size="sm" />
                  <span className="text-xs text-slate-400 font-medium">{event.timestamp}</span>
                </div>
                {event.note && (
                  <p className="text-xs text-slate-600 font-normal">{event.note}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
