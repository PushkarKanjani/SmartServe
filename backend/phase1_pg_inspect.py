"""
Phase 1 complete Postgres inspection - Phase 1 baseline counts.
"""
import os
import sys
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))
DATABASE_URL = os.getenv("DATABASE_URL", "")
if "postgresql://" in DATABASE_URL and "+psycopg2" not in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://")

from sqlalchemy import create_engine, text

engine = create_engine(DATABASE_URL, connect_args={"connect_timeout": 5})
with engine.connect() as c:
    print("CONNECTED to PostgreSQL OK")

    tables_result = c.execute(text("""
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' ORDER BY table_name
    """))
    tables = [r[0] for r in tables_result]
    print("\n=== ALL TABLES ===")
    for t in tables:
        print(f"  {t}")

    print("\n=== BASELINE ROW COUNTS ===")
    for t in tables:
        cnt = c.execute(text(f'SELECT COUNT(*) FROM "{t}"')).scalar()
        print(f"  {t}: {cnt}")

    print("\n=== USERS TABLE SCHEMA ===")
    cols = c.execute(text("""
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name='users' AND table_schema='public'
        ORDER BY ordinal_position
    """)).fetchall()
    for col in cols:
        print(f"  {col[0]} | {col[1]} | nullable={col[2]}")

    print("\n=== PROVIDERS TABLE SCHEMA ===")
    cols = c.execute(text("""
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name='providers' AND table_schema='public'
        ORDER BY ordinal_position
    """)).fetchall()
    for col in cols:
        print(f"  {col[0]} | {col[1]} | nullable={col[2]}")

    print("\n=== PROVIDERS DATA ===")
    rows = c.execute(text("SELECT user_id, full_name, category, is_verified FROM providers")).fetchall()
    if rows:
        for r in rows:
            print(f"  id={r[0]} name={r[1]} category={r[2]} verified={r[3]}")
    else:
        print("  (empty)")

    print("\n=== ALL USER ROLES ===")
    rows = c.execute(text("SELECT role, COUNT(*) FROM users GROUP BY role")).fetchall()
    if rows:
        for r in rows:
            print(f"  role={r[0]}: {r[1]}")
    else:
        print("  (no users)")

    print("\n=== USERS WITH PROVIDER ROLE ===")
    rows = c.execute(text("SELECT id, email, role FROM users WHERE role='provider'")).fetchall()
    if rows:
        for r in rows:
            print(f"  id={r[0]} email={r[1]} role={r[2]}")
    else:
        print("  (none)")

    print("\n=== BOOKINGS TABLE SCHEMA ===")
    cols = c.execute(text("""
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name='bookings' AND table_schema='public'
        ORDER BY ordinal_position
    """)).fetchall()
    for col in cols:
        print(f"  {col[0]} | {col[1]} | nullable={col[2]}")
    
    col_names = [c[0] for c in cols]
    required = ["provider_id", "emergency_flag", "timeline", "otp_code"]
    missing = [f for f in required if f not in col_names]
    if missing:
        print(f"  MISSING COLUMNS: {missing}")
    else:
        print("  All required booking columns present: OK")

    print("\n=== CERTIFICATES TABLE SCHEMA ===")
    cols = c.execute(text("""
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name='certificates' AND table_schema='public'
        ORDER BY ordinal_position
    """)).fetchall()
    for col in cols:
        print(f"  {col[0]} | {col[1]} | nullable={col[2]}")

    print("\n=== SERVICES COUNT ===")
    cnt = c.execute(text("SELECT COUNT(*) FROM services")).scalar()
    print(f"  services: {cnt} rows")

    print("\n=== ALEMBIC VERSION ===")
    row = c.execute(text("SELECT version_num FROM alembic_version")).fetchone()
    print(f"  Current head: {row[0] if row else 'none'}")

print("\nPhase 1 PG inspection complete.")
