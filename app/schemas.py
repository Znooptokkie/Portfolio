from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.language import Language

class LanguageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Language
        load_instance = True