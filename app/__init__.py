from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from datetime import datetime

db = SQLAlchemy()
migrate = Migrate()

from app.models import Project, ProjectImage, ProjectSpecification

def create_app():

    # Maak applicatie aan
    app = Flask(__name__)
    app.config.from_object("config.Config")

    # Initialiseer de database met migrate
    db.init_app(app)
    migrate.init_app(app, db)

    # Aangepast Jinja2-filter voor datumformattering
    def format_datetime(iso_string):
        try:
            dt = datetime.fromisoformat(iso_string)
            return dt.strftime('%d-%m-%Y %H:%M')
        except ValueError:
            return iso_string
    app.jinja_env.filters['format_datetime'] = format_datetime

    # Blueprints
    from app.routes import main_bp, project_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(project_bp, url_prefix="/projects")

    return app 