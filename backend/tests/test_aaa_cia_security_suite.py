import io
import uuid
from datetime import datetime, timedelta, timezone
import jwt
import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.main import app
from app.core.config import settings
from app.core.database import SessionLocal
from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User
from app.models.customer import Customer
from app.models.provider import Provider
from app.models.booking import Booking
from app.models.session import ActiveSession

client = TestClient(app)


# -----------------------------------------------------------------------------
# Fixtures
# -----------------------------------------------------------------------------
@pytest.fixture(scope="module")
def sec_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(scope="module")
def seeded_users(sec_db: Session):
    c1 = sec_db.query(Customer).first()
    c2 = sec_db.query(Customer).offset(1).first()
    p1 = sec_db.query(Provider).join(User, Provider.user_id == User.id).filter(User.is_active == True).first()
    p2 = sec_db.query(Provider).join(User, Provider.user_id == User.id).filter(User.is_active == True).offset(1).first()
    admin = sec_db.query(User).filter(User.role.in_(["admin", "super_admin"])).first()

    return {
        "c1": c1,
        "c2": c2,
        "p1": p1,
        "p2": p2,
        "admin": admin,
    }


# =============================================================================
# 1. AUTHENTICATION (AAA)
# =============================================================================
def test_missing_token_returns_401():
    res = client.get("/api/v1/customer/profile")
    assert res.status_code == 401
    assert "Not authenticated" in res.json().get("detail", "") or "Bearer" in res.json().get("detail", "")


def test_invalid_token_returns_401():
    headers = {"Authorization": "Bearer invalid_garbage_token_value_12345"}
    res = client.get("/api/v1/customer/profile", headers=headers)
    assert res.status_code == 401
    assert "Invalid or expired access token" in res.json().get("detail", "")


def test_expired_token_returns_401(seeded_users):
    c1 = seeded_users["c1"]
    expired_token = create_access_token(
        data={"sub": str(c1.user_id), "role": "customer"},
        expires_delta=timedelta(seconds=-10),
    )
    headers = {"Authorization": f"Bearer {expired_token}"}
    res = client.get("/api/v1/customer/profile", headers=headers)
    assert res.status_code == 401
    assert "Invalid or expired access token" in res.json().get("detail", "")


def test_tampered_signature_token_returns_401(seeded_users):
    c1 = seeded_users["c1"]
    fake_token = jwt.encode(
        {"sub": str(c1.user_id), "role": "customer", "exp": datetime.utcnow() + timedelta(hours=1)},
        "completely_wrong_secret_key_1234567890",
        algorithm="HS256",
    )
    headers = {"Authorization": f"Bearer {fake_token}"}
    res = client.get("/api/v1/customer/profile", headers=headers)
    assert res.status_code == 401


def test_none_algorithm_token_rejected(seeded_users):
    c1 = seeded_users["c1"]
    unsecured_token = jwt.encode(
        {"sub": str(c1.user_id), "role": "customer", "exp": datetime.utcnow() + timedelta(hours=1)},
        key="",
        algorithm="none",
    )
    headers = {"Authorization": f"Bearer {unsecured_token}"}
    res = client.get("/api/v1/customer/profile", headers=headers)
    assert res.status_code == 401


def test_revoked_session_token_returns_401(sec_db: Session, seeded_users):
    c1 = seeded_users["c1"]
    jti = f"jwt_revoked_test_{uuid.uuid4().hex}"
    token = create_access_token(
        data={"sub": str(c1.user_id), "role": "customer", "jti": jti},
        expires_delta=timedelta(minutes=15),
    )
    sess = ActiveSession(
        id=uuid.uuid4(),
        user_id=c1.user_id,
        token_jti=jti,
        is_revoked=True,
        expires_at=datetime.utcnow() + timedelta(minutes=15),
    )
    sec_db.add(sess)
    sec_db.commit()

    headers = {"Authorization": f"Bearer {token}"}
    res = client.get("/api/v1/customer/profile", headers=headers)
    assert res.status_code == 401
    assert "revoked" in res.json().get("detail", "").lower()


