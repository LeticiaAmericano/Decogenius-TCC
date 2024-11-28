from collections import defaultdict
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from models.design import Design
from models.design_response import DesignResponse
from models.design_response_photo import DesignResponsePhoto
import openai
import os
import json
import base64
from services.openai_provider import OpenAIProvider
from utils.model_system_instructions import model_system_instructions
from datetime import datetime

def process_images_to_base64(form_files):
    base64_images = []
    count = 0
    for file_key in form_files:
        if count >= 3:
            break  
        file = form_files[file_key]
        if file:
            base64_image = f"data:image/jpeg;base64,{base64.b64encode(file.read()).decode('utf-8')}"
            base64_images.append(base64_image)
            count += 1
    return base64_images

design_routes = Blueprint('design_routes', __name__, url_prefix='/private')

openai.api_key = os.getenv("OPENAI_API_KEY")

@design_routes.route('/create-design', methods=['POST'])
@jwt_required()
def create_design():
    user_id = get_jwt_identity()
    data = request.form

    if not data.get('name') or not data.get('room'):
        return jsonify({'error': 'Missing required fields: name or room'}), 400

    try:
        name = data.get('name')
        room = data.get('room')

        questions_answer = defaultdict(str)
        for key in data:
            if key.startswith('questions_answer[') and key.endswith(']'):
                question_key = key[len('questions_answer['):-1]  
                questions_answer[question_key] = data[key]

        questions_answer = dict(questions_answer)

        base64_images = process_images_to_base64(request.files)

        messages_content = []

        messages_content.append({
            "type": "text",
            "text": f"Design details: {json.dumps({'name': name, 'room': room, 'questions_answer': questions_answer})}"
        })

        for base64_image in base64_images:
            messages_content.append({
                "type": "image_url",
                "image_url": {
                    "url": base64_image
                }
            })

        messages = [
            {
                "role": "user",
                "content": messages_content
            }
        ]

        openai_provider = OpenAIProvider(
            messages=messages,
            system_instructions=model_system_instructions(),
            temperature=0.2,
            max_tokens=4000,
            model="gpt-4o-mini"
        )

        gpt_json = {'simple_description': 'The living room transforms into a cozy and modern space, featuring a warm color palette, comfortable seating, and ample natural light, creating an inviting atmosphere.', 'detailed_description': "The redesigned living room exudes a cozy and modern aesthetic, characterized by a harmonious blend of comfort and style. The focal point is a plush, L-shaped sectional sofa upholstered in a soft, light gray fabric, adorned with an array of textured throw pillows in muted earth tones. A sleek, minimalist coffee table made of reclaimed wood sits at the center, providing a rustic touch that complements the modern design. The walls are painted in a warm, neutral tone, enhancing the room's brightness and creating a welcoming ambiance. Large windows draped with sheer, light-filtering curtains allow natural light to flood the space, illuminating the beautiful hardwood flooring with a honeyed finish. In one corner, a stylish floor lamp with a warm glow adds to the cozy atmosphere, while a few potted plants bring a touch of greenery and life to the room. The ceiling features recessed lighting that can be adjusted to create the perfect mood, whether for relaxation or entertaining guests. Overall, this living room design perfectly balances modern elegance with a cozy, inviting feel."}

        simple_description = gpt_json.get("simple_description")
        detailed_description = gpt_json.get("detailed_description")

        openai_provider = OpenAIProvider(
            messages=[{"role": "user", "content": f"{detailed_description}"}],
            system_instructions=None,
            temperature=0.5,
            max_tokens=4000,
            model="dall-e-3"
        )

        img_base64 = ''
        with open(os.path.join(os.getcwd(), 'img_base64.txt'), 'r') as file: 
            img_base64 = file.read()

        if img_base64.startswith("data:image/png;base64,"):
            img_base64 = img_base64.replace("data:image/png;base64,", "")

        binary_data = base64.b64decode(img_base64)

        new_design = Design(
            user_id=user_id,
            name=name,
            room=room,
            date=datetime.now(),
            like=None,
            gpt_description=simple_description,
            gpt_photo=binary_data
        )

        db.session.add(new_design)
        db.session.flush()

        if questions_answer and isinstance(questions_answer, dict):
            for question, response in questions_answer.items():
                new_response = DesignResponse(
                    design_id=new_design.id,
                    code=question,
                    response=response
                )
                db.session.add(new_response)

        if base64_images:
            for idx, base64_image in enumerate(base64_images):
                if base64_image.startswith("data:image/png;base64,"):
                    base64_image = base64_image.replace("data:image/png;base64,", "")
                new_photo = DesignResponsePhoto(
                    design_id=new_design.id,
                    code=f"image_{idx + 1}",
                    response=base64.b64decode(base64_image)
                )
                db.session.add(new_photo)

        db.session.commit()

        return jsonify({
            'message': 'Design created successfully!',
            'design_id': new_design.id,
            'name': new_design.name,
            'gpt_description': simple_description,
            'gpt_photo': img_base64
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@design_routes.route('/view', methods=['GET'])
@jwt_required()
def view_designs():
    user_id = get_jwt_identity()

    try:
        designs = Design.query.filter_by(user_id=user_id).all()

        if not designs:
            return jsonify({'message': 'Nenhum design encontrado para este usuário'}), 404

        designs_list = []
        for design in designs:
          
            responses = DesignResponse.query.filter_by(design_id=design.id).all()
            photos = DesignResponsePhoto.query.filter_by(design_id=design.id).all()

            photos_list = [
                {
                    'code': photo.code,
                    'response': base64.b64encode(photo.response).decode('utf-8') if photo.response else None
                }
                for photo in photos
            ]

            designs_list.append({
                'id': design.id,
                'name': design.name,
                'room': design.room,
                'like': design.like,
                'date': design.date.isoformat(),
                'gpt_description': design.gpt_description,
                'gpt_photo': base64.b64encode(design.gpt_photo).decode('utf-8') if design.gpt_photo else None,
                'responses': [{'code': r.code, 'response': r.response} for r in responses],
                'photos': photos_list
            })

        return jsonify({'designs': designs_list}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@design_routes.route('/like', methods=['PATCH'])
@jwt_required()
def update_like():
    user_id = get_jwt_identity()
    data = request.get_json()

    if 'design_id' not in data or 'like' not in data:
        return jsonify({'error': 'Campos obrigatórios ausentes: design_id ou like'}), 400

    if not isinstance(data['like'], bool):
        return jsonify({'error': 'O campo "like" deve ser um valor booleano'}), 400

    try:
        design = Design.query.filter_by(id=data['design_id'], user_id=user_id).first()
        if not design:
            return jsonify({'error': 'Design não encontrado ou não pertence ao usuário'}), 404

        design.like = data['like']
        db.session.commit()

        return jsonify({'message': 'Like atualizado com sucesso!', 'design_id': design.id, 'like': design.like}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@design_routes.route('/item-list', methods=['GET'])
@jwt_required()  
def item_list():
    user_id = get_jwt_identity()

    try:
        designs = Design.query.filter_by(user_id=user_id).all()

        if not designs:
            return jsonify({'message': 'No designs found'}), 404

        design_list = []
        for design in designs:
            design_list.append({
                'design_id': design.id,
                'name': design.name,
                'room': design.room,
                'gpt_photo': base64.b64encode(design.gpt_photo).decode('utf-8') if design.gpt_photo else None
            })
  
        return jsonify({'designs': design_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@design_routes.route('/view-answer', methods=['POST'])
@jwt_required()  
def view_answer():
    try:
        data = request.get_json()
        design_id = data.get('design_id')

        if not design_id:
            return jsonify({'error': 'O ID do design é obrigatório.'}), 400

        design = Design.query.filter_by(id=design_id).first()

        if not design:
            return jsonify({'error': 'Design não encontrado.'}), 404

        gpt_photo_base64 = None
        if design.gpt_photo:
            gpt_photo_base64 = base64.b64encode(design.gpt_photo).decode('utf-8')

        return jsonify({
            'name': design.name,
            'gpt_description': design.gpt_description,
            'gpt_photo': gpt_photo_base64
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
