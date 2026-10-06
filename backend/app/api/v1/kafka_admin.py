from fastapi import APIRouter
from app.core.config import settings
from app.services.kafka import (
    KafkaTopics,
    KafkaEvent,
    kafka_producer,
    kafka_consumer,
    kafka_event_store,
)

router = APIRouter(prefix="/kafka", tags=["Kafka Operations & Diagnostics"])


def mask_bootstrap(host: str) -> str:
    if not host:
        return ""
    if len(host) <= 8:
        return host[:4] + "***"
    return host[:8] + "***"


def sanitize_text(text: str) -> str:
    if not text:
        return ""
    for secret in [
        getattr(settings, "KAFKA_SASL_PASSWORD", ""),
        getattr(settings, "JWT_SECRET_KEY", ""),
        getattr(settings, "JWT_SECRET", ""),
        getattr(settings, "OPENROUTER_API_KEY", ""),
    ]:
        if secret and len(secret) > 3:
            text = text.replace(secret, "[REDACTED]")
    return text


@router.get("/status")
def get_kafka_status():
    """Retrieve operational status, broker configuration, and event counts for Kafka."""
    summary = kafka_event_store.get_summary()
    last_err_raw = getattr(kafka_producer, "last_error", None)
    last_err = sanitize_text(last_err_raw) if last_err_raw else None
    is_prod_conn = getattr(kafka_producer, "_is_running", False)
    is_cons_conn = kafka_consumer.is_running()

    return {
        "status": "healthy" if is_prod_conn else "degraded",
        "kafka_enabled": settings.KAFKA_ENABLED,
        "enabled": settings.KAFKA_ENABLED,
        "security_protocol": settings.KAFKA_SECURITY_PROTOCOL,
        "sasl_mechanism": (
            settings.KAFKA_SASL_MECHANISM
            if "SASL" in (settings.KAFKA_SECURITY_PROTOCOL or "").upper()
            else None
        ),
        "bootstrap_configured": bool(settings.KAFKA_BOOTSTRAP_SERVERS),
        "bootstrap_servers_masked": mask_bootstrap(settings.KAFKA_BOOTSTRAP_SERVERS),
        "producer_connected": is_prod_conn,
        "consumer_connected": is_cons_conn,
        "consumer_group": settings.KAFKA_CONSUMER_GROUP,
        "expected_topics": KafkaTopics.ALL_TOPICS,
        "topics": KafkaTopics.ALL_TOPICS,
        "last_error": last_err,
        "metrics": summary,
    }


@router.get("/events")
def get_kafka_events(limit: int = 50):
    """Retrieve recent Kafka published and consumed events for audit and verification."""
    return {
        "published": kafka_event_store.get_recent_published(limit=limit),
        "consumed": kafka_event_store.get_recent_consumed(limit=limit),
        "summary": kafka_event_store.get_summary(),
    }


@router.get("/debug/ws-state")
def get_ws_state():
    """Expose active WebSocket channel subscriptions for live diagnostics."""
    from app.core.websockets import ws_manager
    channels = {ch: len(subs) for ch, subs in ws_manager.channel_subscribers.items()}
    total_sockets = len(ws_manager.socket_channels)
    return {
        "total_active_sockets": total_sockets,
        "channels": channels,
        "channel_count": len(channels),
    }


@router.post("/debug/broadcast-test")
async def broadcast_test(channel: str, message: str = "test"):
    """Directly broadcast a test message to a specific WebSocket channel for diagnostics."""
    from app.core.websockets import ws_manager
    payload = {
        "event_id": "debug-broadcast-test",
        "type": "DEBUG_TEST",
        "event": "debug.test",
        "channel": channel,
        "message": message,
    }
    await ws_manager.broadcast_to_channels([channel], payload)
    subs = len(ws_manager.channel_subscribers.get(channel, set()))
    return {"broadcasted": True, "channel": channel, "subscribers_on_channel": subs}


@router.post("/test-event")
def publish_test_event(event_type: str = "booking.created"):
    """Trigger a synthetic Kafka test event."""
    test_event = KafkaEvent(
        event_type=event_type,
        payload={"test": True, "message": "Synthetic verification event"}
    )
    topic = KafkaTopics.BOOKING_CREATED if "created" in event_type else (
        KafkaTopics.BOOKING_ACCEPTED if "accepted" in event_type else (
            KafkaTopics.BOOKING_REJECTED if "rejected" in event_type else KafkaTopics.SUPPORT_MESSAGE
        )
    )
    success = kafka_producer.publish_event(topic, test_event)
    return {
        "success": success,
        "topic": topic,
        "event_id": test_event.event_id,
        "event": test_event.to_dict(),
    }