def test_logout_revokes_active_session(sec_db: Session, seeded_users):
    c1 = seeded_users["c1"]
    jti = f"jwt_logout_test_{uuid.uuid4().hex}"
    token = create_access_token(
        data={"sub": str(c1.user_id), "role": "customer", "jti": jti},
        expires_delta=timedelta(minutes=15),
    )
    sess = ActiveSession(
        id=uuid.uuid4(),
        user_id=c1.user_id,
        token_jti=jti,
        is_revoked=False,
        expires_at=datetime.utcnow() + timedelta(minutes=15),
    )
    sec_db.add(sess)
    sec_db.commit()

    headers = {"Authorization": f"Bearer {token}"}
    res_logout = client.post("/api/v1/customer/auth/logout", headers=headers)
    assert res_logout.status_code == 200

    sec_db.refresh(sess)
    assert sess.is_revoked is True


def test_argon2id_password_hashing():
    pwd = "SecurePassword123!"
    h = hash_password(pwd)
    assert h.startswith("$argon2id$")
    assert verify_password(pwd, h) is True
    assert verify_password("WrongPassword123!", h) is False


def test_password_reset_persistence_hash_and_single_use(sec_db: Session):
    clean_email = "customer@example.com"
    user = sec_db.query(User).filter(User.email == clean_email).first()
    assert user is not None

    # 1. API request: raw token is NEVER returned in response, and non-existing email returns identical response
    res_forgot = client.post("/api/v1/customer/auth/forgot-password", json={"email": clean_email})
    assert res_forgot.status_code == 200
    res_json = res_forgot.json()
    assert "token" not in res_json
    assert "reset_token" not in res_json
    assert res_json.get("status") == "ok"

    res_nonexistent = client.post("/api/v1/customer/auth/forgot-password", json={"email": "nonexistent_fake_account_99@example.com"})
    assert res_nonexistent.status_code == 200
    assert res_nonexistent.json() == res_json  # Identical response prevents user enumeration

    # 2. Database persistence verification: stores SHA-256 hash, NOT raw token
    from app.api.v1.customer import create_password_reset_token
    from app.models.security import PasswordResetToken
    import hashlib

    test_raw_token = f"secure_test_reset_token_{uuid.uuid4().hex}"
    created_token = create_password_reset_token(sec_db, user, raw_token=test_raw_token)
    assert created_token == test_raw_token

    expected_hash = hashlib.sha256(test_raw_token.encode("utf-8")).hexdigest()
    db_record = sec_db.query(PasswordResetToken).filter(PasswordResetToken.token_hash == expected_hash).first()
    assert db_record is not None
    assert db_record.user_id == user.id
    exp = db_record.expires_at if db_record.expires_at.tzinfo is not None else db_record.expires_at.replace(tzinfo=timezone.utc)
    assert exp > datetime.now(timezone.utc)

    # 3. Short password rejected
    res_short = client.post("/api/v1/customer/auth/reset-password", json={"token": test_raw_token, "new_password": "short"})
    assert res_short.status_code in [400, 422]

    # 4. Persistence across application / session restart
    # Verify in a completely separate and isolated database session
    restart_db = SessionLocal()
    persisted_record = restart_db.query(PasswordResetToken).filter(PasswordResetToken.token_hash == expected_hash).first()
    assert persisted_record is not None
    assert persisted_record.is_used is False
    restart_db.close()

    # Valid password reset succeeds atomically
    res_reset = client.post("/api/v1/customer/auth/reset-password", json={"token": test_raw_token, "new_password": "NewStrongPass123!"})
    assert res_reset.status_code == 200
    assert res_reset.json().get("status") == "ok"

    # Verify db record marked used in fresh session
    verify_db = SessionLocal()
    updated_rec = verify_db.query(PasswordResetToken).filter(PasswordResetToken.token_hash == expected_hash).first()
    assert updated_rec.is_used is True
    verify_db.close()

    # 5. Token reuse strictly fails (Single-use atomicity)
    res_reuse = client.post("/api/v1/customer/auth/reset-password", json={"token": test_raw_token, "new_password": "AnotherPass123!"})
    assert res_reuse.status_code == 400
    assert "invalid or has expired" in res_reuse.json().get("detail", "").lower()

    # 6. Expiration enforcement test
    expired_raw_token = f"expired_test_token_{uuid.uuid4().hex}"
    expired_hash = hashlib.sha256(expired_raw_token.encode("utf-8")).hexdigest()
    expired_record = PasswordResetToken(
        id=uuid.uuid4(),
        user_id=user.id,
        token_hash=expired_hash,
        expires_at=datetime.now(timezone.utc) - timedelta(minutes=5),  # expired 5 min ago
        is_used=False
    )
    sec_db.add(expired_record)
    sec_db.commit()

    res_expired = client.post("/api/v1/customer/auth/reset-password", json={"token": expired_raw_token, "new_password": "ValidPassword999!"})
    assert res_expired.status_code == 400
    assert "invalid or has expired" in res_expired.json().get("detail", "").lower()

    # 7. Safe Invalidation: creating a new token invalidates previous unused tokens
    tok1_raw = f"token_before_invalidation_{uuid.uuid4().hex}"
    create_password_reset_token(sec_db, user, raw_token=tok1_raw)
    tok2_raw = f"token_after_invalidation_{uuid.uuid4().hex}"
    create_password_reset_token(sec_db, user, raw_token=tok2_raw)

    # tok1 must be invalidated by tok2 creation
    res_tok1 = client.post("/api/v1/customer/auth/reset-password", json={"token": tok1_raw, "new_password": "ValidPassword888!"})
    assert res_tok1.status_code == 400
    assert "invalid or has expired" in res_tok1.json().get("detail", "").lower()

    # tok2 succeeds and restores original password
    res_tok2 = client.post("/api/v1/customer/auth/reset-password", json={"token": tok2_raw, "new_password": "CustomerPass123!"})
    assert res_tok2.status_code == 200

    # 8. Concurrent token reuse test: exactly one request can succeed
    tok_concurrent = f"concurrent_race_test_token_{uuid.uuid4().hex}"
    create_password_reset_token(sec_db, user, raw_token=tok_concurrent)

    from concurrent.futures import ThreadPoolExecutor

    def attempt_reset(pwd):
        return client.post("/api/v1/customer/auth/reset-password", json={"token": tok_concurrent, "new_password": pwd})

    with ThreadPoolExecutor(max_workers=4) as executor:
        f1 = executor.submit(attempt_reset, "PassRaceOne123!")
        f2 = executor.submit(attempt_reset, "PassRaceTwo123!")
        r1, r2 = f1.result(), f2.result()

    statuses = [r1.status_code, r2.status_code]
    assert 200 in statuses
    assert 400 in statuses
    # Restore password
    user.password_hash = hash_password("CustomerPass123!")
    sec_db.commit()




