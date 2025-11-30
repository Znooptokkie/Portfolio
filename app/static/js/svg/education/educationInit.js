import { CalcPathProperties } from "../components/svg-calculations/CalcPathProperties.js";
import { SVGFactory } from "../components/svg-core/SVGFactory.js";
import { MainBorder } from "../languages/maincontainer/MainBorder.js";
const educationContainerPath = "M25,0 L975,0 L1000,25 L1000,575 L975,600 L25,600 L0,575 L0,25 L25,0";
// Door de strokewidth is de border neit goed zichtbaar ana de onderkantm dus er moet ene manier komen om dat op te lossen. Zet de x-as op 799 en het is opgelost, maar dit is niet de juiste manier!
const eduactionInnerContainerPath = "M27,100 L973,100 L973,565 L963,575 L37,575 L27,565 L27,100";
const viewboxWidth = 1000;
const viewboxHeight = 600;
const HARDCODED_PADDING = 3;
const OUTER_PADDING = 4;
const newPath = CalcPathProperties.getEachSide(eduactionInnerContainerPath);
const createInnerPAth = CalcPathProperties.buildInnerPath(newPath, HARDCODED_PADDING); // Uitroepteken moet weg!!@!!@$!#@$
// NIET HOE HET HOORT, MAAR GEEN ANDERE OPLOSSING.
// 
// --- Gaat fout in method CalcPathProperties.buildInnerPath()
createInnerPAth.innerTop[0].x = createInnerPAth.innerTop[0].x + HARDCODED_PADDING;
createInnerPAth.innerTop[1].x = createInnerPAth.innerTop[1].x - HARDCODED_PADDING;
const mergedArray = CalcPathProperties.mergePathArray(createInnerPAth);
const pathToString = CalcPathProperties.createNewSVGPathString(mergedArray);
let educationContainer = null;
const educationSVGElement = document.getElementById("education-svg");
if (educationSVGElement) {
    educationContainer = new MainBorder("education-svg", {
        viewBox: `0 0 ${viewboxWidth} ${viewboxHeight}`,
        preserveAspectRatio: "xMidYMid meet"
    }, true, "eduaction", educationContainerPath);
}
const educationInnerPAth = new SVGFactory(educationContainer, "path", {
    d: eduactionInnerContainerPath,
    fill: "none",
    stroke: "rgba(51, 81, 142, 0.25)",
    "stroke-width": 1
}).createSvgTag();
const drawNewInnerPAth = new SVGFactory(educationContainer, "path", {
    // d: hardcodedInnerPath,
    d: pathToString,
    fill: "rgba(51, 81, 142, 0.15)",
    stroke: "rgba(51, 81, 142, 0.25)",
    "stroke-width": 1
}).createSvgTag();
export function educationInit() {
    // MAIN Container
    if (!educationContainer)
        return null;
    educationContainer.init();
    const educationfigures = CalcPathProperties.createBorderParts(educationContainer, educationContainerPath, OUTER_PADDING, "education");
}
