import os
from dotenv import load_dotenv
from urllib.parse import quote

env_type = os.environ.get("FLASK_ENV", "development")

if env_type == "production":
    load_dotenv(".env.production")
else:
    load_dotenv(".env.development")

class BaseConfig:
    SECRET_KEY = os.environ.get("APP_SECRET_KEY", "dev-secret")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = os.environ.get("MAIL_SERVER")
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
    SQLALCHEMY_DATABASE_URI = f"postgresql://{os.environ.get('DB_USER')}:{quote(str(os.environ.get('DB_PASS')))}@localhost/{os.environ.get('DB_NAME')}"

class DevelopmentConfig(BaseConfig):
    DEBUG = True

class ProductionConfig(BaseConfig):
    DEBUG = False

