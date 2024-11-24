from flask_jwt_extended import JWTManager
from flask import Flask

# Adicione isso na configuração da sua aplicação
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'decogeniuskey'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']

jwt = JWTManager(app)

# Blacklist de tokens
blacklist = set()

def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload.get("jti")
    return jti in blacklist
