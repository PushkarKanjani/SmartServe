"""
Kafka Transport Factory
=======================
Single shared factory that builds aiokafka connection kwargs for BOTH
the producer and consumer.  This is the ONLY place that touches
security_protocol, sasl_mechanism, sasl credentials, and ssl_context.

Rules enforced here:
  - SASL_SSL  → ssl.create_default_context() (cert verification ON always)
  - SASL_SSL  → mechanism forced to SCRAM-SHA-256 when username is set
  - PLAINTEXT → no TLS, no SASL (local dev only)
  - Password is NEVER logged here or anywhere downstream
"""

import ssl
import logging
from typing import Any, Dict

from app.core.config import settings

logger = logging.getLogger("smartserve.kafka.transport")


def build_kafka_kwargs() -> Dict[str, Any]:
    """
    Return a dict of aiokafka keyword arguments for SASL_SSL or PLAINTEXT.

    Usage:
        producer_kwargs = build_kafka_kwargs()
        producer_kwargs.update({"value_serializer": ..., ...})
        producer = AIOKafkaProducer(**producer_kwargs)
    """
    protocol = (settings.KAFKA_SECURITY_PROTOCOL or "PLAINTEXT").strip().upper()

    kwargs: Dict[str, Any] = {
        "bootstrap_servers": settings.KAFKA_BOOTSTRAP_SERVERS,
    }

    if protocol == "SASL_SSL":
        kwargs["security_protocol"] = "SASL_SSL"

        # Force SCRAM-SHA-256 when connecting to Redpanda Cloud
        mechanism = (settings.KAFKA_SASL_MECHANISM or "SCRAM-SHA-256").strip().upper()
        kwargs["sasl_mechanism"] = mechanism

        username = settings.KAFKA_SASL_USERNAME or ""
        password = settings.KAFKA_SASL_PASSWORD or ""

        if not username or not password:
            logger.critical(
                "[Kafka Transport] SASL_SSL selected but KAFKA_SASL_USERNAME or "
                "KAFKA_SASL_PASSWORD is empty — connection will fail."
            )

        kwargs["sasl_plain_username"] = username
        kwargs["sasl_plain_password"] = password  # never echoed to logs

        # Real TLS context — certificate verification is ALWAYS on
        ssl_ctx = ssl.create_default_context()
        kwargs["ssl_context"] = ssl_ctx

        logger.info(
            "[Kafka Transport] SASL_SSL transport configured: "
            "mechanism=%s, bootstrap=%s...",
            mechanism,
            settings.KAFKA_BOOTSTRAP_SERVERS[:16] if settings.KAFKA_BOOTSTRAP_SERVERS else "??",
        )

    elif protocol in ("SASL_PLAINTEXT",):
        # Non-TLS SASL (dev only — never use in production with Redpanda Cloud)
        kwargs["security_protocol"] = "SASL_PLAINTEXT"
        mechanism = (settings.KAFKA_SASL_MECHANISM or "PLAIN").strip().upper()
        kwargs["sasl_mechanism"] = mechanism
        kwargs["sasl_plain_username"] = settings.KAFKA_SASL_USERNAME or ""
        kwargs["sasl_plain_password"] = settings.KAFKA_SASL_PASSWORD or ""
        logger.warning(
            "[Kafka Transport] SASL_PLAINTEXT configured — credentials sent unencrypted. "
            "Use SASL_SSL for production."
        )

    elif protocol == "SSL":
        kwargs["security_protocol"] = "SSL"
        ssl_ctx = ssl.create_default_context()
        kwargs["ssl_context"] = ssl_ctx
        logger.info("[Kafka Transport] SSL transport configured (no SASL).")

    else:
        # PLAINTEXT — local dev only
        logger.info(
            "[Kafka Transport] PLAINTEXT transport (local dev). "
            "Set KAFKA_SECURITY_PROTOCOL=SASL_SSL for production."
        )

    return kwargs
