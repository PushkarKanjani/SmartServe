import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, Edit2, AlertCircle } from 'lucide-react';
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
        status: 'FREE'
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
        status: newStatus
      });
      fetchSlots();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update slot.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-[#1F2A1E]/60 text-sm font-medium animate-pulse">
        Loading schedule...
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
    acc[slot.slot_date].push(slot);
    return acc;
  }, {} as Record<string, AvailabilitySlot[]>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FREE': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'BOOKED': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'UNAVAILABLE': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif-display text-3xl font-bold text-[#1F2A1E] tracking-tight">Availability</h1>
          <p className="text-[#1F2A1E]/70 mt-2 text-sm max-w-2xl">
            Manage your working hours. Customers can only book you during your "FREE" slots.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2F5233] text-white rounded-xl font-semibold hover:bg-[#2F5233]/90 transition-colors shadow-sm"
        >
          {showAddForm ? 'Cancel' : <><Plus className="w-4 h-4" /> Add Slot</>}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-2xl flex items-start gap-3 border border-red-200 shadow-sm">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {showAddForm && (
        <div className="mb-8 p-6 bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm">
          <h3 className="text-lg font-bold text-[#1F2A1E] mb-4">Add Availability Slot</h3>
          <form onSubmit={handleAddSlot} className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Date</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={slotDate}
                onChange={(e) => setSlotDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">Start Time</label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-[#1F2A1E]/60 uppercase tracking-wider mb-1.5">End Time</label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF7F0] border border-[#2F5233]/20 rounded-xl focus:outline-none focus:border-[#2F5233] focus:ring-1 focus:ring-[#2F5233] text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#2F5233] text-white rounded-xl font-bold hover:bg-[#2F5233]/90 transition-colors shadow-sm"
            >
              Save Slot
            </button>
          </form>
        </div>
      )}

      {Object.keys(groupedSlots).length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#2F5233]/10 shadow-sm">
          <CalendarIcon className="w-12 h-12 text-[#2F5233]/30 mx-auto mb-4" />
          <h3 className="font-serif-display text-xl font-bold text-[#1F2A1E]">No Availability Scheduled</h3>
          <p className="text-[#1F2A1E]/60 mt-2 max-w-md mx-auto">
            Add slots to your calendar so customers can book your services.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSlots).map(([dateStr, daySlots]) => (
            <div key={dateStr} className="bg-white rounded-3xl border border-[#2F5233]/10 shadow-sm overflow-hidden">
              <div className="bg-[#FAF7F0] px-6 py-4 border-b border-[#2F5233]/10 flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-[#2F5233]" />
                <h2 className="font-serif-display text-lg font-bold text-[#2F5233]">
                  {new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                </h2>
              </div>
              
              <div className="divide-y divide-[#2F5233]/5">
                {daySlots.map((slot) => (
                  <div key={slot.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-[#1F2A1E] font-medium font-mono text-sm">
                        <Clock className="w-4 h-4 text-[#1F2A1E]/40" />
                        {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                      </div>
                      <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(slot.status)}`}>
                        {slot.status}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {slot.status === 'FREE' && (
                        <button
                          onClick={() => handleUpdateStatus(slot, 'UNAVAILABLE')}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          Mark Unavailable
                        </button>
                      )}
                      {slot.status === 'UNAVAILABLE' && (
                        <button
                          onClick={() => handleUpdateStatus(slot, 'FREE')}
                          className="px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                        >
                          Mark Free
                        </button>
                      )}
                      {slot.status !== 'BOOKED' && (
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Slot"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      {slot.status === 'BOOKED' && (
                        <span className="text-xs text-blue-600 font-medium italic">
                          Cannot edit booked slot
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
