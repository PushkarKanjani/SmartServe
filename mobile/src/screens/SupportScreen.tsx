import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Headphones, Plus, ChevronRight, MessageSquare, Clock, ShieldCheck } from 'lucide-react-native';
import { supportApi, SupportTicketDetail } from '../api/support';

export const SupportScreen = ({ navigation }: any) => {
  const [tickets, setTickets] = useState<SupportTicketDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Service Quality & Feedback');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadTickets = useCallback(async () => {
    try {
      const data = await supportApi.getTickets();
      setTickets(data);
    } catch (err) {
      console.warn('Failed to load support tickets', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const onRefresh = () => {
    setRefreshing(true);
    loadTickets();
  };

  const handleCreateTicket = async () => {
    if (!subject.trim() || !description.trim()) {
      Alert.alert('Required', 'Please enter both a subject and your message description.');
      return;
    }
    setIsSubmitting(true);
    try {
      await supportApi.createTicket({
        subject: subject.trim(),
        category,
        description: description.trim(),
      });
      setSubject('');
      setDescription('');
      setShowNewTicket(false);
      await loadTickets();
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.detail || 'Failed to create support ticket.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'resolved':
      case 'closed':
        return { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' };
      case 'in_progress':
        return { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' };
      default:
        return { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' };
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading support conversations...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Customer Support</Text>
          <Text style={styles.subtitle}>Direct 24/7 help desk and live booking resolution</Text>
        </View>
        <TouchableOpacity
          style={styles.newTicketBtn}
          onPress={() => setShowNewTicket(!showNewTicket)}
          activeOpacity={0.8}
        >
          {showNewTicket ? (
            <Text style={styles.newTicketBtnText}>Cancel</Text>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Plus size={14} color="#FFFFFF" />
              <Text style={styles.newTicketBtnText}>New Ticket</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {showNewTicket ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Submit Support Request</Text>
              <Text style={styles.cardSub}>An admin or operations specialist will reply promptly.</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Subject / Topic</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., Question about technician arrival or billing"
                  placeholderTextColor="#94A3B8"
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category</Text>
                <View style={styles.catChipsRow}>
                  {['Service Quality', 'Billing & Refunds', 'Scheduling', 'Other'].map((cat) => {
                    const isSelected = category.includes(cat.split(' ')[0]);
                    return (
                      <TouchableOpacity
                        key={cat}
                        style={[styles.catChip, isSelected && styles.catChipSelected]}
                        onPress={() => setCategory(cat)}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.catChipText, isSelected && styles.catChipTextSelected]}>
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Detailed Message</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Describe your issue or question in detail..."
                  placeholderTextColor="#94A3B8"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <TouchableOpacity
                style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
                onPress={handleCreateTicket}
                disabled={isSubmitting}
                activeOpacity={0.85}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.submitBtnText}>Create Support Ticket</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Headphones size={48} color="#94A3B8" style={{ marginBottom: 12 }} />
              <Text style={styles.emptyTitle}>No Support Tickets</Text>
              <Text style={styles.emptySubtitle}>
                Have an inquiry or issue? Tap "+ New Ticket" above to reach our operations team.
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const badge = getStatusBadge(item.status);
            const msgCount = item.messages ? item.messages.length : 0;

            return (
              <TouchableOpacity
                style={styles.ticketCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('SupportDetail', { ticketId: item.id })}
              >
                <View style={styles.ticketTopRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.ticketCategory}>{item.category?.toUpperCase() || 'GENERAL'}</Text>
                    <Text style={styles.ticketSubject} numberOfLines={1}>{item.subject}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
                    <Text style={[styles.badgeText, { color: badge.text }]}>
                      {item.status?.toUpperCase() || 'OPEN'}
                    </Text>
                  </View>
                </View>

                {item.description ? (
                  <Text style={styles.ticketDesc} numberOfLines={2}>{item.description}</Text>
                ) : null}

                <View style={styles.ticketBottomRow}>
                  <View style={styles.msgCountRow}>
                    <MessageSquare size={13} color="#64748B" />
                    <Text style={styles.msgCountText}>{msgCount} message{msgCount !== 1 ? 's' : ''}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={styles.openChatText}>Open Conversation</Text>
                    <ChevronRight size={14} color="#2563EB" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF9F5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF9F5' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#64748B', fontWeight: '600' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  subtitle: { fontSize: 12, color: '#64748B', marginTop: 2 },
  newTicketBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  newTicketBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  listContainer: { padding: 20, paddingBottom: 40 },
  formContainer: { padding: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  cardSub: { fontSize: 12, color: '#64748B', marginBottom: 18 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 13, fontWeight: '700', color: '#334155', marginBottom: 6 },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  textArea: { height: 90, textAlignVertical: 'top' },
  catChipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  catChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catChipSelected: { backgroundColor: '#EFF6FF', borderColor: '#2563EB' },
  catChipText: { fontSize: 11, fontWeight: '600', color: '#475569' },
  catChipTextSelected: { color: '#2563EB', fontWeight: '700' },
  submitBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnDisabled: { opacity: 0.7 },
  submitBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  ticketTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  ticketCategory: { fontSize: 10, fontWeight: '800', color: '#2563EB', letterSpacing: 0.5, marginBottom: 2 },
  ticketSubject: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, borderWidth: 1 },
  badgeText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.3 },
  ticketDesc: { fontSize: 13, color: '#64748B', lineHeight: 18, marginBottom: 12 },
  ticketBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  msgCountRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  msgCountText: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  openChatText: { fontSize: 12, fontWeight: '700', color: '#2563EB' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', padding: 32, marginTop: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  emptySubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center' },
});
