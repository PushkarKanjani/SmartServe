import os
import re
import time
import logging
from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.ext.compiler import compiles
from sqlalchemy.dialects.postgresql import JSONB
from app.core.config import settings

logger = logging.getLogger("smartserve.database")

@compiles(JSONB, "sqlite")
def compile_jsonb_sqlite(type_, compiler, **kw):
    return "JSON"

database_url = settings.DATABASE_URL
if database_url.startswith("postgresql") and "+psycopg2" not in database_url and "+asyncpg" not in database_url:
    database_url = database_url.replace("postgresql://", "postgresql+psycopg2://")

# Handle passwords containing special characters like '@'
m = re.match(r'^(postgres(?:ql)?(?:\+[a-zA-Z0-9_-]+)?:\/\/)([^:]+):(.*)@([^@:]+)(?::(\d+))?\/(.*)$', database_url)
if m:
    scheme, user, pwd, host, port, db = m.groups()
    if "@" in pwd:
        encoded_pwd = quote_plus(pwd)
        port_part = f":{port}" if port else ""
        database_url = f"{scheme}{user}:{encoded_pwd}@{host}{port_part}/{db}"

def get_engine():
    timeout = int(os.getenv("DB_CONNECT_TIMEOUT", "20" if os.getenv("ENVIRONMENT") == "production" else "15"))
    pool_size = int(os.getenv("DB_POOL_SIZE", "5"))
    max_overflow = int(os.getenv("DB_MAX_OVERFLOW", "3"))
    pool_timeout = int(os.getenv("DB_POOL_TIMEOUT", "15"))
    pool_recycle = int(os.getenv("DB_POOL_RECYCLE", "180"))

    if "postgresql" in database_url:
        last_err = None
        for attempt in range(1, 4):
            try:
                engine_test = create_engine(
                    database_url,
                    pool_size=pool_size,
                    max_overflow=max_overflow,
                    pool_timeout=pool_timeout,
                    pool_pre_ping=True,
                    pool_recycle=pool_recycle,
                    connect_args={"connect_timeout": timeout},
                )
                with engine_test.connect():
                    pass
                return engine_test
            except Exception as e:
                last_err = e
                logger.warning(f"Database connection attempt {attempt}/3 failed: {e}")
                if attempt < 3:
                    time.sleep(1.0)
        
        if os.getenv("ENVIRONMENT") == "production":
            raise last_err
        logger.error(
            f"Failed to connect to PostgreSQL after 3 attempts ({last_err}). Falling back to local SQLite."
        )
        sqlite_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "smartserve_dev.db"))
        return create_engine(
            f"sqlite:///{sqlite_path}",
            connect_args={"check_same_thread": False},
        )
    elif "sqlite" in database_url:
        return create_engine(database_url, connect_args={"check_same_thread": False})
    else:
        return create_engine(database_url)


engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
