import { SVGImageAttributes, SVGPathAttributes } from "../../types/svg/attributes.js"
import { CreateSVG } from "../components/core/SVGCreate.js"
import { SVGFactory } from "../components/core/SVGFactory.js"
import { CreateSides } from "../components/CreateSides.js"
import { InitPath } from "../components/InitPath.js"
import { PathFigures } from "../components/PathFigures.js"
import { LanguageMainStyling } from "../languages/maincontainer/LanguageMainStyling.js"
import { FetchProjects } from "./fetch/FetchProjects.js"
import { Project } from "./Project.js"
// import { ProjectsFactory, ProjectsFactoryButton, ProjectsFactoryContent, ProjectsFactoryHTMLContent, ProjectsLanguagesSVG } from "./ProjectsFactory.js"
import { ProjectsRootElement } from "./factory/ProjectsFactory.js"
import { ProjectsButton } from "./factory/ProjectsButton.js"
import { ProjectsContent } from "./factory/ProjectsContent.js"
import { ProjectsInnerHTMLContent } from "./factory/ProjectsInnerHTML.js"
import { ProjectsStackBanners } from "./factory/ProjectsStackBanners.js"

export async function initProjects()
{
            // const path = "M3140,925 L3570,925 L3570,1060 L3050,1060 Z,"
    const HexagonPath = "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0"

    const pathContent = "M1300,0 L3570,0 L3570,900 L3125,900 L3020,1060 L1500,1060 L1280,886.666 L1280,620 L1040,433.333 L1040,166.667 Z"
    const pathContentInner = "M1320,35 L3535,35 L3535,870 L3045,870 L2945,1025 2615,1025 M1860,1025 L1520,1025 L1315,866.666 L1315,595 L1075,413.333 L1075,191.667 L1320,35"

    const pathLanguages = "M1450,-20 L1560,-20 L1560,90 L1505,125 L1450,90 L1450,-20" 

    const fetcher = new FetchProjects()

    const projectDataArray = await fetcher.getAPIData()

    const projects: Project[] = ProjectsRootElement.createMany(projectDataArray)

    const rootElements = projects.map(projectName => ProjectsRootElement.createRootElement(projectName.project))

    for (let i = 0; i < rootElements.length; i++)
    {
        const root = rootElements[i]
        const project = projects[i]
        const projectName = projects[i].project.toLocaleLowerCase()

        const defs = ProjectsRootElement.createDefs(root)
        ProjectsRootElement.addClipPathToDefs(defs, projectName, HexagonPath)

        ProjectsRootElement.createLogo(root, project.logo.image_url, projectName)
        ProjectsRootElement.createHexImages(
            root,
            project.otherImages.map(img => img.image_url),
            projectName
        )
        
        // CONTENT
        const drawContentLine = ProjectsContent.drawBorder(rootElements[i], pathContent)
        const drawInnerContentLine = ProjectsContent.drawBorder(rootElements[i], pathContentInner, {opacity: 0.5})

                // const HexagonPath = "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0"
        // new SVGFactory(container, "path", {
        //     d: "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0",
        //     fill: "rgba(10, 37, 92, 0.5)"
        // }).createSvgTag()

        // new SVGFactory(container, "path", {
        //     d: ProjectsFactory.createInnerHexaPath(),
        //     fill: "rgba(10, 37, 92, 1)"
        // }).createSvgTag()
        // const borderFigures = PathFigures.createFigurePathString(root, ProjectsFactory.createInnerHexaPath(), HexagonPath)
        InitPath.createBorderParts(root!, HexagonPath, ProjectsRootElement.createInnerHexaPath(), "hexa")
        // console.log(borderFigures);
        // LanguageMainStyling.createGradient(root!)
        
        const pathElement = ProjectsInnerHTMLContent.createLanguagePaths(root!, pathContentInner)
        ProjectsInnerHTMLContent.initContent(root!, pathElement, projectName, project.excerpt)
        // console.log(project.excerpt);
        // const buttonPathElement = ProjectsFactoryButton.createWrapper(project.project)

        // LANGUAGES
        project.languages.forEach((lang, index) =>
        {
            const languagePath = ProjectsStackBanners.createLanguagePaths(root, index)
            ProjectsStackBanners.getDevIcons(root, lang, languagePath, index)
        });

        ProjectsContent.drawArrows(root, 8)
        const button = ProjectsButton.linkInstance(root!, project.link)
    }
}