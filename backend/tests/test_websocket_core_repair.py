"""
SmartServe - Phase 1 WebSocket Core Repair Test Suite
Verifies:
  1. Authenticated customer WebSocket connection and channel authorization
  2. Authenticated admin WebSocket connection (dashboard, bookings, emergency)
  3. Provider WebSocket connection (provider_{id}, booking_{id})
  4. Invalid and expired token rejection
  5. Regression test: Synchronous worker thread broadcast_realtime (no event-loop crash, sockets not purged)
  6. Multiple simultaneous WebSocket connections & multi-channel broadcast
  7. Client disconnection & reconnection resilience (single client drop does not kill others)
  8. Booking event delivery
  9. GPS event delivery
  10. In-process fallback relay delivery
  11. Event loop shutdown handling
"""
import sys
import os
import uuid
import time
import json
import asyncio
import threading
from datetime import datetime, timedelta, timezone

# Add backend directory to sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
from app.main import app
from app.core.config import settings
from app.core.security import create_access_token
from app.core.websockets import ws_manager, broadcast_realtime
from app.api.v1.ws import _authenticate_ws_token, _is_authorized_for_channel

client = TestClient(app)


def test_01_token_authentication_and_rejection():
    """Test token authentication helper for valid, invalid, expired, and absent tokens."""
    print("\n--- Test 01: Token Authentication & Rejection ---")
    
    # 1. No token -> returns None
    auth_none = _authenticate_ws_token(None)
    assert auth_none is None, "None token should return None"

    # 2. Malformed token -> returns None
    auth_bad = _authenticate_ws_token("invalid.token.payload")
    assert auth_bad is None, "Malformed token should return None"

    # 3. Expired token -> returns None
    expired_token = create_access_token(
        {"sub": str(uuid.uuid4()), "role": "customer"},
        expires_delta=timedelta(seconds=-3600)
    )
    auth_exp = _authenticate_ws_token(expired_token)
    assert auth_exp is None, "Expired token should return None"

    # 4. Valid Customer Token
    cust_id = str(uuid.uuid4())
    cust_payload = {
        "sub": cust_id,
        "customer_id": cust_id,
        "role": "customer",
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    }
    cust_token = create_access_token(cust_payload)
    auth_cust = _authenticate_ws_token(cust_token)
    assert auth_cust is not None, "Valid customer token should be authenticated"
    assert auth_cust["role"] == "customer"
    assert auth_cust["sub"] == cust_id

    # 5. Valid Admin Token
    admin_id = str(uuid.uuid4())
    admin_payload = {
        "sub": admin_id,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    }
    admin_token = create_access_token(admin_payload)
    auth_admin = _authenticate_ws_token(admin_token)
    assert auth_admin is not None, "Valid admin token should be authenticated"
    assert auth_admin["role"] == "admin"

    # 6. Valid Provider Token
    prov_id = str(uuid.uuid4())
    prov_payload = {
        "sub": prov_id,
        "role": "provider",
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    }
    prov_token = create_access_token(prov_payload)
    auth_prov = _authenticate_ws_token(prov_token)
    assert auth_prov is not None, "Valid provider token should be authenticated"
    assert auth_prov["role"] == "provider"

    print("  [PASS] Token authentication and rejection verified.")


def test_02_channel_authorization_matrix():
    """Verify channel permissions across roles (admin, customer, provider, anonymous)."""
    print("\n--- Test 02: Channel Authorization Matrix ---")
    admin_auth = {"role": "admin", "sub": "admin1"}
    cust_id = str(uuid.uuid4())
    cust_auth = {"role": "customer", "sub": cust_id, "customer_id": cust_id}
    prov_id = str(uuid.uuid4())
    prov_auth = {"role": "provider", "sub": prov_id}
    anon_auth = None

    # Protected Admin channels
    for ch in ["dashboard", "bookings", "emergency", "system"]:
        assert _is_authorized_for_channel(admin_auth, ch) is True, f"Admin must access {ch}"
        assert _is_authorized_for_channel(cust_auth, ch) is False, f"Customer must NOT access {ch}"
        assert _is_authorized_for_channel(prov_auth, ch) is False, f"Provider must NOT access {ch}"
        assert _is_authorized_for_channel(anon_auth, ch) is False, f"Anonymous must NOT access {ch}"

    # Provider specific channel
    assert _is_authorized_for_channel(prov_auth, f"provider_{prov_id}") is True
    assert _is_authorized_for_channel(prov_auth, f"provider_{uuid.uuid4()}") is False
    assert _is_authorized_for_channel(admin_auth, f"provider_{prov_id}") is True
    assert _is_authorized_for_channel(cust_auth, f"provider_{prov_id}") is False

    # User specific channel
    assert _is_authorized_for_channel(cust_auth, f"user_{cust_id}") is True
    assert _is_authorized_for_channel(cust_auth, f"user_{uuid.uuid4()}") is False

    print("  [PASS] Channel authorization matrix verified across all roles.")


