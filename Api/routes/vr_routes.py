import io
from models.room_model import RoomModel
from flask import Blueprint, request, jsonify, send_file, render_template

vr_routes = Blueprint('vr_routes', __name__, url_prefix='/public')

@vr_routes.route('/get-model/<code>', methods=['GET'])
def get_model(code):
    try:
        # Search for the model by code
        room_model = RoomModel.query.filter_by(code=code).first()
        
        if not room_model:
            return jsonify({"error": "3D model not found"}), 404
            
        # Return the GLB file
        if room_model.file_data:
            # Use the binary data directly without base64 decoding
            file_data = io.BytesIO(room_model.file_data)
            return send_file(
                file_data,
                mimetype='model/gltf-binary',
                as_attachment=True,
                download_name=room_model.file_name
            )
        else:
            return jsonify({"error": "File not found"}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@vr_routes.route('/vr-viewer', methods=['GET'])
def vr_viewer():
    try:    
        return render_template('vr_viewer.html')
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    