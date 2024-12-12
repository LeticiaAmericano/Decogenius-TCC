from models import db
from datetime import datetime

class RoomModel(db.Model):
    __tablename__ = 'room_models'

    id = db.Column(db.Integer, primary_key=True)
    room_type = db.Column(db.String(100), nullable=False)
    file_data = db.Column(db.LargeBinary, nullable=False)
    code = db.Column(db.String(8), nullable=False)
    file_name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)