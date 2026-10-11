"""Add oauth_accounts table for social login

Revision ID: h1_oauth_accounts
Revises: g1_password_reset_and_rate_limit
Create Date: 2026-10-10

Additive migration:
Creates oauth_accounts table for secure multi-provider OAuth (Google, Apple, GitHub)
linking with unique (provider, provider_user_id) constraint.
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

revision = 'h1_oauth_accounts'
down_revision = 'g1_password_reset_and_rate_limit'

branch_labels = None
depends_on = None


def table_exists(conn, table):
    try:
        from alembic import context
        if context.is_offline_mode():
            return False
        res = conn.execute(sa.text(
            f"SELECT table_name FROM information_schema.tables "
            f"WHERE table_schema='public' AND table_name='{table}'"
        ))
        if res is None:
            return False
        return bool(res.scalar())
    except Exception:
        return False


def upgrade():
    conn = op.get_bind()
    if not table_exists(conn, 'oauth_accounts'):
        op.create_table(
            'oauth_accounts',
            sa.Column('id', UUID(as_uuid=True), primary_key=True),
            sa.Column('user_id', UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
            sa.Column('provider', sa.String(50), nullable=False),
            sa.Column('provider_user_id', sa.String(255), nullable=False),
            sa.Column('email', sa.String(255), nullable=True),
            sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        )
        op.create_index('ix_oauth_accounts_user_id', 'oauth_accounts', ['user_id'])
        op.create_index('ix_oauth_accounts_provider', 'oauth_accounts', ['provider'])
        op.create_index('ix_oauth_accounts_provider_user_id', 'oauth_accounts', ['provider_user_id'])
        op.create_unique_constraint('uq_oauth_provider_user_id', 'oauth_accounts', ['provider', 'provider_user_id'])


def downgrade():
    conn = op.get_bind()
    if table_exists(conn, 'oauth_accounts'):
        op.drop_table('oauth_accounts')
