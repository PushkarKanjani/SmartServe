import uuid
from typing import Optional
from pydantic import BaseModel
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# TODO: swap to core.security after auth merge
security_scheme = HTTPBearer(auto_error=False)


class AuthUser(BaseModel):
    id: uuid.UUID
    email: str
    role: str
    full_name: str
    is_verified: bool = True


# Dummy mock provider for development until Aastha's auth module merges
DUMMY_PROVIDER = AuthUser(
    id=uuid.UUID("00000000-0000-0000-0000-000000000002"),
    email="provider@smartserve.dev",
    role="provider",
    full_name="Pushkar (Provider)",
    is_verified=True,
)


def get_current_user(
    auth: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
) -> AuthUser:
    """
    Temporary authentication dependency.
    # TODO: swap to core.security after auth merge
    Extracts Bearer token if provided, otherwise returns dummy provider context for development.
    """
    if auth and auth.credentials:
        token = auth.credentials
        # If token contains role prefix (e.g. demo-token-admin-* or demo-token-provider-*)
        if "admin" in token:
            return AuthUser(
                id=uuid.UUID("00000000-0000-0000-0000-000000000001"),
                email="admin@smartserve.dev",
                role="admin",
                full_name="Admin User",
                is_verified=True,
            )
        elif "customer" in token:
            return AuthUser(
                id=uuid.UUID("00000000-0000-0000-0000-000000000003"),
                email="customer@smartserve.dev",
                role="customer",
                full_name="Aastha (Customer)",
                is_verified=True,
            )
        else:
            return DUMMY_PROVIDER

    # Default development fallback
    return DUMMY_PROVIDER


def require_provider(
    current_user: AuthUser = Depends(get_current_user),
) -> AuthUser:
    """
    Role-based access guard: Ensures caller is a Provider (or Admin).
    """
    if current_user.role not in ["provider", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Provider role required",
        )
    return current_user
