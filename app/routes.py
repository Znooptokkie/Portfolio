from flask import Blueprint, render_template

main_bp = Blueprint("main", __name__)

# Homepage / CV
@main_bp.route("/")
def home():
    return render_template("index.html", title="Homepage")


# Projects
@main_bp.route("/projects")
def projects():
    return render_template("projects.html", title="Projects")


# Grades


# Future perspective