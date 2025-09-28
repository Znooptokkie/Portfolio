from flask import Blueprint, render_template, redirect, url_for
from markupsafe import escape

from app import limiter

# from app.models import Project, Language
from app.models.project import Project
from app.models.language import Language

from app.forms import ContactForm
from app.classes import ContactFormProcessing


main_bp = Blueprint("main", __name__)
project_bp = Blueprint("projecten", __name__)


# Homepage / CV
@main_bp.route("/")
def home():
    languages = Language.get_all_languages()
    projects = Project.get_all_projects()
    
    return render_template("index.html", title="Homepagina", languages=languages, projects=projects)


# Education
@main_bp.route("/opleidingen")
def education():
    return render_template("education.html", title="Opleidingen")


# Projects 
@project_bp.route("")
def projects():
    projects = Project.get_all_projects()
    latest_project = Project.get_latest_project()

    return render_template("projects.html", title="Projecten", projects=projects, latest=latest_project)


# All Projects
@project_bp.route("/alle-projecten")
def all_projects(): 
    projects = Project.get_all_projects()

    return render_template("all_projects.html", title="Alle Projecten", projects=projects)


# Specific Project Details
@project_bp.route("/<string:link>")
def project_detail(link):
    project = Project.get_project_name(link)

    if project:
        return render_template("project_detail.html", project=project, link=link)
    
    return "Niet gevonden", 404
    

# Future
@main_bp.route("/toekomst")
def future():
    projects = Project.get_all_projects()

    return render_template("future.html", title="Toekomst", projects=projects)


# About Me
@main_bp.route("/over-mij", methods=["GET", "POST"])
@limiter.limit("5 per minute")
def about_me():
    form = ContactForm()
    if form.validate_on_submit():
        ContactFormProcessing.process_form_data(form)
        return redirect(url_for("main.about_me"))
    return render_template("about_me.html", form=form)


# Coming Soon
@main_bp.route("/komt-binnenkort")
def coming_soon():
    return render_template("coming_soon.html", title="Komt Binnenkort")