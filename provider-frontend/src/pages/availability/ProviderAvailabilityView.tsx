import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, AlertCircle } from 'lucide-react';
import { apiClient } from '../../api/client';

interface AvailabilitySlot {
  id: string;
  provider_id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  status: 'FREE' | 'BOOKED' | 'UNAVAILABLE';
}

export const ProviderAvailabilityView: React.FC = () => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [slotDate, setSlotDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const fetchSlots = async () => {
    try {
      const res = await apiClient.get('/providers/me/availability');
      setSlots(res.data);
    } catch (err) {
      console.error('Failed to load availability', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await apiClient.post('/providers/me/availability', {
        slot_date: slotDate,
        start_time: startTime + ':00',
        end_time: endTime + ':00',
        status: 'FREE',
      });
      setShowAddForm(false);
      setSlotDate('');
      setStartTime('');
      setEndTime('');
      fetchSlots();
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (typeof detail === 'string') {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(detail.map((d: any) => d.msg || JSON.stringify(d)).join('; '));
      } else {
        setError('Failed to add slot. Check for overlaps or invalid times.');
      }
    }
  };

  const handleDeleteSlot = async (id: string) => {
    try {
      await apiClient.delete(`/providers/me/availability/${id}`);
      fetchSlots();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete slot.');
    }
  };

  const handleUpdateStatus = async (slot: AvailabilitySlot, newStatus: string) => {
    try {
      await apiClient.patch(`/providers/me/availability/${slot.id}`, {
        status: newStatus,
      });
      fetchSlots();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update slot.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-[#1F2A1E]/60 text-sm font-semibold space-y-3">
        <div className="w-8 h-8 border-4 border-[#2F5233] border-t-transparent rounded-full animate-spin" />
        <span>Loading availability calendar...</span>
      </div>
    );
  }

  // Sort and group slots
  const sortedSlots = [...slots].sort((a, b) => {
    if (a.slot_date !== b.slot_date) return a.slot_date.localeCompare(b.slot_date);
    return a.start_time.localeCompare(b.start_time);
  });

  const groupedSlots = sortedSlots.reduce((acc, slot) => {
    if (!acc[slot.slot_date]) acc[slot.slot_date] = [];
    acc[slot.slot_date]!.push(slot);
    return acc;
  }, {} as Record<string, AvailabilitySlot[]>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FREE':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'BOOKED':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'UNAVAILABLE':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      {/* ── Header Banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5DEC9] shadow-xs">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2A1E] tracking-tight">
              Availability Schedule
            </h1>
            <span className="text-xs font-bold text-[#2F5233] bg-[#F2EDE1] px-3 py-1 rounded-full border border-[#E5DEC9]">
              {slots.length} Working Slots
            </span>
          </div>
          <p className="text-sm text-[#1F2A1E]/65 font-medium mt-1 max-w-2xl leading-relaxed">
            Manage your daily working hours. Customers in your service territory can only book your services during "FREE" active timeslots.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2F5233] hover:bg-[#3D6B42] text-white rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          {showAddForm ? 'Close Form' : <><Plus className="w-4 h-4" /> Add Working Slot</>}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-2xl flex items-start gap-3 border border-red-200 shadow-2xs">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-red-600" />
          <p className="text-xs sm:text-sm font-semibold">{error}</p>
        </div>
      )}

      {/* Add Slot Form */}
      {showAddForm && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E5DEC9] shadow-xs animate-in fade-in space-y-4">
          <h3 className="text-base font-bold text-[#1F2A1E] font-serif">Add New Available Working Slot</h3>
          <form onSubmit={handleAddSlot} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                Working Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={slotDate}
                onChange={(e) => setSlotDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                Start Time
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#1F2A1E]/70 uppercase tracking-wider mb-1.5">
                End Time
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F5233]/20 focus:border-[#2F5233] text-sm font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[#2F5233] hover:bg-[#3D6B42] text-white rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
            >
              Save Working Slot
            </button>
          </form>
        </div>
      )}

      {Object.keys(groupedSlots).length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E5DEC9] shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF7F0] border border-[#E5DEC9] flex items-center justify-center text-[#2F5233] mx-auto">
            <CalendarIcon className="w-7 h-7 text-[#2F5233]/40" />
          </div>
          <h3 className="font-serif-display text-xl font-bold text-[#1F2A1E]">No Availability Scheduled</h3>
          <p className="text-xs text-[#1F2A1E]/60 max-w-md mx-auto leading-relaxed">
            Add available time intervals to your working schedule so customers can book appointments with you.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSlots).map(([dateStr, daySlots]) => (
            <div key={dateStr} className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xs overflow-hidden">
              <div className="bg-[#FAF7F0] px-6 py-4 border-b border-[#E5DEC9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-4 h-4 text-[#2F5233]" />
                  <h2 className="font-serif-display text-base sm:text-lg font-bold text-[#1F2A1E]">
                    {new Date(dateStr).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </h2>
                </div>
                <span className="text-[11px] font-bold text-[#2F5233] bg-white px-3 py-1 rounded-full border border-[#E5DEC9]">
                  {daySlots.length} Slots
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {daySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF7F0]/60 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-[#1F2A1E] font-bold font-mono text-xs sm:text-sm bg-[#FAF7F0] px-3 py-1.5 rounded-xl border border-[#E5DEC9]">
                        <Clock className="w-3.5 h-3.5 text-[#C9A15A]" />
                        <span>
                          {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(
                          slot.status
                        )}`}
                      >
                        {slot.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {slot.status === 'FREE' && (
                        <button
                          onClick={() => handleUpdateStatus(slot, 'UNAVAILABLE')}
                          className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-[#E5DEC9] transition-colors"
                        >
                          Mark Unavailable
                        </button>
                      )}
                      {slot.status === 'UNAVAILABLE' && (
                        <button
                          onClick={() => handleUpdateStatus(slot, 'FREE')}
                          className="px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors"
                        >
                          Mark Free
                        </button>
                      )}
                      {slot.status !== 'BOOKED' && (
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200 transition-colors"
                          title="Delete Slot"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      {slot.status === 'BOOKED' && (
                        <span className="text-xs text-blue-700 font-semibold italic bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                          Active booking assigned
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderAvailabilityView;
