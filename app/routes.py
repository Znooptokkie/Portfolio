from flask import Blueprint, render_template
# from .models import ProjectsManager
from app.models import Project, Language

main_bp = Blueprint("main", __name__)
project_bp = Blueprint("projects", __name__)

# Homepage / CV
@main_bp.route("/")
def home():
    languages = Language.get_all_languages()
    
    return render_template("index.html", title="Homepage", languages=languages)


# Education
@main_bp.route("/education")
def education():
    return render_template("education.html", title="Education")


# Projects
@project_bp.route("")
def projects():
    projects = Project.get_all_projects()
    latest_project = Project.get_latest_project()

    return render_template("projects.html", title="Projects", projects=projects, latest=latest_project)


# All Projects
@project_bp.route("/all-projects")
def all_projects(): 
    projects = Project.get_all_projects()

    return render_template("all_projects.html", title="All Projects", projects=projects)


# Specific Project Details
@project_bp.route("/<string:link>")
def project_detail(link):
    project = Project.get_project_name(link)

    if project:
        return render_template("project_detail.html", project=project, link=link)
    
    return "Niet gevonden", 404
    

# Future
@main_bp.route("/future")
def future():
    projects = Project.get_all_projects()

    return render_template("future.html", title="Future", projects=projects)


# Contact
@main_bp.route("/contact")
def contact():
    return render_template("contact.html", title="Contact")