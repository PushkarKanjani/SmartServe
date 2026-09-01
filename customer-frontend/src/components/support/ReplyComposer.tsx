import { FC, FormEvent, useState } from 'react';
import { Button } from '../ui/Button';
import { ImageUploader } from '../ui/ImageUploader';
import { Send, Paperclip } from 'lucide-react';

export interface ReplyComposerProps {
  onSendReply: (text: string, attachments?: string[]) => Promise<void>;
  disabled?: boolean;
  disabledReason?: string;
}

export const ReplyComposer: FC<ReplyComposerProps> = ({
  onSendReply,
  disabled = false,
  disabledReason = 'This ticket is closed for further replies.',
}) => {
  const [text, setText] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      const mockAttachmentUrls = files.map((f) => `https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80&mock=${f.name}`);
      await onSendReply(text.trim(), mockAttachmentUrls.length > 0 ? mockAttachmentUrls : undefined);
      setText('');
      setFiles([]);
      setShowUploader(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (disabled) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 text-center text-xs font-semibold text-slate-500">
        🔒 {disabledReason}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {showUploader && (
        <div className="pb-2 border-b border-slate-100 animate-fade-in">
          <ImageUploader files={files} onChange={setFiles} maxFiles={3} label="Attach Screenshots" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowUploader(!showUploader)}
          className={`rounded-xl p-2.5 transition border ${
            showUploader
              ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]'
              : 'border-slate-200 text-slate-500 hover:bg-slate-100'
          }`}
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        <input
          type="text"
          placeholder="Type your reply here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition"
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={submitting}
          disabled={!text.trim()}
          icon={<Send className="h-4 w-4" />}
        >
          Send
        </Button>
      </div>
    </form>
  );
};
