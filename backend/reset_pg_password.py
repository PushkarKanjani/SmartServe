"""
Reset postgres password and check for smartserve DB.
"""
from sqlalchemy import create_engine, text

url = "postgresql+psycopg2://postgres@127.0.0.1:5432/postgres"
eng = create_engine(url, connect_args={"connect_timeout": 3})
with eng.connect() as c:
    c.execute(text("ALTER USER postgres WITH PASSWORD 'postgres'"))
    c.execute(text("COMMIT"))
    print("Password reset to 'postgres'")

    r = c.execute(text("SELECT datname FROM pg_database WHERE datname='smartserve'"))
    row = r.fetchone()
    if row:
        print("smartserve database EXISTS")
    else:
        print("smartserve database DOES NOT EXIST - need to create")
