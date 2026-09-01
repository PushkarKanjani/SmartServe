import { FC } from 'react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Banknote, Calendar, Clock, Zap } from 'lucide-react';

export interface BookingFormData {
  date: string;
  time: string;
  address: string;
  instructions: string;
  isEmergency: boolean;
}

export interface BookingFormProps {
  data: BookingFormData;
  onChange: (data: BookingFormData) => void;
  isEmergencyService?: boolean;
  errors?: Record<string, string>;
}

export const BookingForm: FC<BookingFormProps> = ({
  data,
  onChange,
  isEmergencyService = false,
  errors = {},
}) => {
  const today = new Date().toISOString().split('T')[0];

  const handleSavedAddressChange = (val: string) => {
    if (val === 'saved-1') {
      onChange({
        ...data,
        address: 'Flat 402, Green Valley Heights, Sector 62, Noida, Uttar Pradesh - 201301',
      });
    } else if (val === 'saved-2') {
      onChange({
        ...data,
        address: 'Tower B - 1204, Cyber City Residency, Phase 3, Gurugram, Haryana - 122002',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Date & Time Slot */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          1. Scheduled Date & Time
        </h3>

        {isEmergencyService && (
          <div className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 p-3.5">
            <div className="flex items-center gap-2.5">
              <Zap className="h-5 w-5 text-amber-600 fill-amber-500" />
              <div>
                <p className="text-xs font-bold text-amber-900">ASAP Emergency Dispatch</p>
                <p className="text-[11px] text-amber-700">Dispatch nearest available technician immediately</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.isEmergency}
              onChange={(e) => onChange({ ...data, isEmergency: e.target.checked })}
              className="h-5 w-5 rounded border-amber-400 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
          </div>
        )}

        {!data.isEmergency ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Select Date"
              type="date"
              min={today}
              value={data.date}
              onChange={(e) => onChange({ ...data, date: e.target.value })}
              error={errors.date}
              leftIcon={<Calendar className="h-4 w-4" />}
            />
            <Input
              label="Select Preferred Time Slot"
              type="time"
              value={data.time}
              onChange={(e) => onChange({ ...data, time: e.target.value })}
              error={errors.time}
              leftIcon={<Clock className="h-4 w-4" />}
            />
          </div>
        ) : (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs font-semibold text-blue-900">
            ⚡ Technician will be dispatched immediately upon order confirmation. Typical arrival time: 30 - 45 mins.
          </div>
        )}
      </div>

      {/* Service Location */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-base font-bold text-slate-900">2. Service Location</h3>
          <Select
            options={[
              { value: '', label: 'Choose from saved addresses...' },
              { value: 'saved-1', label: 'Home: Flat 402, Green Valley...' },
              { value: 'saved-2', label: 'Office: Cyber City Residency...' },
            ]}
            onChange={(e) => handleSavedAddressChange(e.target.value)}
            className="text-xs py-1.5"
          />
        </div>

        <Textarea
          label="Full Street Address & Landmark"
          placeholder="Enter house no, floor, building name, street, locality, landmark..."
          value={data.address}
          onChange={(e) => onChange({ ...data, address: e.target.value })}
          error={errors.address}
          rows={3}
          hint="Minimum 10 characters required for accurate provider routing."
        />

        <Textarea
          label="Special Instructions (Optional)"
          placeholder="e.g. Ring bell twice, beware of pet dog, park near gate 2..."
          value={data.instructions}
          onChange={(e) => onChange({ ...data, instructions: e.target.value })}
          rows={2}
        />
      </div>

      {/* Payment Method */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          3. Payment Mode
        </h3>

        <div className="flex items-center gap-3.5 rounded-xl border border-[#2563EB]/40 bg-[#EFF6FF] p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white shrink-0">
            <Banknote className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-extrabold text-slate-900">Cash on Delivery (COD)</p>
              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                ACTIVE V1
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Pay the provider in cash directly after the service is complete to your satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
