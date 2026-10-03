import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

export const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of SmartServe?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  const displayName = user?.full_name || user?.email?.split('@')[0] || 'SmartServe User';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
          {user?.phone ? (
            <Text style={styles.userPhone}>{user.phone}</Text>
          ) : null}
          <View style={styles.rolePill}>
            <Text style={styles.roleText}>Customer</Text>
          </View>
        </View>

        {/* Account Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account Details</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{user?.full_name || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue} numberOfLines={1}>{user?.email || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user?.phone || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Customer ID</Text>
            <Text style={styles.infoValue} numberOfLines={1}>{user?.customer_id?.slice(0, 12)}...</Text>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Application</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0 (Phase 2)</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Backend</Text>
            <Text style={styles.infoValue} numberOfLines={1}>{API_BASE_URL}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Currency</Text>
            <Text style={styles.infoValue}>INR (₹)</Text>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.85} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF9F5' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  userName: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  userEmail: { fontSize: 13, color: '#64748B', marginBottom: 2 },
  userPhone: { fontSize: 13, color: '#64748B', marginBottom: 10 },
  rolePill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  roleText: { fontSize: 12, fontWeight: '700', color: '#1E40AF', textTransform: 'uppercase' },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  infoLabel: { fontSize: 13, color: '#64748B' },
  infoValue: { fontSize: 13, fontWeight: '600', color: '#1E293B', maxWidth: '55%', textAlign: 'right' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 4 },
  logoutBtn: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: { color: '#DC2626', fontSize: 15, fontWeight: '700' },
});
