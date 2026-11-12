import asyncio
import logging
from datetime import datetime, timezone
from typing import List, Dict, Set, Optional
from fastapi import WebSocket


def to_utc_iso(dt: Optional[datetime]) -> Optional[str]:
    """Serialize a naive-UTC or tz-aware datetime into strict UTC ISO-8601 ('...Z')."""
    if dt is None:
        return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    else:
        dt = dt.astimezone(timezone.utc)
    return dt.isoformat().replace("+00:00", "Z")

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
        # Main Uvicorn asyncio event loop for thread-safe broadcasts from sync routes
        self._loop: Optional[asyncio.AbstractEventLoop] = None

    def set_event_loop(self, loop: asyncio.AbstractEventLoop) -> None:
        """Bind the server's main asyncio event loop for cross-thread broadcasts."""
        self._loop = loop

    @property
    def active_connections(self) -> Dict[str, List[WebSocket]]:
        """Backwards compatibility property for existing code."""
        return {ch: list(subs) for ch, subs in self.channel_subscribers.items()}

    async def connect(self, websocket: WebSocket, channel: str):
        """Accept the socket connection and subscribe to the initial channel."""
        try:
            self._loop = asyncio.get_running_loop()
        except RuntimeError:
            pass
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
        if self._loop is None:
            try:
                self._loop = asyncio.get_running_loop()
            except RuntimeError:
                pass
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
            except Exception as exc:
                logger.debug(f"[WebSocket Broadcast] Removing dead connection after send failure: {exc}")
                dead_connections.append(connection)

        for dead in dead_connections:
            self.disconnect(dead)

        logger.info(
            f"[WebSocket Broadcast] Sent {message.get('type')} to {len(target_sockets) - len(dead_connections)} client(s) on channels: {channels}"
        )


ws_manager = WebSocketConnectionManager()


def broadcast_realtime(channels: List[str], message: dict):
    """
    Fire-and-forget helper that dispatches WebSocket broadcasts onto the server's
    main asyncio event loop cleanly, even when invoked from synchronous FastAPI worker threads.
    """
    try:
        running_loop = asyncio.get_running_loop()
    except RuntimeError:
        running_loop = None

    target_loop = ws_manager._loop

    if running_loop and running_loop.is_running() and (target_loop is None or target_loop is running_loop):
        if target_loop is None:
            ws_manager.set_event_loop(running_loop)
        running_loop.create_task(ws_manager.broadcast_to_channels(channels, message))
        return

    if target_loop and target_loop.is_running():
        future = asyncio.run_coroutine_threadsafe(
            ws_manager.broadcast_to_channels(channels, message),
            target_loop,
        )

        def _log_future_error(fut):
            try:
                fut.result()
            except Exception as exc:
                logger.warning(f"[WebSocket] broadcast_realtime async error: {exc}")

        future.add_done_callback(_log_future_error)
        return

    logger.debug(
        f"[WebSocket] broadcast_realtime skipped {message.get('type')}: no active main event loop bound yet."
    )


