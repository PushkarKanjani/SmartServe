import asyncio
import logging
from typing import List, Dict, Set, Optional
from fastapi import WebSocket

logger = logging.getLogger("smartserve.websockets")


class WebSocketConnectionManager:
    """
    Robust In-Memory WebSocket Connection Manager.
    Supports multi-channel subscription, auto-cleanup on disconnect,
    thread-safe per-socket lock serialization, and dead-connection removal during broadcast.
    """
    def __init__(self):
        # Maps channel_name -> Set[WebSocket]
        self.channel_subscribers: Dict[str, Set[WebSocket]] = {}
        # Maps WebSocket -> Set[channel_name]
        self.socket_channels: Dict[WebSocket, Set[str]] = {}
        # Maps WebSocket -> asyncio.Lock (prevents concurrent frame interleaving)
        self._socket_locks: Dict[WebSocket, asyncio.Lock] = {}
        # Primary Uvicorn event loop running ASGI / WebSockets
        self._main_loop: Optional[asyncio.AbstractEventLoop] = None

    def set_main_loop(self, loop: asyncio.AbstractEventLoop):
        """Register the primary Uvicorn event loop."""
        self._main_loop = loop
        logger.info("[WebSocket] Main event loop registered with WebSocketConnectionManager")

    def get_main_loop(self) -> Optional[asyncio.AbstractEventLoop]:
        """Return the registered main loop, or active running loop if currently on it."""
        if self._main_loop and self._main_loop.is_running() and not self._main_loop.is_closed():
            return self._main_loop
        try:
            running = asyncio.get_running_loop()
            if running and running.is_running() and not running.is_closed():
                self._main_loop = running
                return running
        except RuntimeError:
            pass
        return None

    def clear_main_loop(self):
        """Clear event loop reference on shutdown."""
        self._main_loop = None

    @property
    def active_connections(self) -> Dict[str, List[WebSocket]]:
        """Backwards compatibility property for existing code."""
        return {ch: list(subs) for ch, subs in self.channel_subscribers.items()}

    async def connect(self, websocket: WebSocket, channel: str):
        """Accept the socket connection and subscribe to the initial channel."""
        self.get_main_loop()  # Auto-capture running loop if not yet registered
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
            self._socket_locks.pop(websocket, None)
            logger.info(f"[WebSocket] Client completely disconnected from channels {channels}")

    async def broadcast(self, channel: str, message: dict):
        """Broadcast JSON message to all active subscribers of a channel."""
        await self.broadcast_to_channels([channel], message)

    async def broadcast_to_channels(self, channels: List[str], message: dict):
        """
        Broadcast JSON message once to each unique client across multiple channels.
        Guarantees that socket failures only remove the specific dead connection
        without interrupting or disconnecting other healthy subscribers.
        """
        target_sockets = set()
        for ch in channels:
            if ch and ch in self.channel_subscribers:
                target_sockets.update(self.channel_subscribers[ch])

        if not target_sockets:
            return

        dead_connections = []
        for connection in target_sockets:
            try:
                # Per-socket lock to prevent concurrent write collisions on the same connection
                lock = self._socket_locks.get(connection)
                if lock is None:
                    lock = asyncio.Lock()
                    self._socket_locks[connection] = lock
                async with lock:
                    await connection.send_json(message)
            except Exception as exc:
                logger.debug(f"[WebSocket] Failed to send message to socket, marking dead: {exc}")
                dead_connections.append(connection)

        for dead in dead_connections:
            self.disconnect(dead)

        sent_count = len(target_sockets) - len(dead_connections)
        event_name = message.get("type") or message.get("event") or "message"
        logger.info(f"[WebSocket Broadcast] Sent {event_name} to {sent_count} client(s) on channels: {channels}")


ws_manager = WebSocketConnectionManager()


def broadcast_realtime(channels: List[str], message: dict):
    """
    Thread-safe synchronous helper that dispatches WebSocket broadcasts to the
    primary Uvicorn event loop from ANY execution context:
      - Worker threads in Starlette/FastAPI synchronous endpoint threadpools
      - Background tasks & celery/thread workers
      - Coroutines on the main loop
    Never instantiates a new event loop. Prevents cross-thread socket corruption.
    """
    if not channels or not message:
        return

    main_loop = ws_manager.get_main_loop()

    # Case 1: Caller is already executing on the active event loop
    try:
        current_loop = asyncio.get_running_loop()
    except RuntimeError:
        current_loop = None

    if current_loop and current_loop == main_loop and current_loop.is_running():
        current_loop.create_task(ws_manager.broadcast_to_channels(channels, message))
        return

    # Case 2: Caller is in a worker thread (synchronous endpoint) or external thread
    if main_loop and main_loop.is_running() and not main_loop.is_closed():
        try:
            asyncio.run_coroutine_threadsafe(
                ws_manager.broadcast_to_channels(channels, message),
                main_loop
            )
        except Exception as exc:
            logger.warning(f"[WebSocket] Failed to dispatch coroutine to main loop: {exc}")
    else:
        logger.warning("[WebSocket] broadcast_realtime skipped: No running main event loop registered.")


async def broadcast_realtime_async(channels: List[str], message: dict):
    """Asynchronous helper for native coroutine contexts."""
    if not channels or not message:
        return
    await ws_manager.broadcast_to_channels(channels, message)
