from dotenv import load_dotenv
import os

# Explicitly specify the path to the .env file in the backend folder
dotenv_path = os.path.join(os.path.dirname(__file__), '/backend.env')
load_dotenv(dotenv_path)


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')