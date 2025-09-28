from app import db

class Framework(db.Model):
    __tablename__ = "framework"

    framework_id = db.Column(db.Integer, primary_key=True)
    framework = db.Column(db.String(50), unique=True, nullable=False)

    projects = db.relationship("ProjectLanguage", backref="framework", lazy="dynamic")
    