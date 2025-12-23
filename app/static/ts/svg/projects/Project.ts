import { ProjectData } from "../../types/svg/projects.type.js"

export class Project 
{
    public project: string
    public languages: string[]
    public logo: ProjectData["logo"]
    public otherImages: ProjectData["otherImages"]

    constructor(data: ProjectData) 
    {
        this.project = data.project
        this.languages = data.languages
        this.logo = data.logo
        this.otherImages = data.otherImages
    }

    // Moet niet random zijn maar 3 gekozen afbeeldingen
    // Hiervoor moet het model aangepast worden
    // Zorg dat er een column komt met 3 favorieten afbeeldingen in de DB
    public getRandomOtherImage() 
    {
        if (!this.otherImages.length) 
            return null
        
        const index = Math.floor(Math.random() * this.otherImages.length)

        return this.otherImages[index]
    }
}
