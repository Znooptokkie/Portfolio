import { CreateSvgElements } from "./components/svg-core/CreateSvgElements.js";
import { SVGDefsElement } from "./components/svg-elements/Defs.js";
import { SVGClipPathElement } from "./components/svg-elements/ClipPath.js";
import { SVGCircle } from "./components/svg-elements/Circle.js";
import { SVGGroup } from "./components/svg-elements/Group.js";
import { SVGImage } from "./components/svg-elements/Image.js";
import { CalcCircleProperties } from "./components/svg-calculations/CalcCircleProperties.js";
// ///////////////////  //
//                      //
//       OBJECTS        //
//                      //
// ///////////////////  //
function createClipPath() {
    const newClipPathElement = new SVGClipPathElement(htmlSVGElement, {
        id: "circle-inner"
    });
    const newCircleInClipPath = new SVGCircle(newClipPathElement, {
        cx: 700,
        cy: 700,
        r: 350
    });
    newCircleInClipPath.createCircleElement();
}
function createBackgroundBlocks() {
    const backgroundGroup = new SVGGroup(htmlSVGElement, {
        class: "first-row-group"
    });
    const firstCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-first bg-child",
        cx: 700,
        cy: 700,
        r: radiusInner,
        stroke: "rgba(46, 204, 113,1)",
        "stroke-width": "120",
        fill: "none",
        // "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(160, circumferenceInnerBorder),
        "stroke-dasharray": "160 193.43"
    });
    firstCircleBlock.createCircleElement();
    const firstCircleBlockBG = new SVGCircle(backgroundGroup, {
        class: "background-first bg-child",
        cx: 700,
        cy: 700,
        r: radiusSmallest,
        stroke: "rgba(46, 204, 113,0.25)",
        "stroke-width": "120",
        fill: "none",
        // "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(160, circumferenceInnerBorder),
        "stroke-dasharray": "160 213.06"
    });
    firstCircleBlockBG.createCircleElement();
}
function createSecondRow() {
    const backgroundGroup = new SVGGroup(htmlSVGElement, {
        class: "second-row-group"
    });
    const firstCircleBlock = new SVGCircle(backgroundGroup, {
        class: "",
        cx: 700,
        cy: 700,
        r: radiusSmall,
        stroke: "rgba(46, 204, 113,1)",
        // stroke: "red",
        "stroke-width": "120",
        fill: "none",
        // "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(160, circumferenceInnerBorder),
        "stroke-dasharray": "243.43 208.17",
        "stroke-dashoffset": "243.43"
    });
    firstCircleBlock.createCircleElement();
    const firstCircleBlockBG = new SVGCircle(backgroundGroup, {
        class: "background-first bg-child",
        cx: 700,
        cy: 700,
        r: radiusSmallest,
        stroke: "rgba(46, 204, 113,0.25)",
        "stroke-width": "120",
        fill: "none",
        // "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(160, circumferenceInnerBorder),
        "stroke-dasharray": "160 213.06"
    });
    firstCircleBlockBG.createCircleElement();
}
// Image Element
function imageElement() {
    const image = new SVGImage(htmlSVGElement, {
        class: "svg-image",
        href: "./static/images/myself.webp",
        x: 350,
        y: 350,
        width: 700,
        height: 700,
        "clip-path": "url(#circle-inner)",
        preserveAspectRatio: "xMidYMid slice"
    });
    image.createimageElement();
}
// ///////////////////  //
//                      //
//    CALCULATIONS      //
//                      //
// ///////////////////  //
// Both THIN an BIG inner borders
const radiusInner = 450;
const circumferenceInnerBorder = CalcCircleProperties.calcCircleCircumference(radiusInner);
// Alle different radius for background blocks
const radiusSmallest = 475;
const circumferenceSmallest = CalcCircleProperties.calcCircleCircumference(radiusSmallest);
const radiusSmall = 575;
const circumferenceSmall = CalcCircleProperties.calcCircleCircumference(radiusSmall);
// const radiusMedium: number = 395
// const circumferenceMedium: number = CalcCircleProperties.calcCircleCircumference(radiusMedium);
// const radiusLarge: number = 400
// const circumferenceLarge: number = CalcCircleProperties.calcCircleCircumference(radiusLarge);
// ///////////////////  //
//                      //
//      INSTANCES       //
//                      //
// ///////////////////  //
const htmlSVGElement = new CreateSvgElements("profile-pic-svg", {
    viewBox: "0 0 1400 1400",
    preserveAspectRatio: "xMidYMid meet"
}, true);
const defsElement = new SVGDefsElement(htmlSVGElement);
export function callAllInstances() {
    defsElement.createDefSVGElement();
    createClipPath();
    // createThinInnerBorder();
    // createBigInnerBorder();
    createBackgroundBlocks();
    createSecondRow();
    imageElement();
    // console.log("Wordt geladen");
}
