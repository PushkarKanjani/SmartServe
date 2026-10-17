import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.models.base import Base, GUID


class OAuthAccount(Base):
    __tablename__ = "oauth_accounts"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    provider = Column(String(50), nullable=False, index=True)  # google, apple, github
    provider_user_id = Column(String(255), nullable=False, index=True)
    email = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))

    __table_args__ = (
        UniqueConstraint("provider", "provider_user_id", name="uq_oauth_provider_user_id"),
    )

    user = relationship("User", backref="oauth_accounts")
