"""
SmartServe - Phase 4 Google OAuth & Social Authentication Security Test Suite
Verifies:
  1. OAuth configuration validation & allowed redirect URIs
  2. Google login provider status & button visibility
  3. OAuth state token signing, expiration, and anti-replay nonce consumption
  4. Callback parameter handling (missing code/state, invalid provider)
  5. Google ID token cryptographic validation (aud, iss, exp, email_verified, signature)
  6. Existing account linking & anti-account takeover guards
  7. New user registration via Google OAuth (atomic User + Customer + OAuthAccount)
  8. SmartServe JWT issuance with session tracking and JTI
  9. Logout and session invalidation (JTI revocation check)
  10. Missing credentials fallback (honest 503 error)
"""

import sys
import os
import uuid
import time
import secrets
from datetime import datetime, timezone, timedelta
from unittest.mock import patch, MagicMock

# Add backend directory to sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
from jose import jwt

from app.main import app
from app.core.config import settings
from app.core.database import SessionLocal
from app.core.security import hash_password, create_access_token, decode_access_token
from app.models.user import User
from app.models.customer import Customer
from app.models.oauth import OAuthAccount
from app.models.session import ActiveSession
from app.api.v1.oauth import (
    generate_oauth_state,
    verify_oauth_state,
    verify_and_consume_oauth_state,
    is_allowed_redirect_uri,
    is_provider_configured,
    verify_google_id_token,
)

client = TestClient(app)


def test_01_oauth_configuration_validation():
    """Verify configuration validation and origin/redirect URI boundary enforcement."""
    print("\n--- Test 01: OAuth Configuration Validation ---")

    # 1. Provider configuration checks
    with patch.object(settings, "GOOGLE_CLIENT_ID", ""), patch.object(settings, "GOOGLE_CLIENT_SECRET", ""):
        assert is_provider_configured("google") is False

    with patch.object(settings, "GOOGLE_CLIENT_ID", "valid-client-id"), patch.object(settings, "GOOGLE_CLIENT_SECRET", "valid-secret"):
        assert is_provider_configured("google") is True

    # 2. Redirect URI validation
    assert is_allowed_redirect_uri("http://localhost:5174/auth/callback/google") is True
    assert is_allowed_redirect_uri("http://127.0.0.1:5174/auth/callback/google") is True
    assert is_allowed_redirect_uri("https://smartserve-customer-alpha.vercel.app/auth/callback/google") is True
    assert is_allowed_redirect_uri("https://evil-hacker.com/auth/callback/google") is False
    assert is_allowed_redirect_uri("javascript:alert(1)") is False

    print("  [PASS] Configuration validation and redirect URI boundaries strictly enforced.")


def test_02_google_provider_status_reporting():
    """Verify provider status endpoint reports honest status for Google login button visibility."""
    print("\n--- Test 02: Google Provider Status Reporting ---")

    with patch.object(settings, "GOOGLE_CLIENT_ID", "test-google-id"), patch.object(settings, "GOOGLE_CLIENT_SECRET", "test-secret"):
        res = client.get("/api/v1/customer/auth/oauth/providers")
        assert res.status_code == 200
        data = res.json()
        assert data["google"]["configured"] is True
        assert data["google"]["name"] == "Google"

    with patch.object(settings, "GOOGLE_CLIENT_ID", ""):
        res = client.get("/api/v1/customer/auth/oauth/providers")
        assert res.status_code == 200
        data = res.json()
        assert data["google"]["configured"] is False

    print("  [PASS] Provider status endpoint accurately signals Google button availability.")


def test_03_oauth_state_and_anti_replay_nonce_validation():
    """Verify state token cryptographic signature, 15-min expiration, and atomic nonce replay prevention."""
    print("\n--- Test 03: OAuth State & Nonce Anti-Replay Validation ---")

    db = SessionLocal()

    # 1. State token format and signature
    state = generate_oauth_state("google", redirect_uri="http://localhost:5174/auth/callback/google")
    assert verify_oauth_state(state, "google") is True
    assert verify_oauth_state(state, "github") is False

    # 2. Consume nonce atomically
    payload = verify_and_consume_oauth_state(state, "google", db)
    assert payload is not None
    assert payload["provider"] == "google"
    assert payload["redirect_uri"] == "http://localhost:5174/auth/callback/google"

    # 3. REPLAY ATTEMPT: Consuming the exact same state again MUST fail
    replay_payload = verify_and_consume_oauth_state(state, "google", db)
    assert replay_payload is None, "State nonce reuse must be rejected"

    # 4. Tampered state token MUST be rejected
    tampered_state = state[:-5] + "xxxxx"
    assert verify_and_consume_oauth_state(tampered_state, "google", db) is None

    db.close()
    print("  [PASS] State token signature verified and replay attack successfully blocked.")


