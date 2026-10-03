import React, { useEffect, useState, useRef } from 'react';
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
} from 'react-native';
import { supportApi, SupportTicketDetail, MessageItem } from '../api/support';

interface Props {
  route?: { params?: { ticketId?: string } };
  navigation?: any;
}

export const SupportDetailScreen = ({ route, navigation }: Props) => {
  const ticketId = route?.params?.ticketId || '';
  const [ticket, setTicket] = useState<SupportTicketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  const loadTicket = async () => {
    try {
      const data = await supportApi.getTicketById(ticketId);
      setTicket(data);
    } catch (err) {
      console.warn('Failed to load ticket', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    const msg = newMessage.trim();
    if (!msg) return;

    setIsSending(true);
    try {
      await supportApi.sendMessage(ticketId, msg);
      setNewMessage('');
      await loadTicket();
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.detail || 'Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  const getRoleBubbleStyle = (role: string) => {
    if (role === 'customer') return styles.myBubble;
    return styles.theirBubble;
  };

  const getRoleTextStyle = (role: string) => {
    if (role === 'customer') return styles.myBubbleText;
    return styles.theirBubbleText;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
      </SafeAreaView>
    );
  }

  if (!ticket) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Ticket not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerSubject} numberOfLines={1}>{ticket.subject}</Text>
          <Text style={styles.headerRef}>#{ticket.id.slice(0, 8)} • {ticket.status?.toUpperCase()}</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={ticket.messages || []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyMessages}>
            <Text style={styles.emptyText}>No messages yet. Start the conversation!</Text>
          </View>
        }
        renderItem={({ item }) => {
          const isMe = item.sender_role === 'customer';
          return (
            <View style={[styles.messageRow, isMe ? styles.messageRowRight : styles.messageRowLeft]}>
              {!isMe && (
                <View style={styles.roleTag}>
                  <Text style={styles.roleTagText}>{(item.sender_name || item.sender_role)?.toUpperCase()}</Text>
                </View>
              )}
              <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
                <Text style={isMe ? styles.myBubbleText : styles.theirBubbleText}>{item.message_text}</Text>
                <Text style={styles.messageTime}>
                  {new Date(item.created_at).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputBar}>
          <TextInput
            style={styles.messageInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            placeholderTextColor="#94A3B8"
            multiline
            maxLength={1000}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!newMessage.trim() || isSending) && styles.sendBtnDisabled]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim() || isSending}
            activeOpacity={0.8}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.sendBtnText}>Send</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  loadingContainer: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#0F172A', marginBottom: 12 },
  backLink: { fontSize: 14, color: '#2563EB', fontWeight: '600' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: { marginRight: 12 },
  backBtnText: { fontSize: 22, color: '#0F172A', fontWeight: 'bold' },
  headerSubject: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  headerRef: { fontSize: 11, color: '#64748B', marginTop: 2 },
  messagesContainer: { padding: 16, paddingBottom: 24 },
  messageRow: { marginBottom: 12, maxWidth: '85%' },
  messageRowRight: { alignSelf: 'flex-end' },
  messageRowLeft: { alignSelf: 'flex-start' },
  roleTag: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  roleTagText: { fontSize: 9, fontWeight: '700', color: '#475569' },
  bubble: { borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10 },
  myBubble: { backgroundColor: '#1E40AF', borderBottomRightRadius: 4 },
  theirBubble: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderBottomLeftRadius: 4 },
  myBubbleText: { fontSize: 14, color: '#FFFFFF', lineHeight: 20 },
  theirBubbleText: { fontSize: 14, color: '#0F172A', lineHeight: 20 },
  messageTime: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 4, textAlign: 'right' },
  emptyMessages: { alignItems: 'center', padding: 32 },
  emptyText: { fontSize: 14, color: '#94A3B8', textAlign: 'center' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    maxHeight: 100,
    marginRight: 10,
  },
  sendBtn: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendBtnDisabled: { opacity: 0.5 },
  sendBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});
