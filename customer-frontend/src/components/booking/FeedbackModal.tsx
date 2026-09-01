import { FC, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Rating } from '../ui/Rating';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { ImageUploader } from '../ui/ImageUploader';
import { FeedbackPayload } from '../../api/bookings';

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: FeedbackPayload) => Promise<void>;
  serviceName?: string;
  loading?: boolean;
}

export const FeedbackModal: FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  serviceName = 'Service',
  loading = false,
}) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async () => {
    await onSubmit({
      rating,
      review_text: reviewText.trim() || undefined,
      image_urls: images.map((f) => f.name),
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Rate & Review: ${serviceName}`} size="lg">
      <div className="space-y-5">
        <div className="text-center space-y-2 py-2 border-b border-slate-100">
          <p className="text-sm font-semibold text-slate-700">How was your overall experience?</p>
          <div className="flex justify-center">
            <Rating value={rating} interactive size="lg" onChange={setRating} showValue />
          </div>
        </div>

        <Textarea
          label="Your Feedback & Review (Optional)"
          placeholder="Describe technician punctuality, quality of work, cleanliness..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={3}
        />

        <ImageUploader
          files={images}
          onChange={setImages}
          label="Upload Before / After Photos (Optional)"
          maxFiles={3}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Skip
          </Button>
          <Button variant="primary" loading={loading} onClick={handleSubmit}>
            Submit Review
          </Button>
        </div>
      </div>
    </Modal>
  );
};
