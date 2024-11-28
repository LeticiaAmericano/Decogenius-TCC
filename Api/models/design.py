from sqlalchemy import Column, Integer, String, Boolean, Date, LargeBinary, ForeignKey
from sqlalchemy.orm import relationship
from models import db
from sqlalchemy.dialects.mysql import LONGBLOB


class Design(db.Model):
    __tablename__ = 'design'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    room = db.Column(db.String(255), nullable=False)
    like = db.Column(db.Boolean, nullable=True)
    date = db.Column(db.Date, nullable=False)
    gpt_description = db.Column(db.String(500), nullable=True)
    gpt_photo = db.Column(LONGBLOB, nullable=True)

    responses = relationship('DesignResponse', backref='design', cascade="all, delete-orphan")
    photos = relationship('DesignResponsePhoto', backref='design', cascade="all, delete-orphan")