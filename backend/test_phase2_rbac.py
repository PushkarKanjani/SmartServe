"""
Phase 2 Authentication & RBAC Cross-Provider Verification Test Suite.
Tests:
1. Unauthenticated requests return 401 (DUMMY_PROVIDER removal verified).
2. Customer role token cannot access provider endpoints (403 Forbidden).
3. Provider authentication returns real signed JWT with role='provider'.
4. Cross-provider ID Swapping (Amit Kumar vs Vikram Singh):
   - Profile ID swap (GET /providers/{id}): own -> 200, other -> 403
   - Services ID swap (GET /providers/{id}/services): own -> 200, other -> 403
   - Service modification ID swap (PATCH /providers/me/services/{other_service_id}): 403
   - Service deletion ID swap (DELETE /providers/me/services/{other_service_id}): 403
   - Availability ID swap (GET /providers/{id}/availability): own -> 200, other -> 403
   - Availability deletion ID swap (DELETE /providers/me/availability/{other_slot_id}): 403
   - Certificate retrieval ID swap (GET /certificates/{other_cert_id}): 403
   - Certificate deletion ID swap (DELETE /certificates/{other_cert_id}): 403
"""
import uuid
from datetime import date, time
from fastapi.testclient import TestClient
from app.main import app
from app.repositories.db import get_db
from app.models.user import User
from app.models.provider import Provider
from app.models.service import Service

client = TestClient(app)

