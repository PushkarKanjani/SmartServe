import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../store/AuthContext';
import { Navbar } from '../../components/common/Navbar';
import { providerApi } from '../../api/providerApi';
import { AvailabilitySlot } from '../../types/provider';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const AvailabilityPage: React.FC = () => {
  const { user } = useAuth();

  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [slotDate, setSlotDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('12:00');

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchSlots = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await providerApi.getAvailability(user.id);
      setSlots(data);
    } catch {
      // Fallback demo slots
      setSlots([
        {
          id: 'slot-1',
          provider_id: user?.id || 'demo-provider-1',
          slot_date: new Date().toISOString().split('T')[0],
          start_time: '09:00:00',
          end_time: '12:00:00',
          status: 'FREE',
          created_at: new Date().toISOString(),
        },
        {
          id: 'slot-2',
          provider_id: user?.id || 'demo-provider-1',
          slot_date: new Date().toISOString().split('T')[0],
          start_time: '14:00:00',
          end_time: '17:00:00',
          status: 'RESERVED',
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (startTime >= endTime) {
      setErrorMsg('Start time must be strictly before end time.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const formattedStart = startTime.length === 5 ? `${startTime}:00` : startTime;
    const formattedEnd = endTime.length === 5 ? `${endTime}:00` : endTime;

    try {
      const newSlot = await providerApi.addAvailability({
        slot_date: slotDate,
        start_time: formattedStart,
        end_time: formattedEnd,
      });

      setSlots((prev) => [...prev, newSlot]);
      setSuccessMsg('Timeslot published successfully.');
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch {
      const demoSlot: AvailabilitySlot = {
        id: `slot-${Date.now()}`,
        provider_id: user?.id || 'demo-provider-1',
        slot_date: slotDate,
        start_time: formattedStart,
        end_time: formattedEnd,
        status: 'FREE',
        created_at: new Date().toISOString(),
      };
      setSlots((prev) => [...prev, demoSlot]);
      setSuccessMsg('Timeslot added to calendar (demo mode).');
      setTimeout(() => setSuccessMsg(null), 3500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    try {
      await providerApi.deleteAvailability(slotId);
      setSlots((prev) => prev.filter((s) => s.id !== slotId));
      setSuccessMsg('Timeslot removed.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch {
      setSlots((prev) => prev.filter((s) => s.id !== slotId));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F9FAFB' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, maxWidth: '960px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827' }}>
              Availability Schedule
            </h1>
            <span className="badge badge-provider">Booking Slots</span>
          </div>
          <p style={{ color: '#6B7280', fontSize: '13px', marginTop: '2px' }}>
            Publish your active service hours. Customers will only be able to book during these working windows.
          </p>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div style={{
            background: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            padding: '10px 14px',
            borderRadius: '6px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px'
          }}>
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#991B1B',
            padding: '10px 14px',
            borderRadius: '6px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px'
          }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Add Slot Card */}
        <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={16} color="#4F46E5" />
            <span>Add Available Timeslot</span>
          </h2>

          <form onSubmit={handleAddSlot} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="slotDate">Date</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="slotDate"
                  type="date"
                  className="form-input"
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  required
                  style={{ paddingLeft: '36px' }}
                />
                <CalendarIcon size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="startTime">Start Time</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="startTime"
                  type="time"
                  className="form-input"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  style={{ paddingLeft: '36px' }}
                />
                <Clock size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="endTime">End Time</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="endTime"
                  type="time"
                  className="form-input"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  style={{ paddingLeft: '36px' }}
                />
                <Clock size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ padding: '8px 16px', height: '38px' }}
            >
              <Plus size={16} />
              <span>{isSubmitting ? 'Adding...' : 'Add Slot'}</span>
            </button>
          </form>
        </div>

        {/* Existing Slots List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
              Configured Working Slots ({slots.length})
            </h2>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#6B7280' }}>Loading schedule...</div>
          ) : slots.length === 0 ? (
            <div className="card" style={{ padding: '30px', textAlign: 'center', color: '#6B7280' }}>
              No availability slots published yet. Add a timeslot above to open your calendar for bookings.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {slots.map((slot) => {
                const isFree = slot.status === 'FREE';
                return (
                  <div key={slot.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className={`badge ${isFree ? 'badge-free' : 'badge-reserved'}`}>
                          {slot.status}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
                          {slot.slot_date}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} color="#6B7280" />
                        <span>{slot.start_time.slice(0, 5)} – {slot.end_time.slice(0, 5)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 8px', color: '#B91C1C', borderColor: '#FCA5A5' }}
                      title="Remove Slot"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
