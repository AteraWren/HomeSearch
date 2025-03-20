from flask import Blueprint, request, jsonify, current_app
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from psycopg2.errors import UniqueViolation
from .models import db, User, Post

routes = Blueprint('routes', __name__)
CORS(routes)

@routes.route('/')
def index():
    return jsonify({'message': 'Welcome to the Home Rental App API'})

@routes.route('/register', methods=['POST'])
def register():
    try:
        print("Received request to /register")
        data = request.json
        print("Request data:", data)
        
        # Validate the request data
        if not data or not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Invalid request data'}), 400
        
        user = User(username=data['username'], email=data['email'])
        user.set_password(data['password'])  # Hash the password
        print("Created user:", user)
        
        db.session.add(user)
        db.session.commit()
        print("User added to the database")
        
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'User registered successfully', 'access_token': access_token}), 201
    except IntegrityError as e:
        db.session.rollback()
        if isinstance(e.orig, UniqueViolation):
            return jsonify({'error': 'Registration failed due to duplicate email'}), 400
        return jsonify({'error': 'Database error'}), 500
    except Exception as e:
        db.session.rollback()
        print("Error:", str(e))
        print("App instance in route:", current_app)
        print("SQLAlchemy instance in route:", db)
        return jsonify({'error': 'Database error'}), 500

@routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@routes.route('/posts', methods=['GET'])
@jwt_required()
def get_posts():
    current_user_id = get_jwt_identity()
    posts = Post.query.filter_by(user_id=current_user_id).all()
    posts_list = [{'id': post.id, 'title': post.title, 'description': post.description, 'price': post.price} for post in posts]
    return jsonify(posts_list)

@routes.route('/add_post', methods=['POST'])
def add_post():
    try:
        data = request.json
        new_post = Post(
            title=data['title'],
            description=data['description'],
            price=data['price'],
            location=data['location'],
            image_url=data['image_url'],
            user_id=data['user_id']
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify({'message': 'Post added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Database error'}), 500