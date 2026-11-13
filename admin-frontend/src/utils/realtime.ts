/**
 * SmartServe Real-Time WebSocket Bridge (Admin Frontend)
 * Connects backend event updates to Admin React components without polling.
 *
 * Architecture:
 *   - Authenticated WebSocket handshake using JWT access token in URL query parameter and runtime auth frame.
 *   - Graceful token expiration handling: checks JWT expiration before attaching; handles missing/expired tokens cleanly.
 *   - Never exposes tokens in console or error logs.
 *   - Per-subscription event_id deduplication (prevents duplicate React state updates).
 *   - Race-safe connection lifecycle (gracefully handles React StrictMode / unmount).
 *   - Exponential backoff reconnection with jitter.
 *   - Periodic heartbeat ping keeps the stream active.
 */

import { getApiBaseUrl } from '../api/client';

type MessageHandler = (data: any) => void;

/**
 * Safely extracts a valid, unexpired JWT token from localStorage.
 * Validates expiration timestamp and structure without throwing. Never logs token contents.
 */
function getValidToken(storageKey: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const token = localStorage.getItem(storageKey);
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payloadPart = parts[1];
    if (!payloadPart) return null;
    const payload = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp && typeof payload.exp === 'number') {
      const nowSeconds = Math.floor(Date.now() / 1000);
      if (payload.exp <= nowSeconds) {
        // Token has expired
        return null;
      }
    }
    return token;
  } catch {
    return null;
  }
}

export function getWebSocketUrl(channels: string[] = []): string {
  const rawApiUrl = getApiBaseUrl();
  const isHttps = rawApiUrl.startsWith('https:') || (typeof window !== 'undefined' && window.location.protocol === 'https:');
  const wsProtocol = isHttps ? 'wss:' : 'ws:';
  const hostDomain = rawApiUrl.replace(/^https?:\/\//, '').replace(/\/api\/v1\/?$/, '');

  const params = new URLSearchParams();
  if (channels.length > 0) {
    params.set('channels', channels.join(','));
  }

  const token = getValidToken('smartserve_token');
  if (token) {
    params.set('token', token);
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';
  return `${wsProtocol}//${hostDomain}/ws/stream${queryString}`;
}

export function subscribeToRealtime(
  channels: string[],
  onMessage: MessageHandler,
  onStatusChange?: (status: 'connected' | 'connecting' | 'disconnected') => void
): () => void {
  let ws: WebSocket | null = null;
  let disposed = false;
  let pingInterval: ReturnType<typeof setInterval> | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let retryCount = 0;
  let generation = 0;

  // Per-subscription event_id deduplication
  const seenEventIds = new Set<string>();
  const seenEventOrder: string[] = [];
  const maxSeen = 1000;

  function isDuplicateEvent(eventId: string): boolean {
    if (!eventId) return false;
    if (seenEventIds.has(eventId)) return true;
    seenEventIds.add(eventId);
    seenEventOrder.push(eventId);
    if (seenEventOrder.length > maxSeen) {
      const oldest = seenEventOrder.shift();
      if (oldest) seenEventIds.delete(oldest);
    }
    return false;
  }

  function clearTimers() {
    if (pingInterval !== null) { clearInterval(pingInterval); pingInterval = null; }
    if (reconnectTimer !== null) { clearTimeout(reconnectTimer); reconnectTimer = null; }
  }

  function scheduleReconnect() {
    if (disposed) return;
    const base = Math.min(1000 * Math.pow(1.5, retryCount), 8000);
    const jitter = Math.random() * 500;
    retryCount++;
    reconnectTimer = setTimeout(() => {
      if (!disposed) connect();
    }, base + jitter);
  }

  function connect() {
    if (disposed) return;

    if (ws) {
      const s = ws;
      ws = null;
      if (s.readyState === WebSocket.CONNECTING) {
        s.onopen = () => { try { s.close(); } catch (_) {} };
      } else {
        try { s.onopen = null; s.onmessage = null; s.onclose = null; s.onerror = null; s.close(); } catch (_) {}
      }
    }

    const gen = ++generation;
    try {
      onStatusChange?.('connecting');
      const url = getWebSocketUrl(channels);
      const socket = new WebSocket(url);
      ws = socket;

      socket.onopen = () => {
        if (gen !== generation || disposed) { socket.close(); return; }
        retryCount = 0;
        onStatusChange?.('connected');

        // Optional runtime auth frame in addition to URL token parameter
        const token = getValidToken('smartserve_token');
        if (token && socket.readyState === WebSocket.OPEN) {
          try { socket.send(JSON.stringify({ action: 'auth', token })); } catch (_) {}
        }

        pingInterval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            try { socket.send(JSON.stringify({ action: 'ping' })); } catch (_) {}
          }
        }, 25000);
      };

      socket.onmessage = (event) => {
        if (gen !== generation || disposed) return;
        try {
          const data = JSON.parse(event.data);
          // Skip control frames
          if (
            data.type === 'pong' ||
            data.type === 'CONNECTION_ESTABLISHED' ||
            data.type === 'SUBSCRIBED' ||
            data.type === 'UNSUBSCRIBED' ||
            data.type === 'AUTH_SUCCESS'
          ) {
            return;
          }

          if (data.type === 'AUTH_FAILED') {
            // Authentication was rejected; log sanitized warning without token
            console.warn('[WebSocket] Authentication rejected by server.');
            return;
          }

          if (data.type === 'UNAUTHORIZED') {
            console.warn(`[WebSocket] Unauthorized for requested stream: ${data.channel || 'unknown'}`);
            return;
          }

          // Event deduplication per subscription using event_id
          const eventId = data.event_id;
          if (eventId && isDuplicateEvent(eventId)) return;

          onMessage(data);
        } catch (_) {
          // ignore malformed payloads
        }
      };

      socket.onclose = () => {
        if (gen !== generation) return;
        clearTimers();
        onStatusChange?.('disconnected');
        if (!disposed) scheduleReconnect();
      };

      socket.onerror = () => {
        // let onclose handle cleanup
      };
    } catch (_) {
      if (!disposed) scheduleReconnect();
    }
  }

  connect();

  return () => {
    disposed = true;
    generation++;
    clearTimers();
    if (ws) {
      const s = ws;
      ws = null;
      if (s.readyState === WebSocket.CONNECTING) {
        s.onopen = () => {
          try { s.close(); } catch (_) {}
        };
      } else {
        try { s.onopen = null; s.onmessage = null; s.onclose = null; s.onerror = null; s.close(); } catch (_) {}
      }
    }
  };
}
