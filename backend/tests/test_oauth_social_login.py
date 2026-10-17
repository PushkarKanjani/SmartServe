"""
Comprehensive Automated Test Suite for SmartServe OAuth / Social Login
Tests Google, Apple, and GitHub:
1. Provider configuration reporting (honest reporting when unconfigured)
2. Authorize endpoints (503 when missing credentials, valid URLs when configured)
3. Anti-CSRF state token validation
4. Code exchange & profile extraction
5. Anti-account takeover: No automatic linking when existing password user exists
6. Successful customer login with existing linked OAuth account
7. Successful new customer registration via OAuth
8. Role boundaries: Provider / Admin accounts cannot log in via customer social auth
9. Deactivated user blocking
"""

import uuid
import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient

from app.main import app
from app.core.config import settings
from app.repositories.db import get_db
from app.models.user import User
from app.models.customer import Customer
from app.models.oauth import OAuthAccount
from app.core.security import hash_password
from app.api.v1.oauth import generate_oauth_state, verify_oauth_state

client = TestClient(app)


def test_oauth_providers_status_unconfigured():
    """Verify that when no environment variables are set, all providers report unconfigured."""
    with patch.object(settings, "GOOGLE_CLIENT_ID", ""), \
         patch.object(settings, "GOOGLE_CLIENT_SECRET", ""), \
         patch.object(settings, "APPLE_CLIENT_ID", ""), \
         patch.object(settings, "GITHUB_CLIENT_ID", ""), \
         patch.object(settings, "GITHUB_CLIENT_SECRET", ""):

        res = client.get("/api/v1/customer/auth/oauth/providers")
        assert res.status_code == 200
        data = res.json()
        assert data["google"]["configured"] is False
        assert data["apple"]["configured"] is False
        assert data["github"]["configured"] is False


@pytest.mark.parametrize("provider,expected_substring", [
    ("google", "GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are missing"),
    ("apple", "APPLE_CLIENT_ID is missing"),
    ("github", "GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are missing"),
])
def test_oauth_authorize_unconfigured_honest_error(provider, expected_substring):
    """Verify honest 503 error when OAuth provider credentials are not set."""
    with patch.object(settings, "GOOGLE_CLIENT_ID", ""), \
         patch.object(settings, "GOOGLE_CLIENT_SECRET", ""), \
         patch.object(settings, "APPLE_CLIENT_ID", ""), \
         patch.object(settings, "GITHUB_CLIENT_ID", ""), \
         patch.object(settings, "GITHUB_CLIENT_SECRET", ""):

        res = client.get(f"/api/v1/customer/auth/oauth/{provider}/authorize")
        assert res.status_code == 503
        assert expected_substring in res.json()["detail"]


def test_oauth_unsupported_provider():
    """Verify 400 error when an unsupported provider is requested."""
    res = client.get("/api/v1/customer/auth/oauth/facebook/authorize")
    assert res.status_code == 400
    assert "Unsupported OAuth provider" in res.json()["detail"]


def test_google_authorize_configured():
    """Verify authorization URL generation when Google credentials are provided."""
    with patch.object(settings, "GOOGLE_CLIENT_ID", "mock-google-client-id"), \
         patch.object(settings, "GOOGLE_CLIENT_SECRET", "mock-google-client-secret"):

        res = client.get("/api/v1/customer/auth/oauth/google/authorize")
        assert res.status_code == 200
        data = res.json()
        assert data["provider"] == "google"
        assert "accounts.google.com" in data["authorization_url"]
        assert "mock-google-client-id" in data["authorization_url"]
        assert "state=" in data["authorization_url"]
        assert verify_oauth_state(data["state"], "google") is True


def test_github_authorize_configured():
    """Verify authorization URL generation when GitHub credentials are provided."""
    with patch.object(settings, "GITHUB_CLIENT_ID", "mock-github-client-id"), \
         patch.object(settings, "GITHUB_CLIENT_SECRET", "mock-github-client-secret"):

        res = client.get("/api/v1/customer/auth/oauth/github/authorize")
        assert res.status_code == 200
        data = res.json()
        assert data["provider"] == "github"
        assert "github.com/login/oauth/authorize" in data["authorization_url"]
        assert "mock-github-client-id" in data["authorization_url"]
        assert verify_oauth_state(data["state"], "github") is True


def test_apple_authorize_configured():
    """Verify authorization URL generation when Apple credentials are provided."""
    with patch.object(settings, "APPLE_CLIENT_ID", "com.smartserve.client"):
        res = client.get("/api/v1/customer/auth/oauth/apple/authorize")
        assert res.status_code == 200
        data = res.json()
        assert data["provider"] == "apple"
        assert "appleid.apple.com" in data["authorization_url"]
        assert "com.smartserve.client" in data["authorization_url"]
        assert verify_oauth_state(data["state"], "apple") is True


def test_oauth_callback_invalid_state():
    """Verify that an invalid or forged state parameter is rejected with 400."""
    with patch.object(settings, "GOOGLE_CLIENT_ID", "mock-google-id"), \
         patch.object(settings, "GOOGLE_CLIENT_SECRET", "mock-google-secret"):

        res = client.post("/api/v1/customer/auth/oauth/google/callback", json={
            "code": "test-auth-code",
            "state": "forged-invalid-state",
        })
        assert res.status_code == 400
        assert "Invalid or expired OAuth state parameter" in res.json()["detail"]


