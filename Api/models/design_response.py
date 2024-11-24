from sqlalchemy import Column, Integer, String, ForeignKey
from models import db

class DesignResponse(db.Model):
    __tablename__ = 'design_response'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    design_id = db.Column(db.Integer, db.ForeignKey('design.id', ondelete='CASCADE'), nullable=False)
    response = db.Column(db.String(500), nullable=False)
    code = db.Column(db.String(100), nullable=False)
