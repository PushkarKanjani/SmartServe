import uuid
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field

class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str
    totp_code: Optional[str] = None
    recovery_code: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in_minutes: int
    user_id: str
    email: str
    role: str
    role_name: str = "operations_admin"
    permissions: List[str] = []

class SessionResponse(BaseModel):
    user_id: str
    email: str
    role: str
    role_name: str = "operations_admin"
    permissions: List[str] = []
    is_active: bool
    last_login: Optional[str] = None
    ip_address: Optional[str] = None
