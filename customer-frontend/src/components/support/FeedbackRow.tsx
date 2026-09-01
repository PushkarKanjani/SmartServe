import { FC } from 'react';
import { Card } from '../ui/Card';
import { Rating } from '../ui/Rating';
import { CalendarCheck } from 'lucide-react';

export interface FeedbackItemMock {
  id: string;
  booking_id: string;
  service_name: string;
  rating: number;
  review_text?: string;
  date: string;
}

export interface FeedbackRowProps {
  feedback: FeedbackItemMock;
}

export const FeedbackRow: FC<FeedbackRowProps> = ({ feedback }) => {
  return (
    <Card className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-4 w-4 text-[#2563EB]" />
          <span className="text-sm font-bold text-slate-900">{feedback.service_name}</span>
        </div>
        <span className="text-xs text-slate-400">{feedback.date}</span>
      </div>

      <div className="flex items-center gap-2">
        <Rating value={feedback.rating} size="sm" showValue />
      </div>

      {feedback.review_text && (
        <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          "{feedback.review_text}"
        </p>
      )}
    </Card>
  );
};
