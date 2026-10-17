#!/usr/bin/env python3
"""
SmartServe - Real Redpanda / Kafka Connectivity & ACL Verification Tool

Performs end-to-end broker diagnostics:
1. Broker Reachability & SASL/SCRAM Authentication
2. Cluster Metadata & Topic Access
3. Test Message Publishing (Write Access)
4. Consumer Group Message Consumption (Read Access & Consumer Group ACLs)
5. Offset Commit Verification (Group Commit Permissions)

Guarantees:
- Never prints passwords or secret tokens.
- Uses isolated test message probes.
- Cleanly closes connections.
"""

import sys
import os
import argparse
import asyncio
import json
import uuid
import time
import ssl
from typing import Dict, Any, Optional

try:
    from aiokafka import AIOKafkaProducer, AIOKafkaConsumer
    from aiokafka.errors import KafkaError
except ImportError:
    print("[ERROR] aiokafka is not installed. Run: pip install aiokafka>=0.14.0")
    sys.exit(1)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Verify authenticated Redpanda / Kafka connectivity for SmartServe."
    )
    parser.add_argument(
        "--bootstrap-servers",
        default=os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092"),
        help="Kafka/Redpanda bootstrap servers (default: env KAFKA_BOOTSTRAP_SERVERS or localhost:9092)",
    )
    parser.add_argument(
        "--security-protocol",
        default=os.getenv("KAFKA_SECURITY_PROTOCOL", "PLAINTEXT"),
        help="Security protocol: PLAINTEXT, SASL_PLAINTEXT, SASL_SSL, SSL (default: PLAINTEXT)",
    )
    parser.add_argument(
        "--sasl-mechanism",
        default=os.getenv("KAFKA_SASL_MECHANISM", "SCRAM-SHA-256"),
        help="SASL Mechanism: SCRAM-SHA-256, SCRAM-SHA-512, PLAIN (default: SCRAM-SHA-256)",
    )
    parser.add_argument(
        "--sasl-username",
        default=os.getenv("KAFKA_SASL_USERNAME", ""),
        help="SASL username (default: env KAFKA_SASL_USERNAME)",
    )
    parser.add_argument(
        "--sasl-password",
        default=os.getenv("KAFKA_SASL_PASSWORD", ""),
        help="SASL password (default: env KAFKA_SASL_PASSWORD)",
    )
    parser.add_argument(
        "--topic",
        default=os.getenv("KAFKA_TEST_TOPIC", "smartserve.probe.verification"),
        help="Test topic name (default: smartserve.probe.verification)",
    )
    parser.add_argument(
        "--consumer-group",
        default=os.getenv("KAFKA_CONSUMER_GROUP", "smartserve-probe-group"),
        help="Consumer group ID (default: smartserve-probe-group)",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=10.0,
        help="Timeout in seconds for produce and consume operations (default: 10.0)",
    )
    return parser.parse_args()


def build_client_kwargs(args) -> Dict[str, Any]:
    kwargs: Dict[str, Any] = {
        "bootstrap_servers": args.bootstrap_servers,
        "request_timeout_ms": int(args.timeout * 1000),
    }

    protocol = (args.security_protocol or "PLAINTEXT").upper()
    if protocol in ("SASL_SSL", "SASL_PLAINTEXT", "SSL"):
        kwargs["security_protocol"] = protocol

        if "SASL" in protocol:
            kwargs["sasl_mechanism"] = (args.sasl_mechanism or "SCRAM-SHA-256").upper()
            if args.sasl_username:
                kwargs["sasl_plain_username"] = args.sasl_username
            if args.sasl_password:
                kwargs["sasl_plain_password"] = args.sasl_password

        if "SSL" in protocol:
            kwargs["ssl_context"] = ssl.create_default_context()

    return kwargs


