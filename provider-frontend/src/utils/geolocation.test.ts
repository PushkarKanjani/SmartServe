import assert from 'node:assert';
import {
  checkIsSecureContext,
  checkGeolocationSupported,
  mapGeolocationError,
  calculateHaversineDistanceKm,
  LOCATION_PRESETS,
} from './geolocation.ts';

console.log('--- RUNNING GEOLOCATION UTILITY TESTS ---');

// Test 1: Secure Context Detection
console.log('Test 1: Secure Context Detection');
{
  assert.strictEqual(
    checkIsSecureContext({ isSecureContext: true, location: { protocol: 'https:', hostname: 'smartserve.com' } }),
    true,
    'Expected true when window.isSecureContext is true'
  );

  assert.strictEqual(
    checkIsSecureContext({ isSecureContext: false, location: { protocol: 'http:', hostname: '172.20.10.2' } }),
    false,
    'Expected false for http://172.20.10.2'
  );

  assert.strictEqual(
    checkIsSecureContext({ isSecureContext: undefined, location: { protocol: 'http:', hostname: 'localhost' } }),
    true,
    'Expected true for localhost over http'
  );

  assert.strictEqual(
    checkIsSecureContext({ isSecureContext: undefined, location: { protocol: 'http:', hostname: '127.0.0.1' } }),
    true,
    'Expected true for 127.0.0.1 over http'
  );

  assert.strictEqual(
    checkIsSecureContext({ isSecureContext: undefined, location: { protocol: 'http:', hostname: '192.168.1.50' } }),
    false,
    'Expected false for LAN IP 192.168.1.50 over http'
  );

  assert.strictEqual(
    checkIsSecureContext({ isSecureContext: undefined, location: { protocol: 'https:', hostname: '192.168.1.50' } }),
    true,
    'Expected true for https even on LAN IP'
  );
}
console.log('  Passed Test 1: Secure Context Detection');

// Test 2: Geolocation Support Detection
console.log('Test 2: Geolocation Support Detection');
{
  assert.strictEqual(
    checkGeolocationSupported({ geolocation: { getCurrentPosition: () => {} } }),
    true,
    'Expected true when geolocation in navigator'
  );

  assert.strictEqual(
    checkGeolocationSupported({}),
    false,
    'Expected false when geolocation missing'
  );
}
console.log('  Passed Test 2: Geolocation Support Detection');

// Test 3: Error Mapping - Insecure Context vs Denied
console.log('Test 3: Error Mapping - Insecure Context vs Denied');
{
  // Even if browser throws code 1 (PERMISSION_DENIED), if isSecure = false, state MUST be 'insecure'
  const errCode1 = { code: 1, message: 'User denied Geolocation' };
  const resInsecure = mapGeolocationError(errCode1, false);
  assert.strictEqual(resInsecure.state, 'insecure', 'Expected "insecure" state when isSecure is false');
  assert.ok(resInsecure.message.includes('secure origin'), 'Expected message mentioning secure origin');

  // When isSecure = true, code 1 MUST be mapped to 'denied'
  const resDenied = mapGeolocationError(errCode1, true);
  assert.strictEqual(resDenied.state, 'denied', 'Expected "denied" state when isSecure is true');
  assert.ok(resDenied.message.includes('denied'), 'Expected message mentioning denied');
}
console.log('  Passed Test 3: Error Mapping - Insecure Context vs Denied');

// Test 4: Error Mapping - Hardware Unavailable (code 2) and Timeout (code 3)
console.log('Test 4: Error Mapping - Unavailable & Timeout');
{
  const errCode2 = { code: 2, message: 'Position unavailable' };
  const resUnavailable = mapGeolocationError(errCode2, true);
  assert.strictEqual(resUnavailable.state, 'unavailable');

  const errCode3 = { code: 3, message: 'Timeout expired' };
  const resTimeout = mapGeolocationError(errCode3, true);
  assert.strictEqual(resTimeout.state, 'timeout');
}
console.log('  Passed Test 4: Error Mapping - Unavailable & Timeout');

// Test 5: Haversine Distance Calculation
console.log('Test 5: Haversine Distance Calculation');
{
  // Distance between Mumbai (19.0760, 72.8777) and Pune (18.5204, 73.8567) is approx 120 km
  const dist = calculateHaversineDistanceKm(19.0760, 72.8777, 18.5204, 73.8567);
  assert.ok(dist > 115 && dist < 125, `Expected distance ~120km, got ${dist}`);
}
console.log('  Passed Test 5: Haversine Distance Calculation');

// Test 6: Location Presets Integrity
console.log('Test 6: Location Presets Integrity');
{
  assert.ok(LOCATION_PRESETS.length >= 5, 'Expected at least 5 location presets');
  for (const p of LOCATION_PRESETS) {
    assert.ok(p.id && p.name && p.region, `Preset ${p.id} missing text fields`);
    assert.ok(p.latitude >= -90 && p.latitude <= 90, `Invalid latitude for ${p.id}`);
    assert.ok(p.longitude >= -180 && p.longitude <= 180, `Invalid longitude for ${p.id}`);
  }
}
console.log('  Passed Test 6: Location Presets Integrity');

console.log('=== ALL GEOLOCATION UTILITY TESTS PASSED (6/6) ===');
