from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db, AuthUser
from app.schemas.ai_support import AIChatRequest, AIChatResponse
from app.services.support.ai_support_service import ai_support_service

router = APIRouter(prefix="/support/ai", tags=["AI Support Assistant"])


@router.post(
    "/chat",
    response_model=AIChatResponse,
    summary="Limited AI Support Assistant for Customer and Provider Portals",
)
def ai_support_chat(
    payload: AIChatRequest,
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Limited first-level AI Support Assistant for authenticated Customers and Providers.
    - Strictly RBAC isolated (Customers see only customer data, Providers see only provider data).
    - Enforces approved SmartServe knowledge.
    - Automatically escalates on out-of-scope issues, disputes, safety, or interaction limits.
    - Creates a normal support ticket on escalation in the existing support system.
    """
    if current_user.role not in ["customer", "provider", "admin", "super_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="AI Support Assistant is only available to authenticated Customers and Providers.",
        )

    result = ai_support_service.process_chat(
        db=db,
        user=current_user,
        user_message=payload.message,
        history=payload.history or [],
        booking_id=payload.booking_id,
    )

    return AIChatResponse(**result)
