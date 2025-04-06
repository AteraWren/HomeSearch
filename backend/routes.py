from flask import Blueprint, request, jsonify, current_app
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from psycopg2.errors import UniqueViolation
from .models import db, User, Post
import re

routes = Blueprint('routes', __name__)
CORS(routes)

@routes.route('/')
def index():
    return jsonify({'message': 'Welcome to the Home Search API'})

@routes.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        print("Received data:", data)  # Debug log
        email = data.get('email')
        password = data.get('password')
        username = data.get('username')

        if not username or not email or not password:
            print("Missing fields")  # Debug log
            return jsonify({'error': 'All fields are required'}), 400

        # Validate email format
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            print("Invalid email format")  # Debug log
            return jsonify({'error': 'Invalid email format'}), 400

        # Validate password strength
        if len(password) < 8:
            print("Weak password")  # Debug log
            return jsonify({'error': 'Password must be at least 8 characters long'}), 400

        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=user.id)
        print("User registered successfully")  # Debug log
        return jsonify({'message': 'User registered successfully', 'access_token': access_token}), 201
    except IntegrityError as e:
        db.session.rollback()
        print("IntegrityError:", e)  # Debug log
        if isinstance(e.orig, UniqueViolation):
            return jsonify({'error': 'Registration failed due to duplicate email'}), 400
        return jsonify({'error': 'Database error'}), 500
    except Exception as e:
        db.session.rollback()
        print("Unexpected error:", e)  # Debug log
        return jsonify({'error': 'An unexpected error occurred'}), 500

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

@routes.route('/pro/byaddress', methods=['GET'])
def get_property_by_address():
    address = request.args.get('propertyaddress')
    if not address:
        return jsonify({'error': 'Address parameter is required'}), 400

    # Example logic to fetch property details
    return jsonify({'message': f'Property details for {address}'})