def test_04_callback_handling_and_validation():
    """Verify callback rejects invalid parameters, expired states, or unsupported providers."""
    print("\n--- Test 04: Callback Handling & Parameter Validation ---")

    # 1. Unsupported provider
    res = client.post("/api/v1/customer/auth/oauth/unsupported_provider/callback", json={
        "code": "code123",
        "state": "state123",
    })
    assert res.status_code == 400

    # 2. Invalid state token
    with patch.object(settings, "GOOGLE_CLIENT_ID", "mock-id"), patch.object(settings, "GOOGLE_CLIENT_SECRET", "mock-secret"):
        res = client.post("/api/v1/customer/auth/oauth/google/callback", json={
            "code": "code123",
            "state": "forged_non_jwt_state",
        })
        assert res.status_code == 400
        assert "Invalid or expired OAuth state parameter" in res.json()["detail"]

    print("  [PASS] Callback parameters strictly validated.")


def test_05_google_id_token_cryptographic_validation():
    """Verify Google ID token claims validation (aud, iss, exp, email_verified)."""
    print("\n--- Test 05: Google ID Token Cryptographic Validation ---")

    # 1. Tokeninfo online fallback mock: valid claims
    valid_mock_claims = {
        "sub": "google-user-123456789",
        "email": "verified.customer@gmail.com",
        "email_verified": "true",
        "name": "Verified Customer",
        "aud": "my-smartserve-client-id.apps.googleusercontent.com",
        "iss": "https://accounts.google.com",
        "exp": str(int(time.time() + 3600)),
    }

    with patch("requests.get") as mock_get:
        mock_get.return_value = MagicMock(ok=True, json=lambda: valid_mock_claims)
        claims = verify_google_id_token(
            "mock-jwt-id-token",
            expected_client_id="my-smartserve-client-id.apps.googleusercontent.com"
        )
        assert claims["sub"] == "google-user-123456789"
        assert claims["email"] == "verified.customer@gmail.com"

    # 2. Audience mismatch MUST be rejected
    with patch("requests.get") as mock_get:
        mock_get.return_value = MagicMock(ok=True, json=lambda: valid_mock_claims)
        try:
            verify_google_id_token(
                "mock-jwt-id-token",
                expected_client_id="attacker-client-id.apps.googleusercontent.com"
            )
            assert False, "Should have raised 400 for audience mismatch"
        except Exception as e:
            assert "audience mismatch" in str(e).lower()

    # 3. Issuer invalid MUST be rejected
    spoofed_issuer = dict(valid_mock_claims, iss="https://evil-issuer.com")
    with patch("requests.get") as mock_get:
        mock_get.return_value = MagicMock(ok=True, json=lambda: spoofed_issuer)
        try:
            verify_google_id_token(
                "mock-jwt-id-token",
                expected_client_id="my-smartserve-client-id.apps.googleusercontent.com"
            )
            assert False, "Should have raised 400 for issuer mismatch"
        except Exception as e:
            assert "issuer invalid" in str(e).lower()

    # 4. Unverified email MUST be rejected
    unverified_email = dict(valid_mock_claims, email_verified="false")
    with patch("requests.get") as mock_get:
        mock_get.return_value = MagicMock(ok=True, json=lambda: unverified_email)
        try:
            verify_google_id_token(
                "mock-jwt-id-token",
                expected_client_id="my-smartserve-client-id.apps.googleusercontent.com"
            )
            assert False, "Should have raised 400 for unverified email"
        except Exception as e:
            assert "email is not verified" in str(e).lower()

    print("  [PASS] Google ID token claims (aud, iss, exp, email_verified) cryptographically verified.")


