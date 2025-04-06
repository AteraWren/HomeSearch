import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
login_manager = LoginManager()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all origins
    app.config.from_object('backend.config.Config')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://Atera:saisai123@localhost:5432/Home_search'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    jwt.init_app(app)

    from .models import User
    from .routes import routes as routes_blueprint
    app.register_blueprint(routes_blueprint)

    return app