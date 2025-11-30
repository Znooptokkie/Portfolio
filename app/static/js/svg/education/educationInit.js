import { CalcPathProperties } from "../components/svg-calculations/CalcPathProperties.js";
import { SVGFactory } from "../components/svg-core/SVGFactory.js";
import { EducationContainer, InnerBorder, EducationInnerBorder } from "./EducationContainer.js";
const educationContainerPath = "M25,0 L975,0 L1000,25 L1000,575 L975,600 L25,600 L0,575 L0,25 L25,0";
const viewboxHeight = 600;
const viewboxWidth = 1000;
let educationContainer = null;
const educationSVGElement = document.getElementById("education-svg");
if (educationSVGElement) {
    educationContainer = new EducationContainer("education-svg", {
        viewBox: `0 0 ${viewboxWidth} ${viewboxHeight}`,
        preserveAspectRatio: "xMidYMid meet"
    }, true, "eduaction", educationContainerPath);
}
const educationInnerPath = CalcPathProperties.getEachSide(educationContainerPath);
// Door de strokewidth is de border neit goed zichtbaar ana de onderkantm dus er moet ene manier komen om dat op te lossen. Zet de x-as op 799 en het is opgelost, maar dit is niet de juiste manier!
const eduactionInnerContainerPath = "M27,100 L973,100 L973,565 L963,575 L37,575 L27,565 L27,100";
// const hardcodedInnerPath =          "M37,110 L963,110 L963,560 L958,565 L42,565 L37,560 L37,110"
// const hardcodedInnerPath =          "M32,105 L968,105 L968,560 L963,565 L42,565 L32,560 L32,110"
const hardcodedInnerPath = "M33,106 L967,106 L967,562 L960,569 L40,569 L33,562 L33,106";
// strokewidth = 1 * 2
// padding = 5
// Totaal = 7
// padding = 10
// innercontainerstart = x: 17, y: 100
const educationInnerPAth = new SVGFactory(educationContainer, "path", {
    d: eduactionInnerContainerPath,
    fill: "none",
    stroke: "rgba(51, 81, 142, 0.25)",
    "stroke-width": 1
}).createSvgTag();
const newPath = CalcPathProperties.getEachSide(eduactionInnerContainerPath);
const HARDCODED_PADDING = 4;
const createInnerPAth = CalcPathProperties.buildInnerPath(newPath, HARDCODED_PADDING); // Uitroepteken moet weg!!@!!@$!#@$
// NIET HOE HET HOORT, MAAR GEEN ANDERE OPLOSSING.
// 
// --- Gaat fout in method CalcPathProperties.buildInnerPath()
createInnerPAth.innerTop[0].x = createInnerPAth.innerTop[0].x + HARDCODED_PADDING;
createInnerPAth.innerTop[1].x = createInnerPAth.innerTop[1].x - HARDCODED_PADDING;
const mergedArray = CalcPathProperties.mergePathArray(createInnerPAth);
const pathToString = CalcPathProperties.createNewSVGPathString(mergedArray);
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
    const educationInnerBorder = new InnerBorder(educationContainer);
    const educationfigures = new EducationInnerBorder(educationContainer, 4);
    const innerPathString = educationInnerBorder.getInnerPathValues();
    educationfigures.init(educationContainer);
    // INNER CONTAINER
    // const educationInnerContainerBorder = new InnerBorder(educationContainer)
    // const educationInnerContainerFigures = new EducationInnerBorder(educationContainer, 10)
    // const innerContainerString = educationInnerContainerBorder.getInnerPathValues()
    // educationInnerContainerFigures.init(educationContainer)
    const getE = document.querySelector(".education-content");
    const getS = document.getElementById("education-svg");
    if (!getE || !getS)
        return null;
    // console.log(getE.getBoundingClientRect().height);
    // console.log(getS.getBoundingClientRect().height);
}
// HTML moet binnen de inner border vallen:
// --- Inner border hoogte en width
// --- HTML hoogte en width
// Paden tekene aan de hand van de hoogte van de HTML
// --- 
