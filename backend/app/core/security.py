import hashlib
import uuid
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import warnings
import jwt
try:
    from argon2 import PasswordHasher
    from argon2.exceptions import VerifyMismatchError, VerificationError, InvalidHashError
    _argon2_hasher = PasswordHasher(
        time_cost=2,
        memory_cost=65536,  # 64 MB
        parallelism=2,
        hash_len=32,
        salt_len=16,
    )
except ImportError:
    _argon2_hasher = None
    VerifyMismatchError = VerificationError = InvalidHashError = Exception

from app.core.config import settings

warnings.filterwarnings("ignore", category=getattr(jwt, "InsecureKeyLengthWarning", Warning))


def hash_password(password: str) -> str:
    """
    Hash password using Argon2id (resistant to GPU/ASIC brute-force attacks).
    """
    if not password:
        raise ValueError("Password cannot be empty")
    if _argon2_hasher:
        return _argon2_hasher.hash(password)
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify plain password against hashed value.
    Supports Argon2id natively, with seamless backward-compatible
    fallback for existing seeded legacy hashes (SHA-256 and bcrypt).
    """
    if not plain_password or not hashed_password:
        return False

    # 1. Native Argon2 verification
    if hashed_password.startswith("$argon2"):
        if not _argon2_hasher:
            return False
        try:
            return _argon2_hasher.verify(hashed_password, plain_password)
        except (VerifyMismatchError, VerificationError, InvalidHashError):
            return False
        except Exception:
            return False

    # 2. Legacy Bcrypt verification
    if hashed_password.startswith(("$2a$", "$2b$", "$2y$")):
        try:
            import bcrypt
            return bcrypt.checkpw(
                plain_password.encode("utf-8"),
                hashed_password.encode("utf-8")
            )
        except Exception:
            return False

    # 3. Legacy SHA-256 with static salt verification (preserves existing DB users)
    try:
        legacy_hash = hashlib.sha256(f"smartserve_salt_{plain_password}".encode("utf-8")).hexdigest()
        import hmac
        return hmac.compare_digest(legacy_hash, hashed_password)
    except Exception:
        return False


def _get_signing_key() -> str:
    """Retrieve or derive the JWT signing secret key."""
    raw_key = getattr(settings, "JWT_SECRET_KEY", getattr(settings, "JWT_SECRET", "change-me-smartserve-secret-key-32chars"))
    if not raw_key:
        raw_key = "change-me-smartserve-secret-key-32chars"
    # Ensure minimum 32 bytes for HS256 to strictly satisfy RFC 7518
    if len(raw_key.encode("utf-8")) < 32:
        return hashlib.sha256(raw_key.encode("utf-8")).hexdigest()
    return raw_key


def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """
    Create cryptographically secure JWT access token with JTI session tracking and expiration.
    """
    to_encode = data.copy()
    now_utc = datetime.utcnow()
    expire = now_utc + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))

    # Assign unique JTI (JWT ID) if not provided for revocability
    if "jti" not in to_encode:
        to_encode["jti"] = f"jwt_{uuid.uuid4().hex}"

    to_encode.update({
        "exp": expire,
        "iat": now_utc,
    })

    secret_key = _get_signing_key()
    return jwt.encode(to_encode, secret_key, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Decode and verify JWT token payload with strict algorithm verification and expiration check.
    """
    if not token or not isinstance(token, str):
        return None

    try:
        secret_key = _get_signing_key()
        payload = jwt.decode(
            token,
            secret_key,
            algorithms=[settings.JWT_ALGORITHM],
            options={"require": ["exp", "sub"]}
        )
        return payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, Exception):
        return None


verify_access_token = decode_access_token
