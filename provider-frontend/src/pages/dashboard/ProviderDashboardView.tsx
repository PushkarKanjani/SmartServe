import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getApiBaseUrl } from '../../api/client';
import {
  Clock,
  ShieldCheck,
  Briefcase,
  FileCheck,
  Calendar,
  MapPin,
  User,
  RefreshCw,
  Play,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Square,
  Check,
  IndianRupee,
  Zap,
  ChevronRight,
  Bell,
  Star,
  Award,
  ArrowRight,
  LifeBuoy,
  X,
  XCircle,
  Radio,
  Compass,
  Navigation,
  KeyRound,
  Camera,
  Upload,
  FileText,
  Eye,
  Banknote,
} from 'lucide-react';
import { apiClient } from '../../api/client';
import { subscribeToRealtime } from '../../utils/realtime';
import {
  checkIsSecureContext,
  checkGeolocationSupported,
  queryGeolocationPermission,
  mapGeolocationError,
  LOCATION_PRESETS,
} from '../../utils/geolocation';
import type { LocationPermissionState, GpsCoordinates } from '../../utils/geolocation';

interface DashboardStats {
  today_bookings_count: number;
  active_jobs_count: number;
  completed_jobs_count: number;
  pending_requests_count: number;
  total_earnings: string;
  pipeline_count: number;
  urgent_alerts_count: number;
  recent_activity: {
    booking_id: string;
    reference: string;
    service_name: string;
    status: string;
    customer_name: string;
    amount: number;
    timestamp: string;
    is_emergency: boolean;
  }[];
}

interface ProfileTrust {
  full_name: string;
  email: string;
  phone?: string;
  photo_url?: string;
  category?: string;
  skills?: string;
  experience_years: number;
  service_area?: string;
  is_verified: boolean;
  reliability_score: string;
  acceptance_rate: string;
  cancellation_rate: string;
  on_time_rate: string;
  response_time_score: string;
  completed_jobs_count: number;
  certificates_count: number;
}

const STATUS_STYLES: Record<string, string> = {
  Requested: 'bg-amber-50 text-amber-800 border-amber-300',
  Assigned: 'bg-[#F2EDE1] text-[#2F5233] border-[#E5DEC9]',
  Accepted: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'On The Way': 'bg-sky-50 text-sky-700 border-sky-200',
  Arrived: 'bg-teal-50 text-teal-700 border-teal-200',
  Started: 'bg-purple-50 text-purple-700 border-purple-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Cancelled: 'bg-slate-100 text-slate-500 border-slate-200',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
};

const resolvePhotoUrl = (url?: string | null) => {
  if (!url) return 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80';
  if (url.startsWith('data:image')) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const apiBase = getApiBaseUrl().replace(/\/api\/v1\/?$/, '');
  return `${apiBase}/${url.replace(/^\/+/, '')}`;
};

// Web Audio API synthesized notification sound
const playNotificationChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1320, now + 0.15);
    gain2.gain.setValueAtTime(0.35, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.6);
  } catch (_) {}
};

