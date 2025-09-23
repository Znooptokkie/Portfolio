from flask import Flask, render_template
from flask_mail import Mail

import os
from dotenv import load_dotenv

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from datetime import datetime

db = SQLAlchemy()
migrate = Migrate()

from app.models import Project, ProjectImage, ProjectSpecification

def create_app():

    load_dotenv()

    app = Flask(__name__)
    app.config.from_object("config.Config")

    db.init_app(app)
    migrate.init_app(app, db)

    app.config["MAIL_SERVER"] = os.environ.get("MAIL_SERVER")
    app.config["MAIL_PORT"] = 587
    app.config["MAIL_USE_TLS"] = True
    app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
    app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")

    mail = Mail(app)

    # Aangepast Jinja2-filter voor datumformattering
    def format_datetime(iso_string):
        try:
            dt = datetime.fromisoformat(iso_string)
            return dt.strftime('%d-%m-%Y %H:%M')
        except ValueError:
            return iso_string
    app.jinja_env.filters['format_datetime'] = format_datetime

    @app.errorhandler(404)
    def page_not_found(e):
        return render_template("404.html"), 404

    # Blueprints
    from app.routes import main_bp, project_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(project_bp, url_prefix="/projects")

    return app 