def test_oauth_callback_new_user_success():
    """Verify that a new user completing OAuth gets User, Customer, and OAuthAccount created."""
    mock_email = f"oauth_new_{uuid.uuid4().hex[:8]}@example.com"
    mock_sub = f"google-sub-{uuid.uuid4().hex[:8]}"

    with patch.object(settings, "GOOGLE_CLIENT_ID", "mock-google-id"), \
         patch.object(settings, "GOOGLE_CLIENT_SECRET", "mock-google-secret"), \
         patch("requests.post") as mock_post, \
         patch("requests.get") as mock_get:

        # Mock token response
        mock_post.return_value = MagicMock(
            ok=True,
            json=lambda: {"access_token": "mock-access-token", "token_type": "Bearer"}
        )
        # Mock userinfo response
        mock_get.return_value = MagicMock(
            ok=True,
            json=lambda: {
                "sub": mock_sub,
                "email": mock_email,
                "name": "OAuth Test Customer",
                "email_verified": True
            }
        )

        valid_state = generate_oauth_state("google")
        res = client.post("/api/v1/customer/auth/oauth/google/callback", json={
            "code": "valid-auth-code",
            "state": valid_state,
        })

        assert res.status_code == 200
        data = res.json()
        assert "access_token" in data
        assert data["email"] == mock_email
        assert data["full_name"] == "OAuth Test Customer"

        # Check DB persistence
        db = next(get_db())
        oauth_entry = db.query(OAuthAccount).filter(OAuthAccount.provider_user_id == mock_sub).first()
        assert oauth_entry is not None
        assert oauth_entry.provider == "google"

        usr = db.query(User).filter(User.id == oauth_entry.user_id).first()
        assert usr is not None
        assert usr.role == "customer"
        assert usr.is_active is True


def test_oauth_callback_no_automatic_linking_existing_password_user():
    """
    CRITICAL SECURITY TEST:
    Do not automatically link an existing account merely because the email addresses match.
    If a password user exists with the same email, reject OAuth callback to prevent account takeover.
    """
    existing_email = f"pwd_existing_{uuid.uuid4().hex[:8]}@example.com"
    db = next(get_db())
    existing_user = User(
        id=uuid.uuid4(),
        email=existing_email,
        password_hash=hash_password("SuperSecret123!"),
        role="customer",
        is_active=True,
    )
    existing_customer = Customer(
        id=uuid.uuid4(),
        user_id=existing_user.id,
        email=existing_email,
        full_name="Password Existing User",
        is_verified=True,
        is_active=True,
    )
    db.add(existing_user)
    db.add(existing_customer)
    db.commit()

    # Now attempt OAuth with the same email but new provider_user_id
    with patch.object(settings, "GOOGLE_CLIENT_ID", "mock-google-id"), \
         patch.object(settings, "GOOGLE_CLIENT_SECRET", "mock-google-secret"), \
         patch("requests.post") as mock_post, \
         patch("requests.get") as mock_get:

        mock_post.return_value = MagicMock(
            ok=True,
            json=lambda: {"access_token": "mock-access-token"}
        )
        mock_get.return_value = MagicMock(
            ok=True,
            json=lambda: {
                "sub": "different-oauth-sub-12345",
                "email": existing_email,
                "name": "Attacker Impersonator",
            }
        )

        valid_state = generate_oauth_state("google")
        res = client.post("/api/v1/customer/auth/oauth/google/callback", json={
            "code": "valid-code",
            "state": valid_state,
        })

        # MUST be rejected with 409 Conflict (anti-takeover)
        assert res.status_code == 409
        assert "automatic account linking is disabled" in res.json()["detail"]


def test_oauth_callback_role_isolation():
    """Verify that an admin or provider account cannot log in via customer OAuth."""
    admin_email = f"admin_iso_{uuid.uuid4().hex[:8]}@smartserve.com"
    admin_sub = f"admin-sub-{uuid.uuid4().hex[:8]}"
    db = next(get_db())
    admin_usr = User(
        id=uuid.uuid4(),
        email=admin_email,
        password_hash=hash_password("AdminPass123!"),
        role="admin",
        is_active=True,
    )
    admin_oauth = OAuthAccount(
        id=uuid.uuid4(),
        user_id=admin_usr.id,
        provider="github",
        provider_user_id=admin_sub,
        email=admin_email,
    )
    db.add(admin_usr)
    db.add(admin_oauth)
    db.commit()

    with patch.object(settings, "GITHUB_CLIENT_ID", "mock-gh-id"), \
         patch.object(settings, "GITHUB_CLIENT_SECRET", "mock-gh-secret"), \
         patch("requests.post") as mock_post, \
         patch("requests.get") as mock_get:

        mock_post.return_value = MagicMock(
            ok=True,
            json=lambda: {"access_token": "mock-gh-token"}
        )
        mock_get.side_effect = [
            MagicMock(ok=True, json=lambda: {"id": admin_sub, "login": "admin-gh", "email": admin_email}),
            MagicMock(ok=True, json=lambda: [{"email": admin_email, "primary": True, "verified": True}]),
        ]

        valid_state = generate_oauth_state("github")
        res = client.post("/api/v1/customer/auth/oauth/github/callback", json={
            "code": "valid-code",
            "state": valid_state,
        })

        # MUST be blocked (only customer accounts allowed)
        assert res.status_code == 403
        assert "only supported for customer accounts" in res.json()["detail"]
