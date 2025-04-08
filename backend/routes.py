from flask import Blueprint, request, jsonify, current_app
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from psycopg2.errors import UniqueViolation
from .models import db, User, Post
import re
import os
import requests

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

        # Validate input fields
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

        # Create a new user
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        # Generate access token
        access_token = create_access_token(identity=user.id)
        print("User registered successfully")  # Debug log
        return jsonify({'message': 'User registered successfully', 'access_token': access_token}), 201

    except IntegrityError as e:
        db.session.rollback()
        print("IntegrityError:", e)  # Debug log
        if isinstance(e.orig, UniqueViolation):
            return jsonify({'error': 'Registration failed: email or username already exists'}), 400
        return jsonify({'error': 'Database error occurred'}), 500

    except Exception as e:
        db.session.rollback()
        print("Unexpected error:", e)  # Debug log
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500

@routes.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        # Validate input fields
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        # Find user by email
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return jsonify({'access_token': access_token}), 200

        return jsonify({'error': 'Invalid email or password'}), 401

    except Exception as e:
        print("Unexpected error during login:", e)  # Debug log
        return jsonify({'error': 'An unexpected error occurred'}), 500

@routes.route('/pro/byaddress', methods=['GET'])
def get_property_by_address():
    try:
        address = request.args.get('propertyaddress')
        if not address:
            return jsonify({'error': 'Address parameter is required'}), 400

        # Make a request to the Zillow API via RapidAPI
        response = requests.get(
            "https://zillow-working-api.p.rapidapi.com/byaddress",
            headers={
                "x-rapidapi-key": os.getenv("VITE_API_KEY"),
                "x-rapidapi-host": os.getenv("VITE_API_HOST"),
            },
            params={"propertyaddress": address},
        )

        # Check if the RapidAPI request was successful
        if response.status_code == 200:
            return jsonify(response.json()), 200
        else:
            return jsonify({'error': 'Failed to fetch property details from RapidAPI'}), response.status_code

    except Exception as e:
        print("Unexpected error while fetching property details:", e)  # Debug log
        return jsonify({'error': 'An unexpected error occurred'}), 500