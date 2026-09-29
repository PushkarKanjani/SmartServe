import json
import logging
from typing import Optional
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query

from app.core.websockets import ws_manager

logger = logging.getLogger("smartserve.websockets.routes")

router = APIRouter(prefix="/ws", tags=["Real-time WebSockets Stream"])

@router.websocket("/stream")
async def websocket_unified_stream(
    websocket: WebSocket,
    channels: Optional[str] = Query(None, description="Comma-separated channel list, e.g. bookings,provider_123")
):
    """
    Unified multi-channel WebSocket stream.
    Clients can subscribe to multiple channels via query param or runtime messages:
      {"action": "subscribe", "channel": "ticket_xyz"}
      {"action": "unsubscribe", "channel": "ticket_xyz"}
      {"action": "ping"}
    """
    await websocket.accept()

    # Initial channel subscriptions
    initial_channels = [ch.strip() for ch in (channels or "").split(",") if ch.strip()]
    for ch in initial_channels:
        ws_manager.subscribe(websocket, ch)

    # Confirm connection
    await websocket.send_json({
        "type": "CONNECTION_ESTABLISHED",
        "subscribed_channels": initial_channels
    })

    try:
        while True:
            text_data = await websocket.receive_text()
            try:
                data = json.loads(text_data)
                action = data.get("action")
                target_channel = data.get("channel")

                if action == "subscribe" and target_channel:
                    ws_manager.subscribe(websocket, target_channel)
                    await websocket.send_json({"type": "SUBSCRIBED", "channel": target_channel})
                elif action == "unsubscribe" and target_channel:
                    ws_manager.unsubscribe(websocket, target_channel)
                    await websocket.send_json({"type": "UNSUBSCRIBED", "channel": target_channel})
                elif action == "ping":
                    await websocket.send_json({"type": "pong"})
            except json.JSONDecodeError:
                if text_data.strip() == "ping":
                    await websocket.send_json({"type": "pong"})
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
    except Exception as exc:
        logger.warning(f"[WebSocket /stream] Connection error: {exc}")
        ws_manager.disconnect(websocket)


@router.websocket("/dashboard")
async def websocket_dashboard_stream(websocket: WebSocket):
    """Real-time WebSocket connection for live Operations Dashboard updates."""
    await ws_manager.connect(websocket, "dashboard")
    try:
        while True:
            await websocket.receive_text()
            await websocket.send_json({"type": "pong", "message": "Dashboard stream active"})
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, "dashboard")


@router.websocket("/emergency-alerts")
async def websocket_emergency_stream(websocket: WebSocket):
    """Real-time WebSocket connection for emergency request notifications."""
    await ws_manager.connect(websocket, "emergency")
    try:
        while True:
            await websocket.receive_text()
            await websocket.send_json({"type": "pong", "message": "Emergency alert stream active"})
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, "emergency")


@router.websocket("/bookings")
async def websocket_bookings_stream(websocket: WebSocket):
    """Real-time WebSocket connection for live bookings list updates."""
    await ws_manager.connect(websocket, "bookings")
    try:
        while True:
            await websocket.receive_text()
            await websocket.send_json({"type": "pong", "message": "Bookings stream active"})
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, "bookings")


@router.websocket("/bookings/{booking_id}")
async def websocket_booking_stream(websocket: WebSocket, booking_id: str):
    """Real-time WebSocket connection for live booking tracking."""
    channel = f"booking_{booking_id}"
    await ws_manager.connect(websocket, channel)
    try:
        while True:
            await websocket.receive_text()
            await websocket.send_json({"type": "pong", "booking_id": booking_id, "status": "tracking_active"})
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, channel)


@router.websocket("/chat/{ticket_id}")
async def websocket_chat_stream(websocket: WebSocket, ticket_id: str):
    """Real-time WebSocket connection for live support ticket / booking chat."""
    channel = f"ticket_{ticket_id}"
    await ws_manager.connect(websocket, channel)
    try:
        while True:
            await websocket.receive_text()
            await websocket.send_json({"type": "pong", "ticket_id": ticket_id, "status": "chat_active"})
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, channel)


@router.websocket("/provider/{provider_id}")
async def websocket_provider_stream(websocket: WebSocket, provider_id: str):
    """Real-time WebSocket connection for provider-specific updates."""
    channel = f"provider_{provider_id}"
    await ws_manager.connect(websocket, channel)
    try:
        while True:
            await websocket.receive_text()
            await websocket.send_json({"type": "pong", "provider_id": provider_id, "status": "active"})
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, channel)


@router.websocket("/customer/{customer_id}")
async def websocket_customer_stream(websocket: WebSocket, customer_id: str):
    """Real-time WebSocket connection for customer-specific updates."""
    channel = f"customer_{customer_id}"
    await ws_manager.connect(websocket, channel)
    try:
        while True:
            await websocket.receive_text()
            await websocket.send_json({"type": "pong", "customer_id": customer_id, "status": "active"})
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, channel)
