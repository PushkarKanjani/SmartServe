import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { 
  Search, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Flame, 
  AlertTriangle,
  Radio,
  KeyRound
} from 'lucide-react-native';
import { catalogApi, CategoryItem, ServiceItem } from '../api/catalog';
import { bookingsApi, BookingItem } from '../api/bookings';
import { getServiceImage } from '../utils/serviceImages';
import { formatRupee, formatCategoryDisplayName } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CATEGORY_CARD_WIDTH = (SCREEN_WIDTH - 40 - 12) / 2;

export const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [popularServices, setPopularServices] = useState<ServiceItem[]>([]);
  const [activeBooking, setActiveBooking] = useState<BookingItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setNetworkError(false);
      const [cats, svcs, bookings] = await Promise.all([
        catalogApi.getCategories(),
        catalogApi.getAllServices({ limit: 10 }),
        bookingsApi.getAllBookings().catch(() => [] as BookingItem[]),
      ]);

      setCategories(cats);
      // Pick top trending services
      setPopularServices(svcs.slice(0, 8));

      // Find any ongoing active booking (Requested, Accepted, On The Way, Arrived, Started)
      const ongoing = bookings.find((b) =>
        ['requested', 'accepted', 'on the way', 'arrived', 'started'].includes(
          (b.status || '').toLowerCase().trim()
        )
      );
      setActiveBooking(ongoing || null);
    } catch (err) {
      console.warn('Home fetch error:', err);
      setNetworkError(true);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigation.navigate('CatalogTab', {
        screen: 'ServiceList',
        params: { search: searchQuery.trim() },
      });
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading SmartServe...</Text>
      </SafeAreaView>
    );
  }

  if (networkError) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.errorCard}>
          <AlertTriangle size={36} color="#DC2626" style={{ marginBottom: 12 }} />
          <Text style={styles.errorTitle}>Unable to connect to SmartServe</Text>
          <Text style={styles.errorSub}>
            Please verify that your phone is connected to the same Wi-Fi/LAN as your development server.
          </Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchData}>
            <Text style={styles.retryBtnText}>Retry Connection</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const activeStatusLower = (activeBooking?.status || '').toLowerCase();
  const isInTransit = ['on the way', 'arrived'].includes(activeStatusLower);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.full_name || 'Customer'}</Text>
          </View>
          <View style={styles.badgePill}>
            <ShieldCheck size={14} color="#059669" />
            <Text style={styles.badgeText}>Verified Account</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Search size={18} color="#64748B" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search cleaning, plumbing, AC repair..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
        </View>

        {/* Active Booking Hero Banner */}
        {activeBooking && (
          <TouchableOpacity
            style={styles.activeBookingCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('LiveTracking', { bookingId: activeBooking.id })}
          >
            <View style={styles.activeBookingHeader}>
              <View style={styles.liveIndicatorRow}>
                <Radio size={16} color="#2563EB" />
                <Text style={styles.liveIndicatorText}>ACTIVE DISPATCH IN PROGRESS</Text>
              </View>
              <View style={[
                styles.statusBadge,
                isInTransit ? styles.transitBadge : styles.defaultBadge
              ]}>
                <Text style={[
                  styles.statusBadgeText,
                  isInTransit ? styles.transitBadgeText : styles.defaultBadgeText
                ]}>
                  {activeBooking.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={styles.activeServiceName}>{activeBooking.service_name}</Text>
            <Text style={styles.activeServiceRef}>{activeBooking.booking_reference} • {activeBooking.scheduled_time?.slice(0, 5)}</Text>

            {activeBooking.provider_name ? (
              <Text style={styles.activeProviderText}>
                Technician: <Text style={{ fontWeight: '700', color: '#0F172A' }}>{activeBooking.provider_name}</Text>
              </Text>
            ) : null}

            {activeBooking.otp_code && isInTransit && (
              <View style={styles.otpPill}>
                <KeyRound size={14} color="#7C3AED" />
                <Text style={styles.otpPillText}>Start OTP: <Text style={{ fontWeight: '800' }}>{activeBooking.otp_code}</Text></Text>
              </View>
            )}

            <View style={styles.trackCtaRow}>
              <Text style={styles.trackCtaText}>Open Live GPS Tracking & Details</Text>
              <ChevronRight size={16} color="#2563EB" />
            </View>
          </TouchableOpacity>
        )}

        {/* Promo Hero Banner */}
        <View style={styles.promoCard}>
          <View style={styles.promoContent}>
            <View style={styles.promoTagRow}>
              <Sparkles size={13} color="#FFFFFF" />
              <Text style={styles.promoTag}>SMARTSERVE VERIFIED</Text>
            </View>
            <Text style={styles.promoTitle}>Quality Home Services, Guaranteed</Text>
            <Text style={styles.promoSub}>Upfront pricing • Certified specialists • Background verified</Text>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CatalogTab')}>
            <Text style={styles.seeAllText}>View All ({categories.length})</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryGrid}>
          {categories.slice(0, 8).map((cat) => {
            const cleanName = formatCategoryDisplayName(cat.name || cat.display_name);
            const imgUrl = cat.image || getServiceImage(cat.name);
            return (
              <TouchableOpacity
                key={cat.id || cat.name}
                style={styles.categoryCard}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('CatalogTab', {
                    screen: 'SubcategoryList',
                    params: { category: cat.name, categoryName: cleanName },
                  })
                }
              >
                <Image source={{ uri: imgUrl }} style={styles.categoryImage} />
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName} numberOfLines={2}>
                    {cleanName}
                  </Text>
                  {cat.service_count ? (
                    <Text style={styles.categoryCount}>{cat.service_count} services</Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Trending Services Section */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Flame size={18} color="#EA580C" />
            <Text style={styles.sectionTitle}>Trending Services</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {popularServices.map((svc) => {
            const imgUrl = svc.image_url || getServiceImage(svc.category, svc.subcategory, svc.name);
            return (
              <TouchableOpacity
                key={svc.id}
                style={styles.trendingCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('ServiceDetail', { serviceId: svc.id })}
              >
                <Image source={{ uri: imgUrl }} style={styles.trendingImage} />
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingCategory}>{formatCategoryDisplayName(svc.category)}</Text>
                  <Text style={styles.trendingName} numberOfLines={1}>
                    {svc.name}
                  </Text>
                  <View style={styles.trendingPriceRow}>
                    <Text style={styles.priceValue}>{formatRupee(svc.base_price)}</Text>
                    {svc.duration_minutes ? (
                      <View style={styles.durationPill}>
                        <Clock size={11} color="#64748B" />
                        <Text style={styles.durationText}>{svc.duration_minutes}m</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F5',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FAF9F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  errorCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  retryBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  greetingText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    padding: 0,
  },
  activeBookingCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#93C5FD',
    padding: 16,
    marginBottom: 16,
  },
  activeBookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  liveIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveIndicatorText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1D4ED8',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  defaultBadge: {
    backgroundColor: '#DBEAFE',
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1E40AF',
  },
  transitBadge: {
    backgroundColor: '#FFEDD5',
  },
  transitBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#C2410C',
  },
  activeServiceName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  activeServiceRef: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 6,
  },
  activeProviderText: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 8,
  },
  otpPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  otpPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6D28D9',
  },
  trackCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#BFDBFE',
  },
  trackCtaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  promoCard: {
    backgroundColor: '#1E3A8A',
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  promoContent: {
    gap: 6,
  },
  promoTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  promoTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  promoSub: {
    fontSize: 12,
    color: '#BFDBFE',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: CATEGORY_CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  categoryImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#F1F5F9',
  },
  categoryInfo: {
    padding: 10,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 18,
  },
  categoryCount: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  trendingCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  trendingImage: {
    width: '100%',
    height: 115,
    backgroundColor: '#F1F5F9',
  },
  trendingInfo: {
    padding: 12,
  },
  trendingCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  trendingName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  trendingPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
});