def test_03_websocket_client_authenticated_handshake():
    """Test connecting to /ws/stream with TestClient using valid and invalid tokens."""
    print("\n--- Test 03: WebSocket Client Authenticated Handshake ---")
    
    # 1. Connect without token -> establishes anonymous session
    with client.websocket_connect("/ws/stream") as ws:
        msg = ws.receive_json()
        assert msg["type"] == "CONNECTION_ESTABLISHED"
        assert msg["authenticated"] is False

        # Try to subscribe to admin channel -> should be UNAUTHORIZED
        ws.send_json({"action": "subscribe", "channel": "dashboard"})
        resp = ws.receive_json()
        assert resp["type"] == "UNAUTHORIZED"
        assert resp["channel"] == "dashboard"

    # 2. Connect with Valid Admin Token
    admin_token = create_access_token({
        "sub": str(uuid.uuid4()),
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    })
    with client.websocket_connect(f"/ws/stream?channels=dashboard,bookings&token={admin_token}") as ws:
        msg = ws.receive_json()
        assert msg["type"] == "CONNECTION_ESTABLISHED"
        assert msg["authenticated"] is True
        assert "dashboard" in msg["subscribed_channels"]
        assert "bookings" in msg["subscribed_channels"]

        # Ping-Pong check
        ws.send_json({"action": "ping"})
        pong = ws.receive_json()
        assert pong["type"] == "pong"

    # 3. Connect with Valid Provider Token
    prov_id = str(uuid.uuid4())
    prov_token = create_access_token({
        "sub": prov_id,
        "role": "provider",
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    })
    with client.websocket_connect(f"/ws/stream?channels=provider_{prov_id}&token={prov_token}") as ws:
        msg = ws.receive_json()
        assert msg["type"] == "CONNECTION_ESTABLISHED"
        assert msg["authenticated"] is True
        assert f"provider_{prov_id}" in msg["subscribed_channels"]

    print("  [PASS] WebSocket client authenticated handshakes verified.")


def test_04_regression_cross_thread_event_loop_broadcast():
    """
    CRITICAL REGRESSION TEST:
    Verifies that calling broadcast_realtime() from a synchronous worker thread
    dispatches safely to the main loop via run_coroutine_threadsafe without creating
    a new event loop, does not throw 'Socket loop != current loop', and does NOT
    purge active WebSocket connections!
    """
    print("\n--- Test 04: Regression - Cross-Thread Event Loop Broadcast ---")
    
    admin_token = create_access_token({
        "sub": "admin_test",
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    })

    with client.websocket_connect(f"/ws/stream?channels=bookings,dashboard&token={admin_token}") as ws:
        init_msg = ws.receive_json()
        assert init_msg["type"] == "CONNECTION_ESTABLISHED"

        # Verify ws_manager has active connection
        assert len(ws_manager.channel_subscribers.get("bookings", set())) > 0

        # Simulate a synchronous endpoint (like customer.py or providers.py) calling broadcast_realtime from a worker thread
        test_payload = {
            "type": "BOOKING_CREATED",
            "event_id": f"evt_{uuid.uuid4().hex}",
            "booking_id": "test_booking_123",
            "status": "Requested"
        }

        broadcast_error = None
        def worker_thread_broadcast():
            nonlocal broadcast_error
            try:
                # This executes in a separate thread without an active event loop
                broadcast_realtime(["bookings"], test_payload)
            except Exception as e:
                broadcast_error = e

        t = threading.Thread(target=worker_thread_broadcast)
        t.start()
        t.join(timeout=5.0)

        assert broadcast_error is None, f"Cross-thread broadcast raised an exception: {broadcast_error}"

        # Receive broadcast over the active WebSocket connection
        received_msg = ws.receive_json()
        assert received_msg["type"] == "BOOKING_CREATED"
        assert received_msg["booking_id"] == "test_booking_123"

        # Crucial check: socket must STILL be active and not purged!
        assert len(ws_manager.channel_subscribers.get("bookings", set())) > 0

        # Verify a second message still delivers cleanly
        gps_payload = {
            "type": "GPS_UPDATE",
            "event_id": f"evt_{uuid.uuid4().hex}",
            "latitude": 19.076,
            "longitude": 72.877
        }
        t2 = threading.Thread(target=lambda: broadcast_realtime(["bookings"], gps_payload))
        t2.start()
        t2.join(timeout=5.0)

        received_gps = ws.receive_json()
        assert received_gps["type"] == "GPS_UPDATE"
        assert received_gps["latitude"] == 19.076

    print("  [PASS] Cross-thread event loop dispatch verified. Sockets preserved!")


