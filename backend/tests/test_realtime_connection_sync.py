import asyncio
import threading
import time
import uuid
from datetime import datetime, timezone, timedelta

from fastapi.testclient import TestClient

from app.api.v1.ws import _is_authorized_for_channel
from app.core.security import create_access_token
from app.core.websockets import WebSocketConnectionManager, broadcast_realtime, to_utc_iso, ws_manager
from app.main import app
from app.services.kafka import KafkaEvent, KafkaTopics, kafka_producer


def test_to_utc_iso_strict_z_suffix():
    """Verify naive-UTC and offset-aware datetimes normalize to strict '...Z' strings."""
    naive_dt = datetime(2026, 11, 12, 16, 30, 0)
    assert to_utc_iso(naive_dt) == "2026-11-12T16:30:00Z"

    ist_dt = datetime(2026, 11, 12, 22, 0, 0, tzinfo=timezone(timedelta(hours=5, minutes=30)))
    assert to_utc_iso(ist_dt) == "2026-11-12T16:30:00Z"
    assert to_utc_iso(None) is None


def test_ws_channel_authorization_catalog_and_chat():
    """Public catalog channel is readable by all; admin channels remain strictly restricted."""
    assert _is_authorized_for_channel(None, "catalog_updates") is True
    assert _is_authorized_for_channel(None, "bookings") is False
    assert _is_authorized_for_channel(None, "dashboard") is False

    cust_payload = {"sub": str(uuid.uuid4()), "role": "customer", "customer_id": str(uuid.uuid4())}
    assert _is_authorized_for_channel(cust_payload, "catalog_updates") is True
    assert _is_authorized_for_channel(cust_payload, "bookings") is False


def test_broadcast_realtime_cross_thread_delivery():
    """
    Simulate synchronous FastAPI worker thread calling broadcast_realtime()
    against a WebSocket bound to the main asyncio event loop.
    """
    class _FakeSocket:
        def __init__(self, loop: asyncio.AbstractEventLoop):
            self._loop = loop
            self.sent = []

        async def accept(self):
            return None

        async def send_json(self, message):
            # Assert coroutine runs strictly on the bound main loop, never a throwaway loop
            assert asyncio.get_running_loop() is self._loop
            self.sent.append(message)

    async def _run():
        main_loop = asyncio.get_running_loop()
        orig_loop = ws_manager._loop
        fake_ws = _FakeSocket(main_loop)
        channel = f"test_channel_{uuid.uuid4().hex}"
        ws_manager.set_event_loop(main_loop)
        ws_manager.subscribe(fake_ws, channel)
        try:
            err_holder = []

            def worker():
                try:
                    broadcast_realtime([channel], {"event_id": "evt-1", "type": "BOOKING_ACCEPTED"})
                except Exception as exc:
                    err_holder.append(exc)

            t = threading.Thread(target=worker)
            t.start()
            t.join(timeout=3.0)
            assert not err_holder

            for _ in range(30):
                if fake_ws.sent:
                    break
                await asyncio.sleep(0.05)

            assert len(fake_ws.sent) == 1
            assert fake_ws.sent[0]["type"] == "BOOKING_ACCEPTED"
        finally:
            ws_manager.disconnect(fake_ws)
            ws_manager._loop = orig_loop

    asyncio.run(_run())


def test_kafka_degraded_relay_delivers_support_event_to_ws():
    """Verify Kafka degraded mode relays SUPPORT_MESSAGE directly to WebSocket subscribers."""
    class _FakeSocket:
        def __init__(self):
            self.sent = []

        async def send_json(self, message):
            self.sent.append(message)

    async def _run():
        main_loop = asyncio.get_running_loop()
        orig_loop = ws_manager._loop
        orig_running = kafka_producer._is_running
        orig_prod = kafka_producer._producer
        orig_prod_loop = kafka_producer._loop

        fake_ws = _FakeSocket()
        ticket_id = str(uuid.uuid4())
        booking_id = str(uuid.uuid4())
        channel = f"booking_{booking_id}"

        ws_manager.set_event_loop(main_loop)
        ws_manager.subscribe(fake_ws, channel)
        kafka_producer._is_running = False
        kafka_producer._producer = None
        kafka_producer._loop = main_loop

        try:
            evt = KafkaEvent(
                event_id=f"msg_{uuid.uuid4().hex}",
                event_type=KafkaTopics.SUPPORT_MESSAGE,
                ticket_id=ticket_id,
                booking_id=booking_id,
                sender_id=str(uuid.uuid4()),
                payload={
                    "ticket_id": ticket_id,
                    "booking_id": booking_id,
                    "message_id": str(uuid.uuid4()),
                    "sender_role": "provider",
                    "sender_name": "Pooja Verma",
                    "message_text": "On my way!",
                },
            )
            ok = kafka_producer.publish_event(KafkaTopics.SUPPORT_MESSAGE, evt)
            assert ok is True

            for _ in range(30):
                if fake_ws.sent:
                    break
                await asyncio.sleep(0.05)

            assert len(fake_ws.sent) == 1
            assert fake_ws.sent[0]["type"] == "NEW_SUPPORT_MESSAGE"
            assert fake_ws.sent[0]["booking_id"] == booking_id
        finally:
            ws_manager.disconnect(fake_ws)
            ws_manager._loop = orig_loop
            kafka_producer._is_running = orig_running
            kafka_producer._producer = orig_prod
            kafka_producer._loop = orig_prod_loop

    asyncio.run(_run())


def test_websocket_stream_authenticated_customer_channels():
    """Verify authenticated customer token authorizes customer_<id> and catalog_updates over /ws/stream."""
    with TestClient(app) as client:
        cust_id = str(uuid.uuid4())
        user_id = str(uuid.uuid4())
        token = create_access_token({"sub": user_id, "role": "customer", "customer_id": cust_id})
        url = f"/ws/stream?channels=customer_{cust_id},catalog_updates&token={token}"
        with client.websocket_connect(url) as ws:
            hello = ws.receive_json()
            assert hello["type"] == "CONNECTION_ESTABLISHED"
            assert hello["authenticated"] is True
            assert f"customer_{cust_id}" in hello["subscribed_channels"]
            assert "catalog_updates" in hello["subscribed_channels"]
            assert hello["rejected_channels"] == []

