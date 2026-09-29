/**
 * Utility functions for OSRM Road Routing, Polyline Projection,
 * Road-Snapping, Distance Tracking, and Ride-App Style ETA Calculations.
 */

export interface RouteSnapResult {
  snappedPoint: [number, number]; // [lat, lng]
  segmentIndex: number;
  roadHeading: number;
  distanceToRoadMeters: number;
  travelledCoords: [number, number][];
  remainingCoords: [number, number][];
  travelledDistanceKm: number;
  remainingDistanceKm: number;
  totalDistanceKm: number;
  progressPercent: number;
  isOffRoute: boolean;
}

/**
 * Standard Haversine distance in kilometers between two lat/lng coordinates
 */
export function computeHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Computes bearing (heading in degrees [0, 360)) from point 1 to point 2
 */
export function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLon);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

/**
 * Computes the total cumulative length of a polyline in kilometers
 */
export function computePolylineLengthKm(coords: [number, number][]): number {
  if (coords.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const c1 = coords[i]!;
    const c2 = coords[i + 1]!;
    total += computeHaversineKm(c1[0], c1[1], c2[0], c2[1]);
  }
  return total;
}

/**
 * Snap a GPS coordinate onto an OSRM road polyline.
 * Divides the route into:
 * 1) Travelled path (route[0] ... snappedPoint)
 * 2) Remaining path (snappedPoint ... route[N])
 */
export function snapToRoute(
  routeCoords: [number, number][],
  rawLat: number,
  rawLng: number,
  preferredMinIndex: number = 0
): RouteSnapResult {
  if (!routeCoords || routeCoords.length < 2) {
    const pt: [number, number] = [rawLat, rawLng];
    return {
      snappedPoint: pt,
      segmentIndex: 0,
      roadHeading: 0,
      distanceToRoadMeters: 0,
      travelledCoords: [pt],
      remainingCoords: [pt],
      travelledDistanceKm: 0,
      remainingDistanceKm: 0,
      totalDistanceKm: 0,
      progressPercent: 0,
      isOffRoute: false,
    };
  }

  const segmentLengths: number[] = [];
  let totalRouteKm = 0;
  for (let i = 0; i < routeCoords.length - 1; i++) {
    const p1 = routeCoords[i]!;
    const p2 = routeCoords[i + 1]!;
    const len = computeHaversineKm(p1[0], p1[1], p2[0], p2[1]);
    segmentLengths.push(len);
    totalRouteKm += len;
  }

  let minDistanceMeters = Infinity;
  let bestSegmentIndex = 0;
  let bestSnappedPoint: [number, number] = routeCoords[0]!;

  // Search all segments along the route so that position can snap anywhere accurately
  for (let i = 0; i < routeCoords.length - 1; i++) {
    const a = routeCoords[i]!;
    const b = routeCoords[i + 1]!;

    const latMid = (a[0] + b[0]) / 2;
    const cosLat = Math.cos((latMid * Math.PI) / 180);
    const scaleX = cosLat * 111320;
    const scaleY = 110574;

    const ax = a[1] * scaleX;
    const ay = a[0] * scaleY;
    const bx = b[1] * scaleX;
    const by = b[0] * scaleY;
    const px = rawLng * scaleX;
    const py = rawLat * scaleY;

    const dx = bx - ax;
    const dy = by - ay;
    const lenSq = dx * dx + dy * dy;

    let t = 0;
    if (lenSq > 0.001) {
      t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
      t = Math.max(0, Math.min(1, t));
    }

    const projLat = a[0] + t * (b[0] - a[0]);
    const projLng = a[1] + t * (b[1] - a[1]);

    const distMeters = computeHaversineKm(rawLat, rawLng, projLat, projLng) * 1000;
    // Small hysteresis: slight penalty only if jumping slightly backwards on adjacent segments
    const penalty = (i < preferredMinIndex && (preferredMinIndex - i) < 5) ? 25 : 0;
    const effectiveDist = distMeters + penalty;

    if (effectiveDist < minDistanceMeters) {
      minDistanceMeters = effectiveDist;
      bestSegmentIndex = i;
      bestSnappedPoint = [projLat, projLng];
    }
  }

  const segA = routeCoords[bestSegmentIndex]!;
  const segB = routeCoords[bestSegmentIndex + 1]!;
  const roadHeading = calculateBearing(segA[0], segA[1], segB[0], segB[1]);

  const isOffRoute = minDistanceMeters > 180;
  const finalPoint: [number, number] = isOffRoute ? [rawLat, rawLng] : bestSnappedPoint;

  const travelledCoords: [number, number][] = [];
  for (let j = 0; j <= bestSegmentIndex; j++) {
    const pt = routeCoords[j];
    if (pt) travelledCoords.push(pt);
  }
  const lastTrav = travelledCoords[travelledCoords.length - 1];
  if (!lastTrav || Math.abs(lastTrav[0] - finalPoint[0]) > 1e-6 || Math.abs(lastTrav[1] - finalPoint[1]) > 1e-6) {
    travelledCoords.push(finalPoint);
  }

  const remainingCoords: [number, number][] = [finalPoint];
  for (let k = bestSegmentIndex + 1; k < routeCoords.length; k++) {
    const pt = routeCoords[k];
    if (pt) remainingCoords.push(pt);
  }

  let travelledKm = 0;
  for (let m = 0; m < bestSegmentIndex; m++) {
    const sLen = segmentLengths[m];
    if (sLen !== undefined) travelledKm += sLen;
  }
  travelledKm += computeHaversineKm(segA[0], segA[1], finalPoint[0], finalPoint[1]);

  const remainingKm = Math.max(0, totalRouteKm - travelledKm);
  const progressPercent = totalRouteKm > 0
    ? Math.min(100, Math.max(0, Math.round((travelledKm / totalRouteKm) * 100)))
    : 0;

  return {
    snappedPoint: finalPoint,
    segmentIndex: bestSegmentIndex,
    roadHeading,
    distanceToRoadMeters: minDistanceMeters,
    travelledCoords,
    remainingCoords,
    travelledDistanceKm: travelledKm,
    remainingDistanceKm: remainingKm,
    totalDistanceKm: totalRouteKm,
    progressPercent,
    isOffRoute,
  };
}

