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
      setSuccessMsg('Timeslot successfully published to customer catalog!');
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch {
      // Demo optimistic fallback
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
      setSuccessMsg('Timeslot added to calendar (demo mode)');
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0e1a' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, maxWidth: '1000px' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              Availability Calendar & Dispatch Slots
            </h1>
            <span className="badge badge-provider">Booking Engine</span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
            Publish your active service windows. Customers will only be able to book you during these slots.
          </p>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            color: '#34d399',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px'
          }}>
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#f87171',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px'
          }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Add Slot Form */}
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} color="#818cf8" />
            <span>Publish New Working Slot</span>
          </h2>

          <form onSubmit={handleAddSlot} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="slotDate">Appointment Date</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="slotDate"
                  type="date"
                  className="form-input"
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  required
                  style={{ paddingLeft: '40px' }}
                />
                <CalendarIcon size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
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
                  style={{ paddingLeft: '40px' }}
                />
                <Clock size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
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
                  style={{ paddingLeft: '40px' }}
                />
                <Clock size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ padding: '12px 20px', height: '45px' }}
            >
              <Plus size={18} />
              <span>{isSubmitting ? 'Publishing...' : 'Add Slot'}</span>
            </button>
          </form>
        </div>

        {/* Existing Slots List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>
              📅 Published Working Slots ({slots.length})
            </h2>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading schedule...</div>
          ) : slots.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
              No availability slots published yet. Add your first slot above to receive bookings!
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {slots.map((slot) => {
                const isFree = slot.status === 'FREE';
                return (
                  <div key={slot.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className={`badge ${isFree ? 'badge-provider' : 'badge-customer'}`}>
                          {slot.status}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                          {slot.slot_date}
                        </span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} color="#94a3b8" />
                        <span>{slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="btn btn-danger"
                      style={{ padding: '8px', borderRadius: '8px' }}
                      title="Remove Slot"
                    >
                      <Trash2 size={16} />
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
