Home Search
Welcome to the Home Search App! This application allows users to register, log in, and view properties.

Features

- User registration and login
- JWT authentication
- View properties and property prices
- Secure form handling with Flask-WTF and WTForms

API Link
You can access the API at the following link:
https://homesearch-px45.onrender.com

Deployed App
You can access the deployed app at the following link:
https://homesearch-frontend.onrender.com

Getting Started
To get started with the project, follow these steps:

Prerequisites
Python 3.8 or higher
Node.js and npm (for the frontend)
PostgreSQL

Backend Setup
Clone the repository: git clone https://github.com/your-username/home-rental-app.git cd home-rental-app
Navigate to the backend directory: cd backend
Create a virtual environment: python -m venv venv
Activate the virtual environment:
On Windows: venv\Scripts\activate
On macOS/Linux: source venv/bin/activate
Install the required dependencies: pip install -r requirements.txt
Set up the database:
Ensure PostgreSQL is running and create a database: CREATE DATABASE Home_search;
Run database migrations: flask db upgrade
Start the backend server: flask run
The backend will be available at http://127.0.0.1:5000/.

Frontend Setup
Navigate to the frontend directory: cd frontend
Install the required dependencies: npm install
Start the development server: npm run dev
The frontend will be available at http://127.0.0.1:5173/.

Environment Variables
Backend .env File
Create a .env file in the backend directory with the following content:
DATABASE_URL=postgresql://username:password@localhost:5432/Home_search
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
Replace username, password, and your_secret_key with your actual database credentials and secret keys.

Frontend .env File
Create a .env file in the frontend directory with the following content:
VITE_API_BASE_URL=http://127.0.0.1:5000
If deploying the frontend, replace the VITE_API_BASE_URL with the deployed backend URL, such as:
VITE_API_BASE_URL=https://homesearch-px45.onrender.com

Running Tests
To run the tests for the backend, use the following command:
pytest
Ensure that the test database is configured in your .env file.

Deployment
Backend Deployment
Ensure all environment variables are set in your deployment environment (e.g., Render, Heroku).
Push your code to the remote repository.
Run database migrations in the production environment:
flask db upgrade

Frontend Deployment
Build the frontend for production:
npm run build
Deploy the dist/ folder to your hosting platform (e.g., Netlify, Vercel).
