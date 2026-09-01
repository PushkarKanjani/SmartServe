import { apiClient } from './client';

export interface BackendHealth {
  reachable: boolean;
  apiVersion?: string;
  customerEndpointsExposed: number;
  customerEndpointsExpected: number;
  lastCheckedAt: string;
  latencyMs?: number;
}

const EXPECTED_CUSTOMER_ROUTES = [
  '/customer/auth/me',
  '/customer/catalog/categories',
  '/customer/catalog/services',
  '/customer/bookings',
  '/customer/support/tickets',
  '/customer/profile',
  '/customer/sessions',
] as const;

export const checkBackendHealth = async (): Promise<BackendHealth> => {
  const start = performance.now();
  let reachable = false;
  let apiVersion: string | undefined;

  try {
    const res = await apiClient.get('/health', { timeout: 4000 });
    reachable = res.status === 200;
    apiVersion = res.data?.version || '1.0.0';
  } catch {
    reachable = false;
  }

  let exposed = 0;
  if (reachable) {
    await Promise.all(
      EXPECTED_CUSTOMER_ROUTES.map(async (route) => {
        try {
          await apiClient.get(route, {
            timeout: 2000,
            validateStatus: (s) => s === 200 || s === 401 || s === 403,
          });
          exposed += 1;
        } catch {
          // Route still 404 or missing
        }
      })
    );
  }

  return {
    reachable,
    apiVersion,
    customerEndpointsExposed: exposed,
    customerEndpointsExpected: EXPECTED_CUSTOMER_ROUTES.length,
    lastCheckedAt: new Date().toISOString(),
    latencyMs: Math.round(performance.now() - start),
  };
};
