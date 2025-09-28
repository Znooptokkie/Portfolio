import json
from app import db, create_app
# from app.models import Project, ProjectImage, ProjectSpecification, ProjectLanguage, Language, Framework, ProjectSpecificationEnumCategory
from app.models.framework import Framework
from app.models.language import Language
from app.models.project import Project
from app.models.project_image import ProjectImage
from app.models.project_language import ProjectLanguage
from app.models.project_spec import ProjectSpecification
from app.models.project_spec_enum_category import ProjectSpecificationEnumCategory

from datetime import datetime
from dateutil.parser import parse

images = {
    "battlebot": 
    [
        {
            "url": "battlebot/battelbot_frontview.webp",
            "is_main_image": False
        },
        {
            "url": "battlebot/battlebot_huge_mess_topview.webp",
            "is_main_image": False
        },
        {
            "url": "battlebot/battlebot_huge_mess.webp",
            "is_main_image": False
        },
        {
            "url": "battlebot/battlebot_in_action.webp",
            "is_main_image": False
        },
        {
            "url": "battlebot/battlebot_mcp_connection.webp",
            "is_main_image": False
        },
        {
            "url": "battlebot/battlebot_myself.webp",
            "is_main_image": True
        },
        {
            "url": "battlebot/battlebot_screen_picture.webp",
            "is_main_image": False
        },
        {
            "url": "battlebot/battlebot_selfmade_module_inside.webp",
            "is_main_image": False
        },
        {
            "url": "battlebot/battlebot_selfmade_module_topview.webp",
            "is_main_image": False
        },
        {
            "url": "battlebot/battlebot_selfmade_module.webp",
            "is_main_image": False
        },
        {
            "url": "battlebot/battlebot_sideview.webp",
            "is_main_image": False
        },
        {
            "url": "battlebot/battlebot_view_top.webp",
            "is_main_image": False
        }
    ],
    "final_exam": 
    [
        {"url": "final_exam/myself.webp", "is_main_image": True}
    ],
    "smartgarden_mobile": 
    [
        {"url": "smartgarden_mobile/smartgarden_desktop_add_plant.webp", "is_main_image": True}
    ],
    "smartgarden_desktop": 
    [
        {"url": "smartgarden_desktop/smartgarden_desktop_add_plant.webp", "is_main_image": True}
    ],
    "bram": 
    [
        {"url": "bram/bram_loadingscreen.webp", "is_main_image": True}
    ],
    "zinra": 
    [
        {"url": "zinra/zinra_app.webp", "is_main_image": True}
    ],
    "portfolio": 
    [
        {"url": "zinra/zinra.webp", "is_main_image": True}
    ]
}


specifications = {
    "battlebot": [
        "Thonny",
        "Bitwise Operators",
        "Hailo-HAT"
    ],
    "final_exam": [
        ""
    ],
    "smartgarden_mobile": [
        "IoT",
        "Algoritme",
        "ssh"
    ],
    "smartgarden_desktop": [
        "Chart.js"
    ],
    "bram": [
        ""
    ],
    "zinra": [
        ""
    ],
    "portfolio": [
        ""
    ]
}

