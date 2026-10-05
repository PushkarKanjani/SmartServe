import asyncio
import json
import logging
import ssl
from typing import Optional, Union, Dict, Any
from aiokafka import AIOKafkaProducer
from app.core.config import settings
from app.services.kafka.events import KafkaEvent
from app.services.kafka.store import kafka_event_store

logger = logging.getLogger("smartserve.kafka.producer")


class KafkaProducerService:
    def __init__(self):
        self._producer: Optional[AIOKafkaProducer] = None
        self._loop: Optional[asyncio.AbstractEventLoop] = None
        self._is_running: bool = False

    async def start(self):
        """Initialize and start the Kafka producer."""
        if not settings.KAFKA_ENABLED:
            logger.info("[Kafka Producer] KAFKA_ENABLED is false; skipping producer startup.")
            return

        try:
            self._loop = asyncio.get_running_loop()

            producer_kwargs: Dict[str, Any] = {
                "bootstrap_servers": settings.KAFKA_BOOTSTRAP_SERVERS,
                "value_serializer": lambda v: json.dumps(v, default=str).encode("utf-8"),
                "request_timeout_ms": 5000,
                "retry_backoff_ms": 500,
            }

            protocol = (settings.KAFKA_SECURITY_PROTOCOL or "PLAINTEXT").upper()
            if protocol in ("SASL_SSL", "SASL_PLAINTEXT", "SSL"):
                producer_kwargs["security_protocol"] = protocol
                if "SASL" in protocol:
                    producer_kwargs["sasl_mechanism"] = (settings.KAFKA_SASL_MECHANISM or "PLAIN").upper()
                    if settings.KAFKA_SASL_USERNAME:
                        producer_kwargs["sasl_plain_username"] = settings.KAFKA_SASL_USERNAME
                    if settings.KAFKA_SASL_PASSWORD:
                        producer_kwargs["sasl_plain_password"] = settings.KAFKA_SASL_PASSWORD
                if "SSL" in protocol:
                    producer_kwargs["ssl_context"] = ssl.create_default_context()

            self._producer = AIOKafkaProducer(**producer_kwargs)
            await self._producer.start()
            self._is_running = True
            logger.info(f"[Kafka Producer] Successfully connected to broker at {settings.KAFKA_BOOTSTRAP_SERVERS}")
        except Exception as exc:
            logger.warning(
                f"[Kafka Producer] Could not connect to Kafka broker at {settings.KAFKA_BOOTSTRAP_SERVERS}: {exc}. "
                "Running in degraded fallback mode (REST & DB operations will continue unaffected)."
            )
            self._producer = None
            self._is_running = False

    async def stop(self):
        """Stop the Kafka producer cleanly."""
        if self._producer and self._is_running:
            try:
                await self._producer.stop()
                logger.info("[Kafka Producer] Producer stopped.")
            except Exception as exc:
                logger.warning(f"[Kafka Producer] Error stopping producer: {exc}")
            finally:
                self._producer = None
                self._is_running = False

    async def _send_async(self, topic: str, event_dict: Dict[str, Any]) -> bool:
        """Internal coroutine to deliver an event to Kafka."""
        if not self._is_running or not self._producer:
            logger.debug(f"[Kafka Producer] Producer not running. Event for topic '{topic}' not sent to broker.")
            return False

        try:
            await self._producer.send_and_wait(topic, event_dict)
            logger.info(
                f"[Kafka Producer] Published event '{event_dict.get('event_type')}' "
                f"(id: {event_dict.get('event_id')}) to topic '{topic}'"
            )
            return True
        except Exception as exc:
            logger.warning(
                f"[Kafka Producer] Failed to publish event to topic '{topic}': {exc}. "
                "Database transaction remains safe."
            )
            kafka_event_store.record_error(str(exc))
            return False

    def publish_event(self, topic: str, event: Union[KafkaEvent, Dict[str, Any]]) -> bool:
        """
        Publish an event to a Kafka topic.
        Safe for use from synchronous FastAPI endpoint threads, background workers, or coroutines.
        Guarantees that Kafka failure will NEVER break the calling REST / PostgreSQL transaction.
        """
        if isinstance(event, KafkaEvent):
            event_dict = event.to_dict()
        elif isinstance(event, dict):
            event_dict = event
        else:
            event_dict = dict(event)

        # Always record in monitoring store
        kafka_event_store.record_published(topic, event_dict)

        if not self._is_running or not self._producer:
            logger.info(
                f"[Kafka Event Recorded] (Producer inactive) Topic: {topic} | "
                f"Type: {event_dict.get('event_type')} | ID: {event_dict.get('event_id')}"
            )
            return False

        try:
            # Check if caller is inside the same event loop
            try:
                current_loop = asyncio.get_running_loop()
            except RuntimeError:
                current_loop = None

            if current_loop and current_loop == self._loop:
                # Schedule as non-blocking background task on the active loop
                current_loop.create_task(self._send_async(topic, event_dict))
                return True
            elif self._loop and self._loop.is_running():
                # Called from a worker thread in FastAPI's threadpool (sync endpoint)
                future = asyncio.run_coroutine_threadsafe(
                    self._send_async(topic, event_dict),
                    self._loop
                )
                try:
                    # Give it a short timeout so synchronous response isn't delayed
                    return future.result(timeout=3.0)
                except Exception as exc:
                    logger.warning(f"[Kafka Producer Sync Wait] Timeout/error delivering to {topic}: {exc}")
                    return False
            else:
                logger.warning(f"[Kafka Producer] No active event loop available to send event to {topic}")
                return False
        except Exception as exc:
            logger.warning(f"[Kafka Producer] Unexpected error in publish_event to {topic}: {exc}")
            kafka_event_store.record_error(str(exc))
            return False

    async def publish_event_async(self, topic: str, event: Union[KafkaEvent, Dict[str, Any]]) -> bool:
        """Coroutine version for explicit async endpoint workflows."""
        if isinstance(event, KafkaEvent):
            event_dict = event.to_dict()
        else:
            event_dict = event

        kafka_event_store.record_published(topic, event_dict)
        return await self._send_async(topic, event_dict)


kafka_producer = KafkaProducerService()
