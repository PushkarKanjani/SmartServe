"""Add missing customer columns and provider FK to bookings

Revision ID: e1_customer_columns_provider_fk
Revises: d2_admin_full_completeness
Create Date: 2026-09-09

Additive migration only — no destructive changes.
Adds columns that exist in models but are absent from the migration chain:
 - customers.is_verified (bool)
 - customers.lifetime_spent (numeric)
 - customers.total_bookings (numeric)
 - customers.preferences (json)
 - bookings.provider_id FK constraint to providers (col already exists from d1)
 - users.password_hash alias (col already named correctly from a1)
 - ticket_messages.sender_name (in model, missing from d1)
 - support_tickets.category (in model, missing from d1)
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = 'e1_customer_columns_provider_fk'
down_revision = 'd2_admin_full_completeness'
branch_labels = None
depends_on = None


def column_exists(conn, table, col):
    res = conn.execute(sa.text(
        f"SELECT column_name FROM information_schema.columns "
        f"WHERE table_schema='public' AND table_name='{table}' AND column_name='{col}'"
    ))
    return bool(res.scalar())


def fk_exists(conn, constraint_name):
    res = conn.execute(sa.text(
        f"SELECT constraint_name FROM information_schema.table_constraints "
        f"WHERE constraint_type='FOREIGN KEY' AND constraint_name='{constraint_name}'"
    ))
    return bool(res.scalar())


def upgrade():
    conn = op.get_bind()

    # 1. customers — missing columns
    if not column_exists(conn, 'customers', 'is_verified'):
        op.add_column('customers', sa.Column('is_verified', sa.Boolean(), nullable=False, server_default=sa.text('true')))
    if not column_exists(conn, 'customers', 'lifetime_spent'):
        op.add_column('customers', sa.Column('lifetime_spent', sa.Numeric(10, 2), nullable=False, server_default='0.00'))
    if not column_exists(conn, 'customers', 'total_bookings'):
        op.add_column('customers', sa.Column('total_bookings', sa.Numeric(10, 0), nullable=False, server_default='0'))
    if not column_exists(conn, 'customers', 'preferences'):
        op.add_column('customers', sa.Column('preferences', sa.JSON(), nullable=True))

    # 2. bookings — add FK constraint for provider_id → providers (col exists, FK constraint may be missing)
    if not fk_exists(conn, 'fk_bookings_provider_id'):
        # Only add if providers table has entries or it's empty (constraint will work either way)
        op.create_foreign_key(
            'fk_bookings_provider_id',
            'bookings', 'providers',
            ['provider_id'], ['user_id'],
            ondelete='CASCADE'
        )

    # 3. ticket_messages — sender_name missing from d1
    if not column_exists(conn, 'ticket_messages', 'sender_name'):
        op.add_column('ticket_messages', sa.Column('sender_name', sa.String(255), nullable=True))

    # 4. support_tickets — category missing from d1
    if not column_exists(conn, 'support_tickets', 'category'):
        op.add_column('support_tickets', sa.Column('category', sa.String(100), nullable=True, server_default='General Inquiry'))


def downgrade():
    conn = op.get_bind()
    if column_exists(conn, 'support_tickets', 'category'):
        op.drop_column('support_tickets', 'category')
    if column_exists(conn, 'ticket_messages', 'sender_name'):
        op.drop_column('ticket_messages', 'sender_name')
    if fk_exists(conn, 'fk_bookings_provider_id'):
        op.drop_constraint('fk_bookings_provider_id', 'bookings', type_='foreignkey')
    if column_exists(conn, 'customers', 'preferences'):
        op.drop_column('customers', 'preferences')
    if column_exists(conn, 'customers', 'total_bookings'):
        op.drop_column('customers', 'total_bookings')
    if column_exists(conn, 'customers', 'lifetime_spent'):
        op.drop_column('customers', 'lifetime_spent')
    if column_exists(conn, 'customers', 'is_verified'):
        op.drop_column('customers', 'is_verified')
