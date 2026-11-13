"""
Kafka Transport Factory
=======================
Single shared factory that validates configuration and builds aiokafka connection kwargs
for BOTH the producer and consumer.

Rules enforced here:
  - If KAFKA_ENABLED=false: early exit without network attempts
  - In production: localhost/127.0.0.1 is strictly rejected
  - In production: PLAINTEXT is rejected; SASL_SSL is required
  - SASL_SSL  → ssl.create_default_context() (cert verification ON always)
  - SASL_SSL  → mechanism forced to SCRAM-SHA-256 for Redpanda Cloud
  - PLAINTEXT → local dev only
  - Password is NEVER logged here or anywhere downstream
"""

import ssl
import logging
from typing import Any, Dict, Tuple

from app.core.config import settings

logger = logging.getLogger("smartserve.kafka.transport")


def validate_kafka_config() -> Tuple[bool, str]:
    """
    Validate Kafka settings and return (is_valid, reason).
    Enforces security and environment boundaries:
      - KAFKA_ENABLED must be True
      - KAFKA_BOOTSTRAP_SERVERS must be specified and non-empty
      - In production, localhost/127.0.0.1 is strictly forbidden
      - In production, PLAINTEXT is forbidden; SASL_SSL is required
      - If SASL_SSL or SASL_PLAINTEXT: KAFKA_SASL_USERNAME and KAFKA_SASL_PASSWORD must be present
    Never logs or exposes passwords.
    """
    if not settings.KAFKA_ENABLED:
        return False, "KAFKA_ENABLED is set to false."

    servers = (settings.KAFKA_BOOTSTRAP_SERVERS or "").strip()
    if not servers:
        return False, "KAFKA_BOOTSTRAP_SERVERS is empty."

    env = getattr(settings, "ENVIRONMENT", "development").lower()
    is_prod = env == "production"
    is_localhost = any(h in servers.lower() for h in ("localhost", "127.0.0.1", "0.0.0.0"))

    if is_prod and is_localhost:
        return False, "Localhost Kafka broker cannot be used in a production environment."

    protocol = (settings.KAFKA_SECURITY_PROTOCOL or "PLAINTEXT").strip().upper()

    if is_prod and protocol != "SASL_SSL":
        return False, f"Production Kafka requires SASL_SSL protocol (got {protocol})."

    if protocol in ("SASL_SSL", "SASL_PLAINTEXT"):
        username = (settings.KAFKA_SASL_USERNAME or "").strip()
        password = (settings.KAFKA_SASL_PASSWORD or "").strip()
        if not username or not password:
            return False, f"{protocol} requires both KAFKA_SASL_USERNAME and KAFKA_SASL_PASSWORD."

    return True, "Valid configuration."


def build_kafka_kwargs() -> Dict[str, Any]:
    """
    Return a dict of aiokafka keyword arguments for SASL_SSL or PLAINTEXT.
    Raises ValueError if configuration is invalid.
    """
    is_valid, reason = validate_kafka_config()
    if not is_valid:
        raise ValueError(f"Invalid Kafka configuration: {reason}")

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

        kwargs["sasl_plain_username"] = username
        kwargs["sasl_plain_password"] = password  # never echoed to logs

        # Real TLS context — certificate verification is ALWAYS on
        ssl_ctx = ssl.create_default_context()
        kwargs["ssl_context"] = ssl_ctx

        logger.info(
            "[Kafka Transport] SASL_SSL transport configured: mechanism=%s, bootstrap=%s...",
            mechanism,
            settings.KAFKA_BOOTSTRAP_SERVERS[:16] if settings.KAFKA_BOOTSTRAP_SERVERS else "??",
        )

    elif protocol in ("SASL_PLAINTEXT",):
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
