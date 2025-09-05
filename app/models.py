from app import db
import enum
from sqlalchemy.orm import joinedload

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

class ProjectImage(db.Model):
    """

    FK: project_id

    """
    __tablename__ = "project_image"

    project_image_id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)
    alt_text = db.Column(db.Text)
    is_main_image = db.Column(db.Boolean, default=False)

    project_id = db.Column(db.Integer, db.ForeignKey('project.project_id'), nullable=False)



class ProjectSpecificationEnumCategory(enum.Enum):
    SOFTWARE = "software"
    HARDWARE = "hardware"
    BACKEND = "backend"
    FRONTEND = "frontend"
    OTHER = "other"



class ProjectSpecification(db.Model):
    """
    
    FK: project_id

    """
    __tablename__ = "project_specification"

    project_specification_id = db.Column(db.Integer, primary_key=True)
    specification = db.Column(db.String(255))
    category = db.Column(db.Enum(ProjectSpecificationEnumCategory), nullable=False, default=ProjectSpecificationEnumCategory.SOFTWARE) 

    project_id = db.Column(db.Integer, db.ForeignKey('project.project_id'), nullable=False)



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

class Language(db.Model):
    __tablename__ = "language"

    language_id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(50), unique=True, nullable=False)
    svg_url = db.Column(db.String(255))

    projects = db.relationship("ProjectLanguage", backref="language", lazy="dynamic")

    @classmethod
    def get_all_languages(cls):
        return cls.query.order_by(cls.language).all()

class Framework(db.Model):
    __tablename__ = "framework"

    framework_id = db.Column(db.Integer, primary_key=True)
    framework = db.Column(db.String(50), unique=True, nullable=False)

    projects = db.relationship("ProjectLanguage", backref="framework", lazy="dynamic")