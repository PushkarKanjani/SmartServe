/**
 * SmartServe Provider Geolocation Utility
 * Handles secure-context verification, W3C Geolocation permission states,
 * error categorization, manual coordinate presets, and telemetry dispatch.
 */

export type LocationPermissionState =
  | 'prompt'
  | 'granted'
  | 'denied'
  | 'insecure'
  | 'unsupported'
  | 'unavailable'
  | 'timeout';

export interface GpsCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
  timestamp?: number;
}

export interface LocationPreset {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}

export const LOCATION_PRESETS: LocationPreset[] = [
  { id: 'ahmedabad', name: 'Ahmedabad (Prahlad Nagar)', region: 'Gujarat', latitude: 23.0225, longitude: 72.5714 },
  { id: 'mumbai-bandra', name: 'Mumbai (Bandra West)', region: 'Maharashtra', latitude: 19.0596, longitude: 72.8295 },
  { id: 'delhi-ncr', name: 'Noida & Delhi NCR (Sec 62)', region: 'Delhi NCR', latitude: 28.6280, longitude: 77.3649 },
  { id: 'bengaluru-koramangala', name: 'Bengaluru (Koramangala)', region: 'Karnataka', latitude: 12.9352, longitude: 77.6245 },
  { id: 'pune-kothrud', name: 'Pune (Kothrud)', region: 'Maharashtra', latitude: 18.5074, longitude: 73.8077 },
];

/**
 * Checks whether the current runtime environment is considered a Secure Context.
 * Under W3C specifications, Geolocation is restricted to Secure Contexts.
 * Only HTTPS and localhost/127.0.0.1 origins are secure contexts; LAN HTTP IPs
 * (such as http://172.20.10.2:5175) are NOT secure contexts.
 */
export function checkIsSecureContext(win: any = typeof window !== 'undefined' ? window : undefined): boolean {
  if (!win) return true;

  if (typeof win.isSecureContext === 'boolean') {
    return win.isSecureContext;
  }

  // Fallback heuristic if window.isSecureContext is not exposed
  const protocol = win.location?.protocol || '';
  const hostname = win.location?.hostname || '';
  return (
    protocol === 'https:' ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]'
  );
}

/**
 * Checks whether the Geolocation API is available on the navigator object.
 */
export function checkGeolocationSupported(nav: any = typeof navigator !== 'undefined' ? navigator : undefined): boolean {
  return typeof nav !== 'undefined' && 'geolocation' in nav && !!nav.geolocation;
}

/**
 * Queries the permission state via the Permissions API where supported.
 * Returns 'granted' | 'prompt' | 'denied' | null.
 * Wrapped in try/catch because Safari iOS throws or doesn't support 'geolocation' permission name.
 */
export async function queryGeolocationPermission(): Promise<'granted' | 'prompt' | 'denied' | null> {
  if (typeof navigator === 'undefined' || !navigator.permissions || !navigator.permissions.query) {
    return null;
  }

  try {
    const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
    if (result && result.state) {
      return result.state;
    }
  } catch {
    // Safari iOS / WebKit throws TypeError on 'geolocation' name
  }
  return null;
}

/**
 * Maps a GeolocationPositionError or exception to a clear, specific permission state and diagnostic message.
 */
export function mapGeolocationError(
  err: any,
  isSecure: boolean
): { state: LocationPermissionState; message: string; diagnostic: string } {
  // If origin is not a secure context, modern browsers immediately return PERMISSION_DENIED (code 1)
  // or completely block without ever showing a popup.
  if (!isSecure) {
    return {
      state: 'insecure',
      message: 'GPS requires a secure origin (HTTPS or localhost).',
      diagnostic:
        'Accessing over unencrypted LAN IP (e.g. http://172.20.10.2:5175) prevents browser location prompts by W3C security policy. Use localhost, HTTPS, or the route simulator.',
    };
  }

  const code = err?.code;
  if (code === 1) {
    // PERMISSION_DENIED
    return {
      state: 'denied',
      message: 'Browser location access was denied.',
      diagnostic:
        'Location permission is blocked in your browser site settings. Re-enable it via the address bar lock / tune icon.',
    };
  } else if (code === 2) {
    // POSITION_UNAVAILABLE
    return {
      state: 'unavailable',
      message: 'Device location / GPS signal is unavailable.',
      diagnostic:
        'Unable to retrieve device position. Please ensure device Location Services / GPS are enabled in operating system settings.',
    };
  } else if (code === 3) {
    // TIMEOUT
    return {
      state: 'timeout',
      message: 'Location acquisition timed out.',
      diagnostic:
        'The GPS satellite or network location fix took longer than 12 seconds. Click Retry or use manual coordinates.',
    };
  }

  return {
    state: 'unavailable',
    message: err?.message || 'Unable to acquire GPS coordinates.',
    diagnostic: 'An unexpected error occurred while querying device location.',
  };
}

/**
 * Invokes navigator.geolocation.getCurrentPosition wrapped in a Promise.
 * Validates secure context and browser support beforehand.
 */
export function requestBrowserGpsPosition(
  options: PositionOptions = { enableHighAccuracy: true, timeout: 12000, maximumAge: 5000 }
): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    const isSecure = checkIsSecureContext();
    if (!isSecure) {
      const err = new Error('INSECURE_CONTEXT');
      (err as any).code = 1;
      (err as any).insecureContext = true;
      return reject(err);
    }

    if (!checkGeolocationSupported()) {
      const err = new Error('GEOLOCATION_UNSUPPORTED');
      (err as any).unsupported = true;
      return reject(err);
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      options
    );
  });
}

/**
 * Calculates Haversine distance between two coordinates in kilometers.
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
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
