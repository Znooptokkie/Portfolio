from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.project import Project
from app.models.project_image import ProjectImage
from app.models.language import Language

class LanguageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Language
        load_instance = True

class ProjectImageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = ProjectImage
        load_instance = True
        include_fk = False 

class ProjectSchema(SQLAlchemyAutoSchema):
    logo = fields.Nested(ProjectImageSchema, allow_none=True)
    other_images = fields.Nested(ProjectImageSchema, many=True)
    languages_and_frameworks = fields.List(fields.String())

    class Meta:
        model = Project
        load_instance = True
        include_relationships = False 
        exclude = ("images", "specifications", "languages")
