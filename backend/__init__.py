import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
login_manager = LoginManager()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    print("Database URI:", app.config['SQLALCHEMY_DATABASE_URI'])
    print("Secret Key:", app.config['SECRET_KEY'])

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    jwt.init_app(app)

    from .models import User, Post
    from .routes import routes as routes_blueprint
    app.register_blueprint(routes_blueprint)

    print("App and SQLAlchemy instance initialized")
    print("App instance:", app)
    print("SQLAlchemy instance:", db)

    return app