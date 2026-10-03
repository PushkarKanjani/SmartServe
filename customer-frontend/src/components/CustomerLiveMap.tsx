import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Radio, 
  Clock, 
  Compass, 
  AlertCircle,
  MapPinOff,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Play,
  Pause,
  KeyRound
} from 'lucide-react';
import { ProviderProfileInfo, ProviderGpsLocation, CustomerLocationInfo } from '../api/bookings';
import { getApiBaseUrl } from '../api/client';
import { 
  snapToRoute, 
  fetchOsrmRoute, 
  computeHaversineKm, 
  calculateDynamicEta 
} from '../utils/routeGeometry';

interface CustomerLiveMapProps {
  bookingId: string;
  bookingStatus: string;
  provider: ProviderProfileInfo | null;
  providerLocation: ProviderGpsLocation | null;
  customerLocation: CustomerLocationInfo | null;
  serviceName: string;
}

export const CustomerLiveMap: React.FC<CustomerLiveMapProps> = ({
  bookingId,
  bookingStatus,
  provider,
  providerLocation,
  customerLocation,
  serviceName,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const providerMarkerRef = useRef<L.Marker | null>(null);
  const customerMarkerRef = useRef<L.Marker | null>(null);

  // Split Route Polylines: Travelled (completed) + Remaining
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

  // Route Metrics State
  const [totalDistanceKm, setTotalDistanceKm] = useState<number | null>(null);
  const [travelledDistanceKm, setTravelledDistanceKm] = useState<number>(0);
  const [remainingDistanceKm, setRemainingDistanceKm] = useState<number | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [etaMinutes, setEtaMinutes] = useState<number | null>(null);
  const [isRouting, setIsRouting] = useState<boolean>(false);

  // GPS Telemetry & Staleness State
  const [timeAgo, setTimeAgo] = useState<string>('Awaiting GPS signal');
  const [isGpsStale, setIsGpsStale] = useState<boolean>(false);

  // DEV-ONLY GPS Simulation State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const simIntervalRef = useRef<any>(null);
  const simStepRef = useRef<number>(0);

  // 1. Dynamic GPS Freshness & Staleness Monitor (Requirement 6)
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
        setTimeAgo(`${secs} sec ago`);
        setIsGpsStale(false);
      } else if (secs < 120) {
        setTimeAgo('1 min ago');
        setIsGpsStale(false);
      } else {
        // GPS is stale (> 2 minutes without updates)
        setIsGpsStale(true);
        const mins = Math.floor(secs / 60);
        if (mins < 60) {
          setTimeAgo(`Stale — ${mins} min${mins > 1 ? 's' : ''} ago`);
        } else {
          const hours = Math.floor(mins / 60);
          const remMins = mins % 60;
          setTimeAgo(`Stale — ${hours}h ${remMins}m ago`);
        }
      }
    };

    updateFreshness();
    const interval = setInterval(updateFreshness, 2500);
    return () => clearInterval(interval);
  }, [providerLocation?.updated_at]);

  // 2. Attractive Provider Vehicle Marker HTML (Requirement 8)
  const createProviderMarkerHtml = (heading: number, stale: boolean) => {
    return `
      <div style="position: relative; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
        <!-- Pulsing radar glow when active -->
        ${!stale ? `
          <div style="position: absolute; width: 46px; height: 46px; border-radius: 50%; background: rgba(5, 150, 105, 0.25); animation: ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: 38px; height: 38px; border-radius: 50%; background: rgba(5, 150, 105, 0.15); border: 1.5px solid rgba(5, 150, 105, 0.4);"></div>
        ` : `
          <div style="position: absolute; width: 38px; height: 38px; border-radius: 50%; background: rgba(245, 158, 11, 0.2); border: 1.5px solid rgba(245, 158, 11, 0.5);"></div>
        `}
        <!-- Rotating vehicle disk with navigation chevron -->
        <div style="transform: rotate(${heading}deg); transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); width: 34px; height: 34px; border-radius: 50%; background: ${stale ? 'linear-gradient(135deg, #D97706, #B45309)' : 'linear-gradient(135deg, #059669, #047857)'}; border: 2.5px solid #ffffff; box-shadow: 0 4px 14px ${stale ? 'rgba(217, 119, 6, 0.45)' : 'rgba(5, 150, 105, 0.55)'}; display: flex; align-items: center; justify-content: center; color: white;">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
          </svg>
        </div>
      </div>
    `;
  };

  // 3. Clear Customer Destination Marker HTML (Requirement 9)
  const createCustomerMarkerHtml = () => {
    return `
      <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 40px; height: 40px; border-radius: 50%; background: rgba(37, 99, 235, 0.18); animation: pulse 2s infinite;"></div>
        <div style="width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #2563EB, #1D4ED8); border: 2.5px solid #ffffff; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.45); display: flex; align-items: center; justify-content: center; color: white;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
      </div>
    `;
  };

  // 4. Update the Two Route Layers (Travelled vs Remaining) (Requirement 3)
  const updateRouteLayers = useCallback((travelled: [number, number][], remaining: [number, number][]) => {
    if (!mapRef.current) return;

    // 1. Travelled Polyline (Muted grey/slate line showing completed portion)
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

    // 2. Remaining Polyline Casing (High-contrast underlay)
    if (remainingCasingRef.current) {
      remainingCasingRef.current.setLatLngs(remaining);
    } else {
      remainingCasingRef.current = L.polyline(remaining, {
        color: '#1E3A8A',
        weight: 8,
        opacity: 0.3,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(mapRef.current);
    }

    // 3. Remaining Polyline (Vibrant road line)
    if (remainingPolylineRef.current) {
      remainingPolylineRef.current.setLatLngs(remaining);
    } else {
      remainingPolylineRef.current = L.polyline(remaining, {
        color: '#2563EB',
        weight: 5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(mapRef.current);
    }
  }, []);

  // 5. Fetch Full OSRM Road Route (Requirement 1)
  const loadInitialOsrmRoute = useCallback(async (
    pLat: number,
    pLng: number,
    cLat: number,
    cLng: number
  ) => {
    try {
      setIsRouting(true);
      const res = await fetchOsrmRoute(pLat, pLng, cLat, cLng);

      if (res && res.coordinates.length > 1) {
        fullRouteCoordsRef.current = res.coordinates;
        setTotalDistanceKm(res.distanceKm);

        // Snap starting provider position to route
        const snap = snapToRoute(res.coordinates, pLat, pLng, 0);
        lastSnappedIndexRef.current = snap.segmentIndex;
        setTravelledDistanceKm(snap.travelledDistanceKm);
        setRemainingDistanceKm(snap.remainingDistanceKm);
        setProgressPercent(snap.progressPercent);

        const eta = calculateDynamicEta(snap.remainingDistanceKm, providerLocation?.speed);
        setEtaMinutes(eta.etaMinutes);

        updateRouteLayers(snap.travelledCoords, snap.remainingCoords);
      } else {
        // Fallback straight line if OSRM is unreachable
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
      console.warn('Initial OSRM fetch error:', err);
    } finally {
      setIsRouting(false);
    }
  }, [providerLocation?.speed, updateRouteLayers]);

  // 6. Smooth Marker Animation (requestAnimationFrame) + Road Snapping (Requirement 2 & 4)
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

    // Road snap against current OSRM geometry
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

      // Recalculate ETA (Requirement 6)
      const dynamicEta = calculateDynamicEta(snap.remainingDistanceKm, telemetrySpeed);
      setEtaMinutes(dynamicEta.etaMinutes);

      // 3. Log Route Progress (Requirement)
      console.log(`[TRACKING]\nroute progress:\ndistance=${snap.remainingDistanceKm.toFixed(2)} km\nprogress=${snap.progressPercent}%`);
    }

    lastHeadingRef.current = roadHeading;

    // Update marker icon with heading rotation & staleness
    const icon = L.divIcon({
      html: createProviderMarkerHtml(roadHeading, isGpsStale),
      className: 'custom-provider-icon',
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      popupAnchor: [0, -24],
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

      // Smooth ease-out cubic curve (delivery app feel)
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

  // 7. Initialize Map & Markers
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

    // Detect user pan/zoom exploration (Requirement 12)
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
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -22],
      });

      const custMarker = L.marker([customerLocation.latitude, customerLocation.longitude], { icon: custIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: inherit; font-size: 12px; padding: 4px;">
            <strong style="color: #1e3a8a;">Customer Destination</strong>
            <div style="color: #64748b; font-size: 11px; margin-top: 2px;">${customerLocation.address || 'Service Location'}</div>
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
        className: 'custom-provider-icon',
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
      });

      const provMarker = L.marker([pLat, pLng], { icon: provIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: inherit; font-size: 12px; padding: 4px;">
            <strong style="color: #064e3b; display: flex; align-items: center; gap: 4px;">
              <span>${provider?.full_name || 'Service Partner'}</span>
              <span style="background: #ecfdf5; color: #059669; font-size: 9px; padding: 1px 5px; border-radius: 4px; font-weight: 700;">LIVE DISPATCH</span>
            </strong>
            <div style="color: #047857; font-size: 11px; margin-top: 2px;">Status: ${bookingStatus}</div>
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

  // 8. Handle Live Incoming GPS Updates (Requirement 2, 3, 4, 6)
  useEffect(() => {
    if (!mapRef.current || !providerLocation) return;

    const pLat = providerLocation.latitude;
    const pLng = providerLocation.longitude;

    if (!providerMarkerRef.current) {
      currentPosRef.current = { lat: pLat, lng: pLng };
      const provIcon = L.divIcon({
        html: createProviderMarkerHtml(providerLocation.heading || 0, isGpsStale),
        className: 'custom-provider-icon',
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
      });
      const provMarker = L.marker([pLat, pLng], { icon: provIcon }).addTo(mapRef.current);
      providerMarkerRef.current = provMarker;
    }

    // Smoothly animate marker and snap along route
    animateMarkerToRoad(pLat, pLng, providerLocation.heading, providerLocation.speed);

    // If route isn't loaded yet and customer location is available, fetch route
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

  // 9. DEV-ONLY GPS Simulation Mode (Requirement 7)
  const handleToggleSimulation = async () => {
    if (isSimulating) {
      // Stop simulation
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
      setIsSimulating(false);
      return;
    }

    if (fullRouteCoordsRef.current.length < 2) {
      if (providerLocation && customerLocation) {
        await loadInitialOsrmRoute(
          providerLocation.latitude,
          providerLocation.longitude,
          customerLocation.latitude,
          customerLocation.longitude
        );
      }
    }

    const route = fullRouteCoordsRef.current;
    if (route.length < 2) {
      alert('OSRM route coordinates not yet available for simulation. Please try again in a moment.');
      return;
    }

    setIsSimulating(true);
    let step = 0;
    simStepRef.current = 0;

    // Run DEV simulation along actual route points route[0] -> route[1] -> ...
    simIntervalRef.current = setInterval(async () => {
      step++;
      if (step >= route.length) {
        clearInterval(simIntervalRef.current);
        setIsSimulating(false);
        return;
      }
      simStepRef.current = step;
      const pt = route[step];
      const prevPt = route[step - 1];
      if (!pt || !prevPt) return;

      // Calculate bearing from previous point to current point
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
        speed: 8.5, // ~30.6 km/h
        accuracy: 4.0,
        timestamp: new Date().toISOString(),
      };

      try {
        // Send to backend dev simulation endpoint (updates DB and broadcasts via WebSocket)
        await fetch(`${getApiBaseUrl()}/providers/dev-simulate-location`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        // Local fallback in case backend is offline
        animateMarkerToRoad(pt[0], pt[1], brng, 8.5);
      }
    }, 1200);
  };

  // Recenter Map Handler
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

  const stLower = bookingStatus.toLowerCase();
  const isOnTheWay = stLower === 'on the way';
  const isArrived = stLower === 'arrived';
  const isStarted = stLower === 'started';
  const isCompleted = stLower === 'completed';

  const displayDistance = remainingDistanceKm !== null
    ? (remainingDistanceKm < 1 ? `${Math.round(remainingDistanceKm * 1000)} m` : `${remainingDistanceKm.toFixed(1)} km`)
    : null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden font-sans">
      
      {/* 1. Ola / Swiggy Style Active Tracking Header Card */}
      <div className="p-5 bg-gradient-to-r from-slate-950 via-[#0B1528] to-slate-950 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Status & Provider Info */}
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md bg-slate-800 flex items-center justify-center text-white font-bold text-lg">
                {provider?.photo_url ? (
                  <img src={provider.photo_url} alt={provider.full_name} className="w-full h-full object-cover" />
                ) : (
                  <span>{provider?.full_name ? provider.full_name.charAt(0) : 'P'}</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white">
                <ShieldCheck className="w-3 h-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-extrabold text-white">
                  {provider?.full_name || 'Service Partner'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Verified
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs font-bold ${
                  isArrived ? 'text-teal-400' : isStarted ? 'text-purple-400' : 'text-emerald-400'
                }`}>
                  {isArrived
                    ? 'Provider has arrived at your location'
                    : isStarted
                    ? 'Service in progress'
                    : 'Provider is on the way'}
                </span>
                <span className="text-[11px] text-slate-400">
                  • {serviceName} {isRouting && <span className="text-blue-300 font-semibold">(calculating route...)</span>}
                </span>
              </div>
            </div>
          </div>

          {/* Right Metrics: Distance, ETA, and GPS Freshness (Requirement 6 & 15) */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-xs self-start sm:self-auto flex-wrap">
            {displayDistance && (
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Remaining</span>
                <span className="text-sm font-black text-emerald-400 font-mono">{displayDistance}</span>
              </div>
            )}

            {/* Dynamic ETA: Paused when stale, dynamic when live */}
            {!isArrived && !isStarted && !isCompleted && (
              <div className="text-right border-l border-white/10 pl-3">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Est. Arrival</span>
                {isGpsStale ? (
                  <span className="text-xs font-black text-amber-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>Paused</span>
                  </span>
                ) : (
                  <span className="text-sm font-black text-blue-400 font-mono">
                    ~{etaMinutes !== null ? etaMinutes : 1} min
                  </span>
                )}
              </div>
            )}

            {/* GPS Signal Status: LIVE vs STALE (Requirement 6) */}
            <div className="text-right border-l border-white/10 pl-3">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">GPS Signal</span>
              {isGpsStale ? (
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>{timeAgo}</span>
                </span>
              ) : (
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{timeAgo}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 2. Route Progress Bar (Requirement 5) */}
        {totalDistanceKm !== null && totalDistanceKm > 0 && (
          <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Trip Progress: <strong>{progressPercent}%</strong></span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                Total: {totalDistanceKm.toFixed(1)} km • Travelled: {travelledDistanceKm.toFixed(1)} km
              </span>
            </div>
            <div className="w-full bg-slate-800/90 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-blue-500 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(4, Math.min(100, progressPercent))}%` }}
              />
            </div>
          </div>
        )}

        {/* 3. Swiggy/Ola Status Progression Bar with OTP step (Requirement 11) */}
        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-400 flex-wrap sm:flex-nowrap gap-y-1">
          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>Accepted</span>
          </div>
          <div className="h-0.5 flex-1 mx-1.5 bg-emerald-500/40 rounded-full min-w-3"></div>

          <div className={`flex items-center gap-1 ${isOnTheWay || isArrived || isStarted || isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>
            <Navigation className="w-3 h-3" />
            <span>On The Way</span>
          </div>
          <div className={`h-0.5 flex-1 mx-1.5 rounded-full min-w-3 ${isArrived || isStarted || isCompleted ? 'bg-emerald-500/40' : 'bg-white/10'}`}></div>

          <div className={`flex items-center gap-1 ${isArrived || isStarted || isCompleted ? 'text-teal-400 font-extrabold' : 'text-slate-500'}`}>
            <span className={`w-2 h-2 rounded-full ${isArrived ? 'bg-teal-400 animate-ping' : isStarted || isCompleted ? 'bg-teal-400' : 'bg-slate-600'}`}></span>
            <span>Arrived</span>
          </div>
          <div className={`h-0.5 flex-1 mx-1.5 rounded-full min-w-3 ${isStarted || isCompleted ? 'bg-purple-500/40' : 'bg-white/10'}`}></div>

          <div className={`flex items-center gap-1 ${isArrived ? 'text-amber-400 font-extrabold' : isStarted || isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>
            <KeyRound className="w-3 h-3" />
            <span>OTP Verification</span>
          </div>
          <div className={`h-0.5 flex-1 mx-1.5 rounded-full min-w-3 ${isStarted || isCompleted ? 'bg-purple-500/40' : 'bg-white/10'}`}></div>

          <div className={`flex items-center gap-1 ${isStarted || isCompleted ? 'text-purple-400 font-extrabold' : 'text-slate-500'}`}>
            <span className={`w-2 h-2 rounded-full ${isStarted ? 'bg-purple-400 animate-pulse' : isCompleted ? 'bg-purple-400' : 'bg-slate-600'}`}></span>
            <span>Started</span>
          </div>
          <div className={`h-0.5 flex-1 mx-1.5 rounded-full min-w-3 ${isCompleted ? 'bg-emerald-500/40' : 'bg-white/10'}`}></div>

          <div className={`flex items-center gap-1 ${isCompleted ? 'text-emerald-400 font-extrabold' : 'text-slate-500'}`}>
            <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
            <span>Completed</span>
          </div>
        </div>
      </div>

      {/* Customer Location Missing Warning */}
      {!customerLocation && (
        <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200/80 flex items-center gap-2 text-xs text-amber-900 font-medium">
          <MapPinOff className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Customer destination coordinates not available. Showing provider location.</span>
        </div>
      )}

      {/* Stale GPS Alert Banner (Requirement 6) */}
      {isGpsStale && providerLocation && (
        <div className="px-5 py-2.5 bg-amber-500/10 border-b border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-semibold">
              Live movement paused: Provider GPS signal is {timeAgo}. Telemetry will resume automatically once fresh coordinates arrive.
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md">
            Signal Paused
          </span>
        </div>
      )}

      {/* Map Canvas */}
      <div className="relative w-full h-[380px] sm:h-[440px] bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Overlay when GPS hasn't arrived yet */}
        {!providerLocation && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] z-10 flex items-center justify-center p-6 text-center">
            <div className="max-w-md bg-white p-6 rounded-3xl shadow-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Awaiting Provider GPS Signal</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {provider?.full_name || 'Your technician'} is on assignment. Live road tracking activates automatically once their device broadcasts GPS coordinates.
              </p>
              <div className="pt-2 text-xs font-semibold text-slate-500 flex items-center justify-center gap-2">
                <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>Live WebSocket channel connected</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating Route Legend (Requirement 3: Travelled vs Remaining route) */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl px-3.5 py-2.5 shadow-lg z-10 text-xs space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2563EB] inline-block border-2 border-white shadow-2xs"></span>
            <span className="font-bold text-slate-800">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#059669] inline-block border-2 border-white shadow-2xs"></span>
            <span className="font-bold text-slate-800">{provider?.full_name || 'Service Partner'} (Live)</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[11px]">
            <span className="w-4 h-1 bg-[#2563EB] inline-block rounded-full"></span>
            <span className="text-slate-700 font-semibold">Remaining Route</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-4 h-1 bg-[#94A3B8] inline-block rounded-full"></span>
            <span className="text-slate-500">Travelled Route</span>
          </div>
        </div>

        {/* Action Controls: Recenter & DEV Simulation Mode (Requirement 7 & 12) */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {/* DEV-ONLY GPS Simulation Mode Button (Requirement 7) */}
          {import.meta.env.DEV && (
            <button
              onClick={handleToggleSimulation}
              title="Development GPS Simulation along OSRM route"
              className={`px-3 py-1.5 rounded-xl border shadow-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSimulating 
                  ? 'bg-amber-600 text-white border-amber-700 animate-pulse' 
                  : 'bg-slate-900/90 hover:bg-slate-900 text-amber-300 border-amber-400/40'
              }`}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Pause DEV Sim' : 'DEV Route Sim'}</span>
            </button>
          )}

          {/* Recenter Button (Requirement 12) */}
          {mapRef.current && (
            <button
              onClick={handleRecenter}
              className="bg-white/95 hover:bg-white text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Recenter</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Telemetry Info Strip (Requirement 15: Non-hardcoded live data) */}
      {providerLocation && (
        <div className="p-3.5 bg-slate-50 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>GPS: {providerLocation.latitude.toFixed(5)}, {providerLocation.longitude.toFixed(5)}</span>
            </div>
            {providerLocation.accuracy !== undefined && providerLocation.accuracy !== null && (
              <span className="text-[11px] text-slate-500">
                Accuracy: ±{Math.round(providerLocation.accuracy)}m
              </span>
            )}
            <span className="text-[11px] text-slate-500">
              Speed: {providerLocation.speed !== undefined && providerLocation.speed !== null 
                ? `${(providerLocation.speed * 3.6).toFixed(1)} km/h` 
                : '0.0 km/h'}
            </span>
            {providerLocation.heading !== undefined && providerLocation.heading !== null && (
              <span className="text-[11px] text-slate-500">
                Heading: {Math.round(providerLocation.heading)}°
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Updated: <strong className={isGpsStale ? 'text-amber-700' : 'text-slate-800'}>{timeAgo}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