# =============================================================================
# 2. AUTHORIZATION & IDOR (AAA)
# =============================================================================
def test_customer_cannot_read_another_customer_booking(sec_db: Session, seeded_users):
    c1 = seeded_users["c1"]
    c2 = seeded_users["c2"]

    b_c2 = sec_db.query(Booking).filter(Booking.customer_id == c2.id).first()
    if not b_c2:
        from decimal import Decimal
        from app.models.service import Service
        svc = sec_db.query(Service).first()
        b_c2 = Booking(
            id=uuid.uuid4(),
            booking_reference=f"BK-{uuid.uuid4().hex[:6].upper()}",
            customer_id=c2.id,
            service_id=svc.id if svc else uuid.uuid4(),
            service_name="Deep Cleaning",
            category="Cleaning",
            status="Requested",
            total_price=Decimal("499.00"),
            address="Test Customer Address",
            scheduled_date="2026-10-15",
            scheduled_time=datetime.now(timezone.utc),
            created_at=datetime.now(timezone.utc)
        )
        sec_db.add(b_c2)
        sec_db.commit()
        sec_db.refresh(b_c2)

    token_c1 = create_access_token({"sub": str(c1.user_id), "role": "customer", "customer_id": str(c1.id)})
    headers = {"Authorization": f"Bearer {token_c1}"}

    res = client.get(f"/api/v1/customer/bookings/{b_c2.id}", headers=headers)
    assert res.status_code == 403
    assert "Forbidden" in res.json().get("detail", "")


