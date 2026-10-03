import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react-native';
import { bookingsApi } from '../api/bookings';
import { formatRupee, formatCategoryDisplayName } from '../utils/formatters';

const TIME_SLOTS = [
  '09:00 AM - 11:00 AM',
  '11:00 AM - 01:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
];

function slotToTime(slot: string): string {
  const startPart = slot.split(' - ')[0].trim();
  const [timePart, ampm] = startPart.split(' ');
  const [hStr, mStr] = timePart.split(':');
  let h = parseInt(hStr, 10);
  if (ampm === 'PM' && h !== 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${mStr}:00`;
}

function getNextDates(): Array<{ label: string; dateStr: string }> {
  const dates = [];
  for (let i = 1; i <= 4; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const label = i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
    dates.push({ label, dateStr });
  }
  return dates;
}

export const BookingModalScreen = ({ route, navigation }: any) => {
  const { service, selectedProvider, selectedAddons, finalPrice } = route.params;

  const nextDates = getNextDates();
  const [selectedDate, setSelectedDate] = useState(nextDates[0].dateStr);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [addressLine1, setAddressLine1] = useState('Flat 402, Sunshine Apartments, Sector 62');
  const [landmark, setLandmark] = useState('Near Fortis Hospital');
  const [city, setCity] = useState('Noida');
  const [pincode, setPincode] = useState('201301');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Online'>('COD');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const price = finalPrice || service.base_price;

  const handleConfirmBooking = async () => {
    if (!addressLine1.trim() || addressLine1.trim().length < 5) {
      Alert.alert('Address Required', 'Please enter a valid service delivery address.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const result = await bookingsApi.createBooking({
        service_id: service.id,
        service_name: service.name,
        category: service.category,
        scheduled_date: selectedDate,
        scheduled_time: slotToTime(selectedSlot),
        address_line1: addressLine1.trim(),
        landmark: landmark.trim() || undefined,
        city: city.trim() || 'Noida',
        pincode: pincode.trim() || '201301',
        payment_method: paymentMethod,
        notes: notes.trim() || undefined,
        provider_id: selectedProvider?.provider_id || undefined,
      });

      setCreatedBooking(result);
      setBookingSuccess(true);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      setErrorMessage(detail || 'Failed to create booking on backend. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess && createdBooking) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.successContainer}>
          <View style={styles.successIconBadge}>
            <CheckCircle2 size={48} color="#059669" />
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Your service request has been sent to available SmartServe technicians.
          </Text>

          <View style={styles.successRefBox}>
            <Text style={styles.successRefLabel}>BOOKING REFERENCE</Text>
            <Text style={styles.successRefValue}>{createdBooking.booking_reference}</Text>
            <Text style={styles.successStatus}>Status: REQUESTED</Text>
          </View>

          <View style={styles.successDetailCard}>
            <Text style={styles.successDetailRow}>
              Service: <Text style={{ fontWeight: '700', color: '#0F172A' }}>{service.name}</Text>
            </Text>
            <Text style={styles.successDetailRow}>
              Date & Time: <Text style={{ fontWeight: '700', color: '#0F172A' }}>{selectedDate} at {selectedSlot.split(' - ')[0]}</Text>
            </Text>
            <Text style={styles.successDetailRow}>
              Total Amount: <Text style={{ fontWeight: '700', color: '#0F172A' }}>{formatRupee(price)}</Text>
            </Text>
            <Text style={styles.successDetailRow}>
              Payment: <Text style={{ fontWeight: '700', color: '#0F172A' }}>{paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online UPI'}</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.trackBookingBtn}
            onPress={() => {
              navigation.navigate('LiveTracking', { bookingId: createdBooking.id });
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.trackBookingBtnText}>Track Technician Dispatch Live</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.myBookingsBtn}
            onPress={() => {
              navigation.navigate('BookingsTab');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.myBookingsBtnText}>View in My Bookings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.8}>
          <ArrowLeft size={18} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Booking</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Service Summary Card */}
        <View style={styles.serviceSummaryCard}>
          <Text style={styles.summaryCategory}>{formatCategoryDisplayName(service.category)}</Text>
          <Text style={styles.summaryName}>{service.name}</Text>
          <Text style={styles.summaryPrice}>{formatRupee(price)}</Text>
        </View>

        {selectedProvider ? (
          <View style={styles.chosenProviderCard}>
            <UserCheck size={16} color="#059669" />
            <Text style={styles.chosenProviderText}>
              Selected Specialist: <Text style={{ fontWeight: '700' }}>{selectedProvider.full_name}</Text>
            </Text>
          </View>
        ) : null}

        {errorMessage ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* 1. Date Selection */}
        <View style={styles.formSection}>
          <View style={styles.sectionLabelRow}>
            <Calendar size={15} color="#2563EB" />
            <Text style={styles.sectionLabel}>Select Appointment Date</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20, paddingHorizontal: 20 }}>
            {nextDates.map((item) => {
              const isSelected = selectedDate === item.dateStr;
              return (
                <TouchableOpacity
                  key={item.dateStr}
                  style={[styles.dateChip, isSelected && styles.dateChipSelected]}
                  onPress={() => setSelectedDate(item.dateStr)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dateChipLabel, isSelected && styles.dateChipLabelSelected]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.dateChipDate, isSelected && styles.dateChipDateSelected]}>
                    {item.dateStr.slice(5)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* 2. Time Slot Selection */}
        <View style={styles.formSection}>
          <View style={styles.sectionLabelRow}>
            <Clock size={15} color="#2563EB" />
            <Text style={styles.sectionLabel}>Select Time Window</Text>
          </View>
          <View style={styles.slotsGrid}>
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <TouchableOpacity
                  key={slot}
                  style={[styles.slotCard, isSelected && styles.slotCardSelected]}
                  onPress={() => setSelectedSlot(slot)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.slotText, isSelected && styles.slotTextSelected]}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 3. Service Address */}
        <View style={styles.formSection}>
          <View style={styles.sectionLabelRow}>
            <MapPin size={15} color="#2563EB" />
            <Text style={styles.sectionLabel}>Service Delivery Address</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Flat, House no., Building, Street"
            placeholderTextColor="#94A3B8"
            value={addressLine1}
            onChangeText={setAddressLine1}
          />
          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.textInput, { flex: 1 }]}
              placeholder="Landmark (Optional)"
              placeholderTextColor="#94A3B8"
              value={landmark}
              onChangeText={setLandmark}
            />
            <TextInput
              style={[styles.textInput, { width: 100 }]}
              placeholder="Pincode"
              placeholderTextColor="#94A3B8"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* 4. Payment Method */}
        <View style={styles.formSection}>
          <View style={styles.sectionLabelRow}>
            <CreditCard size={15} color="#2563EB" />
            <Text style={styles.sectionLabel}>Payment Option</Text>
          </View>
          <View style={styles.paymentMethodRow}>
            <TouchableOpacity
              style={[styles.paymentCard, paymentMethod === 'COD' && styles.paymentCardSelected]}
              onPress={() => setPaymentMethod('COD')}
              activeOpacity={0.8}
            >
              <Banknote size={20} color={paymentMethod === 'COD' ? '#2563EB' : '#64748B'} />
              <View>
                <Text style={[styles.paymentTitle, paymentMethod === 'COD' && styles.paymentTitleSelected]}>
                  Cash on Delivery
                </Text>
                <Text style={styles.paymentSub}>Pay technician after job completion</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.paymentCard, paymentMethod === 'Online' && styles.paymentCardSelected]}
              onPress={() => setPaymentMethod('Online')}
              activeOpacity={0.8}
            >
              <CreditCard size={20} color={paymentMethod === 'Online' ? '#2563EB' : '#64748B'} />
              <View>
                <Text style={[styles.paymentTitle, paymentMethod === 'Online' && styles.paymentTitleSelected]}>
                  Online / UPI
                </Text>
                <Text style={styles.paymentSub}>Instant digital verification</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Special Notes */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Special Instructions (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Gate code, specific preferences, or pet warnings..."
            placeholderTextColor="#94A3B8"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Security & Guarantee Note */}
        <View style={styles.guaranteeNote}>
          <ShieldCheck size={16} color="#059669" />
          <Text style={styles.guaranteeText}>
            SmartServe Assurance: Free cancellation before technician dispatch • Verified partner
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.confirmBtn, isSubmitting && styles.confirmBtnDisabled]}
          onPress={handleConfirmBooking}
          disabled={isSubmitting}
          activeOpacity={0.85}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.confirmBtnText}>Confirm Booking ({formatRupee(price)})</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF9F5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  serviceSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  summaryCategory: { fontSize: 11, fontWeight: '700', color: '#2563EB', textTransform: 'uppercase', marginBottom: 2 },
  summaryName: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  summaryPrice: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  chosenProviderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 16,
  },
  chosenProviderText: { fontSize: 13, color: '#065F46' },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: { color: '#DC2626', fontSize: 13, fontWeight: '600' },
  formSection: { marginBottom: 20 },
  sectionLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  dateChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  dateChipSelected: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  dateChipLabel: { fontSize: 12, fontWeight: '700', color: '#334155' },
  dateChipLabelSelected: { color: '#FFFFFF' },
  dateChipDate: { fontSize: 10, color: '#64748B', marginTop: 2 },
  dateChipDateSelected: { color: '#BFDBFE' },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slotCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  slotCardSelected: { backgroundColor: '#EFF6FF', borderColor: '#2563EB' },
  slotText: { fontSize: 11, fontWeight: '600', color: '#334155' },
  slotTextSelected: { color: '#1D4ED8', fontWeight: '700' },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 8,
  },
  rowInputs: { flexDirection: 'row', gap: 8 },
  textArea: { height: 75, textAlignVertical: 'top' },
  paymentMethodRow: { gap: 10 },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  paymentCardSelected: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  paymentTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  paymentTitleSelected: { color: '#1D4ED8' },
  paymentSub: { fontSize: 11, color: '#64748B', marginTop: 1 },
  guaranteeNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 20,
  },
  guaranteeText: { fontSize: 11, color: '#166534', flex: 1, lineHeight: 16 },
  confirmBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmBtnDisabled: { opacity: 0.7 },
  confirmBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  successIconBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  successTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  successSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  successRefBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 16,
  },
  successRefLabel: { fontSize: 10, fontWeight: '800', color: '#1D4ED8', letterSpacing: 0.5 },
  successRefValue: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginVertical: 4 },
  successStatus: { fontSize: 12, fontWeight: '700', color: '#D97706' },
  successDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
    gap: 8,
  },
  successDetailRow: { fontSize: 13, color: '#475569' },
  trackBookingBtn: {
    backgroundColor: '#2563EB',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  trackBookingBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  myBookingsBtn: {
    backgroundColor: '#F1F5F9',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  myBookingsBtnText: { color: '#334155', fontSize: 14, fontWeight: '700' },
});
