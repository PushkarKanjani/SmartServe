import React, { useState, useRef, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  // Automatically determine the PC LAN IP from the active Expo Metro connection
  const customerWebUrl = useMemo(() => {
    // 1. Check if explicitly defined in environment
    if (process.env.EXPO_PUBLIC_CUSTOMER_WEB_URL) {
      return process.env.EXPO_PUBLIC_CUSTOMER_WEB_URL;
    }

    // 2. Extract host from Expo constants (e.g., "172.20.10.2:8081")
    const hostUri = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoClient?.hostUri;
    if (hostUri) {
      const hostIp = hostUri.split(':')[0];
      if (hostIp && hostIp !== 'localhost' && hostIp !== '127.0.0.1') {
        return `http://${hostIp}:5174`;
      }
    }

    // 3. Current active PC LAN IP
    return 'http://172.20.10.2:5174';
  }, []);

  const handleReload = () => {
    setLoadError(null);
    setIsLoading(true);
    webViewRef.current?.reload();
  };

  const handleGoBack = () => {
    if (canGoBack) {
      webViewRef.current?.goBack();
    }
  };

  const handleGoForward = () => {
    if (canGoForward) {
      webViewRef.current?.goForward();
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar style="dark" />

        {/* Minimalist Top Control Bar */}
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <View style={styles.liveIndicator} />
            <Text style={styles.brandText}>SmartServe Live Web</Text>
            <Text style={styles.urlPill} numberOfLines={1}>{customerWebUrl}</Text>
          </View>
          <View style={styles.controlsRow}>
            {canGoBack && (
              <TouchableOpacity onPress={handleGoBack} style={styles.navButton} activeOpacity={0.7}>
                <Text style={styles.navButtonText}>‹</Text>
              </TouchableOpacity>
            )}
            {canGoForward && (
              <TouchableOpacity onPress={handleGoForward} style={styles.navButton} activeOpacity={0.7}>
                <Text style={styles.navButtonText}>›</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleReload} style={styles.reloadButton} activeOpacity={0.7}>
              <Text style={styles.reloadButtonText}>↻</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Customer Web Shell */}
        <View style={styles.webContainer}>
          <WebView
            ref={webViewRef}
            source={{ uri: customerWebUrl }}
            style={styles.webView}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            originWhitelist={['*']}
            pullToRefreshEnabled={true}
            onLoadStart={() => {
              setIsLoading(true);
              setLoadError(null);
            }}
            onLoadEnd={() => {
              setIsLoading(false);
            }}
            onNavigationStateChange={(navState) => {
              setCanGoBack(navState.canGoBack);
              setCanGoForward(navState.canGoForward);
            }}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              setIsLoading(false);
              setLoadError(nativeEvent.description || 'Failed to connect to Customer Web.');
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              if (nativeEvent.statusCode >= 400) {
                setLoadError(`Server returned HTTP ${nativeEvent.statusCode}`);
              }
            }}
          />

          {/* Loading Indicator */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoBadgeText}>S</Text>
              </View>
              <Text style={styles.loadingTitle}>Connecting to SmartServe</Text>
              <Text style={styles.loadingSubtitle}>{customerWebUrl}</Text>
              <ActivityIndicator size="small" color="#1E40AF" style={{ marginTop: 16 }} />
            </View>
          )}

          {/* Error Screen with Retry */}
          {loadError && (
            <View style={styles.errorOverlay}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorTitle}>Unable to Reach Customer Web</Text>
              <Text style={styles.errorDetail}>{loadError}</Text>
              <Text style={styles.errorInstruction}>
                Make sure your PC and mobile device are connected to the same Wi-Fi network and Customer Web is running on port 5174.
              </Text>
              <TouchableOpacity onPress={handleReload} style={styles.retryButton} activeOpacity={0.8}>
                <Text style={styles.retryButtonText}>Retry Connection</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  liveIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  brandText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 6,
  },
  urlPill: {
    fontSize: 10,
    color: '#64748B',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    maxWidth: 160,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    lineHeight: 20,
  },
  reloadButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reloadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  webContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  webView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAF9F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    zIndex: 10,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoBadgeText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  loadingSubtitle: {
    fontSize: 13,
    color: '#64748B',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAF9F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    zIndex: 20,
  },
  errorIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDetail: {
    fontSize: 13,
    color: '#DC2626',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  errorInstruction: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