def test_customer_cannot_cancel_another_customer_booking(sec_db: Session, seeded_users):
    c1 = seeded_users["c1"]
    c2 = seeded_users["c2"]

    b_c2 = sec_db.query(Booking).filter(Booking.customer_id == c2.id).first()
    if not b_c2:
        from decimal import Decimal
        from app.models.service import Service
        svc = sec_db.query(Service).first()
        b_c2 = Booking(
            id=uuid.uuid4(),
            booking_reference=f"BK-{uuid.uuid4().hex[:6].upper()}",
            customer_id=c2.id,
            service_id=svc.id if svc else uuid.uuid4(),
            service_name="Deep Cleaning",
            category="Cleaning",
            status="Requested",
            total_price=Decimal("499.00"),
            address="Test Customer Address",
            scheduled_date="2026-10-15",
            scheduled_time=datetime.now(timezone.utc),
            created_at=datetime.now(timezone.utc)
        )
        sec_db.add(b_c2)
        sec_db.commit()
        sec_db.refresh(b_c2)

    token_c1 = create_access_token({"sub": str(c1.user_id), "role": "customer", "customer_id": str(c1.id)})
    headers = {"Authorization": f"Bearer {token_c1}"}

    res = client.post(
        f"/api/v1/customer/bookings/{b_c2.id}/cancel",
        json={"reason": "Malicious cancellation attempt"},
        headers=headers,
    )
    assert res.status_code == 403


def test_customer_cannot_access_provider_operations(seeded_users):
    c1 = seeded_users["c1"]
    token_c1 = create_access_token({"sub": str(c1.user_id), "role": "customer"})
    headers = {"Authorization": f"Bearer {token_c1}"}

    res = client.get("/api/v1/providers/me", headers=headers)
    assert res.status_code == 403
    assert "Provider role required" in res.json().get("detail", "")


def test_provider_cannot_access_admin_operations(seeded_users):
    p1 = seeded_users["p1"]
    token_p1 = create_access_token({"sub": str(p1.user_id), "role": "provider"})
    headers = {"Authorization": f"Bearer {token_p1}"}

    res = client.get("/api/v1/admin/dashboard/overview", headers=headers)
    assert res.status_code == 403
    assert "Admin role required" in res.json().get("detail", "")


def test_role_spoofing_prevented_by_authoritative_database(seeded_users):
    c1 = seeded_users["c1"]
    # Attacker forges token payload with role="admin" for their customer account
    spoofed_token = create_access_token({"sub": str(c1.user_id), "role": "admin"})
    headers = {"Authorization": f"Bearer {spoofed_token}"}

    res = client.get("/api/v1/admin/dashboard/overview", headers=headers)
    assert res.status_code == 403
    assert "Admin role required" in res.json().get("detail", "")


# =============================================================================
# 3. INTEGRITY & VALIDATION (CIA)
# =============================================================================
def test_invalid_gps_coordinates_rejected(seeded_users):
    c1 = seeded_users["c1"]
    token_c1 = create_access_token({"sub": str(c1.user_id), "role": "customer", "customer_id": str(c1.id)})
    headers = {"Authorization": f"Bearer {token_c1}"}

    # Out of range coordinates
    res = client.patch(
        f"/api/v1/customer/bookings/{uuid.uuid4()}/location",
        json={"latitude": 999.0, "longitude": -500.0},
        headers=headers,
    )
    assert res.status_code == 400
    assert "Invalid GPS coordinates" in res.json().get("detail", "")


