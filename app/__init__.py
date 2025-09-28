import os

from config import ProductionConfig, DevelopmentConfig
from dotenv import load_dotenv
from datetime import datetime
from flask import Flask, render_template
from flask_mail import Mail
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_wtf.csrf import CSRFProtect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

limiter = Limiter(key_func=get_remote_address)

db = SQLAlchemy()
migrate = Migrate()
limiter = Limiter(key_func=get_remote_address)
mail = Mail()
csrf = CSRFProtect()

# from app.models import Project, ProjectImage, ProjectSpecification
from app.models.project import Project
from app.models.project_image import ProjectImage
from app.models.project_spec import ProjectSpecification

def create_app(config_class=DevelopmentConfig):
    # load_dotenv()
    app = Flask(__name__)
    
    if config_class is None:
        config_class = ProductionConfig

    app.config.from_object(config_class)


    db.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)
    mail.init_app(app)
    csrf.init_app(app)

    # Jinja2 filter
    def format_datetime(iso_string):
        try:
            dt = datetime.fromisoformat(iso_string)
            return dt.strftime('%d-%m-%Y %H:%M')
        except ValueError:
            return iso_string
    app.jinja_env.filters['format_datetime'] = format_datetime

    # Error handler
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template("404.html"), 404
    
    @app.errorhandler(500)
    def internal_error(e):
        # current_app.logger.error(f"Server error: {e}")
        return render_template("500.html"), 500
    
    @app.errorhandler(429)
    def too_many_requests(e):
        return render_template("429.html", 429)

    # Blueprints
    from app.routes import main_bp, project_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(project_bp, url_prefix="/projecten")

    return app
