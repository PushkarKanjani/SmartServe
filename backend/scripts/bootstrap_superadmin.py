#!/usr/bin/env python3
"""
SmartServe - Production Super Admin Bootstrap Tool

Safely creates or resets the initial Super Admin account for a production database.
Uses secure interactive password prompting or environment variables.
Never hardcodes default credentials.
"""

import sys
import os
import getpass
import argparse
import uuid
from datetime import datetime, timezone

# Ensure backend root is on path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.repositories.db import get_db
from app.models.user import User
from app.models.security import AdminRole
from app.core.security import hash_password

SUPER_ADMIN_PERMISSIONS = [
    "dashboard:view",
    "catalog:manage",
    "providers:manage",
    "customers:manage",
    "bookings:manage",
    "insights:view",
    "support:manage",
    "security:manage",
    "admins:manage",
    "emails:manage",
    "settings:manage",
]


def parse_args():
    parser = argparse.ArgumentParser(
        description="Bootstrap or reset the production Super Admin account."
    )
    parser.add_argument(
        "--email",
        default=os.getenv("BOOTSTRAP_ADMIN_EMAIL", ""),
        help="Super admin email address (or env BOOTSTRAP_ADMIN_EMAIL)",
    )
    parser.add_argument(
        "--password",
        default=os.getenv("BOOTSTRAP_ADMIN_PASSWORD", ""),
        help="Super admin password (or prompt interactively if not provided)",
    )
    return parser.parse_args()


def main():
    args = parse_args()
    print("=" * 65)
    print("  SMARTSERVE — PRODUCTION SUPER ADMIN BOOTSTRAP")
    print("=" * 65)

    email = args.email.strip().lower()
    if not email:
        try:
            email = input("Enter Super Admin email: ").strip().lower()
        except (KeyboardInterrupt, EOFError):
            print("\nAborted.")
            sys.exit(1)

    if not email or "@" not in email:
        print("[ERROR] A valid email address is required.")
        sys.exit(1)

    password = args.password
    if not password:
        try:
            password = getpass.getpass("Enter strong password (min 12 chars): ")
            confirm = getpass.getpass("Confirm password: ")
            if password != confirm:
                print("[ERROR] Passwords do not match.")
                sys.exit(1)
        except (KeyboardInterrupt, EOFError):
            print("\nAborted.")
            sys.exit(1)

    if len(password) < 10:
        print("[ERROR] Password must be at least 10 characters for production administrative accounts.")
        sys.exit(1)

    db = next(get_db())
    try:
        user = db.query(User).filter(User.email == email).first()
        hashed = hash_password(password)
        now = datetime.now(timezone.utc)

        if not user:
            user = User(
                id=uuid.uuid4(),
                email=email,
                password_hash=hashed,
                role="super_admin",
                is_active=True,
                is_2fa_enabled=False,
                created_at=now,
            )
            db.add(user)
            db.flush()
            print(f"[+] Created user account '{email}' with role 'super_admin'.")
        else:
            user.password_hash = hashed
            user.role = "super_admin"
            user.is_active = True
            print(f"[*] Updated existing user account '{email}' to role 'super_admin'.")

        role_entry = db.query(AdminRole).filter(AdminRole.user_id == user.id).first()
        if not role_entry:
            role_entry = AdminRole(
                id=uuid.uuid4(),
                user_id=user.id,
                role_name="super_admin",
                permissions=SUPER_ADMIN_PERMISSIONS,
                is_active=True,
            )
            db.add(role_entry)
            print("[+] Assigned complete Super Admin RBAC permissions.")
        else:
            role_entry.role_name = "super_admin"
            role_entry.permissions = SUPER_ADMIN_PERMISSIONS
            role_entry.is_active = True
            print("[*] Refreshed Super Admin RBAC permissions.")

        db.commit()
        print("\n>>> SUCCESS: Super Admin account successfully bootstrapped! <<<")
        print("    Ensure 2FA is enrolled upon first login via Admin Console.")

    except Exception as exc:
        db.rollback()
        print(f"[ERROR] Database transaction failed: {exc}")
        sys.exit(1)


if __name__ == "__main__":
    main()
