"""
Redpanda Cloud / Kafka Connection Test Script
==============================================
Validates Redpanda Cloud Serverless cluster connectivity, authentication,
topic ACLs, consumer group ACLs, and end-to-end produce/consume delivery.

Usage:
    cd backend && python scripts/test_redpanda_connection.py

Checks performed:
    1. TCP/DNS connect to bootstrap host:port (5s timeout)
    2. Authenticated metadata fetch via SASL_SSL + SCRAM-SHA-256
    3. Metadata contains all 7 canonical topics
    4. Produce a test event to 'booking.created' (key='conn-test')
    5. Consume that test event back using group 'smartserve-backend-group' (<=30s)
    6. Describe consumer group / group authorization
    7. Describe each of the 7 topics / topic authorization

Security Guarantee:
    Secrets and passwords are NEVER printed or logged.
"""

import asyncio
import json
import os
import socket
import sys
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path

# Ensure backend root is on sys.path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

# Load .env explicitly if available
from dotenv import load_dotenv

env_path = backend_dir / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path, override=True)

from app.core.config import settings
from app.services.kafka.transport import build_kafka_kwargs
from app.services.kafka.topics import KafkaTopics
from aiokafka import AIOKafkaProducer, AIOKafkaConsumer
from aiokafka.admin import AIOKafkaAdminClient


CANONICAL_TOPICS = [
    "booking.created",
    "booking.accepted",
    "booking.rejected",
    "booking.started",
    "booking.completed",
    "provider.location.updated",
    "support.message",
]


def mask_string(val: str, show_chars: int = 8) -> str:
    if not val:
        return "<empty>"
    if len(val) <= show_chars:
        return val[:2] + "***"
    return val[:show_chars] + "***"


def parse_first_host_port(bootstrap_servers: str):
    first_server = bootstrap_servers.split(",")[0].strip()
    if ":" in first_server:
        host, port_str = first_server.rsplit(":", 1)
        return host, int(port_str)
    return first_server, 9092


