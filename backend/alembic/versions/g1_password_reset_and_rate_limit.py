"""Add password_reset_tokens and rate_limit_entries tables

Revision ID: g1_password_reset_and_rate_limit
Revises: 8248923e7c12
Create Date: 2026-10-09

Additive migration:
Creates password_reset_tokens and rate_limit_entries tables with secure token hashing
and sliding-window rate limit persistence.
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

revision = 'g1_password_reset_and_rate_limit'
down_revision = '8248923e7c12'

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
    if not table_exists(conn, 'password_reset_tokens'):
        op.create_table(
            'password_reset_tokens',
            sa.Column('id', UUID(as_uuid=True), primary_key=True),
            sa.Column('user_id', UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
            sa.Column('token_hash', sa.String(64), nullable=False, unique=True),
            sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
            sa.Column('is_used', sa.Boolean(), nullable=False, server_default=sa.text('false')),
            sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
            sa.Column('used_at', sa.DateTime(timezone=True), nullable=True),
        )
        op.create_index('ix_password_reset_tokens_user_id', 'password_reset_tokens', ['user_id'])
        op.create_index('ix_password_reset_tokens_token_hash', 'password_reset_tokens', ['token_hash'])
        op.create_index('ix_password_reset_tokens_expires_at', 'password_reset_tokens', ['expires_at'])
        op.create_index('ix_password_reset_tokens_is_used', 'password_reset_tokens', ['is_used'])

    if not table_exists(conn, 'two_factor_recovery_codes'):
        op.create_table(
            'two_factor_recovery_codes',
            sa.Column('id', UUID(as_uuid=True), primary_key=True),
            sa.Column('user_id', UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
            sa.Column('code_hash', sa.String(64), nullable=False),
            sa.Column('is_used', sa.Boolean(), nullable=False, server_default=sa.text('false')),
            sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
            sa.Column('used_at', sa.DateTime(timezone=True), nullable=True),
        )
        op.create_index('ix_two_factor_recovery_codes_user_id', 'two_factor_recovery_codes', ['user_id'])
        op.create_index('ix_two_factor_recovery_codes_code_hash', 'two_factor_recovery_codes', ['code_hash'])
        op.create_index('ix_two_factor_recovery_codes_is_used', 'two_factor_recovery_codes', ['is_used'])

    if not table_exists(conn, 'rate_limit_entries'):
        op.create_table(
            'rate_limit_entries',
            sa.Column('id', UUID(as_uuid=True), primary_key=True),
            sa.Column('key', sa.String(255), nullable=False),
            sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        )
        op.create_index('ix_rate_limit_entries_key', 'rate_limit_entries', ['key'])
        op.create_index('ix_rate_limit_entries_created_at', 'rate_limit_entries', ['created_at'])


def downgrade():
    conn = op.get_bind()
    if table_exists(conn, 'rate_limit_entries'):
        op.drop_table('rate_limit_entries')
    if table_exists(conn, 'two_factor_recovery_codes'):
        op.drop_table('two_factor_recovery_codes')
    if table_exists(conn, 'password_reset_tokens'):
        op.drop_table('password_reset_tokens')
