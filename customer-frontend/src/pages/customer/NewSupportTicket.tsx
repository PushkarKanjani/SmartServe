import { FC, FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createSupportTicket, SupportTicketCategory, SupportTicketPriority } from '../../api/support';
import { uploadImageEvidence } from '../../api/uploads';
import { CategoryChips } from '../../components/support/CategoryChips';
import { BookingCombobox } from '../../components/support/BookingCombobox';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../hooks/useToast';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const NewSupportTicket: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const initialBookingId = searchParams.get('booking_id') || '';

  const [category, setCategory] = useState<SupportTicketCategory>('Booking issue');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [bookingId, setBookingId] = useState(initialBookingId);
  const [images, setImages] = useState<File[]>([]);

  const [subjectError, setSubjectError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Auto-calculated priority
  const priority: SupportTicketPriority = category !== 'Other' && bookingId ? 'High' : 'Normal';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubjectError('');
    setDescriptionError('');

    let hasError = false;
    if (subject.trim().length < 5) {
      setSubjectError('Subject must be at least 5 characters long.');
      hasError = true;
    }
    if (description.trim().length < 20) {
      setDescriptionError('Please describe your issue in detail (at least 20 characters).');
      hasError = true;
    }

    if (hasError) return;

    setSubmitting(true);
    try {
      const uploadedUrls = await uploadImageEvidence(images);
      const ticket = await createSupportTicket({
        category,
        subject: subject.trim(),
        description: description.trim(),
        booking_id: bookingId || undefined,
        image_urls: uploadedUrls.length > 0 ? uploadedUrls : undefined,
      });

      showToast('Support ticket created successfully!', 'success');
      navigate(`/support/${ticket.id}`, { replace: true });
    } catch {
      showToast('Failed to submit support ticket', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/support')}
          className="rounded-full p-2 text-slate-600 hover:bg-slate-100 transition"
          aria-label="Back to support"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Create New Support Ticket</h1>
          <p className="text-sm text-slate-500">Our customer care team typically responds within 15 minutes</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-xs">
        {/* Category Picker */}
        <CategoryChips selectedCategory={category} onChange={setCategory} />

        {/* Priority Chip Display */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Assigned Dispatch Priority:</span>
          <Badge variant={priority === 'High' ? 'danger' : 'neutral'} size="sm" icon={<ShieldAlert className="h-3 w-3" />}>
            {priority} Priority
          </Badge>
        </div>

        {/* Subject */}
        <Input
          label="Subject / Summary"
          placeholder="Brief summary of the issue (e.g. Technician running late for AC service)"
          maxLength={120}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          error={subjectError}
        />

        {/* Linked Booking */}
        <BookingCombobox value={bookingId} onChange={setBookingId} />

        {/* Description */}
        <Textarea
          label="Detailed Description"
          placeholder="Please describe what happened, any conversations with the provider, or expectations..."
          rows={5}
          maxLength={2000}
          showCount
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={descriptionError}
        />

        {/* Image Evidence */}
        <ImageUploader files={images} onChange={setImages} maxFiles={4} />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button type="button" variant="secondary" onClick={() => navigate('/support')} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={submitting}>
            Submit Ticket
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewSupportTicket;
