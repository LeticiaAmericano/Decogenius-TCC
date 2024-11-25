from flask import Blueprint, request, jsonify
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from utils.token import blacklist
from models import db
from models.user import User

user_routes = Blueprint('user_routes', __name__)  

@user_routes.route('/public/register', methods=['POST'])
def create_user():
    data = request.get_json()

    if not all(k in data for k in ('name', 'cpf', 'birth_date', 'phone', 'email', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400

    if User.query.filter_by(cpf=data['cpf']).first():
        return jsonify({'error': 'CPF already exists'}), 409
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 409

    hashed_password = generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        name=data['name'],
        cpf=data['cpf'],
        birth_date=data['birth_date'],
        phone=data['phone'],
        email=data['email'],
        password=hashed_password
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@user_routes.route('/public/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401

    access_token = create_access_token(identity=user.id, expires_delta=False)
    return jsonify({
        'message': 'Login successful!',
        'access_token': access_token
    }), 200

# Rota de logout
@user_routes.route('/private/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"] 
    blacklist.add(jti)  
    return jsonify({'message': 'Logout successful!'}), 200
