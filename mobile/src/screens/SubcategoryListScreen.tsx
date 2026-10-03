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
} from 'react-native';
import { ArrowLeft, ChevronRight, Layers } from 'lucide-react-native';
import { catalogApi, ServiceItem } from '../api/catalog';
import { getServiceImage } from '../utils/serviceImages';
import { formatCategoryDisplayName } from '../utils/formatters';

export const SubcategoryListScreen = ({ route, navigation }: any) => {
  const { category, categoryName } = route.params;
  const [subcategories, setSubcategories] = useState<Array<{ name: string; count: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSubcategories();
  }, [category]);

  const loadSubcategories = async () => {
    try {
      const services = await catalogApi.getAllServices({ category });
      const map: Record<string, number> = {};
      services.forEach((s) => {
        const sub = s.subcategory || 'General';
        map[sub] = (map[sub] || 0) + 1;
      });
      const list = Object.entries(map).map(([name, count]) => ({ name, count }));
      setSubcategories(list);
    } catch (err) {
      console.warn('Failed to load subcategories', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading subcategories...</Text>
      </SafeAreaView>
    );
  }

  const title = categoryName || formatCategoryDisplayName(category);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <ArrowLeft size={18} color="#0F172A" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle}>{subcategories.length} specialized service groups</Text>
        </View>
      </View>

      <FlatList
        data={subcategories}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const imgUrl = getServiceImage(category, item.name);

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('ServiceList', {
                  category,
                  subcategory: item.name,
                })
              }
            >
              <Image source={{ uri: imgUrl }} style={styles.cardImage} />
              <View style={styles.cardOverlay}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardCount}>{item.count} certified services</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
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
  listContainer: { padding: 20, paddingBottom: 40 },
  card: {
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
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
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', marginBottom: 2 },
  cardCount: { fontSize: 12, color: '#CBD5E1' },
  arrowBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