async def run_checks():
    print("=" * 70)
    print("  SmartServe Redpanda Cloud Connection & Authorization Test")
    print("=" * 70)

    bootstrap = settings.KAFKA_BOOTSTRAP_SERVERS
    protocol = settings.KAFKA_SECURITY_PROTOCOL
    mechanism = settings.KAFKA_SASL_MECHANISM or (
        "SCRAM-SHA-256" if protocol == "SASL_SSL" else ""
    )
    user = settings.KAFKA_SASL_USERNAME
    group = settings.KAFKA_CONSUMER_GROUP

    print(f"Bootstrap Server : {mask_string(bootstrap, 14)}")
    print(f"Security Protocol: {protocol}")
    print(f"SASL Mechanism   : {mechanism or '<none>'}")
    print(f"SASL Username    : {user or '<none>'}")
    print(f"Consumer Group   : {group}")
    print("=" * 70)

    test_id = str(uuid.uuid4())
    all_passed = True
    results = {}

    # --------------------------------------------------------------------------
    # Check 1: TCP/DNS connect
    # --------------------------------------------------------------------------
    print("\n[Check 1/7] Testing TCP/DNS connection to bootstrap host (timeout: 5s)...")
    try:
        host, port = parse_first_host_port(bootstrap)
        t0 = time.perf_counter()
        sock = socket.create_connection((host, port), timeout=5.0)
        sock.close()
        elapsed = (time.perf_counter() - t0) * 1000
        print(f"  --> PASS: Connected to {mask_string(host, 12)}:{port} in {elapsed:.1f}ms")
        results["check_1"] = True
    except Exception as exc:
        print(f"  --> FAIL: TCP connection failed: {exc}")
        results["check_1"] = False
        all_passed = False
        print("\nStopping further tests due to network reachability failure.")
        return False

    # Build shared kwargs
    kafka_kwargs = build_kafka_kwargs()

    # --------------------------------------------------------------------------
    # Check 2: Authenticated metadata fetch via SASL_SSL + SCRAM-SHA-256
    # --------------------------------------------------------------------------
    print("\n[Check 2/7] Authenticated metadata fetch via SASL_SSL + SCRAM-SHA-256...")
    admin = None
    cluster_topics = set()
    try:
        admin = AIOKafkaAdminClient(**kafka_kwargs)
        await admin.start()
        cluster_topics = set(await admin.list_topics())
        print(f"  --> PASS: Authentication successful. Discovered {len(cluster_topics)} topics on cluster.")
        results["check_2"] = True
    except Exception as exc:
        safe_err = str(exc).replace(settings.KAFKA_SASL_PASSWORD or "", "***")
        print(f"  --> FAIL: Authentication/Metadata fetch failed: {safe_err}")
        results["check_2"] = False
        all_passed = False
        if admin:
            try:
                await admin.close()
            except Exception:
                pass
        return False

    # --------------------------------------------------------------------------
    # Check 3: Metadata contains all 7 canonical topics
    # --------------------------------------------------------------------------
    print("\n[Check 3/7] Verifying all 7 canonical topics exist on cluster...")
    missing = [t for t in CANONICAL_TOPICS if t not in cluster_topics]
    if not missing:
        print(f"  --> PASS: All 7 canonical topics present on cluster: {CANONICAL_TOPICS}")
        results["check_3"] = True
    else:
        print(f"  --> FAIL: Missing topics on cluster: {missing}")
        results["check_3"] = False
        all_passed = False

    # --------------------------------------------------------------------------
    # Check 4: Produce a test event to booking.created
    # --------------------------------------------------------------------------
    target_topic = KafkaTopics.BOOKING_CREATED
    print(f"\n[Check 4/7] Producing test event to '{target_topic}' (key='conn-test')...")
    producer = None
    produce_success = False
    test_payload = {
        "event_id": test_id,
        "event_type": "booking.created",
        "test": True,
        "purpose": "connection_verification",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "payload": {
            "test_run": True,
            "verification_uuid": test_id,
        },
    }

    try:
        prod_kwargs = dict(kafka_kwargs)
        prod_kwargs["value_serializer"] = lambda v: json.dumps(v).encode("utf-8")
        prod_kwargs["key_serializer"] = lambda k: k.encode("utf-8") if isinstance(k, str) else k
        prod_kwargs["request_timeout_ms"] = 10000

        producer = AIOKafkaProducer(**prod_kwargs)
        await producer.start()
        meta = await producer.send_and_wait(target_topic, key="conn-test", value=test_payload)
        print(
            f"  --> PASS: Event delivered to partition {meta.partition} at offset {meta.offset} "
            f"(event_id: {test_id[:8]}...)"
        )
        produce_success = True
        results["check_4"] = True
    except Exception as exc:
        safe_err = str(exc).replace(settings.KAFKA_SASL_PASSWORD or "", "***")
        print(f"  --> FAIL: Produce failed: {safe_err}")
        results["check_4"] = False
        all_passed = False
    finally:
        if producer:
            await producer.stop()

    # --------------------------------------------------------------------------
    # Check 5: Consume test event back using group 'smartserve-backend-group'
    # --------------------------------------------------------------------------
    print(f"\n[Check 5/7] Consuming event back with group '{group}' (timeout: <=30s)...")
    if not produce_success:
        print("  --> SKIP/FAIL: Produce step failed; cannot verify consume.")
        results["check_5"] = False
        all_passed = False
    else:
        consumer = None
        consumed_found = False
        try:
            cons_kwargs = dict(kafka_kwargs)
            cons_kwargs["group_id"] = group
            cons_kwargs["auto_offset_reset"] = "earliest"
            cons_kwargs["enable_auto_commit"] = True
            cons_kwargs["value_deserializer"] = lambda v: json.loads(v.decode("utf-8"))

            consumer = AIOKafkaConsumer(target_topic, **cons_kwargs)
            await consumer.start()

            poll_start = time.time()
            deadline = poll_start + 30.0

            while time.time() < deadline:
                remaining = max(1.0, deadline - time.time())
                try:
                    records = await asyncio.wait_for(
                        consumer.getmany(timeout_ms=min(int(remaining * 1000), 3000), max_records=20),
                        timeout=min(remaining, 4.0),
                    )
                except asyncio.TimeoutError:
                    continue

                for tp, batch in records.items():
                    for record in batch:
                        msg_data = record.value
                        if isinstance(msg_data, dict):
                            rec_id = msg_data.get("event_id")
                            sub_id = msg_data.get("payload", {}).get("verification_uuid")
                            if rec_id == test_id or sub_id == test_id:
                                consumed_found = True
                                break
                    if consumed_found:
                        break
                if consumed_found:
                    break

            if consumed_found:
                elapsed_s = time.time() - poll_start
                print(f"  --> PASS: Consumed test event with uuid {test_id[:8]}... in {elapsed_s:.1f}s")
                results["check_5"] = True
            else:
                print("  --> FAIL: Timed out waiting to consume test event within 30s")
                results["check_5"] = False
                all_passed = False
        except Exception as exc:
            safe_err = str(exc).replace(settings.KAFKA_SASL_PASSWORD or "", "***")
            print(f"  --> FAIL: Consumer failed: {safe_err}")
            results["check_5"] = False
            all_passed = False
        finally:
            if consumer:
                try:
                    await consumer.stop()
                except Exception:
                    pass

    # --------------------------------------------------------------------------
    # Check 6: Describe consumer group / authorization
    # --------------------------------------------------------------------------
    print(f"\n[Check 6/7] Describing consumer group '{group}' (group authorization)...")
    try:
        group_desc = await admin.describe_consumer_groups([group])
        state = getattr(group_desc[0], "state", "KNOWN") if group_desc else "UNKNOWN"
        print(f"  --> PASS: Group '{group}' described successfully (state: {state}).")
        results["check_6"] = True
    except Exception as exc:
        safe_err = str(exc).replace(settings.KAFKA_SASL_PASSWORD or "", "***")
        print(f"  --> FAIL: Describe consumer group failed: {safe_err}")
        results["check_6"] = False
        all_passed = False

    # --------------------------------------------------------------------------
    # Check 7: Describe each of the 7 topics (topic authorization)
    # --------------------------------------------------------------------------
    print("\n[Check 7/7] Describing all 7 topics (topic authorization)...")
    try:
        topic_desc = await admin.describe_topics(CANONICAL_TOPICS)
        described_names = [t.get("topic") if isinstance(t, dict) else getattr(t, "topic", str(t)) for t in topic_desc]
        print(f"  --> PASS: All 7 topics described successfully: {len(described_names)} authorized.")
        results["check_7"] = True
    except Exception as exc:
        safe_err = str(exc).replace(settings.KAFKA_SASL_PASSWORD or "", "***")
        print(f"  --> FAIL: Describe topics failed: {safe_err}")
        results["check_7"] = False
        all_passed = False

    # Clean up admin
    if admin:
        try:
            await admin.close()
        except Exception:
            pass

    # --------------------------------------------------------------------------
    # Summary
    # --------------------------------------------------------------------------
    print("\n" + "=" * 70)
    print("                       VERIFICATION SUMMARY")
    print("=" * 70)
    for i in range(1, 8):
        status = "PASS" if results.get(f"check_{i}") else "FAIL"
        print(f"  Check {i}/7: {status}")
    print("=" * 70)

    if all_passed:
        print("  RESULT: ALL 7 REDPANDA CLOUD CONNECTION CHECKS PASSED SUCCESSFULLY!")
        print("=" * 70)
        return True
    else:
        print("  RESULT: ONE OR MORE CHECKS FAILED. Please review the output above.")
        print("=" * 70)
        return False


def main():
    try:
        success = asyncio.run(run_checks())
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\nTest cancelled by user.")
        sys.exit(130)


if __name__ == "__main__":
    main()
