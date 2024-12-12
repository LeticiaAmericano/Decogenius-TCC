from collections import defaultdict
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
    """Create model of rooms based on 3D dimensions without ceiling"""
    room_models = []
    
    for room in rooms:
        dimensions = room["dimensions"]
        height = float(dimensions["height"])
        width = float(dimensions["width"])
        depth = float(dimensions["depth"])

        # Create vertices for the walls (without ceiling)
        vertices = np.array([
            [0.0, 0.0, 0.0],       # 0: front-left-bottom
            [width / 100, 0.0, 0.0],   # 1: front-right-bottom
            [width / 100, depth / 100, 0.0], # 2: back-right-bottom
            [0.0, depth / 100, 0.0],   # 3: back-left-bottom
            [0.0, 0.0, height / 100],    # 4: front-left-top
            [width / 100, 0.0, height / 100], # 5: front-right-top
            [width / 100, depth / 100, height / 100], # 6: back-right-top
            [0.0, depth / 100, height / 100]  # 7: back-left-top
        ])

        # Define faces (floor and walls only, no ceiling)
        faces = np.array([
            [0, 1, 2],    # floor part 1
            [0, 2, 3],    # floor part 2
            [0, 1, 4],    # front wall part 1
            [1, 5, 4],    # front wall part 2
            [1, 2, 5],    # right wall part 1
            [2, 6, 5],    # right wall part 2
            [2, 3, 6],    # back wall part 1
            [3, 7, 6],    # back wall part 2
            [3, 0, 7],    # left wall part 1
            [0, 4, 7]     # left wall part 2
        ])

        # Define colors for each face
        face_colors = np.array([
            [0.8, 0.8, 0.8, 1.0],  # floor part 1
            [0.8, 0.8, 0.8, 1.0],  # floor part 2
            [0.4, 0.4, 0.4, 1.0],  # front wall part 1
            [0.4, 0.4, 0.4, 1.0],  # front wall part 2
            [0.4, 0.4, 0.4, 1.0],  # right wall part 1
            [0.4, 0.4, 0.4, 1.0],  # right wall part 2
            [0.4, 0.4, 0.4, 1.0],  # back wall part 1
            [0.4, 0.4, 0.4, 1.0],  # back wall part 2
            [0.4, 0.4, 0.4, 1.0],  # left wall part 1
            [0.4, 0.4, 0.4, 1.0]   # left wall part 2
        ])

        # Create mesh from vertices and faces
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