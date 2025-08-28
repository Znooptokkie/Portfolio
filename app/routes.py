from flask import Blueprint, render_template
from .models import ProjectsManager

main_bp = Blueprint("main", __name__)
project_bp = Blueprint("projects", __name__)

project_manager = ProjectsManager()

# Homepage / CV
@main_bp.route("/")
def home():

    return render_template("index.html", title="Homepage")


# Education
@main_bp.route("/education")
def education():

    return render_template("education.html", title="Education")


# Projects
@project_bp.route("")
def projects():

    projects = project_manager.load_projects()
    latest_project = project_manager.get_latest_project()

    return render_template("projects.html", title="Projects", projects=projects, latest=latest_project)


# All Projects
@project_bp.route("/all-projects")
def all_projects(): 

    projects = project_manager.load_projects()

    return render_template("all-projects.html", title="All Projects", projects=projects)


# Specific Project Details
@project_bp.route("/<string:title>")
def project_detail(title):

    project = project_manager.get_project_by_name(title)

    if project:
        return render_template("project_detail.html", title=project["title"], project=project)
    
    return "Niet gevonden", 404


# Future
@main_bp.route("/future")
def future():

    return render_template("future.html", title="Future")


# Contact
@main_bp.route("/contact")
def contact():

    return render_template("contact.html", title="Contact")