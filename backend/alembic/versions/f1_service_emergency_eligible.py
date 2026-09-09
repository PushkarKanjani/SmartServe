"""Add is_emergency_eligible column to services

Revision ID: f1_service_emergency_eligible
Revises: e1_customer_columns_provider_fk
Create Date: 2026-09-09

Additive migration only — no destructive changes.
Adds is_emergency_eligible boolean column to services table,
defaulting to False everywhere and non-nullable.
"""
from alembic import op
import sqlalchemy as sa


revision = 'f1_service_emergency_eligible'
down_revision = 'e1_customer_columns_provider_fk'
branch_labels = None
depends_on = None


def column_exists(conn, table, col):
    res = conn.execute(sa.text(
        f"SELECT column_name FROM information_schema.columns "
        f"WHERE table_schema='public' AND table_name='{table}' AND column_name='{col}'"
    ))
    return bool(res.scalar())


def upgrade():
    conn = op.get_bind()
    if not column_exists(conn, 'services', 'is_emergency_eligible'):
        op.add_column(
            'services',
            sa.Column(
                'is_emergency_eligible',
                sa.Boolean(),
                nullable=False,
                server_default=sa.text('false')
            )
        )


def downgrade():
    conn = op.get_bind()
    if column_exists(conn, 'services', 'is_emergency_eligible'):
        op.drop_column('services', 'is_emergency_eligible')
