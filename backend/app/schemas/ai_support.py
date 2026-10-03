from typing import Optional, List, Dict
from pydantic import BaseModel, Field


class AIChatRequest(BaseModel):
    message: str = Field(..., description="User's query or issue")
    history: Optional[List[Dict[str, str]]] = Field(
        default_factory=list,
        description="Previous turns in this session: [{'role': 'user'|'assistant', 'content': '...'}]",
    )
    booking_id: Optional[str] = Field(
        default=None,
        description="Optional booking ID context if opened from booking detail",
    )


class AIChatResponse(BaseModel):
    response: str
    escalated: bool = False
    escalation_reason: Optional[str] = None
    ticket_id: Optional[str] = None
    ticket_reference: Optional[str] = None
    message_count: int
    max_messages: int
    status: str  # "success" | "escalated" | "unavailable"
