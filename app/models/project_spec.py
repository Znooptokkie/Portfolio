from app import db
from app.models.project_spec_enum_category import ProjectSpecificationEnumCategory

class ProjectSpecification(db.Model):
    """
    
    FK: project_id

    """
    __tablename__ = "project_specification"

    project_specification_id = db.Column(db.Integer, primary_key=True)
    specification = db.Column(db.String(255))
    category = db.Column(db.Enum(ProjectSpecificationEnumCategory), nullable=False, default=ProjectSpecificationEnumCategory.SOFTWARE) 

    project_id = db.Column(db.Integer, db.ForeignKey('project.project_id'), nullable=False)