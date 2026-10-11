import unittest
from fastapi.testclient import TestClient
from app.main import app


class TestProviderDomain(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)
        from app.core.database import SessionLocal
        from app.models.provider import Provider
        from app.models.user import User
        from app.core.security import create_access_token
        db = SessionLocal()
        p = db.query(Provider).join(User, Provider.user_id == User.id).filter(User.is_active == True).first()
        token = create_access_token({"sub": str(p.user_id), "role": "provider"})
        db.close()
        self.headers = {"Authorization": f"Bearer {token}"}

    def test_health_check(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "healthy")

    def test_get_my_provider_profile(self):
        response = self.client.get("/api/v1/providers/me", headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("user_id", data)
        self.assertIn("reliability_score", data)

    def test_update_my_provider_profile(self):
        update_payload = {
            "category": "Plumbing & Smart Home",
            "skills": "Pipe fitting, Leak detection, Water heaters",
            "experience_years": 5,
            "base_price": "75.00",
            "service_area": "Delhi NCR & Noida",
        }
        response = self.client.patch("/api/v1/providers/me", json=update_payload, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["skills"], "Pipe fitting, Leak detection, Water heaters")
        self.assertEqual(data["service_area"], "Delhi NCR & Noida")
        self.assertEqual(float(data["base_price"]), 75.0)

    def test_availability_workflow(self):
        from datetime import datetime, timedelta
        future_date = (datetime.now().date() + timedelta(days=7)).isoformat()
        slot_payload = {
            "slot_date": future_date,
            "start_time": "10:00:00",
            "end_time": "12:00:00",
        }
        # Create slot
        post_res = self.client.post("/api/v1/providers/me/availability", json=slot_payload, headers=self.headers)
        self.assertEqual(post_res.status_code, 201)
        slot_data = post_res.json()
        slot_id = slot_data["id"]
        provider_id = slot_data["provider_id"]

        # List slots
        get_res = self.client.get(f"/api/v1/providers/{provider_id}/availability", headers=self.headers)
        self.assertEqual(get_res.status_code, 200)
        slots = get_res.json()
        self.assertTrue(any(s["id"] == slot_id for s in slots))

        # Delete slot
        del_res = self.client.delete(f"/api/v1/providers/me/availability/{slot_id}", headers=self.headers)
        self.assertEqual(del_res.status_code, 204)

    def test_certificates_workflow(self):
        cert_payload = {
            "document_url": "https://storage.smartserve.dev/certs/pushkar_master_plumber.pdf",
            "certificate_type": "Government Trade License",
        }
        # Upload certificate
        post_res = self.client.post("/api/v1/certificates", json=cert_payload, headers=self.headers)
        self.assertEqual(post_res.status_code, 201)
        cert_data = post_res.json()
        self.assertEqual(cert_data["verification_status"], "PENDING")

        # List my certificates
        get_res = self.client.get("/api/v1/certificates", headers=self.headers)
        self.assertEqual(get_res.status_code, 200)
        certs = get_res.json()
        self.assertGreaterEqual(len(certs), 1)


if __name__ == "__main__":
    unittest.main()
