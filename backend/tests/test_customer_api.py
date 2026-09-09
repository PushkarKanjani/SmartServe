import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_customer_catalog_categories():
    response = client.get("/api/v1/customer/catalog/categories")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "name" in data[0]


def test_customer_catalog_services():
    response = client.get("/api/v1/customer/catalog/services")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0


def test_customer_auth_flow():
    # Register
    reg_payload = {
        "full_name": "Test Customer",
        "email": "testcust@example.com",
        "password": "Password123!",
        "phone": "+91 9999999999",
    }
    res_reg = client.post("/api/v1/customer/auth/register", json=reg_payload)
    assert res_reg.status_code in [200, 409]

    # Login
    login_payload = {
        "email": "testcust@example.com",
        "password": "Password123!",
    }
    res_login = client.post("/api/v1/customer/auth/login", json=login_payload)
    assert res_login.status_code == 200
    token_data = res_login.json()
    assert "access_token" in token_data
    token = token_data["access_token"]

    # Auth Me
    headers = {"Authorization": f"Bearer {token}"}
    res_me = client.get("/api/v1/customer/auth/me", headers=headers)
    assert res_me.status_code == 200
    assert res_me.json()["email"] == "testcust@example.com"


def test_customer_booking_creation():
    login_payload = {
        "email": "customer@example.com",
        "password": "Password123!",
    }
    res_login = client.post("/api/v1/customer/auth/login", json=login_payload)
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    srv_res = client.get("/api/v1/customer/catalog/services")
    assert srv_res.status_code == 200
    services = srv_res.json()
    assert len(services) > 0
    service_id = services[0]["id"]

    booking_payload = {
        "service_id": service_id,
        "scheduled_date": "2026-09-15",
        "scheduled_time": "11:00",
        "address_line1": "Flat 101, Test Residency, Sector 18",
        "city": "Noida",
        "pincode": "201301",
        "payment_method": "COD",
    }
    res_book = client.post("/api/v1/customer/bookings", json=booking_payload, headers=headers)
    assert res_book.status_code == 200
    b_data = res_book.json()
    assert b_data["service_id"] == service_id
    assert "booking_reference" in b_data
