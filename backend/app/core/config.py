import os
from pydantic_settings import BaseSettings
from pydantic import field_validator
from typing import List, Union, Any


class Settings(BaseSettings):
    APP_NAME: str = "SmartServe"
    API_V1_PREFIX: str = "/api/v1"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "dev")
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://postgres:postgres@localhost:5432/smartserve",
    )
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", os.getenv("JWT_SECRET", "change-me-smartserve-secret-key-32chars"))
    JWT_SECRET: str = os.getenv("JWT_SECRET_KEY", os.getenv("JWT_SECRET", "change-me-smartserve-secret-key-32chars"))
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:5176",
        "http://127.0.0.1:5176",
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> List[str]:
        default_origins = [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
            "http://localhost:5174",
            "http://127.0.0.1:5174",
            "http://localhost:5175",
            "http://127.0.0.1:5175",
            "http://localhost:5176",
            "http://127.0.0.1:5176",
        ]
        if v is None:
            return default_origins
        if isinstance(v, str):
            raw = v.strip()
            if not raw:
                return default_origins
            if raw.startswith("[") and raw.endswith("]"):
                try:
                    import json
                    parsed = [str(x).strip().rstrip("/") for x in json.loads(raw) if str(x).strip()]
                except Exception:
                    parsed = [x.strip().rstrip("/") for x in raw.strip("[]").split(",") if x.strip()]
            else:
                parsed = [x.strip().rstrip("/") for x in raw.split(",") if x.strip()]
            combined = list(default_origins)
            for origin in parsed:
                if origin and origin not in combined:
                    combined.append(origin)
            return combined
        elif isinstance(v, (list, tuple)):
            combined = list(default_origins)
            for item in v:
                clean = str(item).strip().rstrip("/")
                if clean and clean not in combined:
                    combined.append(clean)
            return combined
        return default_origins

    KAFKA_BOOTSTRAP_SERVERS: str = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")
    KAFKA_CONSUMER_GROUP: str = os.getenv("KAFKA_CONSUMER_GROUP", "smartserve-backend-group")
    KAFKA_ENABLED: bool = os.getenv("KAFKA_ENABLED", "true").lower() in ("true", "1", "yes")
    KAFKA_SECURITY_PROTOCOL: str = os.getenv("KAFKA_SECURITY_PROTOCOL", "PLAINTEXT")
    KAFKA_SASL_MECHANISM: str = os.getenv("KAFKA_SASL_MECHANISM", "")
    KAFKA_SASL_USERNAME: str = os.getenv("KAFKA_SASL_USERNAME", "")
    KAFKA_SASL_PASSWORD: str = os.getenv("KAFKA_SASL_PASSWORD", "")

    # AI Support Configuration
    MAX_AI_SUPPORT_MESSAGES: int = int(os.getenv("MAX_AI_SUPPORT_MESSAGES", "5"))
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "")
    OPENROUTER_MODEL: str = os.getenv("OPENROUTER_MODEL", "openrouter/free")

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"



settings = Settings()
