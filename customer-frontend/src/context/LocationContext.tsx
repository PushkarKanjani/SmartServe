import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CustomerLocationPayload, updateCustomerLocation } from '../api/auth';
import { useAuth } from '../auth/useAuth';
import { reverseGeocode } from '../utils/geocoding';

interface LocationContextType {
  location: CustomerLocationPayload | null;
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  detectGpsLocation: () => Promise<CustomerLocationPayload | null>;
  setManualLocation: (payload: CustomerLocationPayload) => Promise<void>;
  clearError: () => void;
  formattedDisplay: string;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const GUEST_LOCATION_KEY = 'smartserve_guest_location';

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUserLocation } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize from user location or localStorage guest location
  const [location, setLocation] = useState<CustomerLocationPayload | null>(() => {
    if (user?.location && (user.location.city || user.location.address || user.location.latitude)) {
      return user.location;
    }
    try {
      const saved = localStorage.getItem(GUEST_LOCATION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync if user logs in or user.location updates
  useEffect(() => {
    if (user?.location && (user.location.city || user.location.address || user.location.latitude)) {
      setLocation(user.location);
    }
  }, [user?.location]);

  // Listen for cross-tab or cross-component location changes
  useEffect(() => {
    const handleLocationChange = (e: Event) => {
      const customEvent = e as CustomEvent<CustomerLocationPayload>;
      if (customEvent.detail) {
        setLocation(customEvent.detail);
      }
    };
    window.addEventListener('smartserve_location_changed', handleLocationChange);
    return () => window.removeEventListener('smartserve_location_changed', handleLocationChange);
  }, []);

  const saveLocationState = useCallback(
    async (payload: CustomerLocationPayload) => {
      setLocation(payload);
      try {
        localStorage.setItem(GUEST_LOCATION_KEY, JSON.stringify(payload));
      } catch {
        // Ignore localStorage error
      }

      if (user) {
        try {
          await updateCustomerLocation(payload);
        } catch (err) {
          console.warn('[LocationContext] Failed to persist location to backend:', err);
        }
        setUserLocation(payload);
      }

      window.dispatchEvent(new CustomEvent('smartserve_location_changed', { detail: payload }));
    },
    [user, setUserLocation]
  );

  const detectGpsLocation = useCallback(async (): Promise<CustomerLocationPayload | null> => {
    setError(null);
    if (!navigator.geolocation) {
      const err = 'Geolocation is not supported by your browser. Please enter your location manually.';
      setError(err);
      return null;
    }

    setIsLoading(true);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const geo = await reverseGeocode(lat, lon);
            const payload: CustomerLocationPayload = {
              latitude: lat,
              longitude: lon,
              address: geo.address,
              city: geo.city || 'Detected Area',
              state: geo.state,
              postal_code: geo.postal_code,
              source: 'geolocation',
            };
            await saveLocationState(payload);
            setIsLoading(false);
            resolve(payload);
          } catch (err) {
            const fallback: CustomerLocationPayload = {
              latitude: lat,
              longitude: lon,
              address: `GPS (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
              city: 'Current Location',
              source: 'geolocation',
            };
            await saveLocationState(fallback);
            setIsLoading(false);
            resolve(fallback);
          }
        },
        (geoError) => {
          let msg = 'Unable to detect your location. Please enter it manually.';
          if (geoError.code === geoError.PERMISSION_DENIED) {
            msg = 'Location permission was denied. Please select or enter your address manually.';
          } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
            msg = 'Location signal is unavailable. Please enter your address manually.';
          } else if (geoError.code === geoError.TIMEOUT) {
            msg = 'Location detection timed out. Please try again or enter your address manually.';
          }
          setError(msg);
          setIsLoading(false);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }, [saveLocationState]);

  const setManualLocation = useCallback(
    async (payload: CustomerLocationPayload) => {
      setError(null);
      setIsLoading(true);
      try {
        const enriched: CustomerLocationPayload = {
          ...payload,
          source: payload.source || 'manual',
        };
        await saveLocationState(enriched);
      } finally {
        setIsLoading(false);
      }
    },
    [saveLocationState]
  );

  const clearError = () => setError(null);

  // Formatted display string for navbar and headers
  const formattedDisplay = React.useMemo(() => {
    if (!location) {
      return 'Select Location';
    }
    if (location.city && location.address) {
      if (location.address.length > 20) {
        return location.city;
      }
      return `${location.address}, ${location.city}`;
    }
    if (location.city) {
      return location.city;
    }
    if (location.address) {
      return location.address;
    }
    if (location.latitude !== undefined && location.longitude !== undefined) {
      return `GPS (${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)})`;
    }
    return 'Select Location';
  }, [location]);

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        isModalOpen,
        setIsModalOpen,
        detectGpsLocation,
        setManualLocation,
        clearError,
        formattedDisplay,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useCustomerLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useCustomerLocation must be used within a LocationProvider');
  }
  return context;
};

