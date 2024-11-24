"""Manually updating gpt_photo to LONGBLOB

Revision ID: c0c7b32e2860
Revises: 
Create Date: 2024-11-23 22:37:06.347450

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.mysql import LONGBLOB


# revision identifiers, used by Alembic.
revision = 'c0c7b32e2860'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Manually update gpt_photo column to LONGBLOB
    op.alter_column(
        'design',  # Replace with your table name
        'gpt_photo',  # Replace with your column name
        existing_type=sa.BLOB(),  # Existing column type in the database
        type_=LONGBLOB,  # New type
        existing_nullable=True  # Retain the current nullability setting
    )


def downgrade():
    # Revert the gpt_photo column back to BLOB if downgraded
    op.alter_column(
        'design',
        'gpt_photo',
        existing_type=LONGBLOB,
        type_=sa.BLOB(),
        existing_nullable=True
    )
