from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from utils.token import check_if_token_in_blacklist
from flask_migrate import Migrate
from routes.user_routes import user_routes
from routes.design_routes import design_routes
from routes.plant_routes import plant_routes
from models import db
from models.user import User
from models.design import Design
from models.design_response import DesignResponse
from models.design_response_photo import DesignResponsePhoto

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/decogenius_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'decogeniuskey' 
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access'] 

db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@jwt.token_in_blocklist_loader
def is_token_in_blocklist(jwt_header, jwt_payload):
    return check_if_token_in_blacklist(jwt_header, jwt_payload)

app.register_blueprint(user_routes)
app.register_blueprint(design_routes)
app.register_blueprint(plant_routes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
