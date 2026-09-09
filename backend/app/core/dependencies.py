import uuid
from typing import Optional, Generator
from pydantic import BaseModel
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.core.security import decode_access_token
from app.models.customer import Customer
from app.models.user import User

security_scheme = HTTPBearer(auto_error=False)


def get_db() -> Generator[Session, None, None]:
    """Yield a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class AuthUser(BaseModel):
    id: uuid.UUID
    email: str
    role: str
    full_name: str
    is_verified: bool = True
    is_active: bool = True


def get_current_user(
    auth: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
    db: Session = Depends(get_db),
) -> AuthUser:
    """Extracts Bearer token, decodes and verifies JWT, and validates against database."""
    if not auth or not auth.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated: Bearer token required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = auth.credentials
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    sub = payload.get("sub")
    if not sub:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload: missing subject",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user_id = uuid.UUID(str(sub))
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user identifier format in token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found in system",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive or suspended",
        )

    role = payload.get("role") or user.role
    full_name = payload.get("full_name") or user.email

    if user.role == "provider":
        from app.models.provider import Provider
        prov = db.query(Provider).filter(Provider.user_id == user.id).first()
        if prov and prov.full_name:
            full_name = prov.full_name
    elif user.role == "customer":
        cust = db.query(Customer).filter(Customer.user_id == user.id).first()
        if cust and cust.full_name:
            full_name = cust.full_name

    return AuthUser(
        id=user.id,
        email=user.email,
        role=role,
        full_name=full_name,
        is_verified=True,
        is_active=user.is_active,
    )


def require_provider(
    current_user: AuthUser = Depends(get_current_user),
) -> AuthUser:
    """Role-based access guard: Ensures caller has Provider role."""
    if current_user.role != "provider":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Provider role required",
        )
    return current_user


def require_admin(
    current_user: AuthUser = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> User:
    """Guard ensuring caller has Admin role."""
    if current_user.role not in ["admin", "super_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Admin role required",
        )
    admin_user = (
        db.query(User)
        .filter(User.id == current_user.id, User.role.in_(["admin", "super_admin"]))
        .first()
    )
    if not admin_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Admin account not found",
        )
    return admin_user



def require_permission(perm: str):
    """Guard checking specific granular admin permission."""
    def permission_guard(
        admin_user: User = Depends(require_admin),
        db: Session = Depends(get_db),
    ) -> User:
        if admin_user.role == "super_admin":
            return admin_user

        from app.models.security import AdminRole
        role_entry = (
            db.query(AdminRole)
            .filter(AdminRole.user_id == admin_user.id, AdminRole.is_active == True)
            .first()
        )
        if role_entry and (perm in role_entry.permissions or "*" in role_entry.permissions):
            return admin_user

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access forbidden: Permission '{perm}' required",
        )
    return permission_guard



def get_current_customer(
    auth: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
    db: Session = Depends(get_db),
) -> Customer:
    """
    Authenticates and retrieves the current Customer entity from JWT token.
    Enforces that caller has a valid active account with the 'customer' role.
    """
    if not auth or not auth.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated: Bearer token required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = auth.credentials
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    sub = payload.get("sub")
    if not sub:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload: missing subject",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user_id = uuid.UUID(str(sub))
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user identifier format in token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found in system",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive or suspended",
        )

    role = payload.get("role") or user.role
    if role != "customer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Customer role required",
        )

    customer = (
        db.query(Customer)
        .filter((Customer.user_id == user.id) | (Customer.id == user.id))
        .first()
    )
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer profile not found",
        )

    return customer

