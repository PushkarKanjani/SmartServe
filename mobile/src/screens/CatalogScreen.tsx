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
import { Search, ChevronRight, Layers } from 'lucide-react-native';
import { catalogApi, CategoryItem } from '../api/catalog';
import { getServiceImage } from '../utils/serviceImages';
import { formatCategoryDisplayName } from '../utils/formatters';

export const CatalogScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<CategoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCategories = async () => {
    try {
      const cats = await catalogApi.getCategories();
      setCategories(cats);
      setFilteredCategories(cats);
    } catch (err) {
      console.warn('Failed to load categories', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadCategories();
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setFilteredCategories(categories);
    } else {
      const q = text.toLowerCase();
      const filtered = categories.filter((c) =>
        (c.name || '').toLowerCase().includes(q) ||
        (c.display_name || '').toLowerCase().includes(q)
      );
      setFilteredCategories(filtered);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading SmartServe Master Catalog...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>All Service Categories</Text>
        <Text style={styles.subtitle}>Explore certified home, repair, and lifestyle services</Text>

        <View style={styles.searchBox}>
          <Search size={16} color="#64748B" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories (e.g., Cleaning, AC, Painting)..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id || item.name}
        contentContainerStyle={styles.listContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const cleanName = formatCategoryDisplayName(item.name || item.display_name);
          const imgUrl = item.image || getServiceImage(item.name);

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('SubcategoryList', {
                  category: item.name,
                  categoryName: cleanName,
                })
              }
            >
              <Image source={{ uri: imgUrl }} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{cleanName}</Text>
                  <Text style={styles.cardCount}>
                    {item.service_count ? `${item.service_count} services available` : 'Browse Subcategories'}
                  </Text>
                </View>
                <View style={styles.arrowBadge}>
                  <ChevronRight size={16} color="#2563EB" />
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
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  subtitle: { fontSize: 12, color: '#64748B', marginTop: 2, marginBottom: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: { flex: 1, fontSize: 13, color: '#0F172A', padding: 0 },
  listContainer: { padding: 20, paddingBottom: 40 },
  card: {
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardImage: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  cardTitle: { fontSize: 17, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  cardCount: { fontSize: 12, color: '#CBD5E1', fontWeight: '500' },
  arrowBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
