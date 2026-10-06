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
    from datetime import datetime, timedelta, time
    from app.core.database import SessionLocal
    from app.models import Provider, ProviderService, Availability, User
    
    future_date = (datetime.now() + timedelta(days=2)).strftime("%Y-%m-%d")
    fd_obj = (datetime.now() + timedelta(days=2)).date()

    db = SessionLocal()
    v_providers = db.query(Provider).join(User, Provider.user_id == User.id).filter(
        Provider.is_verified == True, User.is_active == True
    ).all()
    prov = next((p for p in v_providers if len(p.services) > 0), None)
    if prov:
        service_id = str(prov.services[0].service_id)
        # Clear any existing booking for this slot date to prevent conflict rejection
        from app.models import Booking
        db.query(Booking).filter(
            Booking.provider_id == prov.user_id,
            Booking.scheduled_time >= datetime.combine(fd_obj, time.min),
            Booking.scheduled_time <= datetime.combine(fd_obj, time.max),
        ).delete(synchronize_session=False)

        slot = db.query(Availability).filter(
            Availability.provider_id == prov.user_id,
            Availability.slot_date == fd_obj
        ).first()
        if not slot:
            db.add(Availability(
                provider_id=prov.user_id,
                slot_date=fd_obj,
                start_time=time(9, 0),
                end_time=time(18, 0),
                status="FREE"
            ))
        else:
            slot.status = "FREE"
        db.commit()
    db.close()

    booking_payload = {
        "service_id": service_id,
        "scheduled_date": future_date,
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
