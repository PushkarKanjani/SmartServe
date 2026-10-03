import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  RefreshControl,
} from 'react-native';
import { ArrowLeft, Search, Clock, Star, ChevronRight, ShieldCheck } from 'lucide-react-native';
import { catalogApi, ServiceItem } from '../api/catalog';
import { getServiceImage } from '../utils/serviceImages';
import { formatRupee, formatCategoryDisplayName } from '../utils/formatters';

export const ServiceListScreen = ({ route, navigation }: any) => {
  const { category, subcategory, search } = route.params || {};
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceItem[]>([]);
  const [searchQuery, setSearchQuery] = useState(search || '');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadServices = async () => {
    try {
      const data = await catalogApi.getAllServices({
        category,
        subcategory,
        q: searchQuery,
      });
      setServices(data);
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        setFilteredServices(data.filter((s) => s.name.toLowerCase().includes(q)));
      } else {
        setFilteredServices(data);
      }
    } catch (err) {
      console.warn('Failed to load services', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, [category, subcategory]);

  const onRefresh = () => {
    setRefreshing(true);
    loadServices();
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setFilteredServices(services);
    } else {
      const q = text.toLowerCase();
      setFilteredServices(
        services.filter((s) =>
          s.name.toLowerCase().includes(q) ||
          (s.description && s.description.toLowerCase().includes(q))
        )
      );
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading services catalog...</Text>
      </SafeAreaView>
    );
  }

  const title = subcategory || (category ? formatCategoryDisplayName(category) : 'All Services');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <ArrowLeft size={18} color="#0F172A" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.subtitle}>{filteredServices.length} verified services</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Search size={16} color="#64748B" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search within this list..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const imgUrl = item.image_url || getServiceImage(item.category, item.subcategory, item.name);
          const price = item.base_price;

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
            >
              <Image source={{ uri: imgUrl }} style={styles.serviceImage} />
              <View style={styles.cardBody}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.serviceCategory}>
                    {item.subcategory || formatCategoryDisplayName(item.category)}
                  </Text>
                  <View style={styles.ratingPill}>
                    <Star size={11} color="#EAB308" fill="#EAB308" />
                    <Text style={styles.ratingText}>{item.rating || '4.9'}</Text>
                  </View>
                </View>

                <Text style={styles.serviceName} numberOfLines={2}>{item.name}</Text>

                {item.duration_minutes ? (
                  <View style={styles.durationRow}>
                    <Clock size={12} color="#64748B" />
                    <Text style={styles.durationText}>{item.duration_minutes} mins standard duration</Text>
                  </View>
                ) : null}

                <View style={styles.cardBottomRow}>
                  <View>
                    <Text style={styles.startingAtText}>STARTING FROM</Text>
                    <Text style={styles.priceValue}>{formatRupee(price)}</Text>
                  </View>
                  <View style={styles.bookBtnPill}>
                    <Text style={styles.bookBtnText}>View Details</Text>
                    <ChevronRight size={14} color="#2563EB" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF9F5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF9F5' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#64748B', fontWeight: '600' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  subtitle: { fontSize: 12, color: '#64748B', marginTop: 1 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: { flex: 1, fontSize: 13, color: '#0F172A', padding: 0 },
  listContainer: { padding: 20, paddingBottom: 40 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  serviceImage: { width: '100%', height: 140, backgroundColor: '#F1F5F9' },
  cardBody: { padding: 14 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  serviceCategory: { fontSize: 11, fontWeight: '700', color: '#2563EB', textTransform: 'uppercase' },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: { fontSize: 11, fontWeight: '800', color: '#854D0E' },
  serviceName: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  durationRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 12 },
  durationText: { fontSize: 12, color: '#64748B' },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  startingAtText: { fontSize: 9, fontWeight: '800', color: '#64748B', letterSpacing: 0.5 },
  priceValue: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  bookBtnPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bookBtnText: { fontSize: 12, fontWeight: '700', color: '#2563EB' },
});
