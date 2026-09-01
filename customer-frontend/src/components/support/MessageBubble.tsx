import { FC } from 'react';
import { TicketMessage } from '../../api/support';
import { Avatar } from '../ui/Avatar';

export interface MessageBubbleProps {
  message: TicketMessage;
}

export const MessageBubble: FC<MessageBubbleProps> = ({ message }) => {
  const isCustomer = message.sender_role === 'customer';

  return (
    <div className={`flex items-start gap-3 ${isCustomer ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar
        name={message.sender_name}
        size="sm"
        className={isCustomer ? 'bg-[#2563EB] text-white' : 'bg-slate-700 text-white'}
      />

      <div className={`flex flex-col max-w-[80%] sm:max-w-[70%] space-y-1.5 ${isCustomer ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-bold text-slate-700">{message.sender_name}</span>
          <span>·</span>
          <span>{message.timestamp}</span>
        </div>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isCustomer
              ? 'bg-[#2563EB] text-white rounded-tr-none shadow-xs'
              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
          }`}
        >
          {message.text}
        </div>

        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.attachments.map((att, i) => (
              <a
                key={i}
                href={att}
                target="_blank"
                rel="noreferrer"
                className="group relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs"
              >
                <img src={att} alt="Attachment" className="h-full w-full object-cover group-hover:scale-105 transition" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
