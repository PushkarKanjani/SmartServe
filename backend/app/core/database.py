from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

# Engine configuration with fallback handling
database_url = settings.DATABASE_URL
if database_url.startswith("postgresql") and "+psycopg2" not in database_url and "+asyncpg" not in database_url:
    # Ensure standard psycopg2 dialect if not specified
    database_url = database_url.replace("postgresql://", "postgresql+psycopg2://")

try:
    engine = create_engine(
        database_url,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20,
    )
except Exception:
    # Fallback to local SQLite for disconnected dev / testing mode if postgres server is offline
    import os
    sqlite_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "smartserve_dev.db"))
    engine = create_engine(
        f"sqlite:///{sqlite_path}",
        connect_args={"check_same_thread": False},
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
