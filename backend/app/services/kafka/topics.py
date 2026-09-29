"""Kafka Topic Definitions for SmartServe."""

class KafkaTopics:
    BOOKING_CREATED = "booking.created"
    BOOKING_ACCEPTED = "booking.accepted"
    BOOKING_REJECTED = "booking.rejected"
    SUPPORT_MESSAGE = "support.message"

    ALL_TOPICS = [
        BOOKING_CREATED,
        BOOKING_ACCEPTED,
        BOOKING_REJECTED,
        SUPPORT_MESSAGE,
    ]