json_data = [
    {
        "title": "Battlebot",
        "subtitle": "...",
        "description": "Python project 2025",
        "link": "battlebot",
        "language": "Python",
        "year": 2025,
        "datetime": "2025-08-27T20:00:00+02:00",
        "excerpt": "Battlebot was een project dat ik samen met een klasgenoot op school heb uitgevoerd. We hebben een technische robot geüpgraded zodat deze kan worden aangestuurd via een Raspberry Pi 5 en een tweede Pico-microcontroller.",
        "github": "https://github.com/BattlebotdeGripper/battlebot_pi",
        "featured": "yes",
        "framework": ""
    },
    {
        "title": "Eindexamen Project",
        "subtitle": "...",
        "description": "Python project 2025",   
        "link": "schoolexam",
        "language": "Python",
        "year": 2025,
        "datetime": "2025-08-27T19:59:00+02:00",
        "excerpt": "Dit was mijn eindexamenproject waarbij ik een Python-applicatie heb gemaakt die sensorgegevens van een klaslokaalrobot analyseerde en inzichten in realtime weergeeft.",
        "github": "https://github.com/BattlebotdeGripper/battlebot_pi",
        "featured": "no",
        "framework": "flask"
    },
    {
        "title": "Smart Garden - Mobiel",
        "subtitle": "Autonoom Irrigatiesysteem",
        "description": "JavaScript project 2024",
        "link": "smart-garden-mobile",
        "language": "TypeScript JavaScript",
        "year": 2024,
        "datetime": "2025-08-27T19:59:00+02:00",
        "excerpt": "Ik heb een mobiele app ontwikkeld waarmee gebruikers hun slimme tuin op afstand kunnen monitoren en bewateren, met gebruik van realtime data van sensoren die verbonden zijn met een Raspberry Pi.",
        "github": "https://github.com/BattlebotdeGripper/battlebot_pi",
        "featured": "yes",
        "framework": "React Native|"
    },
    {
        "title": "Smart Garden - Desktop",
        "subtitle": "Autonoom Irrigatiesysteem",
        "description": "JavaScript & Python project 2024",
        "link": "smart-garden-desktop",
        "language": "Python JavaScript",
        "year": 2024,
        "datetime": "2025-08-27T19:59:00+02:00",
        "excerpt": "Deze desktopversie stelde gebruikers in staat hun slimme tuin vanaf een pc te bedienen. Het integreerde Python-scripts voor het uitlezen van sensoren en JavaScript voor interactieve dashboards.",
        "github": "https://github.com/BattlebotdeGripper/battlebot_pi",
        "featured": "no",
        "framework": "Electron|Flask"
    },
    {
        "title": "BRAM",
        "subtitle": "Mobiele Applicatie voor Senioren",
        "description": "Python project 2023",
        "link": "bram",
        "language": "Python",
        "year": 2023,
        "datetime": "2025-08-27T19:59:00+02:00",
        "excerpt": "BRAM was een persoonlijk project waarbij ik een intelligente assistent in Python heb geprogrammeerd om taken te plannen en automatisch meldingen te versturen.",
        "github": "https://github.com/BattlebotdeGripper/battlebot_pi",
        "featured": "no",
        "framework": ""
    },
    {
        "title": "Zinra",
        "subtitle": "Postvak Sorteerservice",
        "description": "JavaScript & PHP project 2023",
        "link": "zinra",
        "language": "Python JavaScript",
        "year": 2023,
        "datetime": "2025-08-27T19:59:00+02:00",
        "excerpt": "Zinra was een webproject waarin JavaScript en PHP werden gecombineerd om een dynamische website te creëren met interactieve functies en een veilige backend voor gebruikersgegevens.",
        "github": "https://github.com/BattlebotdeGripper/battlebot_pi",
        "featured": "yes",
        "framework": ""
    },
    {
        "title": "Portfolio Website",
        "subtitle": "Eigen Portfolio Website",
        "description": "JavaScript & Python project 2025",
        "link": "portfolio",
        "language": "Python JavaScript TypeScript PHP HTML5 CSS3 SASS Bootstrap",
        "year": 2025,
        "datetime": "2025-08-27T19:59:00+02:00",
        "excerpt": "Mijn eigen portfolio website. De website waar u zich op dit moment op bevindt.",
        "github": "https://github.com/BattlebotdeGripper/battlebot_pi",
        "featured": "no",
        "framework": "flask"
    }
]

def seed_languages():
    """Voeg unieke programmeertalen toe aan de Language-tabel."""
    languages = set()
    for item in json_data:
        item_languages = item["language"].split()
        languages.update(item_languages)
    
    language_map = {}
    for lang in languages:
        existing_language = Language.query.filter_by(language=lang).first()
        if not existing_language:
            language = Language(language=lang)
            db.session.add(language)
            db.session.flush()  # Zorg dat language_id beschikbaar is
            language_map[lang] = language
        else:
            language_map[lang] = existing_language
    db.session.commit()
    print("Languages seeded successfully!")
    return language_map

def seed_frameworks():
    """Voeg unieke frameworks toe aan de Framework-tabel."""
    frameworks = set()
    for item in json_data:
        if item["framework"]:
            item_frameworks = item["framework"].split("|")
            frameworks.update(item_frameworks)
    
    framework_map = {}
    for fw in frameworks:
        existing_framework = Framework.query.filter_by(framework=fw).first()
        if not existing_framework:
            framework = Framework(framework=fw)
            db.session.add(framework)
            db.session.flush()  # Zorg dat framework_id beschikbaar is
            framework_map[fw] = framework
        else:
            framework_map[fw] = existing_framework
    db.session.commit()
    print("Frameworks seeded successfully!")
    return framework_map

def seed_projects():
    """Voeg projecten toe aan de Project-tabel."""
    project_map = {}
    for item in json_data:
        project = Project(
            title=item["title"],
            subtitle=item["subtitle"],
            description=item["description"],
            link=item["link"],
            year=item["year"],
            datetime=parse(item["datetime"]),
            excerpt=item["excerpt"],
            github=item["github"],
            featured=item["featured"].lower() == "yes"
        )
        db.session.add(project)
        db.session.flush()  # Zorg dat project_id beschikbaar is
        project_map[item["title"]] = project
    db.session.commit()
    print("Projects seeded successfully!")
    return project_map

