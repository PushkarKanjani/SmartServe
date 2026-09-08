"""
Q3 seeder: Creates a users row with role='provider' for the existing provider record.
This wires login credentials to a real provider, not creating a new provider.

DEV-ONLY credential: provider@smartserve.dev / SmartServe@Provider1
"""
import uuid
from datetime import datetime, timezone
from app.repositories.db import get_db
from app.models.user import User
from app.models.provider import Provider
from app.core.security import hash_password

def seed_provider_user():
    db = next(get_db())

    # Find all existing providers to wire up
    providers = db.query(Provider).all()
    if not providers:
        print("No provider records found - run seed_initial_providers first")
        return

    print(f"Found {len(providers)} provider(s). Wiring users records...")
    
    for prov in providers:
        # Check if user already exists for this provider
        existing_user = db.query(User).filter(User.id == prov.user_id).first()
        if existing_user:
            if existing_user.role != 'provider':
                existing_user.role = 'provider'
                db.commit()
                print(f"  Updated role to 'provider' for user {existing_user.email}")
            else:
                print(f"  Provider user already exists: {existing_user.email} (id={existing_user.id})")
            continue

        # Check if user with provider's user_id needs to be created
        # Use name-based email derived from full_name
        email_slug = prov.full_name.lower().replace(" ", ".").replace("&", "and")
        email = f"{email_slug}@provider.smartserve.dev"
        
        # Check if this email already exists
        existing_by_email = db.query(User).filter(User.email == email).first()
        if existing_by_email:
            # Update its id to match the provider's user_id if different
            print(f"  Email {email} exists with id={existing_by_email.id} (provider expects {prov.user_id})")
            continue

        dev_password = "SmartServe@Provider1"
        new_user = User(
            id=prov.user_id,  # Use the same UUID as provider.user_id
            email=email,
            password_hash=hash_password(dev_password),
            role="provider",
            is_active=True,
            is_2fa_enabled=False,
            created_at=datetime.now(timezone.utc)
        )
        db.add(new_user)
        db.flush()
        print(f"  Created provider user: {email}")
        print(f"    user_id={prov.user_id}")
        print(f"    provider name={prov.full_name}")
        print(f"    DEV password: {dev_password}")

    db.commit()
    print("\nProvider user seeding complete.")
    
    # Report all provider users
    print("\n=== PROVIDER USERS IN DB ===")
    users = db.query(User).filter(User.role == 'provider').all()
    for u in users:
        print(f"  id={u.id} email={u.email} active={u.is_active}")

if __name__ == "__main__":
    seed_provider_user()
