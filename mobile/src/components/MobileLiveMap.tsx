import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, G, Text as SvgText, Rect, Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Compass, 
  Radio, 
  AlertCircle, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react-native';
import { ProviderProfileInfo, ProviderGpsLocation, CustomerLocationInfo } from '../api/bookings';
import { 
  fetchOsrmRoute, 
  snapToRoute, 
  calculateDynamicEta, 
  computeHaversineKm 
} from '../utils/routeGeometry';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAP_WIDTH = SCREEN_WIDTH - 40;
const MAP_HEIGHT = 280;

interface MobileLiveMapProps {
  providerLocation: ProviderGpsLocation | null;
  customerLocation: CustomerLocationInfo | null;
  provider: ProviderProfileInfo | null;
  bookingStatus: string;
  onRefresh?: () => void;
}

export const MobileLiveMap: React.FC<MobileLiveMapProps> = ({
  providerLocation,
  customerLocation,
  provider,
  bookingStatus,
  onRefresh,
}) => {
  const [osrmCoords, setOsrmCoords] = useState<[number, number][]>([]);
  const [totalDistanceKm, setTotalDistanceKm] = useState<number | null>(null);
  const [remainingDistanceKm, setRemainingDistanceKm] = useState<number | null>(null);
  const [etaMinutes, setEtaMinutes] = useState<number | null>(null);
  const [isRouting, setIsRouting] = useState<boolean>(false);
  const [timeAgo, setTimeAgo] = useState<string>('Awaiting GPS signal');
  const [isGpsStale, setIsGpsStale] = useState<boolean>(false);

  // Default coordinates (Noida Sector 62 / NCR) if customer or provider has not loaded yet
  const effectiveCustLat = customerLocation?.latitude || 28.6280;
  const effectiveCustLng = customerLocation?.longitude || 77.3649;
  const effectiveProvLat = providerLocation?.latitude || 28.6360;
  const effectiveProvLng = providerLocation?.longitude || 77.3500;

  // 1. GPS Freshness Monitor
  useEffect(() => {
    if (!providerLocation?.updated_at) {
      setTimeAgo('Awaiting GPS signal');
      setIsGpsStale(true);
      return;
    }

    const checkFreshness = () => {
      const diffMs = Date.now() - new Date(providerLocation.updated_at!).getTime();
      const secs = Math.max(0, Math.floor(diffMs / 1000));
      if (secs < 10) {
        setTimeAgo('Live just now');
        setIsGpsStale(false);
      } else if (secs < 60) {
        setTimeAgo(`${secs}s ago`);
        setIsGpsStale(false);
      } else {
        const mins = Math.floor(secs / 60);
        setTimeAgo(`${mins}m ago`);
        setIsGpsStale(mins >= 2);
      }
    };

    checkFreshness();
    const interval = setInterval(checkFreshness, 5000);
    return () => clearInterval(interval);
  }, [providerLocation?.updated_at]);

  // 2. Fetch Real OSRM Road Geometry
  useEffect(() => {
    let cancelled = false;

    async function loadRoute() {
      if (!providerLocation) {
        // Fallback straight vector
        setOsrmCoords([
          [effectiveProvLat, effectiveProvLng],
          [effectiveCustLat, effectiveCustLng],
        ]);
        const dist = computeHaversineKm(effectiveProvLat, effectiveProvLng, effectiveCustLat, effectiveCustLng);
        setTotalDistanceKm(dist);
        setRemainingDistanceKm(dist);
        setEtaMinutes(Math.max(1, Math.round((dist / 25) * 60)));
        return;
      }

      setIsRouting(true);
      try {
        const routeData = await fetchOsrmRoute(
          effectiveProvLat,
          effectiveProvLng,
          effectiveCustLat,
          effectiveCustLng
        );

        if (!cancelled && routeData && routeData.coordinates.length > 1) {
          setOsrmCoords(routeData.coordinates);
          setTotalDistanceKm(routeData.distanceKm);

          // Snap to calculate remaining road distance & ETA
          const snap = snapToRoute(routeData.coordinates, effectiveProvLat, effectiveProvLng);
          setRemainingDistanceKm(snap.remainingDistanceKm);

          const { etaMinutes: calcEta } = calculateDynamicEta(
            snap.remainingDistanceKm,
            providerLocation.speed
          );
          setEtaMinutes(calcEta);
        }
      } catch (err) {
        console.warn('[MobileLiveMap] Route fetch fallback', err);
      } finally {
        if (!cancelled) setIsRouting(false);
      }
    }

    loadRoute();
    return () => { cancelled = true; };
  }, [effectiveProvLat, effectiveProvLng, effectiveCustLat, effectiveCustLng]);

  // 3. Project Lat/Lng to SVG Canvas Coordinate System
  const { pathData, travelledPathData, provSvg, custSvg } = useMemo(() => {
    const coords = osrmCoords.length > 0 ? osrmCoords : [
      [effectiveProvLat, effectiveProvLng] as [number, number],
      [effectiveCustLat, effectiveCustLng] as [number, number],
    ];

    let minLat = Infinity, maxLat = -Infinity;
    let minLng = Infinity, maxLng = -Infinity;

    for (const [lat, lng] of coords) {
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
    }

    // Add 15% padding so markers don't clip at edges
    const latSpan = Math.max(maxLat - minLat, 0.005) * 1.3;
    const lngSpan = Math.max(maxLng - minLng, 0.005) * 1.3;
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    const padMinLat = centerLat - latSpan / 2;
    const padMinLng = centerLng - lngSpan / 2;

    const toSvgX = (lng: number) => {
      const norm = (lng - padMinLng) / lngSpan;
      return 20 + norm * (MAP_WIDTH - 40);
    };

    const toSvgY = (lat: number) => {
      // Invert Y because latitude increases upwards
      const norm = 1 - (lat - padMinLat) / latSpan;
      return 20 + norm * (MAP_HEIGHT - 40);
    };

    let pData = '';
    coords.forEach(([lat, lng], idx) => {
      const x = toSvgX(lng);
      const y = toSvgY(lat);
      pData += idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    });

    const pX = toSvgX(effectiveProvLng);
    const pY = toSvgY(effectiveProvLat);
    const cX = toSvgX(effectiveCustLng);
    const cY = toSvgY(effectiveCustLat);

    return {
      pathData: pData,
      travelledPathData: `M ${pX.toFixed(1)} ${pY.toFixed(1)} L ${cX.toFixed(1)} ${cY.toFixed(1)}`,
      provSvg: { x: pX, y: pY },
      custSvg: { x: cX, y: cY },
    };
  }, [osrmCoords, effectiveProvLat, effectiveProvLng, effectiveCustLat, effectiveCustLng]);

  return (
    <View style={styles.container}>
      {/* Telemetry HUD Top Header */}
      <View style={styles.telemetryBar}>
        <View style={styles.telemetryItem}>
          <Clock size={14} color="#2563EB" />
          <View>
            <Text style={styles.telemetryLabel}>ESTIMATED ARRIVAL</Text>
            <Text style={styles.telemetryValue}>
              {etaMinutes !== null ? `${etaMinutes} mins` : 'Calculating...'}
            </Text>
          </View>
        </View>

        <View style={styles.telemetryDivider} />

        <View style={styles.telemetryItem}>
          <Compass size={14} color="#059669" />
          <View>
            <Text style={styles.telemetryLabel}>REMAINING DISTANCE</Text>
            <Text style={styles.telemetryValue}>
              {remainingDistanceKm !== null ? `${remainingDistanceKm.toFixed(1)} km` : '-- km'}
            </Text>
          </View>
        </View>

        <View style={styles.telemetryDivider} />

        <View style={styles.telemetryItem}>
          <Radio size={14} color={isGpsStale ? '#DC2626' : '#10B981'} />
          <View>
            <Text style={styles.telemetryLabel}>GPS STATUS</Text>
            <Text style={[styles.telemetryValue, isGpsStale ? { color: '#DC2626' } : { color: '#059669' }]}>
              {timeAgo}
            </Text>
          </View>
        </View>
      </View>

      {/* SVG Interactive Road Map Canvas */}
      <View style={styles.mapCanvasWrapper}>
        <Svg width={MAP_WIDTH} height={MAP_HEIGHT}>
          <Defs>
            <LinearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#3B82F6" stopOpacity="0.9" />
              <Stop offset="1" stopColor="#1D4ED8" stopOpacity="1" />
            </LinearGradient>
          </Defs>

          {/* Map Background Grid Lines */}
          <Rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="#F8FAFC" />
          {[60, 120, 180, 240].map((y) => (
            <Line key={`h-${y}`} x1="0" y1={y} x2={MAP_WIDTH} y2={y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4,4" />
          ))}
          {[MAP_WIDTH * 0.25, MAP_WIDTH * 0.5, MAP_WIDTH * 0.75].map((x) => (
            <Line key={`v-${x}`} x1={x} y1="0" x2={x} y2={MAP_HEIGHT} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4,4" />
          ))}

          {/* Road Casing (Dark Road Layer) */}
          {pathData ? (
            <Path
              d={pathData}
              stroke="#94A3B8"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={0.4}
            />
          ) : null}

          {/* Active OSRM Route Path (Bright Blue Road Layer) */}
          {pathData ? (
            <Path
              d={pathData}
              stroke="url(#routeGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ) : null}

          {/* Customer Destination Marker */}
          <G x={custSvg.x} y={custSvg.y}>
            <Circle r="18" fill="#EFF6FF" opacity={0.8} />
            <Circle r="10" fill="#2563EB" />
            <Circle r="4" fill="#FFFFFF" />
            <SvgText
              x="0"
              y="24"
              fontSize="10"
              fontWeight="800"
              fill="#1E40AF"
              textAnchor="middle"
            >
              Customer Location
            </SvgText>
          </G>

          {/* Provider Live GPS Marker */}
          <G x={provSvg.x} y={provSvg.y}>
            <Circle r="20" fill="#DCFCE7" opacity={0.9} />
            <Circle r="12" fill="#16A34A" />
            <Circle r="5" fill="#FFFFFF" />
            <SvgText
              x="0"
              y="-16"
              fontSize="11"
              fontWeight="800"
              fill="#15803D"
              textAnchor="middle"
            >
              {provider?.full_name?.split(' ')[0] || 'Technician'}
            </SvgText>
          </G>
        </Svg>

        {/* Live Tracking Freshness Pill Overlay */}
        <View style={styles.floatingLiveBadge}>
          <View style={[styles.pulseDot, isGpsStale ? { backgroundColor: '#DC2626' } : { backgroundColor: '#10B981' }]} />
          <Text style={styles.floatingBadgeText}>
            {isRouting ? 'Recalculating road...' : 'OSRM Live Road Route'}
          </Text>
        </View>

        {onRefresh && (
          <TouchableOpacity style={styles.refreshMapBtn} onPress={onRefresh} activeOpacity={0.8}>
            <RefreshCw size={14} color="#334155" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  telemetryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  telemetryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  telemetryLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  telemetryValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  telemetryDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
  },
  mapCanvasWrapper: {
    position: 'relative',
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    backgroundColor: '#F8FAFC',
  },
  floatingLiveBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  floatingBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#334155',
  },
  refreshMapBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