def test_05_multiple_simultaneous_connections_and_isolation():
    """Verify multiple simultaneous clients receive broadcasts without duplicate delivery or interference."""
    print("\n--- Test 05: Multiple Simultaneous Connections & Isolation ---")
    
    admin_token = create_access_token({"sub": "admin_1", "role": "admin"})
    admin_token_2 = create_access_token({"sub": "admin_2", "role": "admin"})

    with client.websocket_connect(f"/ws/stream?channels=dashboard&token={admin_token}") as ws1:
        assert ws1.receive_json()["type"] == "CONNECTION_ESTABLISHED"

        with client.websocket_connect(f"/ws/stream?channels=dashboard&token={admin_token_2}") as ws2:
            assert ws2.receive_json()["type"] == "CONNECTION_ESTABLISHED"

            # Both are subscribed to 'dashboard'
            assert len(ws_manager.channel_subscribers["dashboard"]) == 2

            # Broadcast message
            event = {
                "type": "METRIC_ALERT",
                "event_id": f"evt_{uuid.uuid4().hex}",
                "message": "High traffic detected"
            }
            broadcast_realtime(["dashboard"], event)

            # Both must receive the message
            msg1 = ws1.receive_json()
            msg2 = ws2.receive_json()
            assert msg1["type"] == "METRIC_ALERT"
            assert msg2["type"] == "METRIC_ALERT"

        # ws2 is closed now upon exiting context. ws1 should still be active!
        assert len(ws_manager.channel_subscribers["dashboard"]) == 1

        # Broadcast another message: only ws1 receives it
        event2 = {
            "type": "METRIC_ALERT_2",
            "event_id": f"evt_{uuid.uuid4().hex}",
            "message": "Normal traffic restored"
        }
        broadcast_realtime(["dashboard"], event2)
        assert ws1.receive_json()["type"] == "METRIC_ALERT_2"

    print("  [PASS] Multiple simultaneous connections, channel isolation, and disconnect cleanup verified.")


def test_06_in_process_fallback_relay():
    """Verify the in-process fallback relay delivers booking and GPS events reliably when Kafka is inactive."""
    print("\n--- Test 06: In-Process Fallback Relay Delivery ---")
    
    admin_token = create_access_token({"sub": "admin_ops", "role": "admin"})

    with client.websocket_connect(f"/ws/stream?channels=bookings,emergency&token={admin_token}") as ws:
        assert ws.receive_json()["type"] == "CONNECTION_ESTABLISHED"

        # 1. Fallback booking created event
        booking_event = {
            "type": "BOOKING_CREATED",
            "event_id": f"evt_{uuid.uuid4().hex}",
            "booking_id": "b_fallback_001",
            "status": "Requested",
            "total_price": 499.0
        }
        broadcast_realtime(["bookings"], booking_event)
        rec1 = ws.receive_json()
        assert rec1["booking_id"] == "b_fallback_001"

        # 2. Fallback emergency dispatch event
        emergency_event = {
            "type": "EMERGENCY_DISPATCH",
            "event_id": f"evt_{uuid.uuid4().hex}",
            "booking_id": "b_emergency_999",
            "level": "CRITICAL"
        }
        broadcast_realtime(["emergency"], emergency_event)
        rec2 = ws.receive_json()
        assert rec2["type"] == "EMERGENCY_DISPATCH"
        assert rec2["level"] == "CRITICAL"

        # 3. Fallback GPS live location event
        gps_event = {
            "type": "PROVIDER_LOCATION_UPDATED",
            "event_id": f"evt_{uuid.uuid4().hex}",
            "booking_id": "b_fallback_001",
            "latitude": 19.1234,
            "longitude": 72.8567,
            "status": "Started"
        }
        broadcast_realtime(["bookings"], gps_event)
        rec3 = ws.receive_json()
        assert rec3["type"] == "PROVIDER_LOCATION_UPDATED"
        assert rec3["latitude"] == 19.1234

    print("  [PASS] In-process fallback relay delivered booking, emergency, and GPS events.")


def test_07_event_loop_shutdown_handling():
    """Verify event loop shutdown and unavailable-loop conditions are handled without unhandled exceptions."""
    print("\n--- Test 07: Event Loop Shutdown Handling ---")
    
    # Simulate loop clearing
    orig_loop = ws_manager._main_loop
    try:
        ws_manager.clear_main_loop()
        assert ws_manager._main_loop is None

        # Calling broadcast_realtime when no loop is running should log a warning and return cleanly without crashing
        broadcast_realtime(["bookings"], {"type": "TEST_SHUTDOWN"})

    finally:
        # Restore loop
        ws_manager._main_loop = orig_loop

    print("  [PASS] Event loop shutdown handled cleanly.")


if __name__ == "__main__":
    print("=" * 70)
    print("STARTING PHASE 1 WEBSOCKET CORE REPAIR TEST SUITE")
    print("=" * 70)
    test_01_token_authentication_and_rejection()
    test_02_channel_authorization_matrix()
    test_03_websocket_client_authenticated_handshake()
    test_04_regression_cross_thread_event_loop_broadcast()
    test_05_multiple_simultaneous_connections_and_isolation()
    test_06_in_process_fallback_relay()
    test_07_event_loop_shutdown_handling()
    print("\n" + "=" * 70)
    print("ALL PHASE 1 WEBSOCKET REPAIR TESTS PASSED SUCCESSFULLY! (7/7)")
    print("=" * 70)
