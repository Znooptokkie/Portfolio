from app import db

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