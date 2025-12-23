from flask import Blueprint, jsonify, render_template

from app.schemas import LanguageSchema
from app.schemas import ProjectSchema

from app.models.language import Language
# from app.models.project_image import ProjectImage

from app.models.project import Project

api_bp = Blueprint("json", __name__)

@api_bp.route("/languages")
def api_languages():
    languages = Language.get_all_languages()
    schema = LanguageSchema(many=True)
    return jsonify(schema.dump(languages))

@api_bp.route("/projects-values")
def api_projects_values():
    images = Project.get_project_images()
    schema = ProjectSchema(many=True)
    return jsonify(schema.dump(images))