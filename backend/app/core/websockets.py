import logging
from typing import List, Dict, Set, Optional
from fastapi import WebSocket

logger = logging.getLogger("smartserve.websockets")

class WebSocketConnectionManager:
    """
    Robust In-Memory WebSocket Connection Manager.
    Supports multi-channel subscription, auto-cleanup on disconnect,
    and dead-connection removal during broadcast.
    """
    def __init__(self):
        # Maps channel_name -> Set[WebSocket]
        self.channel_subscribers: Dict[str, Set[WebSocket]] = {}
        # Maps WebSocket -> Set[channel_name]
        self.socket_channels: Dict[WebSocket, Set[str]] = {}

    @property
    def active_connections(self) -> Dict[str, List[WebSocket]]:
        """Backwards compatibility property for existing code."""
        return {ch: list(subs) for ch, subs in self.channel_subscribers.items()}

    async def connect(self, websocket: WebSocket, channel: str):
        """Accept the socket connection and subscribe to the initial channel."""
        try:
            await websocket.accept()
        except Exception:
            pass
        self.subscribe(websocket, channel)
        logger.info(f"[WebSocket] Client connected and subscribed to channel '{channel}'")

    def subscribe(self, websocket: WebSocket, channel: str):
        """Subscribe an accepted socket to a channel."""
        if not channel:
            return
        if channel not in self.channel_subscribers:
            self.channel_subscribers[channel] = set()
        self.channel_subscribers[channel].add(websocket)

        if websocket not in self.socket_channels:
            self.socket_channels[websocket] = set()
        self.socket_channels[websocket].add(channel)

    def unsubscribe(self, websocket: WebSocket, channel: str):
        """Unsubscribe a socket from a channel."""
        if channel in self.channel_subscribers:
            self.channel_subscribers[channel].discard(websocket)
            if not self.channel_subscribers[channel]:
                del self.channel_subscribers[channel]

        if websocket in self.socket_channels:
            self.socket_channels[websocket].discard(channel)

    def disconnect(self, websocket: WebSocket, channel: Optional[str] = None):
        """Remove socket from one channel or all subscribed channels."""
        if channel:
            self.unsubscribe(websocket, channel)
            logger.info(f"[WebSocket] Client unsubscribed from channel '{channel}'")
        else:
            channels = list(self.socket_channels.get(websocket, []))
            for ch in channels:
                self.unsubscribe(websocket, ch)
            self.socket_channels.pop(websocket, None)
            logger.info(f"[WebSocket] Client completely disconnected from channels {channels}")

    async def broadcast(self, channel: str, message: dict):
        """Broadcast JSON message to all active subscribers of a channel."""
        await self.broadcast_to_channels([channel], message)

    async def broadcast_to_channels(self, channels: List[str], message: dict):
        """Broadcast JSON message once to each unique client across multiple channels."""
        target_sockets = set()
        for ch in channels:
            if ch and ch in self.channel_subscribers:
                target_sockets.update(self.channel_subscribers[ch])

        if not target_sockets:
            return

        dead_connections = []
        for connection in target_sockets:
            try:
                await connection.send_json(message)
            except Exception:
                dead_connections.append(connection)

        for dead in dead_connections:
            self.disconnect(dead)

        logger.info(f"[WebSocket Broadcast] Sent {message.get('type')} to {len(target_sockets) - len(dead_connections)} client(s) on channels: {channels}")

ws_manager = WebSocketConnectionManager()


def broadcast_realtime(channels: List[str], message: dict):
    """
    Fire-and-forget sync helper that dispatches WebSocket broadcasts
    to the active asyncio event loop without requiring Kafka.
    """
    import asyncio
    try:
        loop = asyncio.get_running_loop()
        loop.create_task(ws_manager.broadcast_to_channels(channels, message))
    except RuntimeError:
        try:
            loop = asyncio.new_event_loop()
            loop.run_until_complete(ws_manager.broadcast_to_channels(channels, message))
            loop.close()
        except Exception as exc:
            logger.warning(f"[WebSocket] broadcast_realtime error: {exc}")