/**
 * Fetch full OSRM road geometry between origin and destination
 */
export async function fetchOsrmRoute(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
): Promise<{ coordinates: [number, number][]; distanceKm: number; durationMinutes: number } | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`OSRM request failed with status ${res.status}`);
    const data = await res.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const coordinates: [number, number][] = route.geometry.coordinates.map(
        (c: [number, number]) => [c[1], c[0]] as [number, number]
      );
      return {
        coordinates,
        distanceKm: route.distance / 1000,
        durationMinutes: Math.max(1, Math.round(route.duration / 60)),
      };
    }
  } catch (err) {
    console.warn('Failed to fetch OSRM route:', err);
  }
  return null;
}

/**
 * Calculate dynamic ETA in minutes based on remaining distance and current speed
 */
export function calculateDynamicEta(
  remainingDistanceKm: number,
  speedKmh?: number | null,
  fallbackSpeedKmh: number = 25
): { etaMinutes: number; speedDisplay: string } {
  const effectiveSpeed = speedKmh !== undefined && speedKmh !== null && speedKmh > 5
    ? speedKmh
    : fallbackSpeedKmh;

  const minutes = Math.max(1, Math.round((remainingDistanceKm / effectiveSpeed) * 60));
  const speedDisplay = speedKmh !== undefined && speedKmh !== null
    ? `${speedKmh.toFixed(1)} km/h`
    : '0.0 km/h';

  return {
    etaMinutes: minutes,
    speedDisplay,
  };
}
