from flask import Blueprint, jsonify, render_template

from app.schemas import LanguageSchema

from app.models.language import Language

api_bp = Blueprint("json", __name__)

@api_bp.route("/languages")
def api_languages():
    languages = Language.get_all_languages()
    schema = LanguageSchema(many=True)
    return jsonify(schema.dump(languages))