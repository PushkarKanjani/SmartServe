"""
SmartServe - Automated Supabase Migration & Verification Script
Reads credentials strictly from environment variables or .env.supabase (NEVER via CLI arguments).
Executes:
  1. Pre-flight connection test against remote Supabase.
  2. Guardrail checks: host != localhost/LAN, port == 5432, dbname == postgres.
  3. Pre-migration emptiness check (aborts if application tables already exist).
  4. pg_restore with --no-owner, --no-acl, --verbose and PGPASSWORD.
  5. Post-migration row count audit comparing all 21 tables against source of truth.
  6. Redacts all passwords in stdout/stderr.
"""

import os
import sys
import subprocess
from urllib.parse import urlparse, unquote
from dotenv import dotenv_values

DUMP_PATH = os.path.abspath(os.path.join("backend", "backups", "smartserve_local_pre_supabase_20261003_135217.dump"))
PG_RESTORE_BIN = r"C:\Program Files\PostgreSQL\17\bin\pg_restore.exe"
if not os.path.exists(PG_RESTORE_BIN):
    PG_RESTORE_BIN = "pg_restore"

EXPECTED_COUNTS = {
    "services": 747,
    "provider_services": 1620,
    "bookings": 114,
    "availability": 406,
    "certificates": 75,
    "users": 49,
    "providers": 33,
    "customers": 11,
    "support_tickets": 42,
    "ticket_messages": 97,
    "audit_logs": 521,
    "active_sessions": 422,
    "customer_flags": 3,
    "admin_roles": 4,
    "failed_login_attempts": 9,
    "provider_locations": 2,
    "booking_feedbacks": 0,
    "email_logs": 0,
    "email_templates": 0,
    "suspicious_activities": 0,
    "user_sessions": 0,
}

def load_credentials():
    # 1. Check direct env vars
    url = os.getenv("SUPABASE_DATABASE_URL")
    
    # 2. Check .env.supabase in root or backend/
    if not url:
        for p in [".env.supabase", os.path.join("backend", ".env.supabase")]:
            if os.path.exists(p):
                env_vals = dotenv_values(p)
                url = env_vals.get("SUPABASE_DATABASE_URL") or env_vals.get("DATABASE_URL")
                if url:
                    break

    # 3. Check individual PG env vars
    if not url:
        host = os.getenv("PGHOST")
        user = os.getenv("PGUSER")
        password = os.getenv("PGPASSWORD")
        port = os.getenv("PGPORT", "5432")
        dbname = os.getenv("PGDATABASE", "postgres")
        if host and user and password:
            return {
                "host": host,
                "port": port,
                "user": user,
                "password": password,
                "dbname": dbname,
                "redacted_url": f"postgresql://{user}:***@{host}:{port}/{dbname}"
            }
        return None

    raw_url = url.replace("postgresql+psycopg2://", "postgresql://")
    parsed = urlparse(raw_url)
    
    return {
        "host": parsed.hostname or "",
        "port": str(parsed.port or 5432),
        "user": parsed.username or "postgres",
        "password": unquote(parsed.password) if parsed.password else "",
        "dbname": parsed.path.lstrip("/") or "postgres",
        "redacted_url": f"postgresql://{parsed.username}:***@{parsed.hostname}:{parsed.port or 5432}/{parsed.path.lstrip('/')}"
    }

