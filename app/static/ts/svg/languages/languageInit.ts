// import { MainBorder } from "../components/MainBorder"    
// import { LanguageMainStyling } from "./maincontainer/LanguageMainStyling.js"
import { LanguageAddedFeatures } from "./maincontainer/LanguageAddedFeatures.js"
import { InitPath } from "../components/InitPath.js"
import { CreateEducation } from "../education/CreateEducation.js"
import { InnerPath } from "../components/InnerPath.js"
import { CreateSVG } from "../components/core/SVGCreate.js"
import { LanguageMainStyling } from"./maincontainer/LanguageMainStyling.js"

export const outerPath = "M25,0 L200,0 L250,50 L750,50 L800,0 L975,0 L1000,25 L1000,150 L975,175 L975,500 L1000,525 L1000,650 L975,675 L800,675 L775,650 L225,650 L200,675 L25,675 L0,650 L0,525 L25,500 L25,175 L0,150 L0,25 L25,0"

const viewboxWidth = 1006
const viewboxHeight = 682

const HARDCODED_OUTER_PADDING = 10

const createStringInnerContainerPath = InnerPath.buildOffsetPath(outerPath, HARDCODED_OUTER_PADDING)

let mainContainer: CreateSVG | null = null

const svgElement = document.getElementById("language-main-svg")

if (svgElement) {
    mainContainer = new CreateSVG(
        "language-main-svg",
        {
            viewBox: `-3 -3 ${viewboxWidth} ${viewboxHeight}`,
            preserveAspectRatio: "xMidYMid meet"
        },
        true
    )
}

export function exportClass(): null | void
{
    if (!mainContainer) 
        return null

    // mainContainer.init()
    LanguageAddedFeatures.createSideBars(mainContainer)

    const languageBorderFigures = InitPath.createBorderParts(mainContainer, outerPath,  createStringInnerContainerPath, "language")

    LanguageMainStyling.createGradient(mainContainer)
    LanguageAddedFeatures.createTextInSVG(mainContainer)
}