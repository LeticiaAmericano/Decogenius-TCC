from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from models import db
from routes.user_routes import user_routes

app = Flask(__name__)

# Configurações
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/decogenius_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'decogeniuskey'  

# Inicializa extensões
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Registra o blueprint
app.register_blueprint(user_routes)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
