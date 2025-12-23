import { FetchData } from "../../services/FetchData.js"
import { ProjectsJSON } from "../../interfaces/api/projects.interface.js"
import { ProjectData } from "../../types/svg/projects.type.js"
import { Project } from "./Project.js"

export class FetchProjects 
{
    private projects: ProjectData[] = []

    public async getAPIData(): Promise<ProjectData[]> 
    {
        const fetcher = new FetchData<ProjectsJSON>("api/projects-values")
        const result = await fetcher.fetchJsonData()

        this.projects = result.map(proj => ({
            project: proj.title, 
            languages: proj.languages_and_frameworks ?? [],
            logo: proj.logo,
            otherImages: proj.other_images ?? []
        }));

        return this.projects
    }

    public getProjects(): ProjectData[] 
    {
        return this.projects
    }
}