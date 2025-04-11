from backend import create_app

print("Initializing Flask app...")
app = create_app()
print("Flask app initialized:", app)

if __name__ == "__main__":
    app.run()