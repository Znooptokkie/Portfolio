import json
import os
from datetime import datetime

class ProjectsManager:
    
    def __init__(self, file_path="projects.json"):

        self.file_path = file_path

    def load_projects(self):

        if not os.path.exists(self.file_path):
            return []
            
        with open(self.file_path, "r") as file:
            return json.load(file)
        
    def format_datetime(self, iso_string):

        """Formatteer een ISO 8601-datum naar een leesbaar formaat."""
        
        try:
            dt = datetime.fromisoformat(iso_string)
            return dt.strftime('%d-%m-%Y %H:%M')
        
        except ValueError:
            return iso_string
        
    def get_latest_project(self):

        """Vind het meest recente project op basis van het datetime-veld."""

        projects = self.load_projects()

        if not projects:
            return None
        
        return max(projects, key=lambda project: datetime.fromisoformat(project['datetime']))
    
    def get_project_by_name(self, title):

        """Zoek een project op basis van de titel."""

        projects = self.load_projects()

        for project in projects:
            if project['link'] == title:
                return project
            
        return None