"""Kafka Topic Definitions for SmartServe."""

class KafkaTopics:
    BOOKING_CREATED = "booking.created"
    BOOKING_ACCEPTED = "booking.accepted"
    BOOKING_REJECTED = "booking.rejected"
    BOOKING_STARTED = "booking.started"
    BOOKING_COMPLETED = "booking.completed"
    PROVIDER_LOCATION_UPDATED = "provider.location.updated"
    SUPPORT_MESSAGE = "support.message"

    ALL_TOPICS = [
        BOOKING_CREATED,
        BOOKING_ACCEPTED,
        BOOKING_REJECTED,
        BOOKING_STARTED,
        BOOKING_COMPLETED,
        PROVIDER_LOCATION_UPDATED,
        SUPPORT_MESSAGE,
    ]
