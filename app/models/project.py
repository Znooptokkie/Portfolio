from app import db
from sqlalchemy.orm import joinedload

from app.models.project_language import ProjectLanguage

class Project(db.Model):
    """

    Got 3 ralationships with (project_images, project_specifications, project_language).

    ONE TO MANY (Project > ProjectImage)
    ONE TO MANY (Project > ProjectSpecifications)
    ONE TO MANY (Project > ProjectLanguage)

    """
    __tablename__ = "project"

    project_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False) 
    subtitle = db.Column(db.String(255))
    description = db.Column(db.Text)
    link = db.Column(db.String(255))
    year = db.Column(db.Integer)
    datetime = db.Column(db.DateTime, default=db.func.current_timestamp())
    excerpt = db.Column(db.Text)
    github = db.Column(db.String(255))
    featured = db.Column(db.Boolean, default=False)

    images = db.relationship("ProjectImage", backref="project", lazy="select")
    specifications = db.relationship("ProjectSpecification", backref="project", lazy="select")
    languages = db.relationship("ProjectLanguage", backref="project", lazy="select")

    @classmethod
    def join_tables(cls):
        """Retourneert een tuple van joinedload-opties voor alle relaties."""
        return (
            joinedload(cls.images),
            joinedload(cls.specifications),
            joinedload(cls.languages).joinedload(ProjectLanguage.language),
            joinedload(cls.languages).joinedload(ProjectLanguage.framework)
        )

    @classmethod
    def get_all_projects(cls):
        return cls.query.options(*cls.join_tables()).all()

    @classmethod
    def get_latest_project(cls):
        return cls.query.options(*cls.join_tables()).order_by(cls.datetime.desc()).first()
    
    @classmethod
    def get_project_name(cls, link):    
        return cls.query.options(*cls.join_tables()).filter_by(link=link).first()
    
    @property
    def languages_and_frameworks(self):
        """Retourneert een gesorteerde lijst van unieke talen en frameworks"""
        items = set()
        for pl in self.languages:
            if pl.language:
                items.add(pl.language.language)
            if pl.framework:
                items.add(pl.framework.framework)
        return sorted(items)