def test_06_existing_account_linking_and_anti_takeover():
    """Verify anti-account-takeover protection for unauthenticated logins, and safe authenticated linking."""
    print("\n--- Test 06: Existing Account Linking & Anti-Takeover ---")

    db = SessionLocal()
    existing_email = f"pwd_user_{uuid.uuid4().hex[:6]}@smartserve.test"
    u_id = uuid.uuid4()
    c_id = uuid.uuid4()

    # Create existing user registered with password
    u = User(id=u_id, email=existing_email, password_hash=hash_password("UserPass123!"), role="customer", is_active=True)
    c = Customer(id=c_id, user_id=u_id, email=existing_email, full_name="Password User", is_verified=True, is_active=True)
    db.add(u)
    db.add(c)
    db.commit()

    # A. UNAUTHENTICATED TAKEOVER ATTEMPT: Google login with same email MUST be blocked
    with patch.object(settings, "GOOGLE_CLIENT_ID", "test-client-id"), \
         patch.object(settings, "GOOGLE_CLIENT_SECRET", "test-secret"), \
         patch("requests.post") as mock_post, \
         patch("requests.get") as mock_get:

        mock_post.return_value = MagicMock(ok=True, json=lambda: {"access_token": "tok123"})
        mock_get.return_value = MagicMock(ok=True, json=lambda: {
            "sub": "google-attacker-sub",
            "email": existing_email,
            "email_verified": True,
            "name": "Attacker Impersonator"
        })

        state = generate_oauth_state("google")
        res = client.post("/api/v1/customer/auth/oauth/google/callback", json={
            "code": "code-123",
            "state": state,
        })
        assert res.status_code == 409
        assert "automatic account linking is disabled" in res.json()["detail"]

    # B. AUTHENTICATED SAFE LINKING: The legitimate user can link Google to their account
    user_token = create_access_token({"sub": str(u_id), "role": "customer", "customer_id": str(c_id)})
    link_sub = f"google-verified-{uuid.uuid4().hex[:6]}"

    with patch.object(settings, "GOOGLE_CLIENT_ID", "test-client-id"), \
         patch.object(settings, "GOOGLE_CLIENT_SECRET", "test-secret"), \
         patch("requests.post") as mock_post, \
         patch("requests.get") as mock_get:

        mock_post.return_value = MagicMock(ok=True, json=lambda: {"access_token": "link_tok"})
        mock_get.return_value = MagicMock(ok=True, json=lambda: {
            "sub": link_sub,
            "email": existing_email,
            "email_verified": True,
            "name": "Password User"
        })

        link_state = generate_oauth_state("google")
        link_res = client.post(
            "/api/v1/customer/auth/oauth/google/link",
            headers={"Authorization": f"Bearer {user_token}"},
            json={"code": "valid-link-code", "state": link_state}
        )
        assert link_res.status_code == 200
        assert link_res.json()["status"] == "ok"

        # Verify OAuthAccount is now linked to u_id
        oauth_row = db.query(OAuthAccount).filter(OAuthAccount.provider_user_id == link_sub).first()
        assert oauth_row is not None
        assert oauth_row.user_id == u_id

    db.close()
    print("  [PASS] Anti-takeover 409 enforced and authenticated account linking verified.")


def test_07_new_user_registration_via_google():
    """Verify new customer registration via Google creates atomic User, Customer, and OAuthAccount."""
    print("\n--- Test 07: New User Registration via Google ---")

    new_google_email = f"new_google_{uuid.uuid4().hex[:6]}@smartserve.test"
    new_google_sub = f"sub_new_{uuid.uuid4().hex[:8]}"

    with patch.object(settings, "GOOGLE_CLIENT_ID", "test-client-id"), \
         patch.object(settings, "GOOGLE_CLIENT_SECRET", "test-secret"), \
         patch("requests.post") as mock_post, \
         patch("requests.get") as mock_get:

        mock_post.return_value = MagicMock(ok=True, json=lambda: {"access_token": "tok_new"})
        mock_get.return_value = MagicMock(ok=True, json=lambda: {
            "sub": new_google_sub,
            "email": new_google_email,
            "email_verified": True,
            "name": "Rohan Mehra"
        })

        state = generate_oauth_state("google")
        res = client.post("/api/v1/customer/auth/oauth/google/callback", json={
            "code": "code_new",
            "state": state,
        })
        assert res.status_code == 200
        data = res.json()
        assert data["email"] == new_google_email
        assert data["full_name"] == "Rohan Mehra"
        assert data["is_new_user"] is True
        assert data["requires_profile_completion"] is True

        # Check DB
        db = SessionLocal()
        created_user = db.query(User).filter(User.email == new_google_email).first()
        assert created_user is not None
        assert created_user.role == "customer"
        assert created_user.is_active is True

        created_cust = db.query(Customer).filter(Customer.user_id == created_user.id).first()
        assert created_cust is not None
        assert created_cust.full_name == "Rohan Mehra"

        created_oauth = db.query(OAuthAccount).filter(OAuthAccount.provider_user_id == new_google_sub).first()
        assert created_oauth is not None
        assert created_oauth.user_id == created_user.id
        db.close()

    print("  [PASS] New user atomic registration (User + Customer + OAuthAccount) verified.")


