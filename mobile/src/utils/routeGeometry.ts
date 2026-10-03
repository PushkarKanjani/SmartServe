/**
 * Utility functions for OSRM Road Routing, Polyline Projection,
 * Road-Snapping, Distance Tracking, and Ride-App Style ETA Calculations for Mobile.
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
 * Snap a GPS coordinate onto an OSRM road polyline.
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

  const startScan = Math.max(0, Math.min(preferredMinIndex, routeCoords.length - 2));
  let minDistanceMeters = Infinity;
  let bestSegmentIndex = startScan;
  let bestSnappedPoint: [number, number] = routeCoords[startScan]!;

  for (let i = startScan; i < routeCoords.length - 1; i++) {
    const p1 = routeCoords[i]!;
    const p2 = routeCoords[i + 1]!;

    const dx = p2[1] - p1[1];
    const dy = p2[0] - p1[0];

    let t = 0;
    const lenSq = dx * dx + dy * dy;
    if (lenSq > 0) {
      t = Math.max(0, Math.min(1, ((rawLng - p1[1]) * dx + (rawLat - p1[0]) * dy) / lenSq));
    }

    const projLat = p1[0] + t * dy;
    const projLng = p1[1] + t * dx;
    const distKm = computeHaversineKm(rawLat, rawLng, projLat, projLng);
    const distMeters = distKm * 1000;

    if (distMeters < minDistanceMeters) {
      minDistanceMeters = distMeters;
      bestSegmentIndex = i;
      bestSnappedPoint = [projLat, projLng];
    }
  }

  const isOffRoute = minDistanceMeters > 50;
  const finalPoint = isOffRoute ? [rawLat, rawLng] as [number, number] : bestSnappedPoint;

  const nextPt = routeCoords[bestSegmentIndex + 1] || routeCoords[bestSegmentIndex]!;
  const roadHeading = calculateBearing(finalPoint[0], finalPoint[1], nextPt[0], nextPt[1]);

  const travelledCoords: [number, number][] = [];
  for (let i = 0; i <= bestSegmentIndex; i++) {
    travelledCoords.push(routeCoords[i]!);
  }
  travelledCoords.push(finalPoint);

  const remainingCoords: [number, number][] = [finalPoint];
  for (let i = bestSegmentIndex + 1; i < routeCoords.length; i++) {
    remainingCoords.push(routeCoords[i]!);
  }

  let travelledKm = 0;
  for (let i = 0; i < bestSegmentIndex; i++) {
    travelledKm += segmentLengths[i] || 0;
  }
  travelledKm += computeHaversineKm(
    routeCoords[bestSegmentIndex]![0],
    routeCoords[bestSegmentIndex]![1],
    finalPoint[0],
    finalPoint[1]
  );

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