def run_tests():
    db = next(get_db())
    
    # 1. Look up Amit and Vikram from PostgreSQL
    amit_user = db.query(User).filter(User.email == "amit.kumar@smartserve.com").first()
    vikram_user = db.query(User).filter(User.email == "vikram.singh@smartserve.com").first()
    assert amit_user is not None, "Amit user not found"
    assert vikram_user is not None, "Vikram user not found"
    
    print(f"Amit ID: {amit_user.id} ({amit_user.email})")
    print(f"Vikram ID: {vikram_user.id} ({vikram_user.email})")
    
    # -------------------------------------------------------------
    # TEST 1: Unauthenticated request must return 401 (DUMMY_PROVIDER removed)
    # -------------------------------------------------------------
    res = client.get("/api/v1/providers/me")
    assert res.status_code == 401, f"Expected 401 for unauthenticated request, got {res.status_code}: {res.text}"
    print("[PASS] Test 1: Unauthenticated request rejected with 401 Unauthorized (DUMMY_PROVIDER removed)")

    # -------------------------------------------------------------
    # TEST 2: Customer role token cannot access provider endpoints
    # -------------------------------------------------------------
    cust_res = client.post("/api/v1/auth/login", json={
        "email": "ananya.rao@example.com",
        "password": "CustomerPassword123!"
    })
    # Or signup customer if not loginable
    if cust_res.status_code != 200:
        cust_user = db.query(User).filter(User.role == "customer").first()
        from app.core.security import create_access_token
        cust_token = create_access_token(data={"sub": str(cust_user.id), "email": cust_user.email, "role": "customer"})
    else:
        cust_token = cust_res.json()["access_token"]
        
    res = client.get("/api/v1/providers/me", headers={"Authorization": f"Bearer {cust_token}"})
    assert res.status_code == 403, f"Expected 403 for customer accessing provider route, got {res.status_code}: {res.text}"
    print("[PASS] Test 2: Customer token rejected with 403 Forbidden on provider endpoint")

    # -------------------------------------------------------------
    # TEST 3: Authenticated login for Amit and Vikram
    # -------------------------------------------------------------
    amit_login = client.post("/api/v1/auth/login", json={
        "email": "amit.kumar@smartserve.com",
        "password": "Password123!"
    })
    assert amit_login.status_code == 200, f"Amit login failed: {amit_login.text}"
    amit_data = amit_login.json()
    amit_token = amit_data["access_token"]
    assert amit_data["role"] == "provider"
    assert "provider:profile" in amit_data["permissions"]
    print(f"[PASS] Test 3a: Amit authenticated via /auth/login, role='{amit_data['role']}', token issued")

    vikram_login = client.post("/api/v1/auth/login", json={
        "email": "vikram.singh@smartserve.com",
        "password": "ProviderPass123!"
    })
    assert vikram_login.status_code == 200, f"Vikram login failed: {vikram_login.text}"
    vikram_data = vikram_login.json()
    vikram_token = vikram_data["access_token"]
    assert vikram_data["role"] == "provider"
    assert "provider:profile" in vikram_data["permissions"]
    print(f"[PASS] Test 3b: Vikram authenticated via /auth/login, role='{vikram_data['role']}', token issued")

    amit_headers = {"Authorization": f"Bearer {amit_token}"}
    vikram_headers = {"Authorization": f"Bearer {vikram_token}"}

    # -------------------------------------------------------------
    # TEST 4: Profile ID swap (GET /providers/{id})
    # -------------------------------------------------------------
    # Amit reads own profile
    res = client.get(f"/api/v1/providers/{amit_user.id}", headers=amit_headers)
    assert res.status_code == 200, f"Amit failed to read own profile: {res.text}"
    assert res.json()["full_name"] == "Amit Kumar"

    # Amit attempts to read Vikram's profile by swapping ID in URL
    res = client.get(f"/api/v1/providers/{vikram_user.id}", headers=amit_headers)
    assert res.status_code == 403, f"Expected 403 on profile ID swap, got {res.status_code}: {res.text}"
    print("[PASS] Test 4a: Amit reading Vikram's profile via URL swap rejected with 403 Forbidden")

    # Vikram reads own profile
    res = client.get(f"/api/v1/providers/{vikram_user.id}", headers=vikram_headers)
    assert res.status_code == 200, f"Vikram failed to read own profile: {res.text}"
    assert res.json()["full_name"] == "Vikram Singh"

    # Vikram attempts to read Amit's profile by swapping ID in URL
    res = client.get(f"/api/v1/providers/{amit_user.id}", headers=vikram_headers)
    assert res.status_code == 403, f"Expected 403 on profile ID swap, got {res.status_code}: {res.text}"
    print("[PASS] Test 4b: Vikram reading Amit's profile via URL swap rejected with 403 Forbidden")

    # -------------------------------------------------------------
    # TEST 5: Services ID swap
    # -------------------------------------------------------------
    # Pick a real catalog service
    catalog_svc = db.query(Service).first()
    assert catalog_svc is not None, "No catalog service found"

    # Amit adds a service offering
    svc_res = client.post("/api/v1/providers/me/services", headers=amit_headers, json={
        "service_id": str(catalog_svc.id),
        "price": 799.00,
        "duration_minutes": 60,
        "active": True
    })
    assert svc_res.status_code == 201, f"Amit failed to add service: {svc_res.text}"
    amit_svc_id = svc_res.json()["id"]

    # Amit reads own services via URL
    res = client.get(f"/api/v1/providers/{amit_user.id}/services", headers=amit_headers)
    assert res.status_code == 200
    assert len(res.json()) >= 1

    # Amit attempts to read Vikram's services via URL swap
    res = client.get(f"/api/v1/providers/{vikram_user.id}/services", headers=amit_headers)
    assert res.status_code == 403, f"Expected 403 on service list swap, got {res.status_code}: {res.text}"
    print("[PASS] Test 5a: Amit viewing Vikram's services via URL swap rejected with 403 Forbidden")

    # Vikram attempts to modify Amit's service
    res = client.patch(f"/api/v1/providers/me/services/{amit_svc_id}", headers=vikram_headers, json={
        "price": 10.00
    })
    assert res.status_code == 403, f"Expected 403 on modifying other's service, got {res.status_code}: {res.text}"
    print("[PASS] Test 5b: Vikram modifying Amit's service offering rejected with 403 Forbidden")

    # Vikram attempts to delete Amit's service
    res = client.delete(f"/api/v1/providers/me/services/{amit_svc_id}", headers=vikram_headers)
    assert res.status_code == 403, f"Expected 403 on deleting other's service, got {res.status_code}: {res.text}"
    print("[PASS] Test 5c: Vikram deleting Amit's service offering rejected with 403 Forbidden")

    # -------------------------------------------------------------
    # TEST 6: Availability ID swap
    # -------------------------------------------------------------
    from app.models.provider import Availability
    db.query(Availability).filter(Availability.provider_id == amit_user.id, Availability.slot_date == "2026-09-28").delete()
    db.commit()
    slot_res = client.post("/api/v1/providers/me/availability", headers=amit_headers, json={
        "slot_date": "2026-09-28",
        "start_time": "10:00:00",
        "end_time": "12:00:00"
    })
    assert slot_res.status_code == 201, f"Amit failed to publish slot: {slot_res.text}"
    amit_slot_id = slot_res.json()["id"]

    # Amit reads own availability
    res = client.get(f"/api/v1/providers/{amit_user.id}/availability", headers=amit_headers)
    assert res.status_code == 200

    # Amit attempts to view Vikram's availability by ID swap
    res = client.get(f"/api/v1/providers/{vikram_user.id}/availability", headers=amit_headers)
    assert res.status_code == 403, f"Expected 403 on availability schedule swap, got {res.status_code}: {res.text}"
    print("[PASS] Test 6a: Amit viewing Vikram's availability via URL swap rejected with 403 Forbidden")

    # Vikram attempts to delete Amit's availability slot
    res = client.delete(f"/api/v1/providers/me/availability/{amit_slot_id}", headers=vikram_headers)
    assert res.status_code == 403, f"Expected 403 on deleting other's slot, got {res.status_code}: {res.text}"
    print("[PASS] Test 6b: Vikram deleting Amit's availability slot rejected with 403 Forbidden")

    # -------------------------------------------------------------
    # TEST 7: Certificate / Document ID swap
    # -------------------------------------------------------------
    # Amit uploads a certificate
    cert_res = client.post("/api/v1/certificates", headers=amit_headers, json={
        "document_url": "https://storage.smartserve.dev/docs/amit-electrician-lic.pdf",
        "certificate_type": "Electrical License Grade A"
    })
    assert cert_res.status_code == 201, f"Amit failed to upload cert: {cert_res.text}"
    amit_cert_id = cert_res.json()["id"]

    # Amit can read own certificate
    res = client.get(f"/api/v1/certificates/{amit_cert_id}", headers=amit_headers)
    assert res.status_code == 200, f"Amit failed to read own cert: {res.text}"

    # Vikram attempts to read Amit's certificate
    res = client.get(f"/api/v1/certificates/{amit_cert_id}", headers=vikram_headers)
    assert res.status_code == 403, f"Expected 403 on reading other's cert, got {res.status_code}: {res.text}"
    print("[PASS] Test 7a: Vikram reading Amit's certificate rejected with 403 Forbidden")

    # Vikram attempts to delete Amit's certificate
    res = client.delete(f"/api/v1/certificates/{amit_cert_id}", headers=vikram_headers)
    assert res.status_code == 403, f"Expected 403 on deleting other's cert, got {res.status_code}: {res.text}"
    print("[PASS] Test 7b: Vikram deleting Amit's certificate rejected with 403 Forbidden")

    # Cleanup test additions so database counts stay clean
    client.delete(f"/api/v1/providers/me/services/{amit_svc_id}", headers=amit_headers)
    client.delete(f"/api/v1/providers/me/availability/{amit_slot_id}", headers=amit_headers)
    client.delete(f"/api/v1/certificates/{amit_cert_id}", headers=amit_headers)
    print("[CLEANUP] Cleaned up temporary test artifacts from Amit")

    print("\n=======================================================")
    print("ALL PHASE 2 AUTHENTICATION & RBAC TESTS PASSED (10/10)")
    print("=======================================================")

if __name__ == "__main__":
    run_tests()
