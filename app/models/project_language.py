from app import db

from app.models.framework import Framework

class ProjectLanguage(db.Model):
    """
    
        FK: project_id -> Project
        FK: language_id -> Language
        FK: framework_id -> Framework

    """
    __tablename__ = "project_language"

    project_language_id = db.Column(db.Integer, primary_key=True)

    project_id = db.Column(db.Integer, db.ForeignKey('project.project_id'), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('language.language_id'), nullable=False)
    framework_id = db.Column(db.Integer, db.ForeignKey('framework.framework_id'), nullable=True)