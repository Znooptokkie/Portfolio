import { MainBorder } from "./maincontainer/MainBorder.js"    
import { LanguageMainStyling } from "./maincontainer/LanguageMainStyling.js";
import { LanguageAddedFeatures } from "./maincontainer/LanguageMainAddedFeatures.js"
import { CalcPathProperties } from "../components/svg-calculations/CalcPathProperties.js";

export const outerPath = "M25,0 L200,0 L250,50 L750,50 L800,0 L975,0 L1000,25 L1000,150 L975,175 L975,500 L1000,525 L1000,650 L975,675 L800,675 L775,650 L225,650 L200,675 L25,675 L0,650 L0,525 L25,500 L25,175 L0,150 L0,25 L25,0"

const viewboxWidth = 1006;
const viewboxHeight = 682;

const newInnerContainerPath = CalcPathProperties.getEachSide(outerPath)
const buildInnerContainerPath = CalcPathProperties.buildInnerPath(newInnerContainerPath!, 10)
const mergeInnerContainerPath = CalcPathProperties.mergePathArray(buildInnerContainerPath)
const createStringInnerContainerPath = CalcPathProperties.createNewSVGPathString(mergeInnerContainerPath)

let mainContainer: MainBorder | null = null;

const svgElement = document.getElementById("language-main-svg");

if (svgElement) {
    mainContainer = new MainBorder(
        "language-main-svg",
        {
            viewBox: `-3 -3 ${viewboxWidth} ${viewboxHeight}`,
            preserveAspectRatio: "xMidYMid meet"
        },
        true,
        "language",
        outerPath
    );
}

export function exportClass(): void 
{
    if (!mainContainer) return;

    mainContainer.init();

    const figure = CalcPathProperties.createBorderParts(mainContainer, outerPath, 10, "language")

    LanguageMainStyling.createGradient(mainContainer);
    LanguageAddedFeatures.createSideBars(mainContainer);
    LanguageAddedFeatures.createTextInSVG(mainContainer);
}