from sqlalchemy import Column, Integer, String, ForeignKey, LargeBinary
from models import db
from sqlalchemy.dialects.mysql import LONGBLOB

class DesignResponsePhoto(db.Model):
    __tablename__ = 'design_response_photo'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    design_id = db.Column(db.Integer, db.ForeignKey('design.id', ondelete='CASCADE'), nullable=False)
    response = db.Column(LONGBLOB, nullable=False)
    code = db.Column(db.String(100), nullable=False)
