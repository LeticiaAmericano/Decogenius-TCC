from flask import Blueprint, request, jsonify
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db
from models.user import User

# Cria um único blueprint
user_routes = Blueprint('user_routes', __name__)

# Rota pública: Criar usuário
@user_routes.route('/public/create-user', methods=['POST'])
def create_user():
    data = request.get_json()

    # Validação de campos obrigatórios
    if not all(k in data for k in ('name', 'cpf', 'birth_date', 'phone', 'email', 'password')):
        return jsonify({'error': 'Missing required fields'}), 400

    # Verifica se CPF ou email já existem no banco
    if User.query.filter_by(cpf=data['cpf']).first():
        return jsonify({'error': 'CPF already exists'}), 409
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 409

    # Criptografa a senha e cria um novo usuário
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

@user_routes.route('/private/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validação de campos obrigatórios
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400

    # Busca o usuário pelo email
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401

    # Gera um token de acesso
    access_token = create_access_token(identity=user.id)
    return jsonify({
        'message': 'Login successful!',
        'access_token': access_token
    }), 200