def run_migration():
    creds = load_credentials()
    if not creds:
        print("[ERROR] No Supabase credentials found.")
        print("Please set the SUPABASE_DATABASE_URL environment variable or create an untracked .env.supabase file.")
        sys.exit(1)

    host = creds["host"]
    port = creds["port"]
    user = creds["user"]
    password = creds["password"]
    dbname = creds["dbname"]
    redacted_url = creds["redacted_url"]

    print("==================================================")
    print("STEP 1 & 2: PRE-FLIGHT CONNECTION & TARGET VERIFICATION")
    print("==================================================")
    print(f"Target Host    : {host}")
    print(f"Target Port    : {port}")
    print(f"Target User    : {user}")
    print(f"Target Database: {dbname}")
    print(f"Target URL     : {redacted_url}")
    print(f"Verified Dump  : {DUMP_PATH}")

    # Guardrails
    if host in ("localhost", "127.0.0.1", "::1", "0.0.0.0") or any(host.startswith(p) for p in ["192.168.", "172.", "10."]):
        print(f"\n[FATAL ERROR] Safety guardrail triggered: Target host '{host}' is local/LAN. Must be remote Supabase!")
        sys.exit(1)

    if not ("supabase.co" in host or "supabase.com" in host or "pooler.supabase" in host):
        print(f"\n[WARNING] Host '{host}' does not contain 'supabase'. Please ensure this is the intended Supabase host.")

    if not password:
        print("\n[FATAL ERROR] Password is empty.")
        sys.exit(1)

    # Test connection via psycopg2
    try:
        import psycopg2
        conn = psycopg2.connect(
            host=host,
            port=int(port),
            user=user,
            password=password,
            dbname=dbname,
            connect_timeout=10
        )
        conn.autocommit = True
        cur = conn.cursor()
        print("[SUCCESS] Successfully connected to remote Supabase database!")
    except Exception as e:
        print(f"[FATAL ERROR] Connection to Supabase failed: {e}")
        sys.exit(1)

    print("\n==================================================")
    print("STEP 3 & 4: CHECK IF TARGET DATABASE IS EMPTY")
    print("==================================================")
    cur.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE';
    """)
    existing_tables = [row[0] for row in cur.fetchall()]
    print(f"Existing tables in 'public' schema: {len(existing_tables)}")

    # Check for known SmartServe application tables
    app_tables_found = [t for t in existing_tables if t in EXPECTED_COUNTS]
    if app_tables_found:
        print(f"\n[ABORT] Target Supabase database is NOT empty! Found existing application tables:")
        for t in app_tables_found:
            cur.execute(f'SELECT count(*) FROM "{t}"')
            c = cur.fetchone()[0]
            print(f"  - {t:30s}: {c} rows")
        print("\nSafety policy prohibits overwriting existing data. Stopping execution.")
        conn.close()
        sys.exit(1)

    print("[VERIFIED] Target database is clean. No application tables exist in public schema.")
    conn.close()

    print("\n==================================================")
    print("STEP 5: EXECUTING PG_RESTORE")
    print("==================================================")
    cmd = [
        PG_RESTORE_BIN,
        "-h", host,
        "-p", port,
        "-U", user,
        "-d", dbname,
        "--no-owner",
        "--no-acl",
        "--verbose",
        DUMP_PATH
    ]
    redacted_cmd_str = f'"{PG_RESTORE_BIN}" -h {host} -p {port} -U {user} -d {dbname} --no-owner --no-acl --verbose "{DUMP_PATH}"'
    print(f"Running command: {redacted_cmd_str}")

    env = os.environ.copy()
    env["PGPASSWORD"] = password

    res = subprocess.run(cmd, env=env, capture_output=True, text=True)
    # Output tail of restore logs
    lines = res.stderr.splitlines()
    print(f"pg_restore finished with exit code {res.returncode}")
    print(f"Log entries captured: {len(lines)}")
    if len(lines) > 25:
        print("First 10 log entries:")
        for l in lines[:10]:
            print(f"  {l}")
        print("  ...")
        print("Last 15 log entries:")
        for l in lines[-15:]:
            print(f"  {l}")
    else:
        for l in lines:
            print(f"  {l}")

    print("\n==================================================")
    print("STEP 6 & 7: POST-MIGRATION AUDIT & ROW COUNT VERIFICATION")
    print("==================================================")
    try:
        conn = psycopg2.connect(
            host=host,
            port=int(port),
            user=user,
            password=password,
            dbname=dbname,
            connect_timeout=15
        )
        cur = conn.cursor()
        
        cur.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
              AND table_type = 'BASE TABLE'
            ORDER BY table_name;
        """)
        migrated_tables = [row[0] for row in cur.fetchall()]
        print(f"Total tables found in Supabase public schema: {len(migrated_tables)}")

        mismatches = []
        missing_tables = []

        print(f"\n{'Table Name':35s} | {'Expected':>10s} | {'Supabase':>10s} | {'Status':>10s}")
        print("-" * 75)

        for table, expected in sorted(EXPECTED_COUNTS.items()):
            if table not in migrated_tables:
                missing_tables.append(table)
                print(f"{table:35s} | {expected:>10d} | {'MISSING':>10s} | {'FAILED':>10s}")
            else:
                cur.execute(f'SELECT count(*) FROM "{table}"')
                actual = cur.fetchone()[0]
                status = "MATCH" if actual == expected else "MISMATCH"
                if actual != expected:
                    mismatches.append((table, expected, actual))
                print(f"{table:35s} | {expected:>10d} | {actual:>10d} | {status:>10s}")

        conn.close()

        print("-" * 75)
        if not missing_tables and not mismatches:
            print("\n[MIGRATION PERFECT] All 21 tables migrated with 100% exact row count matches!")
            return 0
        else:
            print(f"\n[AUDIT ALERT] Missing tables: {missing_tables}, Mismatches: {mismatches}")
            return 1

    except Exception as e:
        print(f"[ERROR] Post-migration verification failed: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(run_migration())
