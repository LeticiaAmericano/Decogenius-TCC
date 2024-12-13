from collections import defaultdict
import os
from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from models.design import Design
from models.design_response import DesignResponse
from models.design_response_photo import DesignResponsePhoto
from models.room_model import RoomModel
import base64
from services.openai_provider import OpenAIProvider
from utils.model_system_instructions import model_system_instructions
from datetime import datetime
import trimesh
import io
import random
import string
import numpy as np

def create_room_model(rooms):
    """Create model of rooms based on 3D dimensions with only two walls for interior visualization"""
    room_models = []
    
    for room in rooms:
        dimensions = room["dimensions"]
        height = float(dimensions["height"])
        width = float(dimensions["width"])
        depth = float(dimensions["depth"])

        vertices = np.array([
            [0.0, 0.0, 0.0],
            [width, 0.0, 0.0],
            [width, 0.0, depth],
            [0.0, 0.0, depth],
            [0.0, height, 0.0],
            [width, height, 0.0],
            [0.0, height, depth]
        ])

        faces = np.array([
            [0, 1, 2],
            [0, 2, 3],
            [2, 1, 0],
            [3, 2, 0],
            
            [0, 1, 4],
            [1, 5, 4],
            [4, 1, 0],
            [4, 5, 1],
            
            [3, 0, 6],
            [0, 4, 6],
            [6, 0, 3],
            [6, 4, 0]
        ])

        face_colors = np.array([
            [0.3, 0.3, 0.3, 1.0],
            [0.3, 0.3, 0.3, 1.0],
            [0.3, 0.3, 0.3, 1.0],
            [0.3, 0.3, 0.3, 1.0],
            [0.7, 0.7, 0.7, 1.0],
            [0.7, 0.7, 0.7, 1.0],
            [0.7, 0.7, 0.7, 1.0],
            [0.7, 0.7, 0.7, 1.0],
            [0.7, 0.7, 0.7, 1.0],
            [0.7, 0.7, 0.7, 1.0],
            [0.7, 0.7, 0.7, 1.0],
            [0.7, 0.7, 0.7, 1.0]
        ])

        room_model = trimesh.Trimesh(
            vertices=vertices,
            faces=faces,
            face_colors=face_colors
        )
        room_models.append(room_model)
        
    return room_models

plant_routes = Blueprint('plant_routes', __name__, url_prefix='/private')

@plant_routes.route('/create-plant', methods=['POST'])
@jwt_required()
def create_plant():
    try:
        user_id = get_jwt_identity()
        data = request.json
        rooms = data.get("rooms")
        
        if not rooms:
            return jsonify({"error": "Rooms data is required"}), 400

        models = create_room_model(rooms)
        room_models_data = []
        
        for i, model in enumerate(models):
            buffer = io.BytesIO()
            model.export(buffer, file_type='glb')
            file_data = buffer.getvalue()
            
            room_model = RoomModel(
                room_type=rooms[i]["room_type"],
                file_data=file_data,
                file_name=f"{rooms[i]['room_type']}_room.glb",
                code=''.join(random.choices(string.ascii_uppercase + string.digits, k=8)),
                user_id=user_id
            )
            
            db.session.add(room_model)
            room_models_data.append({
                'id': room_model.id,
                'file_name': room_model.file_name,
                'code': room_model.code,
                'room_type': room_model.room_type,
                'file_data': base64.b64encode(file_data).decode('utf-8')
            })
        
        db.session.commit()
        
        return jsonify({
            'message': 'Room models created successfully',
            'rooms': room_models_data
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500