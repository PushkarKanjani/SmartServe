import { FC, useEffect, useState } from 'react';
import { getCustomerBookings, BookingItem } from '../../api/bookings';
import { Select } from '../ui/Select';

export interface BookingComboboxProps {
  value?: string;
  onChange: (bookingId: string) => void;
}

export const BookingCombobox: FC<BookingComboboxProps> = ({ value = '', onChange }) => {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const data = await getCustomerBookings('all');
        setBookings(data);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  const options = [
    { value: '', label: 'None (General Support Ticket)' },
    ...bookings.map((b) => ({
      value: b.id,
      label: `Ref: ${b.booking_reference} — ${b.service_name} (${b.status})`,
    })),
  ];

  return (
    <Select
      label="Link to Booking (Optional)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      disabled={loading}
      hint="Linking a booking helps our team resolve your issue significantly faster."
    />
  );
};
