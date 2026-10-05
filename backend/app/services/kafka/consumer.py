import asyncio
import json
import logging
import ssl
from collections import deque
from typing import Optional, Set, Dict, Any
from aiokafka import AIOKafkaConsumer

from app.core.config import settings
from app.core.websockets import ws_manager
from app.services.kafka.topics import KafkaTopics
from app.services.kafka.store import kafka_event_store

logger = logging.getLogger("smartserve.kafka.consumer")


class KafkaConsumerService:
    def __init__(self):
        self._consumer: Optional[AIOKafkaConsumer] = None
        self._task: Optional[asyncio.Task] = None
        self._is_running: bool = False
        self._processed_event_ids: Set[str] = set()
        self._processed_event_order: deque = deque(maxlen=10000)

    def is_running(self) -> bool:
        return self._is_running

    async def start(self):
        """Start the background consumer task."""
        if not settings.KAFKA_ENABLED:
            logger.info("[Kafka Consumer] KAFKA_ENABLED is false; skipping consumer startup.")
            return

        if self._task and not self._task.done():
            logger.warning("[Kafka Consumer] Consumer loop already running.")
            return

        self._is_running = True
        self._task = asyncio.create_task(self._run_consumer_loop())
        logger.info("[Kafka Consumer] Background consumer loop initialized.")

    async def stop(self):
        """Stop the background consumer gracefully."""
        self._is_running = False
        if self._task:
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
            self._task = None

        if self._consumer:
            try:
                await self._consumer.stop()
            except Exception as exc:
                logger.warning(f"[Kafka Consumer] Error closing consumer: {exc}")
            finally:
                self._consumer = None

        logger.info("[Kafka Consumer] Background consumer stopped.")

    async def _run_consumer_loop(self):
        """Main resilient consumer loop with retry backoff."""
        retry_delay = 2.0

        while self._is_running:
            try:
                logger.info(
                    f"[Kafka Consumer] Connecting to {settings.KAFKA_BOOTSTRAP_SERVERS} "
                    f"as group '{settings.KAFKA_CONSUMER_GROUP}' for topics {KafkaTopics.ALL_TOPICS}"
                )
                consumer_kwargs: Dict[str, Any] = {
                    "bootstrap_servers": settings.KAFKA_BOOTSTRAP_SERVERS,
                    "group_id": settings.KAFKA_CONSUMER_GROUP,
                    "auto_offset_reset": "latest",
                    "enable_auto_commit": True,
                    "value_deserializer": lambda v: json.loads(v.decode("utf-8")),
                }

                protocol = (settings.KAFKA_SECURITY_PROTOCOL or "PLAINTEXT").upper()
                if protocol in ("SASL_SSL", "SASL_PLAINTEXT", "SSL"):
                    consumer_kwargs["security_protocol"] = protocol
                    if "SASL" in protocol:
                        consumer_kwargs["sasl_mechanism"] = (settings.KAFKA_SASL_MECHANISM or "PLAIN").upper()
                        if settings.KAFKA_SASL_USERNAME:
                            consumer_kwargs["sasl_plain_username"] = settings.KAFKA_SASL_USERNAME
                        if settings.KAFKA_SASL_PASSWORD:
                            consumer_kwargs["sasl_plain_password"] = settings.KAFKA_SASL_PASSWORD
                    if "SSL" in protocol:
                        consumer_kwargs["ssl_context"] = ssl.create_default_context()

                self._consumer = AIOKafkaConsumer(
                    *KafkaTopics.ALL_TOPICS,
                    **consumer_kwargs
                )
                await self._consumer.start()
                retry_delay = 2.0
                logger.info("[Kafka Consumer] Connected and actively listening to topics.")

                async for msg in self._consumer:
                    if not self._is_running:
                        break
                    await self._process_message(msg.topic, msg.value)

            except asyncio.CancelledError:
                logger.info("[Kafka Consumer] Consumer loop cancelled.")
                break
            except Exception as exc:
                logger.warning(
                    f"[Kafka Consumer] Consumer encountered error: {exc}. Retrying in {retry_delay:.1f}s..."
                )
                kafka_event_store.record_error(str(exc))
                if self._consumer:
                    try:
                        await self._consumer.stop()
                    except Exception:
                        pass
                    self._consumer = None

                await asyncio.sleep(retry_delay)
                retry_delay = min(retry_delay * 1.5, 30.0)

    async def _process_message(self, topic: str, data: Dict[str, Any]):
        """
        Process incoming Kafka event idempotently.
        Ensures duplicate messages never cause duplicate actions or database entries.
        """
        try:
            event_id = data.get("event_id")

            # 1. Idempotency Check
            if event_id:
                if event_id in self._processed_event_ids:
                    logger.info(
                        f"[Kafka Consumer IDEMPOTENT] Duplicate event received and safely skipped: "
                        f"ID={event_id} | Topic={topic}"
                    )
                    kafka_event_store.record_duplicate(topic, event_id)
                    return

                # Record event_id to prevent duplicates
                self._processed_event_ids.add(event_id)
                self._processed_event_order.append(event_id)
                # Purge old IDs if set gets too large
                if len(self._processed_event_ids) > 10000:
                    oldest_id = self._processed_event_order.popleft()
                    self._processed_event_ids.discard(oldest_id)

            # Record event in monitoring store
            kafka_event_store.record_consumed(topic, data)

            event_type = data.get("event_type", topic)
            booking_id = data.get("booking_id")
            ticket_id = data.get("ticket_id")
            payload = data.get("payload", {})

            # 2. Topic-specific asynchronous processing
            if topic == KafkaTopics.BOOKING_CREATED or event_type == "booking.created":
                await self._handle_booking_created(data, booking_id, payload)
            elif topic == KafkaTopics.BOOKING_ACCEPTED or event_type == "booking.accepted":
                await self._handle_booking_accepted(data, booking_id, payload)
            elif topic == KafkaTopics.BOOKING_REJECTED or event_type == "booking.rejected":
                await self._handle_booking_rejected(data, booking_id, payload)
            elif topic == KafkaTopics.BOOKING_STARTED or event_type == "booking.started":
                await self._handle_booking_started(data, booking_id, payload)
            elif topic == KafkaTopics.BOOKING_COMPLETED or event_type == "booking.completed":
                await self._handle_booking_completed(data, booking_id, payload)
            elif topic == KafkaTopics.PROVIDER_LOCATION_UPDATED or event_type == "provider.location.updated":
                await self._handle_provider_location_updated(data, booking_id, payload)
            elif topic == KafkaTopics.SUPPORT_MESSAGE or event_type == "support.message":
                await self._handle_support_message(data, ticket_id, booking_id, payload)
            else:
                logger.info(f"[Kafka Consumer] Received unhandled topic '{topic}': {data}")

        except Exception as exc:
            logger.error(f"[Kafka Consumer] Failed to process message from topic '{topic}': {exc}", exc_info=True)
            kafka_event_store.record_error(str(exc))

    async def _handle_booking_created(self, event: Dict[str, Any], booking_id: Optional[str], payload: Dict[str, Any]):
        """
        Provider service consumes booking.created -> receives booking request.
        Admin service consumes booking.created -> displays booking from PostgreSQL.
        """
        provider_id = event.get("receiver_id") or payload.get("provider_id")
        provider_name = payload.get("provider_name", "Service Provider")
        customer_name = payload.get("customer_name", "Customer")
        service_name = payload.get("service_name", "Service")
        booking_ref = payload.get("booking_reference", booking_id)

        # 1. Provider Service Consumer Log & Notification
        logger.info(
            f"[Kafka Consumer -> Provider Service] Received booking.created event: "
            f"Booking #{booking_ref} assigned to Provider '{provider_name}' (ID: {provider_id}) | "
            f"Service: '{service_name}' | Customer: '{customer_name}'"
        )

        # 2. Admin Service Consumer Log
        logger.info(
            f"[Kafka Consumer -> Admin Service] Received booking.created event: "
            f"New booking #{booking_ref} created in PostgreSQL. Admin oversight queue updated."
        )

        # 3. Real-time broadcast to WebSockets
        broadcast_msg = {
            "event_id": event.get("event_id"),
            "type": "BOOKING_CREATED",
            "event": "booking.created",
            "event_type": "booking.created",
            "booking_id": booking_id,
            "status": "Assigned",
            "booking": payload,
            "data": payload,
        }
        channels = ["dashboard", "bookings"]
        if booking_id:
            channels.append(f"booking_{booking_id}")
        if provider_id:
            channels.append(f"provider_{provider_id}")
            channels.append(f"user_{provider_id}")
        customer_id = payload.get("customer_id") or event.get("customer_id")
        if customer_id:
            channels.append(f"customer_{customer_id}")
        await ws_manager.broadcast_to_channels(channels, broadcast_msg)

        if payload.get("emergency_flag"):
            await ws_manager.broadcast("emergency", {
                "type": "EMERGENCY_ALERT",
                "title": f"🚨 Emergency Booking Request: {service_name}",
                "message": f"Emergency booking #{booking_ref} by {customer_name}",
                "booking_id": booking_id,
            })

    async def _handle_booking_accepted(self, event: Dict[str, Any], booking_id: Optional[str], payload: Dict[str, Any]):
        """
        Customer receives the updated Accepted status.
        Admin receives the updated Accepted status.
        """
        customer_id = event.get("receiver_id") or payload.get("customer_id")
        provider_name = payload.get("provider_name", "Service Provider")
        booking_ref = payload.get("booking_reference", booking_id)

        # 1. Customer Service Consumer Log
        logger.info(
            f"[Kafka Consumer -> Customer Service] Received booking.accepted event: "
            f"Booking #{booking_ref} accepted by Provider '{provider_name}'. Notifying Customer #{customer_id}."
        )

        # 2. Admin Service Consumer Log
        logger.info(
            f"[Kafka Consumer -> Admin Service] Received booking.accepted event: "
            f"Booking #{booking_ref} status updated to 'Accepted' in PostgreSQL."
        )

        # 3. Real-time broadcast
        broadcast_msg = {
            "event_id": event.get("event_id"),
            "type": "BOOKING_ACCEPTED",
            "event": "booking.accepted",
            "event_type": "booking.accepted",
            "booking_id": booking_id,
            "status": "Accepted",
            "booking": payload,
            "data": payload,
        }
        channels = ["dashboard", "bookings"]
        if booking_id:
            channels.append(f"booking_{booking_id}")
        if customer_id:
            channels.append(f"customer_{customer_id}")
            channels.append(f"user_{customer_id}")
        customer_user_id = payload.get("customer_user_id")
        if customer_user_id:
            channels.append(f"customer_{customer_user_id}")
            channels.append(f"user_{customer_user_id}")
        provider_id = payload.get("provider_id") or event.get("sender_id")
        if provider_id:
            channels.append(f"provider_{provider_id}")
            channels.append(f"user_{provider_id}")
        await ws_manager.broadcast_to_channels(channels, broadcast_msg)

    async def _handle_booking_rejected(self, event: Dict[str, Any], booking_id: Optional[str], payload: Dict[str, Any]):
        """
        Customer receives rejection/cancellation + reason.
        Admin receives rejection + reason.
        """
        customer_id = event.get("receiver_id") or payload.get("customer_id")
        reason = payload.get("reason") or payload.get("rejection_reason") or payload.get("cancellation_reason", "Provider unavailable")
        booking_ref = payload.get("booking_reference", booking_id)

        # 1. Customer Service Consumer Log
        logger.info(
            f"[Kafka Consumer -> Customer Service] Received booking.rejected event: "
            f"Booking #{booking_ref} rejected by partner. Reason: '{reason}'. "
            f"Notifying Customer #{customer_id}."
        )

        # 2. Admin Service Consumer Log
        logger.info(
            f"[Kafka Consumer -> Admin Service] Received booking.rejected event: "
            f"Booking #{booking_ref} marked Rejected in PostgreSQL. Reason: '{reason}' recorded."
        )

        # 3. Real-time broadcast
        broadcast_msg = {
            "event_id": event.get("event_id"),
            "type": "BOOKING_REJECTED",
            "event": "booking.rejected",
            "event_type": "booking.rejected",
            "booking_id": booking_id,
            "status": "Rejected",
            "reason": reason,
            "rejection_reason": reason,
            "cancellation_reason": reason,
            "booking": payload,
            "data": payload,
        }
        channels = ["dashboard", "bookings"]
        if booking_id:
            channels.append(f"booking_{booking_id}")
        if customer_id:
            channels.append(f"customer_{customer_id}")
            channels.append(f"user_{customer_id}")
        customer_user_id = payload.get("customer_user_id")
        if customer_user_id:
            channels.append(f"customer_{customer_user_id}")
            channels.append(f"user_{customer_user_id}")
        provider_id = payload.get("provider_id") or event.get("sender_id")
        if provider_id:
            channels.append(f"provider_{provider_id}")
            channels.append(f"user_{provider_id}")
        await ws_manager.broadcast_to_channels(channels, broadcast_msg)

    async def _handle_booking_started(self, event: Dict[str, Any], booking_id: Optional[str], payload: Dict[str, Any]):
        """Customer and Admin receive booking.started status update."""
        customer_id = event.get("receiver_id") or payload.get("customer_id")
        provider_name = payload.get("provider_name", "Service Provider")
        booking_ref = payload.get("booking_reference", booking_id)

        logger.info(
            f"[Kafka Consumer -> Customer & Admin] Received booking.started event: "
            f"Booking #{booking_ref} started by Provider '{provider_name}'."
        )
        broadcast_msg = {
            "event_id": event.get("event_id"),
            "type": "BOOKING_STARTED",
            "event": "booking.started",
            "event_type": "booking.started",
            "booking_id": booking_id,
            "status": "Started",
            "booking": payload,
            "data": payload,
        }
        channels = ["dashboard", "bookings"]
        if booking_id:
            channels.append(f"booking_{booking_id}")
        if customer_id:
            channels.append(f"customer_{customer_id}")
            channels.append(f"user_{customer_id}")
        customer_user_id = payload.get("customer_user_id")
        if customer_user_id:
            channels.append(f"customer_{customer_user_id}")
            channels.append(f"user_{customer_user_id}")
        provider_id = payload.get("provider_id") or event.get("sender_id")
        if provider_id:
            channels.append(f"provider_{provider_id}")
            channels.append(f"user_{provider_id}")
        await ws_manager.broadcast_to_channels(channels, broadcast_msg)

    async def _handle_booking_completed(self, event: Dict[str, Any], booking_id: Optional[str], payload: Dict[str, Any]):
        """Customer and Admin receive booking.completed status update."""
        customer_id = event.get("receiver_id") or payload.get("customer_id")
        provider_name = payload.get("provider_name", "Service Provider")
        booking_ref = payload.get("booking_reference", booking_id)

        logger.info(
            f"[Kafka Consumer -> Customer & Admin] Received booking.completed event: "
            f"Booking #{booking_ref} completed by Provider '{provider_name}'."
        )
        broadcast_msg = {
            "event_id": event.get("event_id"),
            "type": "BOOKING_COMPLETED",
            "event": "booking.completed",
            "event_type": "booking.completed",
            "booking_id": booking_id,
            "status": "Completed",
            "booking": payload,
            "data": payload,
        }
        channels = ["dashboard", "bookings"]
        if booking_id:
            channels.append(f"booking_{booking_id}")
        if customer_id:
            channels.append(f"customer_{customer_id}")
            channels.append(f"user_{customer_id}")
        customer_user_id = payload.get("customer_user_id")
        if customer_user_id:
            channels.append(f"customer_{customer_user_id}")
            channels.append(f"user_{customer_user_id}")
        provider_id = payload.get("provider_id") or event.get("sender_id")
        if provider_id:
            channels.append(f"provider_{provider_id}")
            channels.append(f"user_{provider_id}")
        await ws_manager.broadcast_to_channels(channels, broadcast_msg)

    async def _handle_provider_location_updated(self, event: Dict[str, Any], booking_id: Optional[str], payload: Dict[str, Any]):
        """Customer live map and Admin monitor receive real-time GPS coordinate update."""
        customer_id = event.get("receiver_id") or payload.get("customer_id")
        provider_id = event.get("sender_id") or payload.get("provider_id")
        lat = payload.get("latitude")
        lng = payload.get("longitude")

        broadcast_msg = {
            "event_id": event.get("event_id"),
            "type": "PROVIDER_LOCATION_UPDATED",
            "event": "provider.location.updated",
            "event_type": "provider.location.updated",
            "booking_id": booking_id,
            "provider_id": provider_id,
            "provider_name": payload.get("provider_name"),
            "latitude": float(lat) if lat is not None else None,
            "longitude": float(lng) if lng is not None else None,
            "heading": payload.get("heading"),
            "speed": payload.get("speed"),
            "accuracy": payload.get("accuracy"),
            "updated_at": payload.get("updated_at"),
            "status": payload.get("status", "On the Way"),
        }
        channels = ["dashboard"]
        if booking_id:
            channels.append(f"booking_{booking_id}")
        if customer_id:
            channels.append(f"customer_{customer_id}")
            channels.append(f"user_{customer_id}")
        await ws_manager.broadcast_to_channels(channels, broadcast_msg)

    async def _handle_support_message(self, event: Dict[str, Any], ticket_id: Optional[str], booking_id: Optional[str], payload: Dict[str, Any]):
        """
        For Customer <-> Provider and Provider <-> Admin messages:
        Save message to PostgreSQL first (done by REST).
        Appropriate consumers receive the update.
        Super Admin monitors Customer <-> Provider conversations.
        """
        sender_role = payload.get("sender_role", "User")
        sender_name = payload.get("sender_name", sender_role.title())
        message_text = payload.get("message_text", "")
        sender_id = event.get("sender_id") or payload.get("sender_id")
        receiver_id = event.get("receiver_id") or payload.get("receiver_id")
        customer_user_id = payload.get("customer_user_id")

        logger.info(
            f"[Kafka Consumer -> Support/Chat Service] Received support.message on Ticket #{ticket_id}: "
            f"From [{sender_role}] '{sender_name}': '{message_text[:80]}' (Booking: {booking_id})"
        )

        # Super Admin Monitoring Notice
        logger.info(
            f"[Kafka Consumer -> Super Admin Monitor] Audited conversation update on Ticket #{ticket_id}. "
            f"Super Admin visibility active. Sender: {sender_role} ({sender_name})."
        )

        # Standardize payload message fields for frontend ingestion
        msg_obj = {
            "id": payload.get("message_id") or payload.get("id") or event.get("event_id"),
            "ticket_id": ticket_id,
            "booking_id": booking_id,
            "sender_id": sender_id,
            "sender_role": sender_role,
            "sender_name": sender_name,
            "message_text": message_text,
            "message": message_text,
            "attachment_url": payload.get("attachment_url"),
            "category": payload.get("category"),
            "created_at": payload.get("created_at") or event.get("timestamp") or "",
        }

        # Real-time WebSocket broadcast to relevant parties
        broadcast_msg = {
            "event_id": event.get("event_id"),
            "type": "NEW_SUPPORT_MESSAGE",
            "event_type": "support.message",
            "ticket_id": ticket_id,
            "booking_id": booking_id,
            "message": msg_obj,
            "data": msg_obj,
        }
        channels = ["dashboard", "support_tickets", "support"]
        if ticket_id:
            channels.append(f"ticket_{ticket_id}")
        if booking_id:
            channels.append(f"booking_{booking_id}")
            channels.append(f"booking_chat_{booking_id}")
        if sender_id:
            channels.extend([f"user_{sender_id}", f"provider_{sender_id}", f"customer_{sender_id}"])
        if receiver_id:
            channels.extend([f"user_{receiver_id}", f"provider_{receiver_id}", f"customer_{receiver_id}"])
        if customer_user_id:
            channels.extend([f"user_{customer_user_id}", f"customer_{customer_user_id}"])
        await ws_manager.broadcast_to_channels(channels, broadcast_msg)


kafka_consumer = KafkaConsumerService()
