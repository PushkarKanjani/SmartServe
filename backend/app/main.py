from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import Base, engine
from app.api.v1.router import api_v1_router
from app.api.v1.customer import router as customer_router

# Auto-create tables for local development mode
Base.metadata.create_all(bind=engine)
try:
    from app.seed_admins import seed_initial_admins
    seed_initial_admins()
except Exception:
    pass

try:
    from app.seed_providers import seed_initial_providers
    seed_initial_providers()
except Exception:
    pass

try:
    from app.seed_bookings import seed_operational_bookings
    seed_operational_bookings()
except Exception:
    pass

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

app = FastAPI(
    title=settings.APP_NAME,
    description="SmartServe - AI-powered multi-service booking & marketplace API",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    errors = []
    for err in exc.errors():
        field = ".".join(str(loc) for loc in err.get("loc", []) if loc != "body")
        msg = err.get("msg", "Invalid value")
        errors.append(f"{field}: {msg}" if field else msg)
    detail_str = "; ".join(errors)
    print(f"[ValidationError] {request.method} {request.url.path}: {detail_str}")
    return JSONResponse(
        status_code=422,
        content={"detail": detail_str, "errors": exc.errors()}
    )

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(api_v1_router)
app.include_router(customer_router, prefix=settings.API_V1_PREFIX)



@app.get("/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "environment": settings.ENVIRONMENT,
        "database_engine": str(engine.url),
    }


@app.get("/", tags=["System"])
def root():
    return {
        "message": "Welcome to SmartServe API",
        "docs": "/docs",
        "version": "0.1.0",
    }
