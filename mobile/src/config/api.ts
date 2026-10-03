/**
 * SmartServe Mobile API Configuration
 * 
 * Physical Phone / LAN Development Configuration
 * On a physical phone, localhost / 127.0.0.1 refers to the phone itself.
 * All phone traffic must route to the development PC's detected LAN IPv4 address.
 */

// Detected Developer PC LAN IPv4 Address
export const DETECTED_PC_LAN_IP = '172.20.10.2';
export const DEFAULT_BACKEND_PORT = '8000';

export const DEV_API_BASE_URL = 
  process.env.EXPO_PUBLIC_API_BASE_URL || 
  process.env.EXPO_PUBLIC_API_URL || 
  `http://${DETECTED_PC_LAN_IP}:${DEFAULT_BACKEND_PORT}/api/v1`;

export const DEV_BACKEND_ROOT_URL = 
  DEV_API_BASE_URL.replace(/\/api\/v1\/?$/, '');

export const API_BASE_URL = DEV_API_BASE_URL;