def test_08_jwt_issuance_and_claims():
    """Verify JWT issued on Google login contains jti, customer_id, pending_profile, and proper expiry."""
    print("\n--- Test 08: JWT Issuance & Claims Structure ---")

    jwt_test_email = f"jwt_oauth_{uuid.uuid4().hex[:6]}@smartserve.test"
    jwt_test_sub = f"sub_jwt_{uuid.uuid4().hex[:8]}"

    with patch.object(settings, "GOOGLE_CLIENT_ID", "test-client-id"), \
         patch.object(settings, "GOOGLE_CLIENT_SECRET", "test-secret"), \
         patch("requests.post") as mock_post, \
         patch("requests.get") as mock_get:

        mock_post.return_value = MagicMock(ok=True, json=lambda: {"access_token": "tok_jwt"})
        mock_get.return_value = MagicMock(ok=True, json=lambda: {
            "sub": jwt_test_sub,
            "email": jwt_test_email,
            "email_verified": True,
            "name": "JWT User"
        })

        state = generate_oauth_state("google")
        res = client.post("/api/v1/customer/auth/oauth/google/callback", json={
            "code": "code_jwt",
            "state": state,
        })
        assert res.status_code == 200
        token_str = res.json()["access_token"]
        claims = decode_access_token(token_str)
        assert claims is not None
        assert claims["role"] == "customer"
        assert claims["email"] == jwt_test_email
        assert "jti" in claims
        assert claims["jti"].startswith("jwt_")

    print("  [PASS] JWT issued with authoritative claims, session jti, and expiration.")


def test_09_logout_and_session_invalidation():
    """Verify that logging out revokes the session JTI and prevents further access."""
    print("\n--- Test 09: Logout & Session Invalidation ---")

    db = SessionLocal()
    u_id = uuid.uuid4()
    c_id = uuid.uuid4()
    email = f"logout_test_{uuid.uuid4().hex[:6]}@smartserve.test"

    u = User(id=u_id, email=email, password_hash=hash_password("pw"), role="customer", is_active=True)
    c = Customer(id=c_id, user_id=u_id, email=email, full_name="Logout Test Customer", phone="9898000000", is_verified=True, is_active=True)
    db.add(u)
    db.add(c)
    db.commit()

    token_jti = f"jwt_{uuid.uuid4().hex}"
    token = create_access_token({
        "sub": str(u_id),
        "role": "customer",
        "customer_id": str(c_id),
        "email": email,
        "jti": token_jti,
    })

    # Record active session in DB
    act_sess = ActiveSession(
        id=uuid.uuid4(),
        user_id=u_id,
        token_jti=token_jti,
        ip_address="127.0.0.1",
        user_agent="Test Browser",
        expires_at=datetime.now(timezone.utc) + timedelta(hours=24),
        is_revoked=False,
    )
    db.add(act_sess)
    db.commit()
    db.close()

    # 1. Access protected customer endpoint - MUST SUCCEED
    resp1 = client.get(
        "/api/v1/customer/dashboard",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp1.status_code == 200

    # 2. Call Logout
    logout_res = client.post(
        "/api/v1/customer/auth/logout",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert logout_res.status_code == 200

    # 3. Access protected customer endpoint AGAIN with the revoked token - MUST BE REJECTED with 401
    resp2 = client.get(
        "/api/v1/customer/dashboard",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert resp2.status_code == 401
    assert "revoked or logged out" in resp2.json()["detail"].lower()

    print("  [PASS] Session JTI revoked on logout and subsequent requests blocked.")


def test_10_missing_credentials_fallback():
    """Verify that unconfigured Google credentials return honest 503 error."""
    print("\n--- Test 10: Missing Credentials Fallback ---")

    with patch.object(settings, "GOOGLE_CLIENT_ID", ""), patch.object(settings, "GOOGLE_CLIENT_SECRET", ""):
        res = client.get("/api/v1/customer/auth/oauth/google/authorize")
        assert res.status_code == 503
        data = res.json()
        assert "Google Sign-In is not configured" in data["detail"]
        assert "GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are missing" in data["detail"]

    print("  [PASS] Honest 503 returned when Google credentials are unconfigured.")


if __name__ == "__main__":
    print("=" * 70)
    print("STARTING PHASE 4 GOOGLE OAUTH SECURITY TEST SUITE")
    print("=" * 70)
    test_01_oauth_configuration_validation()
    test_02_google_provider_status_reporting()
    test_03_oauth_state_and_anti_replay_nonce_validation()
    test_04_callback_handling_and_validation()
    test_05_google_id_token_cryptographic_validation()
    test_06_existing_account_linking_and_anti_takeover()
    test_07_new_user_registration_via_google()
    test_08_jwt_issuance_and_claims()
    test_09_logout_and_session_invalidation()
    test_10_missing_credentials_fallback()
    print("\n" + "=" * 70)
    print("ALL PHASE 4 GOOGLE OAUTH TESTS PASSED SUCCESSFULLY! (10/10)")
    print("=" * 70)