export const ProviderDashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [trust, setTrust] = useState<ProfileTrust | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [newBookingAlert, setNewBookingAlert] = useState<any | null>(null);
  const [rejectingBooking, setRejectingBooking] = useState<any | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('Schedule conflict with another job');

  // Photo Upload & Preview State
  const [photoUploadingBookingId, setPhotoUploadingBookingId] = useState<string | null>(null);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);

  // Service Start OTP state
  const [startingBooking, setStartingBooking] = useState<any | null>(null);
  const [startOtp, setStartOtp] = useState<string>('');
  const [startOtpError, setStartOtpError] = useState<string | null>(null);

  // Service Completion OTP state
  const [completingBooking, setCompletingBooking] = useState<any | null>(null);
  const [completeOtp, setCompleteOtp] = useState<string>('');
  const [completeOtpError, setCompleteOtpError] = useState<string | null>(null);

  // Cash Collection Reporting state
  const [cashCollectionBooking, setCashCollectionBooking] = useState<any | null>(null);
  const [collectedAmount, setCollectedAmount] = useState<string>('');
  const [collectionNotes, setCollectionNotes] = useState<string>('');
  const [collectionLoading, setCollectionLoading] = useState<boolean>(false);
  const [collectionError, setCollectionError] = useState<string | null>(null);
  const [collectionSuccess, setCollectionSuccess] = useState<string | null>(null);

  // Real Geolocation Tracking state
  const [locationPermission, setLocationPermission] = useState<LocationPermissionState>('prompt');
  const [locationDiagnostic, setLocationDiagnostic] = useState<string | null>(null);
  const [showLocationInstructions, setShowLocationInstructions] = useState<boolean>(false);
  const [showManualLocationModal, setShowManualLocationModal] = useState<boolean>(false);
  const [manualCustomLat, setManualCustomLat] = useState<string>('');
  const [manualCustomLng, setManualCustomLng] = useState<string>('');
  const [gpsCoordinates, setGpsCoordinates] = useState<GpsCoordinates | null>(null);
  const [lastGpsSync, setLastGpsSync] = useState<string | null>(null);
  const [isBroadcastingGps, setIsBroadcastingGps] = useState<boolean>(false);
  const [isGpsTrackingEnabled, setIsGpsTrackingEnabled] = useState<boolean>(true);

  const compressImage = (file: File, maxWidth = 800, quality = 0.65): Promise<string> => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        const fallbackReader = new FileReader();
        fallbackReader.onload = () => resolve((fallbackReader.result as string) || '');
        fallbackReader.onerror = () => resolve('');
        fallbackReader.readAsDataURL(file);
      }, 2500);

      const reader = new FileReader();
      reader.onload = (event) => {
        const rawData = event.target?.result as string;
        if (!rawData) {
          clearTimeout(timer);
          resolve('');
          return;
        }
        const img = new Image();
        img.onload = () => {
          clearTimeout(timer);
          try {
            const canvas = document.createElement('canvas');
            let width = img.width || 800;
            let height = img.height || 600;
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(rawData);
              return;
            }
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
          } catch {
            resolve(rawData);
          }
        };
        img.onerror = () => {
          clearTimeout(timer);
          resolve(rawData);
        };
        img.src = rawData;
      };
      reader.onerror = () => {
        clearTimeout(timer);
        resolve('');
      };
      reader.readAsDataURL(file);
    });
  };


  const handlePhotoUpload = async (bookingId: string, type: 'before' | 'after', file: File) => {
    setPhotoUploadingBookingId(bookingId);
    setActionError(null);
    try {
      const base64Data = await compressImage(file, 800, 0.65);
      if (!base64Data) {
        setActionError('Could not process photo file.');
        setPhotoUploadingBookingId(null);
        return;
      }
      const res = await apiClient.post(`/providers/me/bookings/${bookingId}/photos/${type}`, {
        photo_url: base64Data,
      });
      const uploadedUrl = res.data?.photo_url || base64Data;
      // Immediately reflect uploaded photo in local state
      setBookings((prev) =>
        prev.map((b) => {
          if (b.id !== bookingId) return b;
          if (type === 'before') {
            const list = b.before_photos || [];
            return { ...b, before_photos: [...list, uploadedUrl] };
          } else {
            const list = b.after_photos || [];
            return { ...b, after_photos: [...list, uploadedUrl] };
          }
        })
      );
      // Background reload without blocking the photo completion UI
      fetchAll().catch(() => {});
    } catch (err: any) {
      console.error(`Failed to upload ${type} photo`, err);
      setActionError(err.response?.data?.detail || `Failed to upload ${type} photo. Please verify connection and retry.`);
    } finally {
      setPhotoUploadingBookingId(null);
    }
  };


  const fetchAll = async () => {
    try {
      const [statsRes, trustRes, bookingsRes] = await Promise.all([
        apiClient.get('/providers/me/dashboard-stats'),
        apiClient.get('/providers/me/profile-trust'),
        apiClient.get('/providers/me/bookings'),
      ]);
      setStats(statsRes.data);
      setTrust(trustRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Active booking detection
  const isStatusActive = (st: string) => {
    const s = (st || '').toLowerCase().replace(/_/g, ' ').trim();
    return ['accepted', 'on the way', 'arrived', 'started'].includes(s);
  };
  const activeBooking = bookings.find((b) => isStatusActive(b.status));

  // Send real GPS coordinates to backend with throttling
  const lastLocationSentRef = useRef<{ lat: number; lng: number; time: number } | null>(null);
  const [devSimulatingBookingId, setDevSimulatingBookingId] = useState<string | null>(null);
  const devSimIntervalRef = useRef<any>(null);
  const gpsWatchIdRef = useRef<number | null>(null);
  const gpsIntervalRef = useRef<any>(null);

  const stopGpsTracking = () => {
    if (gpsWatchIdRef.current !== null) {
      navigator.geolocation.clearWatch(gpsWatchIdRef.current);
      gpsWatchIdRef.current = null;
    }
    if (gpsIntervalRef.current !== null) {
      clearInterval(gpsIntervalRef.current);
      gpsIntervalRef.current = null;
    }
    setIsBroadcastingGps(false);
  };

  const handleDevSimulateRoute = async (booking: any) => {
    if (devSimulatingBookingId === booking.id) {
      if (devSimIntervalRef.current) clearInterval(devSimIntervalRef.current);
      setDevSimulatingBookingId(null);
      return;
    }

    const cLat = booking.customer_location?.latitude || (gpsCoordinates ? gpsCoordinates.latitude + 0.008 : 28.6360);
    const cLng = booking.customer_location?.longitude || (gpsCoordinates ? gpsCoordinates.longitude + 0.010 : 77.3750);
    const pLat = gpsCoordinates?.latitude || (cLat - 0.008);
    const pLng = gpsCoordinates?.longitude || (cLng - 0.010);

    setDevSimulatingBookingId(booking.id);

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${pLng},${pLat};${cLng},${cLat}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();
      let coords: [number, number][] = [];
      if (data.routes && data.routes.length > 0) {
        coords = data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
      } else {
        coords = [[pLat, pLng], [cLat, cLng]];
      }

      let step = 0;
      devSimIntervalRef.current = setInterval(async () => {
        step++;
        if (step >= coords.length) {
          clearInterval(devSimIntervalRef.current);
          setDevSimulatingBookingId(null);
          return;
        }
        const pt = coords[step];
        const prevPt = coords[step - 1];
        if (!pt || !prevPt) return;

        const dLon = ((pt[1] - prevPt[1]) * Math.PI) / 180;
        const y = Math.sin(dLon) * Math.cos((pt[0] * Math.PI) / 180);
        const x =
          Math.cos((prevPt[0] * Math.PI) / 180) * Math.sin((pt[0] * Math.PI) / 180) -
          Math.sin((prevPt[0] * Math.PI) / 180) * Math.cos((pt[0] * Math.PI) / 180) * Math.cos(dLon);
        const heading = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

        await sendLocation(booking.id, {
          latitude: pt[0],
          longitude: pt[1],
          heading,
          speed: 8.5,
          accuracy: 4.0,
        } as any, true);
      }, 1200);
    } catch (err) {
      console.warn('DEV Route simulation error:', err);
      setDevSimulatingBookingId(null);
    }
  };

  const handleSetManualLocation = async (lat: number, lng: number, _name?: string) => {
    const coords: GpsCoordinates = {
      latitude: lat,
      longitude: lng,
      accuracy: 5.0,
      heading: 0,
      speed: 0,
      timestamp: Date.now(),
    };
    setGpsCoordinates(coords);
    setLocationPermission('granted');
    setLocationDiagnostic(null);
    setLastGpsSync(new Date().toLocaleTimeString());
    setIsBroadcastingGps(true);
    setShowManualLocationModal(false);

    const targetBookingId = activeBooking ? activeBooking.id : null;
    await sendLocation(targetBookingId, coords as any, true);
  };

  const sendLocation = async (bookingId?: string | null, coords: any = {}, force = false) => {
    const now = Date.now();
    const last = lastLocationSentRef.current;
    if (!force && last) {
      const timeDiff = (now - last.time) / 1000;
      const distKm = Math.sqrt(
        Math.pow((coords.latitude - last.lat) * 111, 2) +
        Math.pow((coords.longitude - last.lng) * 111 * Math.cos((coords.latitude * Math.PI) / 180), 2)
      );
      // Skip if less than 3 meters and less than 4 seconds
      if (distKm < 0.003 && timeDiff < 4) {
        return;
      }
    }

    try {
      await apiClient.post('/providers/me/location', {
        booking_id: bookingId || null,
        latitude: coords.latitude,
        longitude: coords.longitude,
        heading: coords.heading || null,
        speed: coords.speed || null,
        accuracy: coords.accuracy || null,
        is_active: true,
        timestamp: new Date().toISOString(),
      });
      lastLocationSentRef.current = { lat: coords.latitude, lng: coords.longitude, time: now };
      setGpsCoordinates({
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        heading: coords.heading || undefined,
        speed: coords.speed || undefined,
      });
      setLocationPermission('granted');
      setLocationDiagnostic(null);
      setLastGpsSync(new Date().toLocaleTimeString());
      setIsBroadcastingGps(true);
    } catch (err: any) {
      console.warn('GPS location post error:', err);
      // If booking is no longer active or invalid, retry with null booking_id to update standby location
      if (err?.response?.status === 400 && bookingId) {
        try {
          await apiClient.post('/providers/me/location', {
            booking_id: null,
            latitude: coords.latitude,
            longitude: coords.longitude,
            heading: coords.heading || null,
            speed: coords.speed || null,
            accuracy: coords.accuracy || null,
            is_active: true,
            timestamp: new Date().toISOString(),
          });
          lastLocationSentRef.current = { lat: coords.latitude, lng: coords.longitude, time: now };
        } catch {
          stopGpsTracking();
        }
      }
    }
  };

  // Trigger GPS read from browser (non-blocking, never halts booking pipeline)
  const triggerCurrentGps = (bookingId?: string | null, force = true) => {
    try {
      const isSecure = checkIsSecureContext();
      if (!isSecure) {
        setLocationPermission('insecure');
        setLocationDiagnostic(
          'Location API restricted on unencrypted HTTP (http://172.20.10.2:5175). Modern browsers enforce W3C rules requiring HTTPS or localhost for GPS.'
        );
        return;
      }

      if (!checkGeolocationSupported()) {
        setLocationPermission('unsupported');
        setLocationDiagnostic('Geolocation is not supported by your browser environment.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            heading: pos.coords.heading || undefined,
            speed: pos.coords.speed || undefined,
          };
          setGpsCoordinates(coords);
          setLocationPermission('granted');
          setLocationDiagnostic(null);
          setLastGpsSync(new Date().toLocaleTimeString());

          const targetBookingId = bookingId !== undefined ? bookingId : (activeBooking?.id || null);
          sendLocation(targetBookingId, coords as any, force).catch(() => {});
        },
        (err) => {
          const mapped = mapGeolocationError(err, checkIsSecureContext());
          setLocationPermission(mapped.state);
          setLocationDiagnostic(mapped.diagnostic);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } catch (e: any) {
      console.warn('GPS trigger error ignored:', e);
      setLocationDiagnostic(e?.message || 'Error triggering GPS.');
    }
  };

  // Continuous GPS tracking lifecycle across standby and active booking modes
  useEffect(() => {
    if (!isGpsTrackingEnabled) {
      stopGpsTracking();
      return;
    }

    const isSecure = checkIsSecureContext();
    if (!isSecure) {
      setLocationPermission('insecure');
      setLocationDiagnostic(
        'Accessing over unencrypted LAN IP (http://172.20.10.2:5175). Modern browsers enforce W3C rules requiring HTTPS or localhost for GPS.'
      );
      return;
    }

    if (!checkGeolocationSupported()) {
      setLocationPermission('unsupported');
      setLocationDiagnostic('Geolocation is not supported by your browser environment.');
      return;
    }

    // Query permission state where supported (avoids unnecessary error callbacks if blocked)
    queryGeolocationPermission().then((status) => {
      if (status === 'denied') {
        setLocationPermission('denied');
        setLocationDiagnostic('Location access was denied in browser settings.');
        return;
      }
      // Immediate initial sync
      triggerCurrentGps(activeBooking?.id || null, true);
    });

    // Watch position as device moves (continuous tracking)
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          heading: pos.coords.heading || undefined,
          speed: pos.coords.speed || undefined,
        };
        setGpsCoordinates(coords);
        setLocationPermission('granted');
        setLocationDiagnostic(null);
        setLastGpsSync(new Date().toLocaleTimeString());
        setIsBroadcastingGps(true);
        sendLocation(activeBooking?.id || null, coords as any);
      },
      (err) => {
        const mapped = mapGeolocationError(err, checkIsSecureContext());
        setLocationPermission(mapped.state);
        setLocationDiagnostic(mapped.diagnostic);
        setIsBroadcastingGps(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 3000 }
    );
    gpsWatchIdRef.current = watchId;

    // Regular interval sync every 6 seconds
    const interval = setInterval(() => {
      triggerCurrentGps(activeBooking?.id || null, false);
    }, 6000);
    gpsIntervalRef.current = interval;

    const handleLogoutEvent = () => stopGpsTracking();
    window.addEventListener('smartserve_provider_logout', handleLogoutEvent);

    return () => {
      window.removeEventListener('smartserve_provider_logout', handleLogoutEvent);
      stopGpsTracking();
    };
  }, [isGpsTrackingEnabled, activeBooking?.id, activeBooking?.status]);

  useEffect(() => {
    fetchAll();

    let providerId = '';
    try {
      const rawUser = localStorage.getItem('smartserve_provider_user');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        providerId = parsed.user_id || '';
      }
    } catch (e) {}

    const channels: string[] = [];
    if (providerId) {
      channels.push(`provider_${providerId}`, `user_${providerId}`);
    }

    const handleCustomBookingReceived = () => {
      fetchAll();
    };
    window.addEventListener('smartserve:booking_received', handleCustomBookingReceived);

    // Real-Time WebSocket Subscription (No Polling Required)
    const unsubscribeWs = subscribeToRealtime(channels, (payload) => {
      const type = payload.type || payload.event_type || payload.event;
      if (
        type === 'BOOKING_CREATED' ||
        type === 'BOOKING_ASSIGNED' ||
        type === 'BOOKING_ACCEPTED' ||
        type === 'BOOKING_REJECTED' ||
        type === 'BOOKING_STATUS_UPDATED' ||
        type === 'BOOKING_STARTED' ||
        type === 'BOOKING_COMPLETED' ||
        type === 'booking.created' ||
        type === 'booking.assigned' ||
        type === 'booking.accepted' ||
        type === 'booking.rejected' ||
        type === 'booking.updated' ||
        type === 'booking.started' ||
        type === 'booking.completed'
      ) {
        const targetId = String(payload.booking_id || payload.booking?.id || '');
        const newStatus = payload.status || payload.booking?.status;

        // On newly created booking: play chime, show alert banner, prepend to state
        if (type === 'BOOKING_CREATED' || type === 'booking.created') {
          playNotificationChime();
          const bData = payload.booking || payload.data;
          if (bData) {
            const newB = {
              id: bData.booking_id || bData.id || targetId,
              booking_reference: bData.booking_reference || `BK-${String(targetId).slice(0, 8).toUpperCase()}`,
              customer_name: bData.customer_name || 'Customer',
              customer_phone: bData.customer_phone || '',
              service_name: bData.service_name || 'Home Service',
              category: bData.category || 'General',
              status: 'Requested',
              scheduled_date: bData.scheduled_date,
              scheduled_time: bData.scheduled_time,
              address: bData.address || '',
              total_price: bData.total_price || 0,
              created_at: bData.created_at || new Date().toISOString(),
            };
            setBookings((prev) => {
              const exists = prev.some((b) => String(b.id) === String(newB.id));
              if (exists) return prev;
              return [newB, ...prev];
            });
            setNewBookingAlert(newB);
            setActiveTab('all');
          }
        } else if (targetId && newStatus) {
          setBookings((prev) =>
            prev.map((b) => (String(b.id) === targetId ? { ...b, status: newStatus } : b))
          );
        }
        fetchAll();
      }
    });

    return () => {
      unsubscribeWs();
      window.removeEventListener('smartserve:booking_received', handleCustomBookingReceived);
    };
  }, []);

  const handleBookingAction = async (
    bookingId: string,
    action: 'accept' | 'reject' | 'start' | 'complete' | 'on_the_way' | 'arrived',
    customReason?: string,
    otpCode?: string
  ) => {
    setActionLoading(bookingId);
    setActionError(null);
    try {
      if (action === 'accept') {
        await apiClient.post(`/providers/me/bookings/${bookingId}/accept`);
        try { triggerCurrentGps(bookingId, true); } catch (e) {}
      } else if (action === 'reject') {
        const reasonToSend = (customReason || rejectionReason || 'Schedule conflict with another job').trim();
        await apiClient.post(`/providers/me/bookings/${bookingId}/reject`, {
          reason: reasonToSend,
        });
        setRejectingBooking(null);
      } else if (action === 'on_the_way') {
        await apiClient.patch(`/providers/me/bookings/${bookingId}/status`, {
          status: 'On The Way',
        });
        try { triggerCurrentGps(bookingId, true); } catch (e) {}
      } else if (action === 'arrived') {
        await apiClient.patch(`/providers/me/bookings/${bookingId}/status`, {
          status: 'Arrived',
        });
        try { triggerCurrentGps(bookingId, true); } catch (e) {}
      } else if (action === 'start') {
        try {
          await apiClient.post(`/providers/me/bookings/${bookingId}/start`, {
            otp_code: otpCode ? otpCode.trim() : undefined,
          });
          try { triggerCurrentGps(bookingId, true); } catch (e) {}
          setStartingBooking(null);
          setStartOtp('');
          setStartOtpError(null);
        } catch (err: any) {
          const detail = err.response?.data?.detail || 'Invalid service start OTP verification code.';
          setStartOtpError(detail);
          throw err;
        }
      } else if (action === 'complete') {
        try {
          await apiClient.post(`/providers/me/bookings/${bookingId}/complete`, {
            otp_code: otpCode ? otpCode.trim() : undefined,
          });
          setIsBroadcastingGps(false);
          setCompletingBooking(null);
          setCompleteOtp('');
          setCompleteOtpError(null);
        } catch (err: any) {
          const detail = err.response?.data?.detail || 'Invalid service completion OTP verification code.';
          setCompleteOtpError(detail);
          throw err;
        }
      }
      await fetchAll();
    } catch (err: any) {
      setActionError(err.response?.data?.detail || `Failed to ${action} booking.`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReportCashCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cashCollectionBooking) return;
    setCollectionLoading(true);
    setCollectionError(null);
    try {
      const parsedAmount = parseFloat(collectedAmount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setCollectionError('Please enter a valid cash amount collected.');
        setCollectionLoading(false);
        return;
      }
      await apiClient.post(`/providers/me/bookings/${cashCollectionBooking.id}/cash-collected`, {
        reported_amount: parsedAmount,
        notes: collectionNotes.trim() || undefined,
      });
      setCollectionSuccess(`Cash collection of ₹${parsedAmount} reported successfully! Awaiting SmartServe Admin verification.`);
      setTimeout(() => {
        setCashCollectionBooking(null);
        setCollectionSuccess(null);
        setCollectedAmount('');
        setCollectionNotes('');
      }, 1500);
      await fetchAll();
    } catch (err: any) {
      setCollectionError(err.response?.data?.detail || 'Failed to report cash collection.');
    } finally {
      setCollectionLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#2F5233] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-[#1F2A1E]">Loading SmartServe Partner Workspace...</p>
      </div>
    );
  }

  const isVerified = trust?.is_verified;
  const partnerFirstName = trust?.full_name ? trust.full_name.split(' ')[0] : 'Partner';

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    const s = (b.status || '').toLowerCase().replace(/_/g, ' ').trim();
    if (activeTab === 'pending') return s === 'requested' || s === 'assigned';
    if (activeTab === 'active') return ['accepted', 'on the way', 'arrived', 'started'].includes(s);
    if (activeTab === 'completed') return s === 'completed';
    return true;
  });

  const metricCards = [
    {
      title: "Today's Bookings",
      value: stats ? stats.today_bookings_count : 0,
      subtext: 'Manage schedule',
      link: '/availability',
      icon: Calendar,
      iconBg: 'bg-[#F2EDE1] text-[#2F5233]',
    },
    {
      title: 'Active Jobs',
      value: stats ? stats.active_jobs_count : 0,
      subtext: 'View active pipeline',
      link: '/dashboard',
      icon: Zap,
      iconBg: 'bg-purple-50 text-purple-700',
    },
    {
      title: 'Completed Jobs',
      value: stats ? stats.completed_jobs_count : 0,
      subtext: 'View history & ratings',
      link: '/profile',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Gross Earnings',
      value: stats ? `₹${parseFloat(stats.total_earnings || '0').toLocaleString('en-IN')}` : '₹0',
      subtext: 'View earnings ledger',
      link: '/profile',
      icon: IndianRupee,
      iconBg: 'bg-[#F2EDE1] text-[#C9A15A]',
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* ══════════════════════════════════════════════════
          1. GREETING & HERO HEADER
          ════════════════════════════════════════════════*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif text-[#1F2A1E] tracking-tight capitalize">
              Good morning, {partnerFirstName}!
            </h1>
            <span className="text-2xl">👋</span>
          </div>
          <p className="text-sm sm:text-base text-[#1F2A1E]/65 font-medium mt-1">
            Here's your partner schedule, job assignments, and reliability performance today.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={fetchAll}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#F2EDE1] text-[#1F2A1E] font-semibold text-xs sm:text-sm rounded-xl border border-[#E5DEC9] shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-[#1F2A1E]/60" />
            <span>Sync Live Pipeline</span>
          </button>

          <button
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage My Services</span>
          </button>
        </div>
      </div>

            {/* New Booking Live Real-Time Banner */}
      {newBookingAlert && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-800 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-400/30 animate-pulse">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shrink-0">
              🔔
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200 bg-emerald-900/50 px-2 py-0.5 rounded-full">
                  New Order Received Just Now
                </span>
                <span className="text-xs font-mono font-bold text-white/90">
                  {newBookingAlert.booking_reference}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                {newBookingAlert.service_name} • {newBookingAlert.customer_name}
              </h4>
              <p className="text-xs text-emerald-100/80">
                {newBookingAlert.address || 'Service Location on File'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <button
              onClick={() => {
                setActiveTab('pending');
                setNewBookingAlert(null);
              }}
              className="px-4 py-2 bg-white text-emerald-900 text-xs font-bold rounded-xl shadow-xs hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              View in Requests →
            </button>
            <button
              onClick={() => setNewBookingAlert(null)}
              className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          2. VERIFICATION STATUS NOTIFICATION BANNER
          ════════════════════════════════════════════════*/}
      {!isVerified ? (
        <div className="p-5 rounded-3xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-amber-900 font-serif">Account Under Verification Review</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300">
                  Pending Review
                </span>
              </div>
              <p className="text-xs text-amber-800/80 mt-1 max-w-xl leading-relaxed">
                Your credentials are under manual review by the administrative verification team. You will receive booking notifications once approved.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/application-status')}
            className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            View Application Status →
          </button>
        </div>
      ) : (
        <div className="p-5 rounded-3xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-emerald-950 font-serif">Verified Partner Account</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Active & Booking-Eligible
                </span>
                {stats && stats.urgent_alerts_count > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                    <Bell className="w-3 h-3" />
                    {stats.urgent_alerts_count} Urgent Request
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-800/80 mt-1">
                Your portfolio, availability schedule, and pricing are published in the customer marketplace.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
              Auto-Dispatch: Enabled
            </span>
          </div>
        </div>
      )}

      {/* 2b. SMART LOCATION / GPS DIAGNOSTIC & PERMISSION BANNER */}
      {locationPermission !== 'granted' && (
        <div className="rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs">
          {/* CASE 1: Insecure Context (HTTP over LAN IP) */}
          {locationPermission === 'insecure' && (
            <div className="p-5 bg-amber-50/90 border border-amber-200 text-amber-950">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300/60 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                    <ShieldAlert className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                        Browser Security Policy (W3C)
                      </span>
                      <h4 className="text-sm font-bold text-amber-950">GPS Requires Secure Context (HTTPS or Localhost)</h4>
                    </div>
                    <p className="text-xs text-amber-800/90 mt-1 max-w-2xl leading-relaxed">
                      You are accessing the portal over an unencrypted local IP (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">http://172.20.10.2:5175</code>). Modern mobile & desktop browsers strictly block device GPS hardware over non-localhost HTTP origins. <strong>Location was not denied by you</strong>—the browser blocked it before showing a prompt.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap shrink-0 self-end lg:self-center">
                  {activeBooking && (
                    <button
                      type="button"
                      onClick={() => handleDevSimulateRoute(activeBooking)}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                        devSimulatingBookingId === activeBooking.id
                          ? 'bg-rose-600 hover:bg-rose-700 text-white'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      {devSimulatingBookingId === activeBooking.id ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Stop Simulation</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Simulate Live Route</span>
                        </>
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowManualLocationModal(true)}
                    className="px-3.5 py-2 bg-white hover:bg-amber-100/80 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>Pin Coordinates</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLocationInstructions((prev) => !prev)}
                    className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showLocationInstructions ? 'Hide Setup' : 'How to Enable GPS'}</span>
                    {showLocationInstructions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Expandable Setup Instructions */}
              {showLocationInstructions && (
                <div className="mt-4 pt-4 border-t border-amber-200/80 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white/70 rounded-2xl border border-amber-200">
                    <div className="font-bold text-amber-950 flex items-center gap-1.5 mb-1">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-mono text-[10px] flex items-center justify-center font-bold">1</span>
                      <span>Laptop Testing (Zero Setup)</span>
                    </div>
                    <p className="text-[11px] text-amber-900/80">
                      Open <code className="bg-amber-100 px-1 rounded font-mono font-bold">http://localhost:5175</code> on your laptop. Localhost is treated as a secure context, so your browser will immediately show the native location permission prompt!
                    </p>
                  </div>
                  <div className="p-3 bg-white/70 rounded-2xl border border-amber-200">
                    <div className="font-bold text-amber-950 flex items-center gap-1.5 mb-1">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-mono text-[10px] flex items-center justify-center font-bold">2</span>
                      <span>Instant Dispatch Simulation</span>
                    </div>
                    <p className="text-[11px] text-amber-900/80">
                      Click <strong>"Simulate Live Route"</strong> above. It drives real OSRM turn-by-turn waypoints to the customer destination and streams live GPS telemetry to the backend without needing device hardware.
                    </p>
                  </div>
                  <div className="p-3 bg-white/70 rounded-2xl border border-amber-200">
                    <div className="font-bold text-amber-950 flex items-center gap-1.5 mb-1">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-mono text-[10px] flex items-center justify-center font-bold">3</span>
                      <span>Mobile Testing via Flag / SSL</span>
                    </div>
                    <p className="text-[11px] text-amber-900/80">
                      On Chrome mobile: open <code className="bg-amber-100 px-1 rounded font-mono text-[10px]">chrome://flags/#unsafely-treat-insecure-origin-as-secure</code> and add <code className="font-mono text-[10px]">http://172.20.10.2:5175</code>. Or use the HTTPS reverse proxy port.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CASE 2: Truly Denied in Browser Site Settings (Secure Context) */}
          {locationPermission === 'denied' && (
            <div className="p-5 bg-rose-50 border border-rose-200 text-rose-950">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-700 shrink-0 mt-0.5">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 border border-rose-300">
                        Permission Blocked
                      </span>
                      <h4 className="text-sm font-bold text-rose-950">Location Permission Blocked in Browser Settings</h4>
                    </div>
                    <p className="text-xs text-rose-800 mt-1 max-w-2xl leading-relaxed">
                      Location access was previously denied for this site. Modern browsers will not pop up a new permission prompt automatically until you re-enable it in your address bar or site settings.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap shrink-0 self-end lg:self-center">
                  <button
                    type="button"
                    onClick={() => triggerCurrentGps(activeBooking?.id, true)}
                    className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry GPS Permission</span>
                  </button>
                  {activeBooking && (
                    <button
                      type="button"
                      onClick={() => handleDevSimulateRoute(activeBooking)}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Use Simulated Route</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowLocationInstructions((prev) => !prev)}
                    className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showLocationInstructions ? 'Hide Instructions' : 'How to Unblock'}</span>
                    {showLocationInstructions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Browser-specific Unblock Instructions */}
              {showLocationInstructions && (
                <div className="mt-4 pt-4 border-t border-rose-200 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white/80 rounded-2xl border border-rose-200">
                    <div className="font-bold text-rose-950 mb-1">Desktop Chrome / Edge / Brave / Firefox</div>
                    <ol className="list-decimal list-inside space-y-1 text-rose-900/90 text-[11px]">
                      <li>Click the <strong>lock 🔒 or tune icon</strong> at the far left of your address bar.</li>
                      <li>Toggle <strong>Location</strong> to <strong>"Allow"</strong>.</li>
                      <li>Click <strong>Retry GPS Permission</strong> or reload the page.</li>
                    </ol>
                  </div>
                  <div className="p-3 bg-white/80 rounded-2xl border border-rose-200">
                    <div className="font-bold text-rose-950 mb-1">iPhone (Safari) & Android (Chrome)</div>
                    <ol className="list-decimal list-inside space-y-1 text-rose-900/90 text-[11px]">
                      <li>On iOS Safari: Tap <strong>"aA"</strong> in address bar → <strong>Website Settings</strong> → <strong>Location</strong> → <strong>Allow</strong>.</li>
                      <li>On Android Chrome: Tap <strong>⋮</strong> → <strong>Settings</strong> → <strong>Site settings</strong> → <strong>Location</strong> → <strong>Allow</strong>.</li>
                      <li>Return to this page and tap <strong>Retry GPS Permission</strong>.</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CASE 3: Position Unavailable or Timeout */}
          {(locationPermission === 'unavailable' || locationPermission === 'timeout') && (
            <div className="p-5 bg-amber-50 border border-amber-200 text-amber-950 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-950">
                    {locationPermission === 'timeout' ? 'GPS Request Timed Out' : 'Device GPS Signal Unavailable'}
                  </h4>
                  <p className="text-xs text-amber-800 mt-1 max-w-2xl leading-relaxed">
                    {locationDiagnostic || 'Unable to retrieve satellite GPS fix. Please ensure location services are turned on in your device settings.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                <button
                  type="button"
                  onClick={() => triggerCurrentGps(activeBooking?.id, true)}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Fix</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowManualLocationModal(true)}
                  className="px-3.5 py-2 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Pin Coordinates</span>
                </button>
              </div>
            </div>
          )}

          {/* CASE 4: Unsupported Environment */}
          {locationPermission === 'unsupported' && (
            <div className="p-5 bg-gray-50 border border-gray-200 text-gray-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-700 shrink-0 mt-0.5">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Geolocation Not Supported</h4>
                  <p className="text-xs text-gray-600 mt-1 max-w-2xl leading-relaxed">
                    This browser environment does not support the W3C Geolocation API. Use the route simulator or coordinate pinning to broadcast provider location.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                <button
                  type="button"
                  onClick={() => setShowManualLocationModal(true)}
                  className="px-4 py-2 bg-[#2F5233] hover:bg-[#1F2A1E] text-white font-bold text-xs rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Pin Coordinates</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2c. ACTIVE DISPATCH & REAL LIVE GPS TELEMETRY CARD */}
      {activeBooking && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#1F2A1E] via-[#2F5233] to-[#1F2A1E] text-white border border-[#3D6B42] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Radio className="w-6 h-6 animate-pulse text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-emerald-300 bg-white/10 px-2 py-0.5 rounded-lg border border-white/20">
                  {activeBooking.booking_reference}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  {activeBooking.status}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                  <span className={`w-2 h-2 rounded-full ${isBroadcastingGps ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
                  <span>{isBroadcastingGps ? 'Broadcasting Real GPS Live' : 'Connecting GPS Stream...'}</span>
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white mt-1">
                {activeBooking.service_name} • {activeBooking.customer_name}
              </h3>
              <p className="text-xs text-white/70 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                <span>{activeBooking.address || 'Customer destination on file'}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {gpsCoordinates ? (
              <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/15 text-left sm:text-right font-mono text-[11px]">
                <span className="text-white/60 block text-[9px] uppercase font-sans font-bold">Device GPS Coordinates</span>
                <span className="text-emerald-300 font-bold">
                  {gpsCoordinates.latitude.toFixed(4)}, {gpsCoordinates.longitude.toFixed(4)}
                </span>
                {lastGpsSync && <span className="text-white/50 block text-[9px] font-sans">Synced {lastGpsSync}</span>}
              </div>
            ) : (
              <div className="text-xs text-emerald-200/80 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/15">
                Acquiring GPS fix...
              </div>
            )}
            {(() => {
              const s = (activeBooking.status || '').toLowerCase().replace(/_/g, ' ').trim();
              if (s === 'accepted') {
                return (
                  <button
                    onClick={() => handleBookingAction(activeBooking.id, 'on_the_way')}
                    disabled={actionLoading === activeBooking.id}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 disabled:opacity-50"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{actionLoading === activeBooking.id ? 'Updating...' : 'Start Trip (On The Way)'}</span>
                  </button>
                );
              }
              if (s === 'on the way') {
                return (
                  <button
                    onClick={() => handleBookingAction(activeBooking.id, 'arrived')}
                    disabled={actionLoading === activeBooking.id}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 disabled:opacity-50"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{actionLoading === activeBooking.id ? 'Updating...' : 'Mark Arrived'}</span>
                  </button>
                );
              }
              if (s === 'arrived') {
                return (
                  <button
                    onClick={() => {
                      setStartingBooking(activeBooking);
                      setStartOtp('');
                      setStartOtpError(null);
                    }}
                    disabled={actionLoading === activeBooking.id}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 disabled:opacity-50"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Service (Enter OTP)</span>
                  </button>
                );
              }
              if (s === 'started') {
                return (
                  <button
                    onClick={() => handleBookingAction(activeBooking.id, 'complete')}
                    disabled={actionLoading === activeBooking.id}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{actionLoading === activeBooking.id ? 'Completing...' : 'Complete Service'}</span>
                  </button>
                );
              }
              return null;
            })()}
            <button
              type="button"
              onClick={() => handleDevSimulateRoute(activeBooking)}
              className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer ${
                devSimulatingBookingId === activeBooking.id
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
              }`}
            >
              {devSimulatingBookingId === activeBooking.id ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current text-white" />
                  <span>Stop Route</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-emerald-300" />
                  <span>Simulate Route</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowManualLocationModal(true)}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <span>Pin Location</span>
            </button>
            <button
              type="button"
              onClick={() => triggerCurrentGps(activeBooking.id, true)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Ping GPS Now</span>
            </button>
          </div>
        </div>
      )}

      {/* 2d. STANDBY LIVE GPS TELEMETRY & DUTY DISPATCH STATUS */}
      {!activeBooking && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isBroadcastingGps ? 'bg-emerald-50 border border-emerald-200 text-emerald-600' : 'bg-[#F2EDE1] text-[#1F2A1E]/50'
            }`}>
              <Compass className={`w-5 h-5 ${isBroadcastingGps ? 'animate-spin-slow' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#1F2A1E]">Live Provider GPS (Standby Mode)</span>
                <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isBroadcastingGps
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isBroadcastingGps ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  {isBroadcastingGps ? 'Broadcasting Live Coordinates' : 'Standby / Connecting...'}
                </span>
                {gpsCoordinates?.accuracy && (
                  <span className="text-[10px] text-[#1F2A1E]/60 bg-[#F2EDE1] px-2 py-0.5 rounded-full">
                    Accuracy: ±{Math.round(gpsCoordinates.accuracy)}m
                  </span>
                )}
              </div>
              <p className="text-xs text-[#1F2A1E]/60 mt-0.5">
                Auto-dispatch uses your live coordinates to match nearby customers within your service radius.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            {gpsCoordinates ? (
              <div className="font-mono text-xs text-right">
                <span className="text-[10px] text-[#1F2A1E]/50 font-sans block uppercase font-bold">Current Coordinates</span>
                <span className="font-bold text-[#2F5233]">
                  {gpsCoordinates.latitude.toFixed(4)}, {gpsCoordinates.longitude.toFixed(4)}
                </span>
                {lastGpsSync && <span className="text-[10px] text-[#1F2A1E]/40 font-sans block">Synced {lastGpsSync}</span>}
              </div>
            ) : (
              <span className="text-xs text-[#1F2A1E]/50">No coordinates acquired yet</span>
            )}
            <button
              type="button"
              onClick={() => setIsGpsTrackingEnabled((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-2 font-bold text-xs rounded-xl border transition-all cursor-pointer ${
                isGpsTrackingEnabled
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isGpsTrackingEnabled ? 'text-emerald-600 animate-pulse' : 'text-gray-400'}`} />
              <span>{isGpsTrackingEnabled ? 'Live GPS: ON' : 'Live GPS: OFF'}</span>
            </button>
            <button
              type="button"
              onClick={() => triggerCurrentGps(null, true)}
              disabled={!isGpsTrackingEnabled}
              className="flex items-center gap-1 px-3 py-2 bg-[#2F5233] hover:bg-[#1F2A1E] text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C9A15A]" />
              <span>Ping GPS</span>
            </button>
            <button
              type="button"
              onClick={() => setShowManualLocationModal(true)}
              className="px-3 py-2 bg-white hover:bg-[#F2EDE1] text-[#1F2A1E] font-bold text-xs rounded-xl border border-[#E5DEC9] transition-all cursor-pointer"
            >
              Pin Manually
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          3. METRIC CARDS
          ════════════════════════════════════════════════*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => navigate(card.link)}
              className="group bg-white p-5 sm:p-6 rounded-3xl border border-[#E5DEC9] shadow-xs hover:shadow-md hover:border-[#2F5233]/40 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F2A1E]/50 block mb-1">
                    {card.title}
                  </span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#1F2A1E] tracking-tight font-serif">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-2xl ${card.iconBg} flex-shrink-0 border border-[#E5DEC9]/40`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5DEC9]/60 flex items-center justify-between text-xs font-bold text-[#2F5233] group-hover:translate-x-0.5 transition-transform">
                <span>{card.subtext}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════
          4. PARTNER EXCELLENCE & INCENTIVES BANNER
          ════════════════════════════════════════════════*/}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1F2A1E] via-[#243523] to-[#2F5233] text-white p-6 sm:p-8 lg:p-10 shadow-sm border border-[#1F2A1E]">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A15A]/20 text-[#C9A15A] border border-[#C9A15A]/30 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Partner Excellence Program
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif tracking-tight leading-tight">
            Tier 1 Elite Matching Guarantee
          </h3>
          <p className="text-sm text-white/80 font-medium leading-relaxed">
            Maintain a 98%+ reliability score and under-15-minute response time to receive automated top-rank job routing and 0% cancellation penalty buffers.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="px-5 py-2.5 bg-[#C9A15A] hover:bg-[#b58f4a] text-[#1F2A1E] font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              View Trust Score Breakdown
            </button>
            <span className="text-xs text-white/60">Updated hourly from verified customer ratings</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          5. MAIN WORKSPACE: BOOKINGS + SIDEBAR
          ════════════════════════════════════════════════*/}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Bookings Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xs overflow-hidden">
            {/* Header with Title & Action */}
            <div className="p-6 border-b border-[#E5DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#1F2A1E] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#2F5233]" />
                  <span>Assigned Job Pipeline</span>
                </h3>
                <p className="text-xs text-[#1F2A1E]/60 mt-0.5">
                  Accept incoming requests, verify completion OTP codes, and monitor job progress.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1 bg-[#FAF7F0] p-1 rounded-2xl border border-[#E5DEC9]">
                {(['all', 'pending', 'active', 'completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-[#2F5233] text-white shadow-xs'
                        : 'text-[#1F2A1E]/60 hover:text-[#1F2A1E]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Notification */}
            {actionError && (
              <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{actionError}</span>
              </div>
            )}

            {/* Bookings List */}
            <div className="p-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 rounded-2xl bg-[#FAF7F0] border border-dashed border-[#E5DEC9] space-y-2">
                  <Calendar className="w-8 h-8 text-[#1F2A1E]/30 mx-auto" />
                  <p className="text-sm font-bold text-[#1F2A1E]">No bookings in this filter</p>
                  <p className="text-xs text-[#1F2A1E]/50 max-w-sm mx-auto">
                    New customer bookings matched to your category and schedule will automatically appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        booking.emergency_flag === 'EMERGENCY'
                          ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                          : 'bg-[#FAF7F0] border-[#E5DEC9] hover:border-[#2F5233]/40'
                      }`}
                    >
                      {/* Booking Top Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#2F5233] bg-white px-2.5 py-1 rounded-lg border border-[#E5DEC9]">
                            {booking.booking_reference}
                          </span>
                          <span
                            className={`text-[11px] font-bold px-3 py-0.5 rounded-full border ${
                              STATUS_STYLES[booking.status] || 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {booking.status}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              (booking.payment_status || '').toLowerCase() === 'paid'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : (booking.payment_status || '').toLowerCase() === 'collection reported'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : (booking.payment_status || '').toLowerCase() === 'rejected'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-slate-50 text-slate-600 border-slate-200'
                            }`}
                          >
                            COD: {booking.payment_status || 'Pending'}
                          </span>
                          {booking.emergency_flag === 'EMERGENCY' && (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                              <Zap className="w-3 h-3 text-rose-600" />
                              Emergency Dispatch
                            </span>
                          )}
                          {(booking.customer_notes?.includes('CB-') || booking.customer_notes?.includes('Bundle')) && (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-1">
                              <span>✨</span> Multi-Service Bundle
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-extrabold text-[#1F2A1E] font-serif">
                          ₹{parseFloat(booking.total_price || 0).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Booking Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                        <div>
                          <span className="text-[#1F2A1E]/50 block font-medium">Service</span>
                          <span className="font-bold text-[#1F2A1E] block truncate">{booking.service_name}</span>
                        </div>
                        <div>
                          <span className="text-[#1F2A1E]/50 block font-medium">Customer</span>
                          <span className="font-bold text-[#1F2A1E] block truncate">{booking.customer_name}</span>
                        </div>
                        <div>
                          <span className="text-[#1F2A1E]/50 block font-medium">Scheduled Time</span>
                          <span className="font-semibold text-[#1F2A1E]">
                            {booking.scheduled_time
                              ? new Date(booking.scheduled_time).toLocaleString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : 'TBD'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#1F2A1E]/50 block font-medium">Location</span>
                          <span className="font-semibold text-[#1F2A1E] truncate block">
                            {booking.address || 'Address on file'}
                          </span>
                        </div>
                      </div>

                      {/* Customer Notes / Access Instructions */}
                      {booking.customer_notes && (
                        <div className="mb-4 p-3 bg-amber-50/80 border border-amber-200/90 rounded-2xl text-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-amber-900">
                            <FileText className="w-3.5 h-3.5 text-amber-700" />
                            <span>{t('dashboard.customer_notes_title', { defaultValue: 'Customer Notes / Access Instructions' })}</span>
                          </div>
                          <p className="text-amber-800 whitespace-pre-wrap leading-relaxed">{booking.customer_notes}</p>
                        </div>
                      )}

                      {/* Job Verification Photos Section */}
                      <div className="mb-4 p-3.5 bg-white border border-[#E5DEC9] rounded-2xl space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-[#1F2A1E]">
                            <Camera className="w-3.5 h-3.5 text-[#2F5233]" />
                            <span>{t('dashboard.photos_title', { defaultValue: 'Job Verification Photos (Before & After)' })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F2EDE1] hover:bg-[#E5DEC9] text-[#2F5233] text-[11px] font-bold rounded-lg cursor-pointer transition-colors border border-[#E5DEC9]">
                              <Upload className="w-3 h-3" />
                              <span>+ {t('dashboard.upload_before', { defaultValue: 'Before Photo' })}</span>
                              <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                disabled={photoUploadingBookingId === booking.id}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePhotoUpload(booking.id, 'before', file);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                            <label className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#2F5233] hover:bg-[#3D6B42] text-white text-[11px] font-bold rounded-lg cursor-pointer transition-colors shadow-2xs">
                              <Upload className="w-3 h-3" />
                              <span>+ {t('dashboard.upload_after', { defaultValue: 'After Photo' })}</span>
                              <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                disabled={photoUploadingBookingId === booking.id}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePhotoUpload(booking.id, 'after', file);
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        {photoUploadingBookingId === booking.id && (
                          <div className="flex items-center gap-2 text-xs text-[#2F5233] font-semibold">
                            <span className="w-3 h-3 border-2 border-[#2F5233] border-t-transparent rounded-full animate-spin" />
                            <span>Uploading verification proof photo...</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {/* Before Photos Gallery */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              {t('dashboard.before_photos', { defaultValue: 'Before Service' })} ({booking.before_photos?.length || 0})
                            </span>
                            {booking.before_photos && booking.before_photos.length > 0 ? (
                              <div className="flex items-center gap-2 flex-wrap">
                                {booking.before_photos.map((url: string, idx: number) => {
                                  const fullUrl = resolvePhotoUrl(url);
                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => setPreviewPhotoUrl(fullUrl)}
                                      className="relative w-12 h-12 rounded-xl overflow-hidden border border-amber-200 group cursor-pointer shadow-2xs hover:scale-105 transition-transform"
                                    >
                                      <img
                                        src={fullUrl}
                                        alt={`Before ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.currentTarget.onerror = null;
                                          e.currentTarget.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80';
                                        }}
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                                        <Eye className="w-3.5 h-3.5" />
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-[10px] text-slate-400 italic">No before photos added</p>
                            )}
                          </div>

                          {/* After Photos Gallery */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {t('dashboard.after_photos', { defaultValue: 'After Service' })} ({booking.after_photos?.length || 0})
                            </span>
                            {booking.after_photos && booking.after_photos.length > 0 ? (
                              <div className="flex items-center gap-2 flex-wrap">
                                {booking.after_photos.map((url: string, idx: number) => {
                                  const fullUrl = resolvePhotoUrl(url);
                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => setPreviewPhotoUrl(fullUrl)}
                                      className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-200 group cursor-pointer shadow-2xs hover:scale-105 transition-transform"
                                    >
                                      <img
                                        src={fullUrl}
                                        alt={`After ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.currentTarget.onerror = null;
                                          e.currentTarget.src = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80';
                                        }}
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                                        <Eye className="w-3.5 h-3.5" />
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-[10px] text-slate-400 italic">No after photos added</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-wrap pt-2 border-t border-[#E5DEC9]/60">
                        {(() => {
                          const s = (booking.status || '').toLowerCase().replace(/_/g, ' ').trim();
                          if (s === 'requested' || s === 'assigned') {
                            return (
                              <>
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'accept')}
                                  disabled={actionLoading === booking.id}
                                  className="flex items-center gap-1.5 px-4 py-2 bg-[#2F5233] text-white text-xs font-bold rounded-xl hover:bg-[#3D6B42] transition-colors disabled:opacity-50"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{actionLoading === booking.id ? 'Accepting...' : 'Accept Job'}</span>
                                </button>
                                <button
                                  onClick={() => setRejectingBooking(booking)}
                                  disabled={actionLoading === booking.id}
                                  className="px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl hover:bg-rose-100 transition-colors disabled:opacity-50"
                                >
                                  Decline
                                </button>
                              </>
                            );
                          }
                          if (s === 'accepted') {
                            return (
                              <button
                                onClick={() => handleBookingAction(booking.id, 'on_the_way')}
                                disabled={actionLoading === booking.id}
                                className="flex items-center gap-1.5 px-4 py-2 bg-sky-700 text-white text-xs font-bold rounded-xl hover:bg-sky-800 transition-colors disabled:opacity-50"
                              >
                                <Navigation className="w-3.5 h-3.5" />
                                <span>{actionLoading === booking.id ? 'Updating...' : 'Start Trip (On The Way)'}</span>
                              </button>
                            );
                          }
                          if (s === 'on the way') {
                            return (
                              <div className="flex items-center gap-2 flex-wrap">
                                {import.meta.env.DEV && (
                                  <button
                                    onClick={() => handleDevSimulateRoute(booking)}
                                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                                      devSimulatingBookingId === booking.id
                                        ? 'bg-amber-600 text-white border-amber-700 animate-pulse'
                                        : 'bg-slate-900 text-amber-300 border-amber-500/40 hover:bg-slate-800'
                                    }`}
                                  >
                                    <Navigation className="w-3.5 h-3.5" />
                                    <span>{devSimulatingBookingId === booking.id ? 'Pause DEV Sim' : 'DEV Sim Trip'}</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'arrived')}
                                  disabled={actionLoading === booking.id}
                                  className="flex items-center gap-1.5 px-4 py-2 bg-teal-700 text-white text-xs font-bold rounded-xl hover:bg-teal-800 transition-colors disabled:opacity-50"
                                >
                                  <MapPin className="w-3.5 h-3.5" />
                                  <span>{actionLoading === booking.id ? 'Updating...' : 'Mark Arrived'}</span>
                                </button>
                              </div>
                            );
                          }
                          if (s === 'arrived') {
                            return (
                              <button
                                onClick={() => {
                                  setStartingBooking(booking);
                                  setStartOtp('');
                                  setStartOtpError(null);
                                }}
                                disabled={actionLoading === booking.id}
                                className="flex items-center gap-1.5 px-4 py-2 bg-purple-700 text-white text-xs font-bold rounded-xl hover:bg-purple-800 transition-colors disabled:opacity-50"
                              >
                                <Play className="w-3.5 h-3.5" />
                                <span>Start Service (Enter OTP)</span>
                              </button>
                            );
                          }
                          if (s === 'started') {
                            return (
                              <div className="flex items-center gap-2 flex-wrap">
                                <button
                                  onClick={() => {
                                    setCompletingBooking(booking);
                                    setCompleteOtp('');
                                    setCompleteOtpError(null);
                                  }}
                                  disabled={actionLoading === booking.id}
                                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Complete Service (Enter OTP)</span>
                                </button>
                                {booking.payment_status !== 'Paid' && booking.payment_status !== 'Collection Reported' ? (
                                  <button
                                    onClick={() => {
                                      setCashCollectionBooking(booking);
                                      setCollectedAmount(String(booking.total_price || ''));
                                      setCollectionNotes('');
                                      setCollectionError(null);
                                      setCollectionSuccess(null);
                                    }}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-[#2F5233] text-white text-xs font-bold rounded-xl hover:bg-[#3D6B42] transition-colors shadow-xs"
                                  >
                                    <Banknote className="w-3.5 h-3.5" />
                                    <span>Mark Cash Collected (₹{booking.total_price || 0})</span>
                                  </button>
                                ) : booking.payment_status === 'Collection Reported' ? (
                                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-300 text-amber-800 rounded-xl text-xs font-semibold">
                                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Collection Reported • Awaiting Verification</span>
                                  </div>
                                ) : booking.payment_status === 'Paid' ? (
                                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Payment Verified & Settled</span>
                                  </div>
                                ) : null}
                              </div>
                            );
                          }
                          if (s === 'completed') {
                            return (
                              <div className="flex items-center gap-2 flex-wrap">
                                {booking.payment_status !== 'Paid' && booking.payment_status !== 'Collection Reported' ? (
                                  <button
                                    onClick={() => {
                                      setCashCollectionBooking(booking);
                                      setCollectedAmount(String(booking.total_price || ''));
                                      setCollectionNotes('');
                                      setCollectionError(null);
                                      setCollectionSuccess(null);
                                    }}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-[#2F5233] text-white text-xs font-bold rounded-xl hover:bg-[#3D6B42] transition-colors shadow-xs"
                                  >
                                    <Banknote className="w-3.5 h-3.5" />
                                    <span>Mark Cash Collected (₹{booking.total_price || 0})</span>
                                  </button>
                                ) : booking.payment_status === 'Collection Reported' ? (
                                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-300 text-amber-800 rounded-xl text-xs font-semibold">
                                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Cash Collection Reported • Awaiting Admin Verification</span>
                                  </div>
                                ) : booking.payment_status === 'Paid' ? (
                                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Payment Verified & Settled</span>
                                  </div>
                                ) : null}
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right 1 Column: Profile & Trust Card */}
        <div className="space-y-6">
          {trust && (
            <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xs p-6 relative">
              {trust.is_verified && (
                <div className="absolute top-4 right-4 bg-[#2F5233] text-white px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-2xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              )}

              {/* Avatar & Bio */}
              <div className="flex flex-col items-center text-center mb-6 pt-2">
                <div className="w-20 h-20 rounded-2xl border border-[#E5DEC9] shadow-xs overflow-hidden mb-3 bg-[#FAF7F0] flex items-center justify-center text-2xl font-serif font-bold text-[#2F5233]">
                  {trust.photo_url ? (
                    <img src={trust.photo_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{trust.full_name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="font-bold text-[#1F2A1E] text-base font-serif">{trust.full_name}</h3>
                <p className="text-xs text-[#7A9E6E] font-semibold mt-0.5">
                  {trust.category?.replace(/^\d+\.\s*/, '') || 'Service Partner'}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-[#1F2A1E]/60">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A15A]" />
                  <span>{trust.service_area || 'Bengaluru, India'}</span>
                </div>
              </div>

              {/* Trust Metrics */}
              <div className="space-y-2 text-xs border-t border-[#E5DEC9] pt-4">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/70 flex items-center gap-1.5 font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Reliability Score</span>
                  </span>
                  <span className="font-bold text-emerald-700">{trust.reliability_score}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/70 font-medium">Acceptance Rate</span>
                  <span className="font-bold text-[#1F2A1E]">{trust.acceptance_rate}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/70 font-medium">On-Time Arrival</span>
                  <span className="font-bold text-[#1F2A1E]">{trust.on_time_rate}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/70 font-medium">Cancellation Rate</span>
                  <span className="font-bold text-slate-500">{trust.cancellation_rate}%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-[#1F2A1E]/70 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Completed Jobs</span>
                  </span>
                  <span className="font-bold text-[#1F2A1E]">{trust.completed_jobs_count}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#1F2A1E]/70 flex items-center gap-1.5 font-medium">
                    <FileCheck className="w-3.5 h-3.5 text-[#2F5233]" />
                    <span>Verified Documents</span>
                  </span>
                  <span className="font-bold text-[#2F5233]">{trust.certificates_count} on file</span>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-5 pt-3 border-t border-[#E5DEC9]">
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full py-2.5 rounded-xl bg-[#FAF7F0] hover:bg-[#F2EDE1] text-[#1F2A1E] font-bold text-xs border border-[#E5DEC9] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Complete Partner Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Quick Links Card */}
          <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xs p-5 space-y-1">
            <span className="text-[10px] font-bold text-[#1F2A1E]/40 uppercase tracking-wider block px-2 mb-2">
              Partner Utilities
            </span>
            {[
              { label: 'My Offered Services', path: '/services', icon: Briefcase },
              { label: 'Calendar & Available Hours', path: '/availability', icon: Calendar },
              { label: 'Trust & Verification Dossier', path: '/profile', icon: User },
              { label: 'Support & Help Desk', path: '/support', icon: LifeBuoy },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-[#1F2A1E]/75 hover:bg-[#FAF7F0] hover:text-[#2F5233] transition-colors group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4 text-[#2F5233]" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#1F2A1E]/30 group-hover:text-[#2F5233] group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mandatory Rejection Reason Modal */}
      {rejectingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#E5DEC9]">
            <div className="flex items-start justify-between border-b border-[#E5DEC9]/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-[#1F2A1E]">Decline Service Request</h3>
                  <p className="text-[11px] text-[#1F2A1E]/60 font-mono">
                    {rejectingBooking.reference || rejectingBooking.booking_reference || rejectingBooking.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRejectingBooking(null)}
                className="text-[#1F2A1E]/40 hover:text-[#1F2A1E] p-1 rounded-full hover:bg-black/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9] text-xs space-y-1">
              <p className="font-bold text-[#1F2A1E]">{rejectingBooking.service_name}</p>
              <p className="text-[#1F2A1E]/70">Customer: <span className="font-semibold">{rejectingBooking.customer_name}</span></p>
              <p className="text-[#1F2A1E]/70">Schedule: <span className="font-semibold">{rejectingBooking.scheduled_date} at {rejectingBooking.scheduled_time}</span></p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#1F2A1E] uppercase tracking-wider">
                Rejection Reason (Required) *
              </label>

              <select
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full text-xs font-medium bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl px-3 py-2.5 text-[#1F2A1E] focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
              >
                <option value="Schedule conflict with another job">Schedule conflict with another job</option>
                <option value="Outside service travel radius / transit delay">Outside service travel radius / transit delay</option>
                <option value="Required tools or equipment currently unavailable">Required tools or equipment currently unavailable</option>
                <option value="Personal emergency / urgent leave">Personal emergency / urgent leave</option>
                <option value="Custom Reason">Custom Reason...</option>
              </select>

              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter detailed reason for declining this request..."
                rows={3}
                required
                className="w-full text-xs font-medium bg-white border border-[#E5DEC9] rounded-xl p-3 text-[#1F2A1E] focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
              />
              <p className="text-[11px] text-[#1F2A1E]/50">
                This reason will be recorded on the booking, communicated to the customer, and visible to operations admin.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRejectingBooking(null)}
                className="px-4 py-2 bg-[#FAF7F0] hover:bg-[#F2EDE1] text-[#1F2A1E] font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!rejectionReason.trim() || actionLoading === rejectingBooking.id}
                onClick={() => handleBookingAction(rejectingBooking.id, 'reject', rejectionReason.trim())}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {actionLoading === rejectingBooking.id ? 'Declining...' : 'Confirm Decline'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Start OTP Verification Modal */}
      {startingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#E5DEC9]">
            <div className="flex items-start justify-between border-b border-[#E5DEC9]/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shadow-xs">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-[#1F2A1E]">Verify Start OTP</h3>
                  <p className="text-[11px] text-[#1F2A1E]/60 font-mono">
                    {startingBooking.reference || startingBooking.booking_reference || startingBooking.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStartingBooking(null);
                  setStartOtp('');
                  setStartOtpError(null);
                }}
                className="text-[#1F2A1E]/40 hover:text-[#1F2A1E] p-1 rounded-full hover:bg-black/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9] text-xs space-y-1">
              <p className="font-bold text-[#1F2A1E]">{startingBooking.service_name}</p>
              <p className="text-[#1F2A1E]/70">Customer: <span className="font-semibold">{startingBooking.customer_name}</span></p>
            </div>

            {startOtpError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{startOtpError}</span>
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#1F2A1E] uppercase tracking-wider">
                Enter 4-Digit Customer Start OTP
              </label>
              <input
                data-testid="start-otp-input"
                type="text"
                maxLength={6}
                value={startOtp}
                onChange={(e) => {
                  setStartOtp(e.target.value);
                  setStartOtpError(null);
                }}
                placeholder="4-digit OTP"
                className="w-full text-center font-mono text-2xl tracking-widest bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl px-3 py-3 text-[#1F2A1E] focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
              />
              <p className="text-[11px] text-[#1F2A1E]/60">
                The customer has received this code on their live tracking screen upon your arrival. You must verify this OTP before initiating the service.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setStartingBooking(null);
                  setStartOtp('');
                  setStartOtpError(null);
                }}
                className="px-4 py-2 bg-[#FAF7F0] hover:bg-[#F2EDE1] text-[#1F2A1E] font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                data-testid="verify-otp-btn"
                type="button"
                disabled={!startOtp.trim() || actionLoading === startingBooking.id}
                onClick={async () => {
                  try {
                    await handleBookingAction(startingBooking.id, 'start', undefined, startOtp.trim());
                  } catch (e) {
                    // Handled inside handleBookingAction with setStartOtpError
                  }
                }}
                className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {actionLoading === startingBooking.id ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify & Start Service</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Lightbox Modal for Photo Preview */}
      {previewPhotoUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setPreviewPhotoUrl(null)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] bg-white rounded-3xl p-3 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewPhotoUrl(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={resolvePhotoUrl(previewPhotoUrl)}
              alt="Service Verification Proof"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>
        </div>
      )}

      {/* Service Completion OTP Verification Modal */}
      {completingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#E5DEC9]">
            <div className="flex items-start justify-between border-b border-[#E5DEC9]/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-[#1F2A1E]">Verify Completion OTP</h3>
                  <p className="text-[11px] text-[#1F2A1E]/60 font-mono">
                    {completingBooking.reference || completingBooking.booking_reference || completingBooking.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCompletingBooking(null);
                  setCompleteOtp('');
                  setCompleteOtpError(null);
                }}
                className="text-[#1F2A1E]/40 hover:text-[#1F2A1E] p-1 rounded-full hover:bg-black/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9] text-xs space-y-1">
              <p className="font-bold text-[#1F2A1E]">{completingBooking.service_name}</p>
              <p className="text-[#1F2A1E]/70">Customer: <span className="font-semibold">{completingBooking.customer_name}</span></p>
            </div>

            {completeOtpError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{completeOtpError}</span>
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#1F2A1E] uppercase tracking-wider">
                Enter 4-Digit Customer Completion OTP
              </label>
              <input
                data-testid="complete-otp-input"
                type="text"
                maxLength={6}
                value={completeOtp}
                onChange={(e) => {
                  setCompleteOtp(e.target.value);
                  setCompleteOtpError(null);
                }}
                placeholder="4-digit OTP"
                className="w-full text-center font-mono text-2xl tracking-widest bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl px-3 py-3 text-[#1F2A1E] focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
              />
              <p className="text-[11px] text-[#1F2A1E]/60">
                Ask the customer for the completion code displayed on their screen after they inspect and approve the completed service.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setCompletingBooking(null);
                  setCompleteOtp('');
                  setCompleteOtpError(null);
                }}
                className="px-4 py-2 bg-[#FAF7F0] hover:bg-[#F2EDE1] text-[#1F2A1E] font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                data-testid="verify-complete-otp-btn"
                type="button"
                disabled={!completeOtp.trim() || actionLoading === completingBooking.id}
                onClick={async () => {
                  try {
                    await handleBookingAction(completingBooking.id, 'complete', undefined, completeOtp.trim());
                  } catch (e) {
                    // Handled inside handleBookingAction with setCompleteOtpError
                  }
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {actionLoading === completingBooking.id ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify & Complete Service</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark Cash Collected Modal */}
      {cashCollectionBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <form onSubmit={handleReportCashCollection} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#E5DEC9]">
            <div className="flex items-start justify-between border-b border-[#E5DEC9]/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#2F5233]/10 border border-[#2F5233]/20 flex items-center justify-center text-[#2F5233] shadow-xs">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-[#1F2A1E]">Mark Cash Collected</h3>
                  <p className="text-[11px] text-[#1F2A1E]/60 font-mono">
                    {cashCollectionBooking.reference || cashCollectionBooking.booking_reference || cashCollectionBooking.id}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCashCollectionBooking(null);
                  setCollectionError(null);
                  setCollectionSuccess(null);
                }}
                className="text-[#1F2A1E]/40 hover:text-[#1F2A1E] p-1 rounded-full hover:bg-black/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 bg-[#FAF7F0] rounded-xl border border-[#E5DEC9] text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[#1F2A1E]/60">Service:</span>
                <span className="font-bold text-[#1F2A1E]">{cashCollectionBooking.service_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#1F2A1E]/60">Customer:</span>
                <span className="font-semibold text-[#1F2A1E]">{cashCollectionBooking.customer_name}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-[#E5DEC9]">
                <span className="font-semibold text-[#1F2A1E]/70">Agreed Amount:</span>
                <span className="font-mono font-bold text-sm text-[#2F5233]">
                  ₹{parseFloat(cashCollectionBooking.total_price || 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {collectionError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{collectionError}</span>
              </div>
            )}

            {collectionSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{collectionSuccess}</span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#1F2A1E] uppercase tracking-wider mb-1.5">
                  Amount Collected (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={collectedAmount}
                  onChange={(e) => {
                    setCollectedAmount(e.target.value);
                    setCollectionError(null);
                  }}
                  placeholder="Enter collected cash amount"
                  className="w-full font-mono text-lg font-bold bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl px-4 py-2.5 text-[#1F2A1E] focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
                />
              </div>

              {/* Discrepancy Alert */}
              {collectedAmount && parseFloat(collectedAmount) !== parseFloat(cashCollectionBooking.total_price || 0) && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Amount Discrepancy Detected</span>
                    <span>
                      Reported: ₹{collectedAmount} vs Agreed: ₹{cashCollectionBooking.total_price}.
                      This discrepancy of ₹{Math.abs(parseFloat(collectedAmount) - parseFloat(cashCollectionBooking.total_price || 0)).toFixed(2)} will be flagged for SmartServe Admin review.
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1F2A1E] uppercase tracking-wider mb-1.5">
                  Collection Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={collectionNotes}
                  onChange={(e) => setCollectionNotes(e.target.value)}
                  placeholder="e.g. Exact cash received, tip included, or reason for difference"
                  className="w-full text-xs bg-[#FAF7F0] border border-[#E5DEC9] rounded-xl p-3 text-[#1F2A1E] focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
                />
              </div>

              <p className="text-[11px] text-[#1F2A1E]/60 italic">
                Note: Reporting cash collection updates the payment status to "Collection Reported". Final verification is conducted by a SmartServe Operations Admin.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E5DEC9]">
              <button
                type="button"
                onClick={() => {
                  setCashCollectionBooking(null);
                  setCollectionError(null);
                  setCollectionSuccess(null);
                }}
                className="px-4 py-2 bg-[#FAF7F0] hover:bg-[#F2EDE1] text-[#1F2A1E] font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={collectionLoading || !collectedAmount}
                className="px-5 py-2.5 bg-[#2F5233] hover:bg-[#3D6B42] text-white font-bold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {collectionLoading ? (
                  <span>Recording Report...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Cash Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* 2d. MANUAL LOCATION / PIN COORDINATES MODAL */}
      {showManualLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FAF7F0] rounded-3xl border border-[#E5DEC9] max-w-lg w-full p-6 shadow-2xl relative text-[#1F2A1E]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DEC9]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1F2A1E]">Set Provider Location</h3>
                  <p className="text-xs text-[#1F2A1E]/70">Pick a preset hub or enter custom GPS coordinates</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowManualLocationModal(false)}
                className="p-2 text-[#1F2A1E]/50 hover:text-[#1F2A1E] rounded-xl hover:bg-black/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Hub Presets */}
            <div className="my-4">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#1F2A1E]/70 mb-2">
                Quick Hub Presets
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LOCATION_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSetManualLocation(preset.latitude, preset.longitude, preset.name)}
                    className="p-2.5 rounded-xl border border-[#E5DEC9] bg-white hover:bg-emerald-50 hover:border-emerald-300 text-left transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#1F2A1E] group-hover:text-emerald-900">{preset.name}</div>
                      <div className="text-[10px] text-[#1F2A1E]/60">{preset.region} • {preset.latitude.toFixed(2)}, {preset.longitude.toFixed(2)}</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">Select →</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Coordinates Input */}
            <div className="p-3.5 bg-white rounded-2xl border border-[#E5DEC9] space-y-3">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#1F2A1E]/70">
                Custom Coordinates
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <span className="text-[10px] text-[#1F2A1E]/60 block mb-1">Latitude</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={manualCustomLat}
                    onChange={(e) => setManualCustomLat(e.target.value)}
                    placeholder="23.0225"
                    className="w-full px-3 py-2 rounded-xl border border-[#E5DEC9] bg-[#FAF7F0] text-xs font-mono font-bold text-[#1F2A1E] focus:outline-emerald-600"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#1F2A1E]/60 block mb-1">Longitude</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={manualCustomLng}
                    onChange={(e) => setManualCustomLng(e.target.value)}
                    placeholder="72.5714"
                    className="w-full px-3 py-2 rounded-xl border border-[#E5DEC9] bg-[#FAF7F0] text-xs font-mono font-bold text-[#1F2A1E] focus:outline-emerald-600"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const lat = parseFloat(manualCustomLat);
                  const lng = parseFloat(manualCustomLng);
                  if (!isNaN(lat) && !isNaN(lng)) {
                    handleSetManualLocation(lat, lng, 'Custom Location');
                  }
                }}
                className="w-full py-2.5 bg-[#2F5233] hover:bg-[#1F2A1E] text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Apply & Broadcast Telemetry</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboardView;