def seed_project_images(project_map):
    link_map = {
        "smart-garden-desktop": "smartgarden_desktop",
        "smart-garden-mobile": "smartgarden_mobile"
    }

    for item in json_data:
        project = project_map[item["title"]]
        link = link_map.get(item["link"], item["link"].replace("-", "_"))
        if link in images:
            for image_data in images[link]:
                if image_data:
                    project_image = ProjectImage(
                        image_url=f"projects/{image_data['url']}",
                        alt_text=f"Image for {item['title']}",
                        is_main_image=image_data.get("is_main_image", False),
                        project_id=project.project_id
                    )
                    db.session.add(project_image)
    db.session.commit()
    print("Project images seeded successfully!")


def seed_project_specifications(project_map):
    """Voeg specificaties toe aan de ProjectSpecification-tabel vanuit de specifications dictionary."""
    spec_category_map = {
        "Thonny": ProjectSpecificationEnumCategory.SOFTWARE,
        "Bitwise Operators": ProjectSpecificationEnumCategory.SOFTWARE,
        "Hailo-HAT": ProjectSpecificationEnumCategory.HARDWARE,
        "IoT": ProjectSpecificationEnumCategory.HARDWARE,
        "Algoritme": ProjectSpecificationEnumCategory.SOFTWARE,
        "ssh": ProjectSpecificationEnumCategory.SOFTWARE,
        "Chart.js": ProjectSpecificationEnumCategory.FRONTEND,
        "Python Scripts": ProjectSpecificationEnumCategory.SOFTWARE,
        "Scheduling": ProjectSpecificationEnumCategory.SOFTWARE,
        "Notifications": ProjectSpecificationEnumCategory.SOFTWARE,
        "JavaScript": ProjectSpecificationEnumCategory.FRONTEND,
        "PHP": ProjectSpecificationEnumCategory.BACKEND,
        "MySQL": ProjectSpecificationEnumCategory.BACKEND,
        "Typescript": ProjectSpecificationEnumCategory.FRONTEND
    }
    
    for item in json_data:
        project = project_map[item["title"]]
        link = item["link"].replace("-", "_")  # Maak de link consistent met de dictionary keys
        if link in specifications:
            for spec in specifications[link]:
                if spec:  # Negeer lege specificaties
                    category = spec_category_map.get(spec, ProjectSpecificationEnumCategory.OTHER)
                    project_spec = ProjectSpecification(
                        specification=spec,
                        category=category,
                        project_id=project.project_id
                    )
                    db.session.add(project_spec)
    db.session.commit()
    print("Project specifications seeded successfully!")

def seed_project_languages(project_map, language_map, framework_map):
    """Voeg koppelingen tussen projecten, talen en frameworks toe aan de ProjectLanguage-tabel."""
    for item in json_data:
        project = project_map[item["title"]]
        item_languages = item["language"].split()
        
        # Voeg talen toe
        for lang in item_languages:
            language = language_map[lang]
            project_language = ProjectLanguage(
                project_id=project.project_id,
                language_id=language.language_id
            )
            db.session.add(project_language)
        
        # Voeg frameworks toe
        if item["framework"]:
            item_frameworks = item["framework"].split("|")
            for fw in item_frameworks:
                if fw:  # Negeer lege frameworks
                    framework = framework_map[fw]
                    # Koppel aan de eerste taal van het project
                    language = language_map[item_languages[0]]
                    project_language = ProjectLanguage(
                        project_id=project.project_id,
                        language_id=language.language_id,
                        framework_id=framework.framework_id
                    )
                    db.session.add(project_language)
    db.session.commit()
    print("Project languages seeded successfully!")

def clear_database():
    """Verwijder alle gegevens uit de tabellen (optioneel, voor een schone start)."""
    db.session.query(ProjectLanguage).delete()
    db.session.query(ProjectSpecification).delete()
    db.session.query(ProjectImage).delete()
    db.session.query(Project).delete()
    db.session.query(Language).delete()
    db.session.query(Framework).delete()
    db.session.commit()
    print("Database cleared successfully!")

def seed_database():
    """Hoofdfunctie om alle seed-functies in de juiste volgorde aan te roepen."""
    app = create_app()
    with app.app_context():

        clear_database()
        
        language_map = seed_languages()
        framework_map = seed_frameworks()
        project_map = seed_projects()
        seed_project_images(project_map)
        seed_project_specifications(project_map)
        seed_project_languages(project_map, language_map, framework_map)
        
        print("Database fully seeded successfully!")

if __name__ == "__main__":
    seed_database()