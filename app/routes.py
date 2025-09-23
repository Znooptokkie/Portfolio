from flask import Blueprint, render_template, redirect, url_for

from app.models import Project, Language
from app.forms import ContactForm
from app.classes import ContactFormProcessing


main_bp = Blueprint("main", __name__)
project_bp = Blueprint("projects", __name__)


# Homepage / CV
@main_bp.route("/")
def home():
    languages = Language.get_all_languages()
    projects = Project.get_all_projects()
    
    return render_template("index.html", title="Homepage", languages=languages, projects=projects)


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


# About Me
@main_bp.route("/about-me", methods=["GET", "POST"])
def about_me():
    form = ContactForm()
    if form.validate_on_submit():
        ContactFormProcessing.process_form_data(form)
        return redirect(url_for("main.about_me"))
    return render_template("about_me.html", form=form)


# Coming Soon
@main_bp.route("/coming-soon")
def coming_soon():
    return render_template("coming_soon.html", title="Coming Soon")