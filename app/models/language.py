from app import db

class Language(db.Model):
    __tablename__ = "language"

    language_id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(50), unique=True, nullable=False)
    svg_url = db.Column(db.String(255))

    projects = db.relationship("ProjectLanguage", backref="language", lazy="dynamic")

    @classmethod
    def get_all_languages(cls):
        return cls.query.order_by(cls.language).all()