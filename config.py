import os
from dotenv import load_dotenv
from urllib.parse import quote  # Voor automatische URL-encoding special characters

load_dotenv()

class Config:
    secret_key = os.environ.get("APP_SECRET_KEY")
    db_name = os.environ.get("DB_NAME")
    db_user = os.environ.get("DB_USER")
    db_pass = os.environ.get("DB_PASS")

    SECRET_KEY = secret_key
    SQLALCHEMY_DATABASE_URI = f"postgresql://{db_user}:{quote(str(db_pass))}@localhost/{db_name}"
