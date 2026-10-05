import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Radio, 
  Clock, 
  Compass, 
  AlertCircle, 
  Navigation, 
  ShieldCheck, 
  CheckCircle2,
  RefreshCw,
  Play,
  Pause,
  KeyRound,
  User,
  MapPin
} from 'lucide-react';
import type { AdminProviderLocation, AdminCustomerLocation } from '../api/bookings';
import { apiClient } from '../api/client';
import { 
  snapToRoute, 
  fetchOsrmRoute, 
  computeHaversineKm 
} from '../utils/routeGeometry';

interface AdminLiveTrackingCardProps {
  bookingId: string;
  bookingStatus: string;
  provider: {
    id: string;
    full_name: string;
    phone?: string | null;
    photo_url?: string;
    category?: string;
    is_verified?: boolean;
    service_area?: string;
  } | null;
  providerLocation: AdminProviderLocation | null;
  customerLocation: AdminCustomerLocation | null;
  customer: {
    id: string;
    name: string;
    phone?: string | null;
  } | null;
  serviceName: string;
  wsConnected: boolean;
  onRefresh?: () => void;
}

export const AdminLiveTrackingCard: React.FC<AdminLiveTrackingCardProps> = ({
  bookingId,
  bookingStatus,
  provider,
  providerLocation,
  customerLocation,
  customer,
  serviceName,
  wsConnected,
  onRefresh,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const providerMarkerRef = useRef<L.Marker | null>(null);
  const customerMarkerRef = useRef<L.Marker | null>(null);

  // Split Route Polylines: Travelled (completed) + Remaining (active)
  const travelledPolylineRef = useRef<L.Polyline | null>(null);
  const remainingCasingRef = useRef<L.Polyline | null>(null);
  const remainingPolylineRef = useRef<L.Polyline | null>(null);

  // Full Route Geometry State
  const fullRouteCoordsRef = useRef<[number, number][]>([]);
  const lastSnappedIndexRef = useRef<number>(0);
  const currentPosRef = useRef<{ lat: number; lng: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastHeadingRef = useRef<number>(0);
  const isUserInteractingRef = useRef<boolean>(false);
  const userInteractionTimeoutRef = useRef<any>(null);

  // Metrics State
  const [totalDistanceKm, setTotalDistanceKm] = useState<number | null>(null);
  const [travelledDistanceKm, setTravelledDistanceKm] = useState<number>(0);
  const [remainingDistanceKm, setRemainingDistanceKm] = useState<number | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [etaMinutes, setEtaMinutes] = useState<number | null>(null);

  // GPS Telemetry & Staleness
  const [timeAgo, setTimeAgo] = useState<string>('Awaiting GPS signal');
  const [isGpsStale, setIsGpsStale] = useState<boolean>(false);

  // DEV-ONLY GPS Simulation State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const simIntervalRef = useRef<any>(null);

  // 1. Dynamic GPS Freshness & Staleness Monitor (Requirement 6 & 13)
  useEffect(() => {
    if (!providerLocation?.updated_at) {
      setTimeAgo('Awaiting GPS signal');
      setIsGpsStale(true);
      return;
    }

    const updateFreshness = () => {
      const diffMs = Date.now() - new Date(providerLocation.updated_at!).getTime();
      const secs = Math.max(0, Math.floor(diffMs / 1000));

      if (secs < 10) {
        setTimeAgo('Live just now');
        setIsGpsStale(false);
      } else if (secs < 60) {
        setTimeAgo(`${secs}s ago`);
        setIsGpsStale(false);
      } else if (secs < 120) {
        setTimeAgo('1m ago');
        setIsGpsStale(false);
      } else {
        // Stale GPS (> 2 minutes without updates)
        setIsGpsStale(true);
        const mins = Math.floor(secs / 60);
        if (mins < 60) {
          setTimeAgo(`Stale — ${mins}m ago`);
        } else {
          const hours = Math.floor(mins / 60);
          const rem = mins % 60;
          setTimeAgo(`Stale — ${hours}h ${rem}m ago`);
        }
      }
    };

    updateFreshness();
    const interval = setInterval(updateFreshness, 2500);
    return () => clearInterval(interval);
  }, [providerLocation?.updated_at]);

  // 2. Admin Provider Marker HTML
  const createProviderMarkerHtml = (heading: number, stale: boolean) => {
    return `
      <div style="position: relative; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center;">
        ${!stale ? `
          <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: rgba(47, 82, 51, 0.25); animation: ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(47, 82, 51, 0.15); border: 1.5px solid rgba(47, 82, 51, 0.4);"></div>
        ` : `
          <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(201, 161, 90, 0.25); border: 1.5px solid rgba(201, 161, 90, 0.5);"></div>
        `}
        <div style="transform: rotate(${heading}deg); transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); width: 32px; height: 32px; border-radius: 50%; background: ${stale ? 'linear-gradient(135deg, #C9A15A, #9A7B38)' : 'linear-gradient(135deg, #2F5233, #1E3721)'}; border: 2.5px solid #ffffff; box-shadow: 0 4px 12px ${stale ? 'rgba(201, 161, 90, 0.45)' : 'rgba(47, 82, 51, 0.5)'}; display: flex; align-items: center; justify-content: center; color: white;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
      </div>
    `;
  };

  // 3. Admin Customer Marker HTML
  const createCustomerMarkerHtml = () => {
    return `
      <div style="position: relative; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 38px; height: 38px; border-radius: 50%; background: rgba(201, 161, 90, 0.2); animation: pulse 2s infinite;"></div>
        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #C9A15A, #A68037); border: 2.5px solid #ffffff; box-shadow: 0 4px 10px rgba(201, 161, 90, 0.45); display: flex; align-items: center; justify-content: center; color: white;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
      </div>
    `;
  };

  // 4. Update the Two Route Layers (Travelled vs Remaining) (Requirement 3 & 13)
  const updateRouteLayers = useCallback((travelled: [number, number][], remaining: [number, number][]) => {
    if (!mapRef.current) return;

    if (travelledPolylineRef.current) {
      travelledPolylineRef.current.setLatLngs(travelled);
    } else {
      travelledPolylineRef.current = L.polyline(travelled, {
        color: '#94A3B8',
        weight: 5,
        opacity: 0.7,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(mapRef.current);
    }

    if (remainingCasingRef.current) {
      remainingCasingRef.current.setLatLngs(remaining);
    } else {
      remainingCasingRef.current = L.polyline(remaining, {
        color: '#1F2A1E',
        weight: 8,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(mapRef.current);
    }

    if (remainingPolylineRef.current) {
      remainingPolylineRef.current.setLatLngs(remaining);
    } else {
      remainingPolylineRef.current = L.polyline(remaining, {
        color: '#2F5233',
        weight: 5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(mapRef.current);
    }
  }, []);

  // 5. Fetch Full OSRM Road Route
  const loadInitialOsrmRoute = useCallback(async (
    pLat: number,
    pLng: number,
    cLat: number,
    cLng: number
  ) => {
    try {
      const res = await fetchOsrmRoute(pLat, pLng, cLat, cLng);

      if (res && res.coordinates.length > 1) {
        fullRouteCoordsRef.current = res.coordinates;
        setTotalDistanceKm(res.distanceKm);

        const snap = snapToRoute(res.coordinates, pLat, pLng, 0);
        lastSnappedIndexRef.current = snap.segmentIndex;
        setTravelledDistanceKm(snap.travelledDistanceKm);
        setRemainingDistanceKm(snap.remainingDistanceKm);
        setProgressPercent(snap.progressPercent);

        const mins = Math.max(1, Math.round((snap.remainingDistanceKm / 25) * 60));
        setEtaMinutes(mins);

        updateRouteLayers(snap.travelledCoords, snap.remainingCoords);
      } else {
        const fallback: [number, number][] = [[pLat, pLng], [cLat, cLng]];
        fullRouteCoordsRef.current = fallback;
        const dist = computeHaversineKm(pLat, pLng, cLat, cLng);
        setTotalDistanceKm(dist);
        setRemainingDistanceKm(dist);
        setTravelledDistanceKm(0);
        setProgressPercent(0);
        setEtaMinutes(Math.max(1, Math.round((dist / 25) * 60)));
        updateRouteLayers([[pLat, pLng]], fallback);
      }
    } catch (err) {
      console.warn('Admin OSRM fetch error:', err);
    }
  }, [updateRouteLayers]);

  // 6. Smooth Marker Animation (requestAnimationFrame) + Road Snapping (Requirement 2, 4, 13)
  const animateMarkerToRoad = useCallback((
    targetLat: number,
    targetLng: number,
    telemetryHeading?: number | null,
    telemetrySpeed?: number | null,
    durationMs: number = 950
  ) => {
    if (!providerMarkerRef.current || !mapRef.current) return;

    // 1. Log Location Update Received (Standardized GPS Format)
    console.log(`GPS RECEIVED:\nlat=${targetLat}\nlng=${targetLng}\nspeed=${telemetrySpeed !== undefined && telemetrySpeed !== null ? telemetrySpeed : 'null'}\nheading=${telemetryHeading !== undefined && telemetryHeading !== null ? telemetryHeading : 'null'}\ntimestamp=${providerLocation?.updated_at || new Date().toISOString()}`);

    let snappedLat = targetLat;
    let snappedLng = targetLng;
    let roadHeading = lastHeadingRef.current;
    let travelledCoords: [number, number][] = [];
    let remainingCoords: [number, number][] = [];

    if (fullRouteCoordsRef.current.length > 1) {
      const snap = snapToRoute(
        fullRouteCoordsRef.current,
        targetLat,
        targetLng,
        lastSnappedIndexRef.current
      );

      snappedLat = snap.snappedPoint[0];
      snappedLng = snap.snappedPoint[1];
      lastSnappedIndexRef.current = snap.segmentIndex;
      roadHeading = telemetryHeading !== undefined && telemetryHeading !== null
        ? telemetryHeading
        : snap.roadHeading;

      travelledCoords = snap.travelledCoords;
      remainingCoords = snap.remainingCoords;

      setTravelledDistanceKm(snap.travelledDistanceKm);
      setRemainingDistanceKm(snap.remainingDistanceKm);
      setProgressPercent(snap.progressPercent);

      // Recalculate ETA
      const effSpeed = telemetrySpeed && telemetrySpeed > 1 ? telemetrySpeed * 3.6 : 25;
      const mins = Math.max(1, Math.round((snap.remainingDistanceKm / effSpeed) * 60));
      setEtaMinutes(mins);

      // 3. Log Route Progress (Requirement)
      console.log(`[TRACKING]\nroute progress:\ndistance=${snap.remainingDistanceKm.toFixed(2)} km\nprogress=${snap.progressPercent}%`);
    }

    lastHeadingRef.current = roadHeading;

    const icon = L.divIcon({
      html: createProviderMarkerHtml(roadHeading, isGpsStale),
      className: 'custom-admin-provider-icon',
      iconSize: [46, 46],
      iconAnchor: [23, 23],
      popupAnchor: [0, -23],
    });
    providerMarkerRef.current.setIcon(icon);

    if (!currentPosRef.current) {
      currentPosRef.current = { lat: snappedLat, lng: snappedLng };
      providerMarkerRef.current.setLatLng([snappedLat, snappedLng]);
      console.log(`MARKER UPDATE:\noldLat=${snappedLat}\noldLng=${snappedLng}\nnewLat=${snappedLat}\nnewLng=${snappedLng}`);
      if (travelledCoords.length > 0 && remainingCoords.length > 0) {
        updateRouteLayers(travelledCoords, remainingCoords);
      }
      return;
    }

    const startLat = currentPosRef.current.lat;
    const startLng = currentPosRef.current.lng;

    // 2. Log Provider Marker Update (Requirement format)
    console.log(`MARKER UPDATE:\noldLat=${startLat}\noldLng=${startLng}\nnewLat=${snappedLat}\nnewLng=${snappedLng}`);

    // If oldLat == newLat AND oldLng == newLng: the provider marker MUST NOT move.
    if (Math.abs(startLat - snappedLat) < 1e-7 && Math.abs(startLng - snappedLng) < 1e-7) {
      return;
    }

    // Immediately update route layers to reflect new split
    if (travelledCoords.length > 0 && remainingCoords.length > 0) {
      updateRouteLayers(travelledCoords, remainingCoords);
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const ease = 1 - Math.pow(1 - progress, 3);

      const curLat = startLat + (snappedLat - startLat) * ease;
      const curLng = startLng + (snappedLng - startLng) * ease;

      currentPosRef.current = { lat: curLat, lng: curLng };
      if (providerMarkerRef.current) {
        providerMarkerRef.current.setLatLng([curLat, curLng]);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        currentPosRef.current = { lat: snappedLat, lng: snappedLng };
        if (providerMarkerRef.current) {
          providerMarkerRef.current.setLatLng([snappedLat, snappedLng]);
        }
        if (travelledCoords.length > 0 && remainingCoords.length > 0) {
          updateRouteLayers(travelledCoords, remainingCoords);
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [isGpsStale, updateRouteLayers, providerLocation?.updated_at]);

  // 7. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    let initialCenter: [number, number] = [28.6280, 77.3649];
    if (providerLocation && customerLocation) {
      initialCenter = [
        (customerLocation.latitude + providerLocation.latitude) / 2,
        (customerLocation.longitude + providerLocation.longitude) / 2,
      ];
    } else if (providerLocation) {
      initialCenter = [providerLocation.latitude, providerLocation.longitude];
    } else if (customerLocation) {
      initialCenter = [customerLocation.latitude, customerLocation.longitude];
    }

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 14,
      zoomControl: true,
      attributionControl: false,
    });
    mapRef.current = map;

    map.on('movestart', () => {
      isUserInteractingRef.current = true;
      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
    });

    map.on('moveend', () => {
      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
      userInteractionTimeoutRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 15000);
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Customer marker
    if (customerLocation) {
      const custIcon = L.divIcon({
        html: createCustomerMarkerHtml(),
        className: 'custom-customer-icon',
        iconSize: [42, 42],
        iconAnchor: [21, 21],
        popupAnchor: [0, -21],
      });

      const custMarker = L.marker([customerLocation.latitude, customerLocation.longitude], { icon: custIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: inherit; font-size: 12px; padding: 4px;">
            <strong style="color: #1F2A1E;">Customer Destination</strong>
            <div style="color: #555; font-size: 11px; margin-top: 2px;">${customerLocation.address || 'Service Location'}</div>
          </div>`
        );
      customerMarkerRef.current = custMarker;
    }

    // Provider marker
    if (providerLocation) {
      const pLat = providerLocation.latitude;
      const pLng = providerLocation.longitude;
      currentPosRef.current = { lat: pLat, lng: pLng };

      const provIcon = L.divIcon({
        html: createProviderMarkerHtml(providerLocation.heading || 0, isGpsStale),
        className: 'custom-admin-provider-icon',
        iconSize: [46, 46],
        iconAnchor: [23, 23],
        popupAnchor: [0, -23],
      });

      const provMarker = L.marker([pLat, pLng], { icon: provIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: inherit; font-size: 12px; padding: 4px;">
            <strong style="color: #2F5233;">${provider?.full_name || 'Assigned Provider'}</strong>
            <div style="font-size: 11px; margin-top: 2px;">Status: ${bookingStatus}</div>
          </div>`
        );
      providerMarkerRef.current = provMarker;

      if (customerLocation) {
        loadInitialOsrmRoute(pLat, pLng, customerLocation.latitude, customerLocation.longitude);

        const group = L.featureGroup([customerMarkerRef.current!, provMarker]);
        map.fitBounds(group.getBounds(), { padding: [60, 60], maxZoom: 16 });
      } else {
        map.setView([pLat, pLng], 15);
      }
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 8. Handle Live Incoming GPS Updates (Requirement 13 & 14)
  useEffect(() => {
    if (!mapRef.current || !providerLocation) return;

    const pLat = providerLocation.latitude;
    const pLng = providerLocation.longitude;

    if (!providerMarkerRef.current) {
      currentPosRef.current = { lat: pLat, lng: pLng };
      const provIcon = L.divIcon({
        html: createProviderMarkerHtml(providerLocation.heading || 0, isGpsStale),
        className: 'custom-admin-provider-icon',
        iconSize: [46, 46],
        iconAnchor: [23, 23],
        popupAnchor: [0, -23],
      });
      const provMarker = L.marker([pLat, pLng], { icon: provIcon }).addTo(mapRef.current);
      providerMarkerRef.current = provMarker;
    }

    animateMarkerToRoad(pLat, pLng, providerLocation.heading, providerLocation.speed);

    if (fullRouteCoordsRef.current.length === 0 && customerLocation) {
      loadInitialOsrmRoute(pLat, pLng, customerLocation.latitude, customerLocation.longitude);
    }
  }, [
    providerLocation?.latitude,
    providerLocation?.longitude,
    providerLocation?.heading,
    providerLocation?.speed,
    providerLocation?.updated_at,
    isGpsStale,
    animateMarkerToRoad,
    loadInitialOsrmRoute,
    customerLocation,
  ]);

  // DEV-ONLY GPS Simulation Mode in Admin (Requirement 7)
  const handleToggleSimulation = async () => {
    if (isSimulating) {
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
      setIsSimulating(false);
      return;
    }

    if (fullRouteCoordsRef.current.length < 2 && providerLocation && customerLocation) {
      await loadInitialOsrmRoute(
        providerLocation.latitude,
        providerLocation.longitude,
        customerLocation.latitude,
        customerLocation.longitude
      );
    }

    const route = fullRouteCoordsRef.current;
    if (route.length < 2) return;

    setIsSimulating(true);
    let step = 0;

    simIntervalRef.current = setInterval(async () => {
      step++;
      if (step >= route.length) {
        clearInterval(simIntervalRef.current);
        setIsSimulating(false);
        return;
      }
      const pt = route[step];
      const prevPt = route[step - 1];

      const dLon = ((pt[1] - prevPt[1]) * Math.PI) / 180;
      const y = Math.sin(dLon) * Math.cos((pt[0] * Math.PI) / 180);
      const x =
        Math.cos((prevPt[0] * Math.PI) / 180) * Math.sin((pt[0] * Math.PI) / 180) -
        Math.sin((prevPt[0] * Math.PI) / 180) * Math.cos((pt[0] * Math.PI) / 180) * Math.cos(dLon);
      const brng = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

      const payload = {
        booking_id: bookingId,
        latitude: pt[0],
        longitude: pt[1],
        heading: Math.round(brng),
        speed: 8.5,
        accuracy: 4.0,
        timestamp: new Date().toISOString(),
      };

      try {
        await apiClient.post('/providers/dev-simulate-location', payload);
      } catch (e) {
        animateMarkerToRoad(pt[0], pt[1], brng, 8.5);
      }
    }, 1200);
  };

  const handleRecenter = () => {
    if (!mapRef.current) return;
    isUserInteractingRef.current = false;
    if (customerMarkerRef.current && providerMarkerRef.current) {
      const group = L.featureGroup([customerMarkerRef.current, providerMarkerRef.current]);
      mapRef.current.fitBounds(group.getBounds(), { padding: [60, 60], maxZoom: 16 });
    } else if (providerMarkerRef.current) {
      mapRef.current.setView(providerMarkerRef.current.getLatLng(), 15);
    }
  };

  const displayDistance = remainingDistanceKm !== null 
    ? (remainingDistanceKm < 1 ? `${Math.round(remainingDistanceKm * 1000)} m` : `${remainingDistanceKm.toFixed(1)} km`)
    : null;

  const stLower = bookingStatus.toLowerCase();
  const isOnTheWay = stLower === 'on the way';
  const isArrived = stLower === 'arrived';
  const isStarted = stLower === 'started';
  const isCompleted = stLower === 'completed';

  return (
    <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-[#FAF7F0] border-b border-[#E5DEC9]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2F5233]/10 border border-[#2F5233]/20 flex items-center justify-center text-[#2F5233] shrink-0">
              <Navigation className="w-5 h-5 text-[#2F5233]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-extrabold text-[#1F2A1E] font-serif">Live Dispatch & Transit Telemetry</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                  wsConnected 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                    : 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse'
                }`}>
                  {wsConnected ? 'WebSocket Live' : 'Reconnecting...'}
                </span>
                {provider?.is_verified && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2F5233]/15 text-[#2F5233] border border-[#2F5233]/30 flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    Verified Partner
                  </span>
                )}
              </div>
              <p className="text-xs text-[#1F2A1E]/60 mt-0.5">
                Real-time monitoring for {serviceName} • Partner: <strong className="text-[#2F5233]">{provider?.full_name || 'Assigned Technician'}</strong>
              </p>
            </div>
          </div>

          {/* Live Metrics Header: Remaining, ETA, Stale/Live GPS */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-[#E5DEC9] self-start sm:self-auto shadow-2xs flex-wrap">
            {displayDistance && (
              <div className="text-right">
                <span className="text-[10px] text-[#1F2A1E]/50 block font-semibold uppercase tracking-wider">Remaining</span>
                <span className="text-xs font-black text-[#2F5233] font-mono">{displayDistance}</span>
              </div>
            )}

            {!isArrived && !isStarted && !isCompleted && (
              <div className="text-right border-l border-[#E5DEC9] pl-3">
                <span className="text-[10px] text-[#1F2A1E]/50 block font-semibold uppercase tracking-wider">Est. Arrival</span>
                {isGpsStale ? (
                  <span className="text-xs font-black text-amber-600 font-mono">Paused</span>
                ) : (
                  <span className="text-xs font-black text-[#C9A15A] font-mono">
                    ~{etaMinutes !== null ? etaMinutes : 1} min
                  </span>
                )}
              </div>
            )}

            <div className="text-right border-l border-[#E5DEC9] pl-3">
              <span className="text-[10px] text-[#1F2A1E]/50 block font-semibold uppercase tracking-wider">GPS Signal</span>
              {isGpsStale ? (
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>{timeAgo}</span>
                </span>
              ) : (
                <span className="text-xs font-bold text-[#2F5233] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{timeAgo}</span>
                </span>
              )}
            </div>

            {onRefresh && (
              <button
                onClick={onRefresh}
                title="Refresh telemetry"
                className="ml-1 p-1.5 text-[#1F2A1E]/40 hover:text-[#1F2A1E] rounded-lg hover:bg-[#FAF7F0] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Route Progress Bar (Requirement 5 & 13) */}
        {totalDistanceKm !== null && totalDistanceKm > 0 && (
          <div className="mt-3.5 pt-3 border-t border-[#E5DEC9]/80 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-[#1F2A1E]/70 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2F5233]"></span>
                <span>Trip Progress: <strong>{progressPercent}%</strong></span>
              </span>
              <span className="font-mono text-[10px] text-[#1F2A1E]/60">
                Total: {totalDistanceKm.toFixed(1)} km • Travelled: {travelledDistanceKm.toFixed(1)} km
              </span>
            </div>
            <div className="w-full bg-[#E5DEC9]/60 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#2F5233] to-[#C9A15A] h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(4, Math.min(100, progressPercent))}%` }}
              />
            </div>
          </div>
        )}

        {/* Status Progression Timeline Bar with OTP verification (Requirement 11 & 13) */}
        <div className="mt-3 pt-3 border-t border-[#E5DEC9]/80 flex items-center justify-between text-[11px] font-bold text-[#1F2A1E]/60 flex-wrap sm:flex-nowrap gap-y-2">
          <div className="flex items-center gap-1.5 text-[#2F5233]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5233]" />
            <span>Accepted</span>
          </div>
          <div className={`h-0.5 flex-1 mx-2 rounded-full min-w-3 ${isOnTheWay || isArrived || isStarted || isCompleted ? 'bg-[#2F5233]' : 'bg-[#E5DEC9]'}`}></div>

          <div className={`flex items-center gap-1.5 ${isOnTheWay || isArrived || isStarted || isCompleted ? 'text-[#2F5233]' : 'text-slate-400'}`}>
            <Navigation className="w-3.5 h-3.5" />
            <span>On The Way</span>
          </div>
          <div className={`h-0.5 flex-1 mx-2 rounded-full min-w-3 ${isArrived || isStarted || isCompleted ? 'bg-[#2F5233]' : 'bg-[#E5DEC9]'}`}></div>

          <div className={`flex items-center gap-1.5 ${isArrived || isStarted || isCompleted ? 'text-teal-700' : 'text-slate-400'}`}>
            <span className={`w-2 h-2 rounded-full ${isArrived ? 'bg-teal-600 animate-ping' : isStarted || isCompleted ? 'bg-teal-700' : 'bg-slate-300'}`}></span>
            <span>Arrived</span>
          </div>
          <div className={`h-0.5 flex-1 mx-2 rounded-full min-w-3 ${isStarted || isCompleted ? 'bg-[#2F5233]' : 'bg-[#E5DEC9]'}`}></div>

          <div className={`flex items-center gap-1.5 ${isArrived ? 'text-amber-700 font-extrabold' : isStarted || isCompleted ? 'text-[#2F5233]' : 'text-slate-400'}`}>
            <KeyRound className="w-3.5 h-3.5" />
            <span>OTP Verification</span>
          </div>
          <div className={`h-0.5 flex-1 mx-2 rounded-full min-w-3 ${isStarted || isCompleted ? 'bg-[#2F5233]' : 'bg-[#E5DEC9]'}`}></div>

          <div className={`flex items-center gap-1.5 ${isStarted || isCompleted ? 'text-purple-800' : 'text-slate-400'}`}>
            <span className={`w-2 h-2 rounded-full ${isStarted ? 'bg-purple-600 animate-pulse' : isCompleted ? 'bg-purple-800' : 'bg-slate-300'}`}></span>
            <span>Started</span>
          </div>
          <div className={`h-0.5 flex-1 mx-2 rounded-full min-w-3 ${isCompleted ? 'bg-emerald-600' : 'bg-[#E5DEC9]'}`}></div>

          <div className={`flex items-center gap-1.5 ${isCompleted ? 'text-emerald-700 font-extrabold' : 'text-slate-400'}`}>
            <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-600' : 'bg-slate-300'}`}></span>
            <span>Completed</span>
          </div>
        </div>
      </div>

      {/* Stale GPS Alert */}
      {isGpsStale && providerLocation && (
        <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-semibold">
              Provider device signal is {timeAgo}. Live movement display is paused awaiting fresh telemetry.
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-200 text-amber-800 rounded">
            STALE GPS
          </span>
        </div>
      )}

      {/* Map Canvas */}
      <div className="relative w-full h-[360px] sm:h-[400px] bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {!providerLocation && (
          <div className="absolute inset-0 bg-[#1F2A1E]/30 backdrop-blur-[2px] z-10 flex items-center justify-center p-6 text-center">
            <div className="max-w-md bg-white p-5 rounded-2xl shadow-xl border border-[#E5DEC9] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#1F2A1E] text-sm">Provider GPS Not Broadcasting</h4>
              <p className="text-xs text-[#1F2A1E]/60">
                Awaiting active GPS coordinates from provider device. Will automatically update upon transmission.
              </p>
            </div>
          </div>
        )}

        {/* Legend (Requirement 3: Travelled vs Remaining route) */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-[#E5DEC9] rounded-xl px-3 py-2 shadow-md z-10 text-[11px] space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#C9A15A] inline-block border border-white shadow-2xs"></span>
            <span className="font-bold text-[#1F2A1E]">Customer: {customer?.name || 'Customer'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2F5233] inline-block border border-white shadow-2xs"></span>
            <span className="font-bold text-[#1F2A1E]">Provider: {provider?.full_name || 'Provider'} (Live)</span>
          </div>
          <div className="flex items-center gap-2 pt-0.5 border-t border-[#E5DEC9] text-[10px]">
            <span className="w-3 h-1 bg-[#2F5233] inline-block rounded-full"></span>
            <span className="text-[#1F2A1E] font-semibold">Remaining Route</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-3 h-1 bg-[#94A3B8] inline-block rounded-full"></span>
            <span className="text-slate-500">Travelled Route</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          {import.meta.env.DEV && (
            <button
              onClick={handleToggleSimulation}
              title="Development GPS Simulation along route"
              className={`px-3 py-1.5 rounded-xl border shadow-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSimulating 
                  ? 'bg-amber-600 text-white border-amber-700 animate-pulse' 
                  : 'bg-white/95 hover:bg-white text-[#2F5233] border-[#E5DEC9]'
              }`}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Pause DEV Sim' : 'DEV Route Sim'}</span>
            </button>
          )}

          {mapRef.current && (
            <button
              onClick={handleRecenter}
              className="bg-white/95 hover:bg-white text-[#1F2A1E] px-3 py-1.5 rounded-xl border border-[#E5DEC9] shadow-md text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-[#2F5233]" />
              <span>Recenter</span>
            </button>
          )}
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="p-4 bg-[#FAF7F0] border-t border-[#E5DEC9] flex flex-wrap items-center justify-between text-xs text-[#1F2A1E]/70 gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          {providerLocation ? (
            <>
              <div className="flex items-center gap-1 font-mono text-[11px] text-[#1F2A1E]">
                <Compass className="w-3.5 h-3.5 text-[#2F5233]" />
                <span>Lat: {providerLocation.latitude.toFixed(5)}, Lng: {providerLocation.longitude.toFixed(5)}</span>
              </div>
              {providerLocation.accuracy !== undefined && providerLocation.accuracy !== null && (
                <span className="text-[11px]">Accuracy: ±{Math.round(providerLocation.accuracy)}m</span>
              )}
              <span className="text-[11px]">
                Speed: {providerLocation.speed !== undefined && providerLocation.speed !== null 
                  ? `${(providerLocation.speed * 3.6).toFixed(1)} km/h` 
                  : '0.0 km/h'}
              </span>
              {providerLocation.heading !== undefined && providerLocation.heading !== null && (
                <span className="text-[11px]">Heading: {Math.round(providerLocation.heading)}°</span>
              )}
            </>
          ) : (
            <span className="text-[11px] text-amber-700 flex items-center gap-1.5">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Listening for incoming GPS packets over WebSocket channel...</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <Clock className="w-3.5 h-3.5 text-[#1F2A1E]/40" />
          <span>Last sync: <strong className={isGpsStale ? 'text-amber-700' : 'text-[#1F2A1E]'}>{timeAgo}</strong></span>
        </div>
      </div>
    </div>
  );
};
