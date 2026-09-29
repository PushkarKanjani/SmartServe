from collections import deque
from datetime import datetime, timezone
from typing import Dict, Any, List


class KafkaEventStore:
    """In-memory event tracking store for metrics, diagnostics, and recent event logs."""

    def __init__(self, max_history: int = 100):
        self.max_history = max_history
        self.published_events: deque = deque(maxlen=max_history)
        self.consumed_events: deque = deque(maxlen=max_history)
        self.total_published: int = 0
        self.total_consumed: int = 0
        self.total_duplicates_skipped: int = 0
        self.errors_count: int = 0
        self.topic_published_counts: Dict[str, int] = {}
        self.topic_consumed_counts: Dict[str, int] = {}
        self.started_at: str = datetime.now(timezone.utc).isoformat()

    def record_published(self, topic: str, event_data: Dict[str, Any]):
        self.total_published += 1
        self.topic_published_counts[topic] = self.topic_published_counts.get(topic, 0) + 1
        entry = {
            "topic": topic,
            "recorded_at": datetime.now(timezone.utc).isoformat(),
            "event": event_data,
        }
        self.published_events.append(entry)

    def record_consumed(self, topic: str, event_data: Dict[str, Any]):
        self.total_consumed += 1
        self.topic_consumed_counts[topic] = self.topic_consumed_counts.get(topic, 0) + 1
        entry = {
            "topic": topic,
            "recorded_at": datetime.now(timezone.utc).isoformat(),
            "event": event_data,
        }
        self.consumed_events.append(entry)

    def record_duplicate(self, topic: str, event_id: str):
        self.total_duplicates_skipped += 1

    def record_error(self, error_msg: str):
        self.errors_count += 1

    def get_summary(self) -> Dict[str, Any]:
        return {
            "started_at": self.started_at,
            "total_published": self.total_published,
            "total_consumed": self.total_consumed,
            "total_duplicates_skipped": self.total_duplicates_skipped,
            "errors_count": self.errors_count,
            "topic_published_counts": self.topic_published_counts,
            "topic_consumed_counts": self.topic_consumed_counts,
            "recent_published_count": len(self.published_events),
            "recent_consumed_count": len(self.consumed_events),
        }

    def get_recent_published(self, limit: int = 20) -> List[Dict[str, Any]]:
        return list(self.published_events)[-limit:]

    def get_recent_consumed(self, limit: int = 20) -> List[Dict[str, Any]]:
        return list(self.consumed_events)[-limit:]


kafka_event_store = KafkaEventStore()
