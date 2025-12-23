import { SVGImageAttributes, SVGPathAttributes } from "../../types/svg/attributes.js"
import { CreateSVG } from "../components/core/SVGCreate.js"
import { SVGFactory } from "../components/core/SVGFactory.js"
import { CreateSides } from "../components/CreateSides.js"
import { FetchProjects } from "./FetchProjects.js"
import { Project } from "./Project.js"
import { ProjectImagesSVG } from "./ProjectImagesSVG.js"
import { ProjectsFactory, ProjectsFactoryContent, ProjectsLanguagesSVG } from "./ProjectsFactory.js"

export async function initProjects()
{
    const path = "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0"

    const pathContent = "M1300,0 L3570,0 L3570,925 L3070,925 L2970,1060 L1500,1060 L1280,886.666 L1280,620 L1040,433.333 L1040,166.667 Z"
    const pathContentInner = "M1320,35 L3535,35 L3535,890 L3045,890 L2945,1025 2615,1025 M1860,1025 L1520,1025 L1315,866.666 L1315,595 L1075,413.333 L1075,191.667 L1320,35"

    const pathLanguages = "M1450,-20 L1560,-20 L1560,90 L1505,125 L1450,90 L1450,-20" 

    const fetcher = new FetchProjects()

    const projectDataArray = await fetcher.getAPIData()

    const projects: Project[] = ProjectsFactory.createMany(projectDataArray)

    const rootElements = projects.map(projectName => ProjectsFactory.createRootElement(projectName.project))

    for (let i = 0; i < rootElements.length; i++)
    {
        const root = rootElements[i]
        const project = projects[i]
        const projectName = projects[i].project.toLocaleLowerCase()

        const defs = ProjectsFactory.createDefs(root)
        ProjectsFactory.addClipPathToDefs(defs, projectName, path)

        ProjectsFactory.createLogo(root, project.logo.image_url, projectName)
        ProjectsFactory.createHexImages(
            root,
            project.otherImages.map(img => img.image_url),
            projectName
        )
        
        // CONTENT
        const drawContentLine = ProjectsFactoryContent.drawBorder(rootElements[i], pathContent)
        const drawInnerContentLine = ProjectsFactoryContent.drawBorder(rootElements[i], pathContentInner, {opacity: 0.5})

        // LANGUAGES
        project.languages.forEach((lang, index) =>
        {
            const languagePath = ProjectsLanguagesSVG.createLanguagePaths(root, index)
            ProjectsLanguagesSVG.getDevIcons(root, lang, languagePath, index)
        });

        ProjectsFactoryContent.drawArrows(root, 8)
    }
}