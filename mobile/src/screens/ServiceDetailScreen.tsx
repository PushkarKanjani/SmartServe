import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Wrench,
  HelpCircle,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Check,
  Calendar,
} from 'lucide-react-native';
import { catalogApi, ServiceItem, EligibleProvider } from '../api/catalog';
import { getServiceImage } from '../utils/serviceImages';
import { formatRupee, formatCategoryDisplayName } from '../utils/formatters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ServiceDetailScreen = ({ route, navigation }: any) => {
  const { serviceId } = route.params;
  const [service, setService] = useState<ServiceItem | null>(null);
  const [eligibleProviders, setEligibleProviders] = useState<EligibleProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<EligibleProvider | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadService();
  }, [serviceId]);

  const loadService = async () => {
    try {
      const [svc, provs] = await Promise.all([
        catalogApi.getServiceById(serviceId),
        catalogApi.getEligibleProviders(serviceId),
      ]);
      setService(svc);
      setEligibleProviders(provs);
      if (provs.length > 0) {
        setSelectedProvider(provs[0]);
      }
    } catch (err) {
      console.warn('Failed to load service detail', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  if (isLoading || !service) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading full service details...</Text>
      </SafeAreaView>
    );
  }

  const imgUrl = service.image_url || getServiceImage(service.category, service.subcategory, service.name);
  const price = service.base_price;

  // Calculate total with add-ons
  const addonsTotal = (service.suggested_addons || [])
    .filter((a) => selectedAddons.includes(a.addon_id))
    .reduce((sum, a) => sum + (a.price || 0), 0);
  const finalPrice = price + addonsTotal;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cover Image Header */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imgUrl }} style={styles.coverImage} />
          <TouchableOpacity style={styles.floatingBackBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <ArrowLeft size={20} color="#0F172A" />
          </TouchableOpacity>
          {service.is_emergency && (
            <View style={styles.emergencyTag}>
              <Text style={styles.emergencyTagText}>🚨 EMERGENCY ELIGIBLE</Text>
            </View>
          )}
        </View>

        {/* Core Header Card */}
        <View style={styles.content}>
          <View style={styles.categoryBadgeRow}>
            <Text style={styles.categoryBadge}>
              {formatCategoryDisplayName(service.category)} • {service.subcategory || 'General'}
            </Text>
            <View style={styles.ratingBadge}>
              <Star size={12} color="#EAB308" fill="#EAB308" />
              <Text style={styles.ratingText}>{service.rating || '4.9'} ({service.review_count || 128})</Text>
            </View>
          </View>

          <Text style={styles.title}>{service.name}</Text>

          {/* Quick Metrics Bar */}
          <View style={styles.metricsBar}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>STARTING AT</Text>
              <Text style={styles.metricValue}>{formatRupee(price)}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>DURATION</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Clock size={13} color="#2563EB" />
                <Text style={styles.metricValue}>{service.duration_minutes || 60} mins</Text>
              </View>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>WARRANTY</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <ShieldCheck size={13} color="#059669" />
                <Text style={styles.metricValue}>{service.warranty || '30 Days'}</Text>
              </View>
            </View>
          </View>

          {/* About / Description */}
          {service.description ? (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>About this Service</Text>
              <Text style={styles.descriptionText}>{service.description}</Text>
            </View>
          ) : null}

          {/* What is Included & What is Excluded */}
          {((service.included && service.included.length > 0) || (service.excluded && service.excluded.length > 0)) && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>What is Included & Excluded</Text>
              
              {service.included && service.included.length > 0 && (
                <View style={styles.includedCard}>
                  <Text style={styles.subHeadingGreen}>✓ What's Included:</Text>
                  {service.included.map((inc, i) => (
                    <View key={`inc-${i}`} style={styles.bulletRow}>
                      <CheckCircle size={15} color="#059669" style={{ marginTop: 2 }} />
                      <Text style={styles.bulletText}>{inc}</Text>
                    </View>
                  ))}
                </View>
              )}

              {service.excluded && service.excluded.length > 0 && (
                <View style={[styles.includedCard, styles.excludedCard]}>
                  <Text style={styles.subHeadingRed}>✗ What's Excluded:</Text>
                  {service.excluded.map((exc, i) => (
                    <View key={`exc-${i}`} style={styles.bulletRow}>
                      <XCircle size={15} color="#DC2626" style={{ marginTop: 2 }} />
                      <Text style={styles.bulletText}>{exc}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Process Steps */}
          {service.process_steps && service.process_steps.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Standard Execution Process</Text>
              {service.process_steps.map((st, i) => (
                <View key={`step-${i}`} style={styles.processStepCard}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>{st.step_number || i + 1}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.stepTitle}>{st.title}</Text>
                      {st.duration_minutes ? (
                        <Text style={styles.stepDuration}>{st.duration_minutes}m</Text>
                      ) : null}
                    </View>
                    <Text style={styles.stepDescription}>{st.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Tools & Materials */}
          {service.tools_materials && service.tools_materials.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Tools & Materials Used</Text>
              <View style={styles.chipWrap}>
                {service.tools_materials.map((tm, i) => (
                  <View key={`tm-${i}`} style={styles.toolChip}>
                    <Wrench size={13} color="#2563EB" />
                    <Text style={styles.toolChipText}>{tm}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Customer Setup / Preparation */}
          {service.customer_setup && service.customer_setup.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Customer Requirements & Preparation</Text>
              {service.customer_setup.map((req, i) => (
                <View key={`req-${i}`} style={styles.bulletRow}>
                  <AlertCircle size={15} color="#D97706" style={{ marginTop: 2 }} />
                  <Text style={styles.bulletText}>{req}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Aftercare & Expected Results */}
          {service.aftercare && service.aftercare.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Aftercare & Recommendations</Text>
              {service.aftercare.map((af, i) => (
                <View key={`af-${i}`} style={styles.bulletRow}>
                  <Sparkles size={14} color="#7C3AED" style={{ marginTop: 2 }} />
                  <Text style={styles.bulletText}>{af}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Add-ons Section */}
          {service.suggested_addons && service.suggested_addons.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Recommended Add-ons</Text>
              {service.suggested_addons.map((addon) => {
                const isSelected = selectedAddons.includes(addon.addon_id);
                return (
                  <TouchableOpacity
                    key={addon.addon_id}
                    style={[styles.addonCard, isSelected && styles.addonCardSelected]}
                    onPress={() => toggleAddon(addon.addon_id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.addonCheckbox}>
                      {isSelected ? <Check size={14} color="#FFFFFF" /> : null}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.addonTitle}>{addon.name}</Text>
                      {addon.description ? (
                        <Text style={styles.addonDesc}>{addon.description}</Text>
                      ) : null}
                    </View>
                    <Text style={styles.addonPrice}>+{formatRupee(addon.price)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Eligible & Verified Providers */}
          {eligibleProviders.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Verified Professionals Available ({eligibleProviders.length})</Text>
              <Text style={styles.sectionSub}>Select a specialist or let SmartServe assign the top-rated provider.</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20, paddingHorizontal: 20 }}>
                {eligibleProviders.map((prov) => {
                  const isChosen = selectedProvider?.provider_id === prov.provider_id;
                  const photo = `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(prov.full_name)}`;
                  return (
                    <TouchableOpacity
                      key={prov.provider_id}
                      style={[styles.providerCard, isChosen && styles.providerCardChosen]}
                      onPress={() => setSelectedProvider(prov)}
                      activeOpacity={0.8}
                    >
                      <Image source={{ uri: photo }} style={styles.providerAvatar} />
                      <Text style={styles.providerName} numberOfLines={1}>{prov.full_name}</Text>
                      <View style={styles.provMetricRow}>
                        <Star size={11} color="#EAB308" fill="#EAB308" />
                        <Text style={styles.provMetricText}>{prov.reliability_score?.toFixed(0) || '98'}% Trust</Text>
                      </View>
                      <Text style={styles.provExpText}>{prov.experience_years} yrs exp</Text>
                      <View style={[styles.provSelectBtn, isChosen && styles.provSelectBtnActive]}>
                        <Text style={[styles.provSelectText, isChosen && styles.provSelectTextActive]}>
                          {isChosen ? 'Selected' : 'Select'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* FAQs Accordion */}
          {service.faqs && service.faqs.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Frequently Asked Questions</Text>
              {service.faqs.map((faq, i) => {
                const isExp = expandedFaq === i;
                return (
                  <View key={`faq-${i}`} style={styles.faqCard}>
                    <TouchableOpacity
                      style={styles.faqHeader}
                      onPress={() => setExpandedFaq(isExp ? null : i)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.faqQuestion}>{faq.question}</Text>
                      {isExp ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                    </TouchableOpacity>
                    {isExp && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
                  </View>
                );
              })}
            </View>
          )}

          {/* Dos and Don'ts */}
          {((service.dos && service.dos.length > 0) || (service.donts && service.donts.length > 0)) && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Dos & Don'ts</Text>
              <View style={styles.dodontGrid}>
                {service.dos && service.dos.length > 0 && (
                  <View style={styles.dodontCol}>
                    <Text style={styles.dodontTitleGreen}>DOs</Text>
                    {service.dos.map((d, i) => (
                      <Text key={`do-${i}`} style={styles.dodontItem}>• {d}</Text>
                    ))}
                  </View>
                )}
                {service.donts && service.donts.length > 0 && (
                  <View style={styles.dodontCol}>
                    <Text style={styles.dodontTitleRed}>DON'Ts</Text>
                    {service.donts.map((d, i) => (
                      <Text key={`dont-${i}`} style={styles.dodontItem}>• {d}</Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Bottom Spacing for Floating CTA */}
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>

      {/* Floating Bottom Booking Action Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomPriceLabel}>Total Estimated Price</Text>
          <Text style={styles.bottomPriceValue}>{formatRupee(finalPrice)}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookNowBtn}
          onPress={() =>
            navigation.navigate('BookingModal', {
              service,
              selectedProvider,
              selectedAddons,
              finalPrice,
            })
          }
          activeOpacity={0.85}
        >
          <Calendar size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.bookNowText}>Book Service Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAF9F5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF9F5' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#64748B', fontWeight: '600' },
  scrollContent: { paddingBottom: 20 },
  imageContainer: { width: '100%', height: 260, position: 'relative', backgroundColor: '#E2E8F0' },
  coverImage: { width: '100%', height: '100%' },
  floatingBackBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  emergencyTag: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: '#DC2626',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  emergencyTagText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  content: { padding: 20 },
  categoryBadgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  categoryBadge: { fontSize: 12, fontWeight: '700', color: '#2563EB', textTransform: 'uppercase' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FEF9C3', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  ratingText: { fontSize: 11, fontWeight: '800', color: '#854D0E' },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 16 },
  metricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  metricItem: { flex: 1, alignItems: 'center' },
  metricLabel: { fontSize: 9, fontWeight: '800', color: '#64748B', marginBottom: 3 },
  metricValue: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  metricDivider: { width: 1, height: 26, backgroundColor: '#E2E8F0' },
  section: { marginTop: 22 },
  sectionHeading: { fontSize: 17, fontWeight: '800', color: '#0F172A', marginBottom: 10 },
  sectionSub: { fontSize: 12, color: '#64748B', marginBottom: 12 },
  descriptionText: { fontSize: 14, color: '#475569', lineHeight: 22 },
  includedCard: { backgroundColor: '#F0FDF4', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#BBF7D0', marginBottom: 10 },
  excludedCard: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  subHeadingGreen: { fontSize: 13, fontWeight: '800', color: '#166534', marginBottom: 8 },
  subHeadingRed: { fontSize: 13, fontWeight: '800', color: '#991B1B', marginBottom: 8 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  bulletText: { fontSize: 13, color: '#334155', flex: 1, lineHeight: 18 },
  processStepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  stepNumberBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  stepTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  stepDuration: { fontSize: 11, fontWeight: '600', color: '#64748B' },
  stepDescription: { fontSize: 12, color: '#64748B', marginTop: 2, lineHeight: 16 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  toolChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  toolChipText: { fontSize: 12, fontWeight: '600', color: '#1E40AF' },
  addonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  addonCardSelected: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  addonCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#2563EB',
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addonTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  addonDesc: { fontSize: 11, color: '#64748B', marginTop: 2 },
  addonPrice: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  providerCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  providerCardChosen: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  providerAvatar: { width: 50, height: 50, borderRadius: 25, marginBottom: 8, backgroundColor: '#E2E8F0' },
  providerName: { fontSize: 13, fontWeight: '700', color: '#0F172A', textAlign: 'center', marginBottom: 4 },
  provMetricRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 2 },
  provMetricText: { fontSize: 11, fontWeight: '600', color: '#059669' },
  provExpText: { fontSize: 10, color: '#64748B', marginBottom: 8 },
  provSelectBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  provSelectBtnActive: { backgroundColor: '#2563EB' },
  provSelectText: { fontSize: 11, fontWeight: '700', color: '#475569' },
  provSelectTextActive: { color: '#FFFFFF' },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
    padding: 12,
  },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { fontSize: 13, fontWeight: '700', color: '#0F172A', flex: 1, marginRight: 8 },
  faqAnswer: { fontSize: 12, color: '#475569', marginTop: 8, lineHeight: 18 },
  dodontGrid: { flexDirection: 'row', gap: 10 },
  dodontCol: { flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  dodontTitleGreen: { fontSize: 13, fontWeight: '800', color: '#059669', marginBottom: 6 },
  dodontTitleRed: { fontSize: 13, fontWeight: '800', color: '#DC2626', marginBottom: 6 },
  dodontItem: { fontSize: 11, color: '#334155', marginBottom: 4, lineHeight: 15 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  bottomPriceLabel: { fontSize: 11, fontWeight: '600', color: '#64748B' },
  bottomPriceValue: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  bookNowBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 2,
  },
  bookNowText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});
