"""Create room table

Revision ID: 78e17155718b
Revises: e070a03f744c
Create Date: 2024-12-12 00:29:30.094503

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78e17155718b'
down_revision = 'e070a03f744c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('room_models',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('room_type', sa.String(length=100), nullable=False),
    sa.Column('file_data', sa.LargeBinary(), nullable=False),
    sa.Column('code', sa.String(length=8), nullable=False),
    sa.Column('file_name', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('room_models')
    # ### end Alembic commands ###