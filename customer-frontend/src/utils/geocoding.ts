/**
 * SmartServe - Reverse Geocoding Utility
 * Powered by OpenStreetMap Nominatim with strict rate limiting, caching, and graceful fallbacks.
 *
 * Adheres to OSM Nominatim Usage Policy:
 * - Minimum 1 second between requests (rate limiting queue)
 * - Structured caching by coordinates rounded to 4 decimals (~11 meters)
 * - Safe error handling with informative fallbacks
 */

export interface ReverseGeocodeResult {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state?: string;
  postal_code?: string;
  country?: string;
  formatted_address: string;
}

// In-memory cache for fast lookup during active session
const memoryCache = new Map<string, ReverseGeocodeResult>();

// Rate limiting queue: Nominatim requires max 1 req/sec
let lastRequestTimestamp = 0;
const MIN_REQUEST_INTERVAL_MS = 1000;

function getCacheKey(lat: number, lon: number): string {
  const roundedLat = lat.toFixed(4);
  const roundedLon = lon.toFixed(4);
  return `${roundedLat},${roundedLon}`;
}

function getStoredCache(key: string): ReverseGeocodeResult | null {
  if (memoryCache.has(key)) {
    return memoryCache.get(key)!;
  }
  try {
    const raw = localStorage.getItem(`smartserve_geo_${key}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      memoryCache.set(key, parsed);
      return parsed;
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

function setStoredCache(key: string, data: ReverseGeocodeResult): void {
  memoryCache.set(key, data);
  try {
    localStorage.setItem(`smartserve_geo_${key}`, JSON.stringify(data));
  } catch {
    // Ignore localStorage quota errors
  }
}

async function throttleNominatim(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequestTimestamp;
  if (elapsed < MIN_REQUEST_INTERVAL_MS) {
    const waitMs = MIN_REQUEST_INTERVAL_MS - elapsed;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  lastRequestTimestamp = Date.now();
}

/**
 * Reverse geocodes coordinates (lat, lon) to a readable address.
 * Respects Nominatim rate limits and returns cached results when available.
 */
export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<ReverseGeocodeResult> {
  // Validate coordinates
  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    throw new Error(`Invalid GPS coordinates: [${lat}, ${lon}]`);
  }

  const cacheKey = getCacheKey(lat, lon);
  const cached = getStoredCache(cacheKey);
  if (cached) {
    return cached;
  }

  await throttleNominatim();

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Nominatim error HTTP ${response.status}`);
    }

    const data = await response.json();
    const addr = data.address || {};

    const city =
      addr.city ||
      addr.town ||
      addr.village ||
      addr.municipality ||
      addr.suburb ||
      addr.county ||
      addr.state_district ||
      '';

    const locality =
      addr.neighbourhood ||
      addr.suburb ||
      addr.residential ||
      addr.commercial ||
      addr.road ||
      addr.quarter ||
      '';

    const parts: string[] = [];
    if (locality) parts.push(locality);
    if (city && city !== locality) parts.push(city);
    const shortAddress = parts.length > 0 ? parts.join(', ') : data.display_name?.split(',')[0] || `Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`;

    const result: ReverseGeocodeResult = {
      latitude: lat,
      longitude: lon,
      address: shortAddress,
      city: city || 'Local Area',
      state: addr.state || '',
      postal_code: addr.postcode || '',
      country: addr.country || 'India',
      formatted_address: data.display_name || shortAddress,
    };

    setStoredCache(cacheKey, result);
    return result;
  } catch (err) {
    // Graceful fallback for offline, network block, or rate limit
    console.warn('[Geocoding] Nominatim fetch failed; using coordinate fallback:', err);
    const fallback: ReverseGeocodeResult = {
      latitude: lat,
      longitude: lon,
      address: `Current Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
      city: 'Detected Area',
      formatted_address: `Current Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
    };
    return fallback;
  }
}

