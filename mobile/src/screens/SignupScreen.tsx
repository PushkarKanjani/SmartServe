import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export const SignupScreen = ({ navigation }: any) => {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please fill in your full name, email, and password.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      await register(fullName.trim(), email.trim(), password, phone.trim() || undefined);
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setErrorMessage(err.response.data.detail);
      } else if (err.message?.includes('Network Error') || !err.response) {
        setErrorMessage('Unable to connect to SmartServe. Check your network.');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View style={styles.brandHeader}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoLetter}>S</Text>
            </View>
            <View style={styles.wordmarkRow}>
              <Text style={styles.brandSmart}>Smart</Text>
              <Text style={styles.brandServe}>Serve</Text>
            </View>
            <Text style={styles.portalSubtitle}>Create Your Account</Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign Up</Text>
            <Text style={styles.cardDescription}>
              Join SmartServe to book trusted home services instantly.
            </Text>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Priya Sharma"
                placeholderTextColor="#94A3B8"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="name@example.com"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="+91 98765 43210"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.passwordLabelRow}>
                <Text style={styles.inputLabel}>Password</Text>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.togglePasswordText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Min. 6 characters"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Re-enter your password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Sign In Link */}
          <TouchableOpacity style={styles.signinLink} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signinText}>
              Already have an account?{' '}
              <Text style={styles.signinHighlight}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF9F5' },
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  brandHeader: { alignItems: 'center', marginBottom: 24 },
  logoBadge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoLetter: { fontSize: 26, fontWeight: '800', color: '#FFFFFF' },
  wordmarkRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 2 },
  brandSmart: { fontSize: 24, fontWeight: '800', color: '#0F172A' },
  brandServe: { fontSize: 24, fontWeight: '800', color: '#2563EB' },
  portalSubtitle: { fontSize: 13, fontWeight: '500', color: '#64748B' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginBottom: 6 },
  cardDescription: { fontSize: 14, color: '#64748B', marginBottom: 20, lineHeight: 20 },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorText: { color: '#DC2626', fontSize: 13, fontWeight: '500' },
  inputGroup: { marginBottom: 16 },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6 },
  togglePasswordText: { fontSize: 13, fontWeight: '600', color: '#2563EB' },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  submitButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: { opacity: 0.7 },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  signinLink: { marginTop: 24, alignItems: 'center' },
  signinText: { fontSize: 14, color: '#64748B' },
  signinHighlight: { color: '#2563EB', fontWeight: '700' },
});
