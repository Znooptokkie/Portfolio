from flask import Flask
from datetime import datetime

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    # Aangepast Jinja2-filter voor datumformattering
    def format_datetime(iso_string):
        try:
            dt = datetime.fromisoformat(iso_string)
            return dt.strftime('%d-%m-%Y %H:%M')
        except ValueError:
            return iso_string
    app.jinja_env.filters['format_datetime'] = format_datetime

    from app.routes import main_bp, project_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(project_bp, url_prefix="/projects")

    return app