async def run_diagnostics(args):
    print("=" * 70)
    print("  SMARTSERVE — REDPANDA / KAFKA REAL CONNECTIVITY TEST")
    print("=" * 70)
    print(f"  Bootstrap Servers   : {args.bootstrap_servers}")
    print(f"  Security Protocol   : {args.security_protocol.upper()}")
    print(f"  SASL Mechanism      : {args.sasl_mechanism.upper() if 'SASL' in args.security_protocol.upper() else 'N/A'}")
    print(f"  SASL Username       : {'[CONFIGURED]' if args.sasl_username else '[NOT SET]'}")
    print(f"  SASL Password       : {'[CONFIGURED]' if args.sasl_password else '[NOT SET]'}")
    print(f"  Target Test Topic   : {args.topic}")
    print(f"  Test Consumer Group : {args.consumer_group}")
    print(f"  Operation Timeout   : {args.timeout}s")
    print("=" * 70)

    results = {
        "broker_auth": False,
        "metadata_query": False,
        "publish_access": False,
        "consume_access": False,
        "group_commit": False,
    }

    probe_id = str(uuid.uuid4())
    probe_payload = {
        "event_id": probe_id,
        "event_type": "probe.connectivity.check",
        "timestamp": time.time(),
        "source": "smartserve-deploy-verifier",
        "description": "Synthetic automated probe to verify broker authorization."
    }

    producer_kwargs = build_client_kwargs(args)
    producer_kwargs["value_serializer"] = lambda v: json.dumps(v).encode("utf-8")
    producer = AIOKafkaProducer(**producer_kwargs)

    # ---------------------------------------------------------
    # STEP 1: Connect Producer & Check Authentication
    # ---------------------------------------------------------
    print("\n[STEP 1/4] Attempting authenticated producer connection...")
    try:
        await asyncio.wait_for(producer.start(), timeout=args.timeout)
        results["broker_auth"] = True
        print("  -> SUCCESS: Authenticated successfully with broker.")
    except Exception as exc:
        print(f"  -> FAILED: Could not connect or authenticate to broker: {exc}")
        print("\nDiagnostic Summary:")
        print("  Authentication: FAIL")
        print("  Publish:        FAIL (aborted)")
        print("  Consume:        FAIL (aborted)")
        try:
            await producer.stop()
        except Exception:
            pass
        return False

    # ---------------------------------------------------------
    # STEP 2: Publish Probe Event
    # ---------------------------------------------------------
    print(f"\n[STEP 2/4] Publishing test probe message to topic '{args.topic}'...")
    send_time = time.time()
    try:
        record_metadata = await asyncio.wait_for(
            producer.send_and_wait(args.topic, probe_payload),
            timeout=args.timeout
        )
        results["publish_access"] = True
        print(f"  -> SUCCESS: Published probe message.")
        print(f"     Partition: {record_metadata.partition}, Offset: {record_metadata.offset}")
    except Exception as exc:
        print(f"  -> FAILED: Could not publish to topic '{args.topic}': {exc}")
        await producer.stop()
        return False

    # Stop producer
    await producer.stop()

    # ---------------------------------------------------------
    # STEP 3: Connect Consumer & Subscribe
    # ---------------------------------------------------------
    print(f"\n[STEP 3/4] Connecting consumer (group: '{args.consumer_group}') and polling...")
    consumer_kwargs = build_client_kwargs(args)
    consumer_kwargs["group_id"] = args.consumer_group
    consumer_kwargs["auto_offset_reset"] = "earliest"
    consumer_kwargs["enable_auto_commit"] = False
    consumer_kwargs["value_deserializer"] = lambda m: json.loads(m.decode("utf-8"))

    consumer = AIOKafkaConsumer(args.topic, **consumer_kwargs)

    received_probe = False
    try:
        await asyncio.wait_for(consumer.start(), timeout=args.timeout)
        results["metadata_query"] = True
        print(f"  -> SUCCESS: Consumer joined group and subscribed to topic.")

        # Poll loop looking for our unique probe_id
        deadline = time.time() + args.timeout
        while time.time() < deadline:
            msg_batch = await consumer.getmany(timeout_ms=1000, max_records=10)
            for tp, messages in msg_batch.items():
                for msg in messages:
                    if isinstance(msg.value, dict) and msg.value.get("event_id") == probe_id:
                        recv_latency_ms = (time.time() - send_time) * 1000
                        print(f"  -> SUCCESS: Consumed probe message with ID '{probe_id}'.")
                        print(f"     Roundtrip Latency: {recv_latency_ms:.1f}ms")
                        results["consume_access"] = True
                        received_probe = True
                        break
                if received_probe:
                    break
            if received_probe:
                break

        if not received_probe:
            print(f"  -> WARNING: Probe message was not received within {args.timeout}s timeout.")

    except Exception as exc:
        print(f"  -> FAILED: Consumer error: {exc}")
    finally:
        if results["consume_access"]:
            # ---------------------------------------------------------
            # STEP 4: Test Offset Commit (Commit ACL)
            # ---------------------------------------------------------
            print(f"\n[STEP 4/4] Verifying consumer group offset commit permissions...")
            try:
                await consumer.commit()
                results["group_commit"] = True
                print("  -> SUCCESS: Offset commit confirmed. Consumer group write ACLs valid.")
            except Exception as exc:
                print(f"  -> FAILED: Commit failed: {exc}")

        await consumer.stop()

    # ---------------------------------------------------------
    # Final Report
    # ---------------------------------------------------------
    print("\n" + "=" * 70)
    print("  REDPANDA / KAFKA VERIFICATION SUMMARY")
    print("=" * 70)
    for check, status in results.items():
        tag = "PASSED" if status else "FAILED"
        print(f"  {check.replace('_', ' ').title():<25} : [{tag}]")
    print("=" * 70)

    all_passed = all(results.values())
    if all_passed:
        print("\n>>> VERDICT: REDPANDA CLUSTER IS VERIFIED AND READY FOR PRODUCTION. <<<")
    else:
        print("\n>>> VERDICT: CONNECTIVITY VERIFICATION INCOMPLETE. REVIEW BROKER LOGS/ACLS. <<<")

    return all_passed


def main():
    args = parse_args()
    try:
        success = asyncio.run(run_diagnostics(args))
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n[CANCELLED] Diagnostic cancelled by user.")
        sys.exit(130)


if __name__ == "__main__":
    main()
