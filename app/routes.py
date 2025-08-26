from flask import Blueprint, render_template

main_bp = Blueprint("main", __name__)

# Homepage / CV
@main_bp.route("/")
def home():
    return render_template("index.html", title="Homepage")

# Education
@main_bp.route("/education")
def education():
    return render_template("education.html", title="Education")

# Projects
@main_bp.route("/projects")
def projects():
    return render_template("projects.html", title="Projects")

# Future
@main_bp.route("/future")
def future():
    return render_template("future.html", title="Future")

# Contact
@main_bp.route("/contact")
def contact():
    return render_template("contact.html", title="Contact")