def test_malicious_file_upload_rejected(seeded_users):
    c1 = seeded_users["c1"]
    token_c1 = create_access_token({"sub": str(c1.user_id), "role": "customer", "customer_id": str(c1.id)})
    headers = {"Authorization": f"Bearer {token_c1}"}

    # 1. Invalid extension (executable script)
    file_bad_ext = ("payload.sh", io.BytesIO(b"echo 'malicious script'"), "application/x-sh")
    res_ext = client.post("/api/v1/customer/uploads/image", files={"file": file_bad_ext}, headers=headers)
    assert res_ext.status_code == 400

    # 2. Fake MIME type (disguised .png without magic header bytes)
    file_fake_png = ("exploit.png", io.BytesIO(b"<script>alert(1)</script>"), "image/png")
    res_fake = client.post("/api/v1/customer/uploads/image", files={"file": file_fake_png}, headers=headers)
    assert res_fake.status_code == 400
    assert "genuine image structure" in res_fake.json().get("detail", "").lower()


# =============================================================================
# 4. CONFIDENTIALITY & AVAILABILITY (CIA)
# =============================================================================
def test_password_hash_not_leaked_in_responses(seeded_users):
    c1 = seeded_users["c1"]
    token_c1 = create_access_token({"sub": str(c1.user_id), "role": "customer", "customer_id": str(c1.id)})
    headers = {"Authorization": f"Bearer {token_c1}"}

    res = client.get("/api/v1/customer/profile", headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert "password" not in data
    assert "password_hash" not in data
    assert "hashed_password" not in data


def test_health_check_sanitized_no_credentials():
    res = client.get("/api/v1/health")
    assert res.status_code == 200
    data = res.json()
    assert "database_engine" not in data
    assert "password" not in str(data).lower()
    assert data["database"] in ["connected", "disconnected"]


def test_security_headers_injected():
    res = client.get("/health")
    assert res.headers.get("X-Content-Type-Options") == "nosniff"
    assert res.headers.get("X-Frame-Options") == "DENY"
    assert res.headers.get("Referrer-Policy") == "strict-origin-when-cross-origin"


# =============================================================================
# 5. PRIVILEGED ACCOUNT SECURITY (2FA & RECOVERY)
# =============================================================================
def test_admin_2fa_setup_challenge_login_and_recovery(sec_db: Session, seeded_users):
    import pyotp
    admin = seeded_users["admin"]
    assert admin is not None
    admin_email = admin.email

    # 0. Ensure 2FA is initially disabled so we test clean progression
    admin.is_active = True
    admin.is_2fa_enabled = False
    admin.totp_secret = None
    sec_db.commit()


    # 1. Standard login works when 2FA is disabled (no lockout for existing accounts)
    res_login_pre = client.post("/api/v1/auth/login", json={"email": admin_email, "password": "AdminPassword123!"})
    assert res_login_pre.status_code == 200
    token = res_login_pre.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Setup 2FA: returns secret, provisioning uri, and 5 recovery codes
    res_setup = client.post("/api/v1/admin/security/2fa/setup", headers=headers)
    assert res_setup.status_code == 200
    setup_data = res_setup.json()
    secret = setup_data["secret"]
    recovery_codes = setup_data["recovery_codes"]
    assert secret is not None
    assert len(recovery_codes) == 5

    # 3. Verify with invalid code fails
    res_bad_verify = client.post("/api/v1/admin/security/2fa/verify", json={"code": "000000"}, headers=headers)
    assert res_bad_verify.status_code == 400

    # 4. Verify with valid pyotp code succeeds and enables 2FA
    valid_code = pyotp.TOTP(secret).now()
    res_good_verify = client.post("/api/v1/admin/security/2fa/verify", json={"code": valid_code}, headers=headers)
    assert res_good_verify.status_code == 200

    sec_db.refresh(admin)
    assert admin.is_2fa_enabled is True

    # 5. Subsequent login without 2FA code is CHALLENGED and REJECTED (401)
    res_challenge = client.post("/api/v1/auth/login", json={"email": admin_email, "password": "AdminPassword123!"})
    assert res_challenge.status_code == 401
    assert "Two-factor authentication code required" in res_challenge.json().get("detail", "")
    assert res_challenge.headers.get("X-2FA-Required") == "true"

    # 6. Login with invalid 2FA code is rejected (401)
    res_wrong_2fa = client.post("/api/v1/auth/login", json={
        "email": admin_email,
        "password": "AdminPassword123!",
        "totp_code": "999999"
    })
    assert res_wrong_2fa.status_code == 401
    assert "Invalid two-factor authentication code" in res_wrong_2fa.json().get("detail", "")

    # 7. Login with valid TOTP code succeeds
    fresh_totp = pyotp.TOTP(secret).now()
    res_valid_login = client.post("/api/v1/auth/login", json={
        "email": admin_email,
        "password": "AdminPassword123!",
        "totp_code": fresh_totp
    })
    assert res_valid_login.status_code == 200
    assert "access_token" in res_valid_login.json()

    # 8. Login with single-use backup recovery code succeeds
    rec_code = recovery_codes[0]
    res_rec_login = client.post("/api/v1/auth/login", json={
        "email": admin_email,
        "password": "AdminPassword123!",
        "recovery_code": rec_code
    })
    assert res_rec_login.status_code == 200

    # 9. Reusing burned recovery code strictly fails
    res_rec_reuse = client.post("/api/v1/auth/login", json={
        "email": admin_email,
        "password": "AdminPassword123!",
        "recovery_code": rec_code
    })
    assert res_rec_reuse.status_code == 401

    # 10. Disable 2FA restores single-factor login
    res_disable = client.post("/api/v1/admin/security/2fa/disable", headers=headers)
    assert res_disable.status_code == 200

    sec_db.refresh(admin)
    assert admin.is_2fa_enabled is False

    res_login_post = client.post("/api/v1/auth/login", json={"email": admin_email, "password": "AdminPassword123!"})
    assert res_login_post.status_code == 200


def test_provider_2fa_setup_and_disable(sec_db: Session, seeded_users):
    import pyotp
    p1 = seeded_users["p1"]
    assert p1 is not None

    p_user = sec_db.query(User).filter(User.id == p1.user_id).first()
    assert p_user is not None

    p_token = create_access_token({"sub": str(p_user.id), "role": "provider", "email": p_user.email})
    headers = {"Authorization": f"Bearer {p_token}"}

    # 1. Setup provider 2FA
    res_setup = client.post("/api/v1/providers/me/2fa/setup", headers=headers)
    assert res_setup.status_code == 200
    data = res_setup.json()
    assert "secret" in data
    assert "recovery_codes" in data
    assert len(data["recovery_codes"]) == 5

    # 2. Verify with valid TOTP code
    code = pyotp.TOTP(data["secret"]).now()
    res_verify = client.post("/api/v1/providers/me/2fa/verify", json={"code": code}, headers=headers)
    assert res_verify.status_code == 200

    sec_db.refresh(p_user)
    assert p_user.is_2fa_enabled is True

    # 3. Disable provider 2FA
    res_disable = client.post("/api/v1/providers/me/2fa/disable", headers=headers)
    assert res_disable.status_code == 200

    sec_db.refresh(p_user)
    assert p_user.is_2fa_enabled is False


def test_users_cannot_disable_another_users_2fa(sec_db: Session, seeded_users):
    import pyotp
    c1 = seeded_users["c1"]
    p1 = seeded_users["p1"]
    p2 = seeded_users["p2"]
    admin = seeded_users["admin"]

    # Customer and Provider tokens
    c1_token = create_access_token({"sub": str(c1.user_id), "role": "customer"})
    p1_user = sec_db.query(User).filter(User.id == p1.user_id).first()
    p2_user = sec_db.query(User).filter(User.id == p2.user_id).first()
    p1_token = create_access_token({"sub": str(p1_user.id), "role": "provider"})
    p2_token = create_access_token({"sub": str(p2_user.id), "role": "provider"})

    # 1. Customer cannot call admin 2FA disable
    res1 = client.post("/api/v1/admin/security/2fa/disable", headers={"Authorization": f"Bearer {c1_token}"})
    assert res1.status_code == 403

    # 2. Provider cannot call admin 2FA disable
    res2 = client.post("/api/v1/admin/security/2fa/disable", headers={"Authorization": f"Bearer {p1_token}"})
    assert res2.status_code == 403

    # 3. Customer cannot call provider 2FA disable
    res3 = client.post("/api/v1/providers/me/2fa/disable", headers={"Authorization": f"Bearer {c1_token}"})
    assert res3.status_code == 403

    # 4. Cross-account 2FA isolation between providers:
    # Enable 2FA on Provider 1
    res_p1_setup = client.post("/api/v1/providers/me/2fa/setup", headers={"Authorization": f"Bearer {p1_token}"})
    p1_secret = res_p1_setup.json()["secret"]
    p1_code = pyotp.TOTP(p1_secret).now()
    client.post("/api/v1/providers/me/2fa/verify", json={"code": p1_code}, headers={"Authorization": f"Bearer {p1_token}"})
    sec_db.refresh(p1_user)
    assert p1_user.is_2fa_enabled is True

    # Provider 2 calls provider 2FA disable
    res_p2_disable = client.post("/api/v1/providers/me/2fa/disable", headers={"Authorization": f"Bearer {p2_token}"})
    assert res_p2_disable.status_code == 200

    # Provider 1's 2FA MUST remain enabled
    sec_db.refresh(p1_user)
    assert p1_user.is_2fa_enabled is True

    # Clean up Provider 1's 2FA
    client.post("/api/v1/providers/me/2fa/disable", headers={"Authorization": f"Bearer {p1_token}"})
    sec_db.refresh(p1_user)
    assert p1_user.is_2fa_enabled is False


# =============================================================================
# 7. REMEDIATED SECURITY CONTROLS VERIFICATION
# =============================================================================

def test_session_revoked_on_password_change(sec_db: Session, seeded_users):
    """Verify that changing password revokes all active sessions for that user."""
    from app.services.security_service import create_active_session
    c1 = seeded_users["c1"]
    user_c1 = sec_db.query(User).filter(User.id == c1.user_id).first()

    # Set known password hash
    original_hash = user_c1.password_hash
    user_c1.password_hash = hash_password("CustomerPass123!")
    sec_db.commit()

    # Issue token and register active session
    jti_c1 = f"jwt_c1_pwd_revocation_test_{uuid.uuid4().hex}"
    token_c1 = create_access_token({"sub": str(c1.user_id), "role": "customer", "jti": jti_c1})
    create_active_session(sec_db, user_id=user_c1.id, token_jti=jti_c1, expires_in_minutes=30)

    # Calling profile with active token succeeds
    res_before = client.get("/api/v1/customer/profile", headers={"Authorization": f"Bearer {token_c1}"})
    assert res_before.status_code == 200

    # Customer changes password
    res_change = client.post(
        "/api/v1/customer/auth/change-password",
        json={"current_password": "CustomerPass123!", "new_password": "CustomerNewPass999!"},
        headers={"Authorization": f"Bearer {token_c1}"}
    )
    assert res_change.status_code == 200

    # Using the pre-change token MUST now fail with 401 because session is revoked
    res_after = client.get("/api/v1/customer/profile", headers={"Authorization": f"Bearer {token_c1}"})
    assert res_after.status_code == 401
    assert "revoked or logged out" in res_after.json().get("detail", "").lower()

    # Restore password for fixture consistency
    user_c1.password_hash = original_hash
    sec_db.commit()


def test_excel_import_magic_bytes_and_size_validation(seeded_users):
    """Verify that fake or non-Excel uploads to catalog import are rejected by magic bytes."""
    admin = seeded_users["admin"]
    token_admin = create_access_token({"sub": str(admin.id), "role": "admin"})
    headers = {"Authorization": f"Bearer {token_admin}"}

    # 1. Non-Excel file with spoofed .xlsx extension (magic bytes mismatch)
    fake_excel_bytes = b"Hello, this is not an Excel file or PK zip archive!"
    files = {"file": ("malicious.xlsx", fake_excel_bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")}
    res_fake = client.post("/api/v1/admin/catalog/preview-import-excel", files=files, headers=headers)
    assert res_fake.status_code == 400
    assert "genuine excel" in res_fake.json().get("detail", "").lower()

    # 2. Oversized payload rejected (>10MB)
    huge_bytes = b"PK\x03\x04" + b"A" * (11 * 1024 * 1024)
    files_huge = {"file": ("huge.xlsx", huge_bytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")}
    res_huge = client.post("/api/v1/admin/catalog/preview-import-excel", files=files_huge, headers=headers)
    assert res_huge.status_code in (413, 400)


def test_signed_evidence_stream_verification_and_path_traversal(sec_db: Session, seeded_users):
    """Verify that evidence streaming validates HMAC signature and prevents path traversal."""
    from app.services.security_service import generate_signed_evidence_url
    ticket_id = str(uuid.uuid4())
    file_name = "test_evidence.jpg"

    # 1. Generate legitimate signed URL
    signed_url = generate_signed_evidence_url(ticket_id, file_name, expires_in_seconds=300)
    res_valid = client.get(signed_url)
    assert res_valid.status_code == 200
    assert res_valid.json().get("status") == "verified"

    # 2. Tampered signature is rejected
    tampered_url = signed_url.replace("sig=", "sig=tampered_invalid_hex_")
    res_tampered = client.get(tampered_url)
    assert res_tampered.status_code == 403
    assert "Invalid, expired, or tampered" in res_tampered.json().get("detail", "")

    # 3. Path traversal attack attempt with ../ is rejected
    traversal_url = signed_url.replace(f"path={file_name}", "path=../../etc/passwd")
    res_traversal = client.get(traversal_url)
    assert res_traversal.status_code in (400, 403)


def test_admin_status_toggle_requires_admins_manage_permission(sec_db: Session, seeded_users):
    """Verify that deactivating an admin strictly requires admins:manage permission."""
    from app.models.security import AdminRole
    super_admin = seeded_users["admin"]

    # Ensure p1 role is preserved as provider
    p1_user = sec_db.query(User).filter(User.id == seeded_users["p1"].user_id).first()
    if p1_user and p1_user.role != "provider":
        p1_user.role = "provider"
        sec_db.commit()

    # Create dedicated, isolated junior admin with only dashboard:view permission (no admins:manage)
    jr_user_id = uuid.uuid4()
    junior_user = User(
        id=jr_user_id,
        email=f"junior_ops_{uuid.uuid4().hex[:6]}@example.com",
        password_hash=hash_password("JuniorPass123!"),
        role="admin",
        is_active=True
    )
    jr_role = AdminRole(
        id=uuid.uuid4(),
        user_id=jr_user_id,
        role_name="operations_support",
        permissions=["dashboard:view"],
        is_active=True
    )
    sec_db.add(junior_user)
    sec_db.commit()
    sec_db.add(jr_role)
    sec_db.commit()

    token_junior = create_access_token({"sub": str(jr_user_id), "role": "admin"})

    # Junior admin cannot deactivate super_admin (strictly requires admins:manage)
    res_forbidden = client.post(
        f"/api/v1/admin/admins/{super_admin.id}/status",
        json={"is_active": False, "reason": "Unauthorized deactivation"},
        headers={"Authorization": f"Bearer {token_junior}"}
    )
    assert res_forbidden.status_code == 403
    assert "admins:manage" in res_forbidden.json().get("detail", "")
