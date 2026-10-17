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

export const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [is2FaRequired, setIs2FaRequired] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }
    if (is2FaRequired && !twoFactorCode.trim()) {
      setErrorMessage(isRecoveryMode ? 'Please enter your recovery code.' : 'Please enter your 6-digit authenticator code.');
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);
    try {
      await login(
        email.trim(),
        password.trim(),
        is2FaRequired && !isRecoveryMode ? twoFactorCode.trim() : undefined,
        is2FaRequired && isRecoveryMode ? twoFactorCode.trim() : undefined
      );
    } catch (err: any) {
      const is2FaHeader = err.response?.headers?.['x-2fa-required'] === 'true';
      const detail = err.response?.data?.detail || '';
      const is2FaDetail = typeof detail === 'string' && (detail.includes('Two-factor') || detail.includes('2FA'));

      if (err.response?.status === 401 && (is2FaHeader || is2FaDetail) && !is2FaRequired) {
        setIs2FaRequired(true);
        setErrorMessage(null);
        return;
      }
      if (err.response?.data?.detail) {
        setErrorMessage(err.response.data.detail);
      } else if (err.message?.includes('Network Error') || !err.response) {
        setErrorMessage('Unable to connect to SmartServe backend. Please check your network.');
      } else {
        setErrorMessage('Invalid credentials. Please verify and try again.');
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
          {/* Header Branding */}
          <View style={styles.brandHeader}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoLetter}>S</Text>
            </View>
            <View style={styles.wordmarkRow}>
              <Text style={styles.brandSmart}>Smart</Text>
              <Text style={styles.brandServe}>Serve</Text>
            </View>
            <Text style={styles.portalSubtitle}>Customer Portal</Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{is2FaRequired ? 'Two-Factor Verification' : 'Sign In'}</Text>
            <Text style={styles.cardDescription}>
              {is2FaRequired
                ? (isRecoveryMode
                    ? 'Enter your single-use backup recovery code.'
                    : 'Enter the 6-digit verification code from your authenticator app.')
                : 'Enter your credentials to access your SmartServe account.'}
            </Text>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {!is2FaRequired ? (
              <>
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
                  <View style={styles.passwordLabelRow}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Text style={styles.togglePasswordText}>{showPassword ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.inputGroup}>
                  <View style={styles.passwordLabelRow}>
                    <Text style={styles.inputLabel}>
                      {isRecoveryMode ? 'Recovery Code' : '6-Digit Authenticator Code'}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setIsRecoveryMode(!isRecoveryMode);
                        setTwoFactorCode('');
                        setErrorMessage(null);
                      }}
                    >
                      <Text style={styles.togglePasswordText}>
                        {isRecoveryMode ? 'Use Authenticator App' : 'Use Recovery Code'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={[
                      styles.textInput,
                      { fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', letterSpacing: 2 },
                    ]}
                    placeholder={isRecoveryMode ? 'XXXX-XXXX' : '123456'}
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="characters"
                    maxLength={isRecoveryMode ? 20 : 6}
                    value={twoFactorCode}
                    onChangeText={setTwoFactorCode}
                  />
                </View>

                <TouchableOpacity
                  style={{ marginBottom: 16 }}
                  onPress={() => {
                    setIs2FaRequired(false);
                    setTwoFactorCode('');
                    setErrorMessage(null);
                  }}
                >
                  <Text style={{ fontSize: 13, color: '#64748B', fontWeight: '600' }}>
                    ← Back to email & password
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {is2FaRequired ? 'Verify & Sign In' : 'Sign In to SmartServe'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickFillButton}
              onPress={() => {
                setEmail('ananya.rao@example.com');
                setPassword('CustomerPass123!');
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.quickFillText}>⚡ Quick-Fill Customer Account (Ananya Rao)</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <TouchableOpacity style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>
              New to SmartServe?{' '}
              <Text style={styles.signupHighlight}>Create an Account</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.securityFooter}>
            <Text style={styles.securityText}>🔒 256-Bit Encrypted Session • SmartServe</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF9F5' },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 32 },
  brandHeader: { alignItems: 'center', marginBottom: 28 },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoLetter: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
  wordmarkRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  brandSmart: { fontSize: 26, fontWeight: '800', color: '#0F172A' },
  brandServe: { fontSize: 26, fontWeight: '800', color: '#2563EB' },
  portalSubtitle: { fontSize: 14, fontWeight: '500', color: '#64748B' },
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
  inputGroup: { marginBottom: 18 },
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
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  submitButtonDisabled: { opacity: 0.7 },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  quickFillButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
  },
  quickFillText: { color: '#1D4ED8', fontSize: 12, fontWeight: '700' },
  signupLink: { marginTop: 24, alignItems: 'center' },
  signupText: { fontSize: 14, color: '#64748B' },
  signupHighlight: { color: '#2563EB', fontWeight: '700' },
  securityFooter: { marginTop: 20, alignItems: 'center' },
  securityText: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
});
