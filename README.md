# Home Rental App

Welcome to the Home Rental App! This application allows users to register, log in, and manage rental properties.

## API Link

You can access the API at the following link:

[Home Rental App API](http://127.0.0.1:5000/)

## Features

- User registration and login
- JWT authentication
- Manage rental properties
- View rental property listings

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository
2. Install dependencies
3. Set up the database
4. Run the application

## Installation

```sh
git clone https://github.com/AteraWren/home-rental-app.git
cd home-rental-app
pip install -r requirements.txt
```

### Backend Setup

1. Navigate to the `backend` directory:

   ```sh
   cd backend
   ```

2. Create a virtual environment:

   ```sh
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

4. Install the required dependencies:

   ```sh
   pip install -r requirements.txt
   ```

5. Set up the database:

   - Ensure PostgreSQL is running and create a database:
     ```sql
     CREATE DATABASE Home_rental;
     ```

6. Run database migrations:

   ```sh
   flask db upgrade
   ```

7. Start the backend server:
   ```sh
   flask run
   ```

The backend will be available at `http://127.0.0.1:5000/`.

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```sh
   cd frontend
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

The frontend will be available at `http://127.0.0.1:5173/`.

### Environment Variables

Create a `.env` file in the root of the project with the following content:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/Home_rental
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
```

Replace `username`, `password`, and `your_secret_key` with your actual database credentials and secret keys.

### Running Tests

To run the tests for the backend, use the following command:

```sh
pytest
```

Ensure that the test database is configured in your `.env` file.

## Deployed App

You can access the deployed app at the following link:

[Home Rental App](https://homesearch-frontend.onrender.com)

The API is available at:

[Home Rental App API](https://homesearch-px45.onrender.com)
