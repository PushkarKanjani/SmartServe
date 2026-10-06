import asyncio
import json
import logging
from typing import Optional, Union, Dict, Any

from aiokafka import AIOKafkaProducer

from app.core.config import settings
from app.services.kafka.events import KafkaEvent
from app.services.kafka.store import kafka_event_store
from app.services.kafka.transport import build_kafka_kwargs

logger = logging.getLogger("smartserve.kafka.producer")

_STARTUP_ATTEMPTS = 5
_STARTUP_BACKOFF_S = 2.0


class KafkaProducerService:
    def __init__(self):
        self._producer: Optional[AIOKafkaProducer] = None
        self._loop: Optional[asyncio.AbstractEventLoop] = None
        self._is_running: bool = False
        self._last_error: Optional[str] = None

    @property
    def last_error(self) -> Optional[str]:
        return self._last_error

    async def start(self):
        """
        Initialize and start the Kafka producer with a 5-attempt retry loop.
        On final failure, logs CRITICAL and continues in degraded mode —
        the app never crashes because Kafka is unavailable.
        """
        if not settings.KAFKA_ENABLED:
            logger.info("[Kafka Producer] KAFKA_ENABLED is false; skipping producer startup.")
            return

        self._loop = asyncio.get_running_loop()

        for attempt in range(1, _STARTUP_ATTEMPTS + 1):
            try:
                producer_kwargs = build_kafka_kwargs()
                producer_kwargs.update({
                    "value_serializer": lambda v: json.dumps(v, default=str).encode("utf-8"),
                    "request_timeout_ms": 10_000,
                    "retry_backoff_ms": 500,
                })

                self._producer = AIOKafkaProducer(**producer_kwargs)
                await self._producer.start()
                self._is_running = True
                self._last_error = None
                logger.info(
                    "[Kafka Producer] Connected (attempt %d/%d) to %s...",
                    attempt,
                    _STARTUP_ATTEMPTS,
                    settings.KAFKA_BOOTSTRAP_SERVERS[:16],
                )
                return  # success — exit retry loop

            except Exception as exc:
                # Sanitize: never log password fragments
                safe_exc = str(exc).replace(settings.KAFKA_SASL_PASSWORD or "", "***")
                self._last_error = safe_exc
                self._producer = None
                self._is_running = False

                if attempt < _STARTUP_ATTEMPTS:
                    logger.warning(
                        "[Kafka Producer] Attempt %d/%d failed: %s. Retrying in %.1fs...",
                        attempt, _STARTUP_ATTEMPTS, safe_exc, _STARTUP_BACKOFF_S,
                    )
                    await asyncio.sleep(_STARTUP_BACKOFF_S)
                else:
                    logger.critical(
                        "[Kafka Producer] Kafka unavailable after %d attempts — "
                        "starting in degraded mode (REST & DB operations unaffected). "
                        "Last error: %s",
                        _STARTUP_ATTEMPTS, safe_exc,
                    )
                    kafka_event_store.record_error(safe_exc)

    async def stop(self):
        """Stop the Kafka producer cleanly."""
        if self._producer and self._is_running:
            try:
                await self._producer.stop()
                logger.info("[Kafka Producer] Producer stopped.")
            except Exception as exc:
                logger.warning("[Kafka Producer] Error stopping producer: %s", exc)
            finally:
                self._producer = None
                self._is_running = False

    async def _send_async(self, topic: str, event_dict: Dict[str, Any]) -> bool:
        """Internal coroutine to deliver an event to Kafka."""
        if not self._is_running or not self._producer:
            logger.debug(
                "[Kafka Producer] Producer not running. Event for topic '%s' not sent to broker.",
                topic,
            )
            return False

        try:
            await self._producer.send_and_wait(topic, event_dict)
            logger.info(
                "[Kafka Producer] Published event '%s' (id: %s) to topic '%s'",
                event_dict.get("event_type"),
                event_dict.get("event_id"),
                topic,
            )
            return True
        except Exception as exc:
            safe_exc = str(exc).replace(settings.KAFKA_SASL_PASSWORD or "", "***")
            logger.warning(
                "[Kafka Producer] Failed to publish to topic '%s': %s. "
                "Database transaction remains safe.",
                topic, safe_exc,
            )
            kafka_event_store.record_error(safe_exc)
            self._last_error = safe_exc
            return False

    def publish_event(self, topic: str, event: Union[KafkaEvent, Dict[str, Any]]) -> bool:
        """
        Publish an event to a Kafka topic.
        Safe for use from synchronous FastAPI endpoint threads, background workers,
        or coroutines.  Kafka failure NEVER breaks the calling REST/PostgreSQL transaction.
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
                "[Kafka Event Recorded] (Producer inactive) Topic: %s | Type: %s | ID: %s",
                topic, event_dict.get("event_type"), event_dict.get("event_id"),
            )
            return False

        try:
            try:
                current_loop = asyncio.get_running_loop()
            except RuntimeError:
                current_loop = None

            if current_loop and current_loop == self._loop:
                current_loop.create_task(self._send_async(topic, event_dict))
                return True
            elif self._loop and self._loop.is_running():
                future = asyncio.run_coroutine_threadsafe(
                    self._send_async(topic, event_dict),
                    self._loop,
                )
                try:
                    return future.result(timeout=3.0)
                except Exception as exc:
                    safe_exc = str(exc).replace(settings.KAFKA_SASL_PASSWORD or "", "***")
                    logger.warning(
                        "[Kafka Producer Sync Wait] Timeout/error delivering to %s: %s",
                        topic, safe_exc,
                    )
                    return False
            else:
                logger.warning(
                    "[Kafka Producer] No active event loop available to send event to %s", topic
                )
                return False
        except Exception as exc:
            safe_exc = str(exc).replace(settings.KAFKA_SASL_PASSWORD or "", "***")
            logger.warning("[Kafka Producer] Unexpected error in publish_event to %s: %s", topic, safe_exc)
            kafka_event_store.record_error(safe_exc)
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
