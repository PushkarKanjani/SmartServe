import { FC, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

export interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  loading?: boolean;
}

export const CancelBookingModal: FC<CancelBookingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const [reasonCategory, setReasonCategory] = useState('Change of plans');
  const [customNotes, setCustomNotes] = useState('');

  const handleCancelSubmit = async () => {
    const fullReason = customNotes.trim() ? `${reasonCategory}: ${customNotes.trim()}` : reasonCategory;
    await onConfirm(fullReason);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancel Booking Request" size="md">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Are you sure you want to cancel this booking? Please select a cancellation reason:
        </p>

        <Select
          label="Reason for cancellation"
          value={reasonCategory}
          onChange={(e) => setReasonCategory(e.target.value)}
          options={[
            { value: 'Change of plans', label: 'Change of plans / Schedule conflict' },
            { value: 'Booked by mistake', label: 'Booked by mistake' },
            { value: 'Found another provider', label: 'Found another provider' },
            { value: 'Emergency service no longer needed', label: 'Emergency service no longer needed' },
            { value: 'Other', label: 'Other reason' },
          ]}
        />

        <Textarea
          label="Additional Details (Optional)"
          placeholder="Help us improve by providing extra context..."
          value={customNotes}
          onChange={(e) => setCustomNotes(e.target.value)}
          rows={3}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Keep Booking
          </Button>
          <Button variant="danger" loading={loading} onClick={handleCancelSubmit}>
            Confirm Cancellation
          </Button>
        </div>
      </div>
    </Modal>
  );
};
