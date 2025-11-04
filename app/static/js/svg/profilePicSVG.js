import { CreateSvgElements } from "./svg-core/CreateSvgElements.js";
import { SVGDefsElement } from "./svg-elements/Defs.js";
import { SVGClipPathElement } from "./svg-elements/ClipPath.js";
import { SVGCircle } from "./svg-elements/Circle.js";
import { SVGGroup } from "./svg-elements/Group.js";
import { SVGImage } from "./svg-elements/Image.js";
import { CalcCircleProperties } from "./svg-calculations/CalcCircleProperties.js";
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
        cx: 600,
        cy: 600,
        r: 300
    });
    newCircleInClipPath.createCircleElement();
}
function createThinInnerBorder() {
    const thinInnerGroup = new SVGGroup(htmlSVGElement, {
        class: "thin-inner-border-group"
    });
    const firstCircleBlock = new SVGCircle(thinInnerGroup, {
        class: "thin-line-first",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 0.75)",
        "stroke-width": "30",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, circumferenceInnerBorder),
    });
    firstCircleBlock.createCircleElement();
    const secondCircleBlock = new SVGCircle(thinInnerGroup, {
        class: "thin-line-second",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 0.75)",
        "stroke-width": "30",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(300, circumferenceInnerBorder),
        "stroke-dashoffset": 600,
    });
    secondCircleBlock.createCircleElement();
    const thirdCircleBlock = new SVGCircle(thinInnerGroup, {
        class: "thin-line-third",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 0.75)",
        "stroke-width": "30",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, circumferenceInnerBorder),
        "stroke-dashoffset": 1500,
    });
    thirdCircleBlock.createCircleElement();
}
function createBigInnerBorder() {
    const bigInnerGroup = new SVGGroup(htmlSVGElement, {
        class: "big-inner-border-group"
    });
    const firstCircleBlock = new SVGCircle(bigInnerGroup, {
        class: "big-line-first",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 1)",
        "stroke-width": "60",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, circumferenceInnerBorder),
    });
    firstCircleBlock.createCircleElement();
    const secondCircleBlock = new SVGCircle(bigInnerGroup, {
        class: "big-line-second",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 1)",
        "stroke-width": "60",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(200, circumferenceInnerBorder),
        "stroke-dashoffset": 750
    });
    secondCircleBlock.createCircleElement();
}
function createBackgroundBlocks() {
    const backgroundGroup = new SVGGroup(htmlSVGElement, {
        class: "background-group"
    });
    const firstCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-first bg-child",
        cx: "600",
        cy: "600",
        r: radiusSmallest,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "140",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(100, circumferenceSmallest),
    });
    firstCircleBlock.createCircleElement();
    const secondCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-second bg-child",
        cx: "600",
        cy: "600",
        r: radiusSmall,
        stroke: "rgba(46, 204, 113, 0.2)",
        "stroke-width": "360",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceSmall),
        "stroke-dashoffset": 135
    });
    secondCircleBlock.createCircleElement();
    const thirdCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-third bg-child",
        cx: "600",
        cy: "600",
        r: radiusMedium,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "120",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceMedium),
        "stroke-dashoffset": 270
    });
    thirdCircleBlock.createCircleElement();
    const fourthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-fourth bg-child",
        cx: "600",
        cy: "600",
        r: radiusMedium,
        stroke: "rgba(46, 204, 113, 0.2)",
        "stroke-width": "220",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceMedium),
        "stroke-dashoffset": 400
    });
    fourthCircleBlock.createCircleElement();
    const fifthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-fifth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "80",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceLarge),
        "stroke-dashoffset": 535
    });
    fifthCircleBlock.createCircleElement();
    const sixthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-sixth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.3)",
        "stroke-width": "270",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceLarge),
        "stroke-dashoffset": 665
    });
    sixthCircleBlock.createCircleElement();
    const seventhCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-seventh bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.05)",
        "stroke-width": "120",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceLarge),
        "stroke-dashoffset": 795
    });
    seventhCircleBlock.createCircleElement();
    const eigthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-eigth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.2)",
        "stroke-width": "60",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceLarge),
        "stroke-dashoffset": 925
    });
    eigthCircleBlock.createCircleElement();
    const ninthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-ninth bg-child",
        cx: "600",
        cy: "600",
        r: radiusSmallest,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "400",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceSmallest),
        "stroke-dashoffset": 1000
    });
    ninthCircleBlock.createCircleElement();
    const tenthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-tenth bg-child",
        cx: "600",
        cy: "600",
        r: radiusMedium,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "60",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(80, circumferenceMedium),
        "stroke-dashoffset": 1145
    });
    tenthCircleBlock.createCircleElement();
    const eleventhCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-eleventh bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "400",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(100, circumferenceLarge),
        "stroke-dashoffset": 1270
    });
    eleventhCircleBlock.createCircleElement();
    const twelfthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-twelfth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "180",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(100, circumferenceLarge),
        "stroke-dashoffset": 1380
    });
    twelfthCircleBlock.createCircleElement();
    const thirtheenthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-thirtheenth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "80",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceLarge),
        "stroke-dashoffset": 1510
    });
    thirtheenthCircleBlock.createCircleElement();
    const fourteenthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-fourteenth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "380",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceLarge),
        "stroke-dashoffset": 1640
    });
    fourteenthCircleBlock.createCircleElement();
    const fifteenthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-fifteenth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "60",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(140, circumferenceLarge),
        "stroke-dashoffset": 1790
    });
    fifteenthCircleBlock.createCircleElement();
    const sixteenthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-sixteenth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "120",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(140, circumferenceLarge),
        "stroke-dashoffset": 1940
    });
    sixteenthCircleBlock.createCircleElement();
    const seventeenthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-seventeenth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "350",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(140, circumferenceLarge),
        "stroke-dashoffset": 2090
    });
    seventeenthCircleBlock.createCircleElement();
    const eigthteenthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-eigthteenth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "80",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(140, circumferenceLarge),
        "stroke-dashoffset": 2240
    });
    eigthteenthCircleBlock.createCircleElement();
    const nineteenthCircleBlock = new SVGCircle(backgroundGroup, {
        class: "background-nineteenth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "60",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(140, circumferenceLarge),
        "stroke-dashoffset": 2395
    });
    nineteenthCircleBlock.createCircleElement();
}
// Image Element
function imageElement() {
    const image = new SVGImage(htmlSVGElement, {
        class: "svg-image",
        href: "./static/images/myself.webp",
        x: 300,
        y: 300,
        width: 600,
        height: 600,
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
const radiusInner = 375;
const circumferenceInnerBorder = CalcCircleProperties.calcCircleCircumference(radiusInner);
// Alle different radius for background blocks
const radiusSmallest = 375;
const circumferenceSmallest = CalcCircleProperties.calcCircleCircumference(radiusSmallest);
const radiusSmall = 390;
const circumferenceSmall = CalcCircleProperties.calcCircleCircumference(radiusSmall);
const radiusMedium = 395;
const circumferenceMedium = CalcCircleProperties.calcCircleCircumference(radiusMedium);
const radiusLarge = 400;
const circumferenceLarge = CalcCircleProperties.calcCircleCircumference(radiusLarge);
// ///////////////////  //
//                      //
//      INSTANCES       //
//                      //
// ///////////////////  //
const htmlSVGElement = new CreateSvgElements("profile-pic-svg", {
    viewBox: "0 0 1200 1200",
    preserveAspectRatio: "xMidYMid meet"
}, true);
const defsElement = new SVGDefsElement(htmlSVGElement);
export function callAllInstances() {
    defsElement.createDefSVGElement();
    createClipPath();
    createThinInnerBorder();
    createBigInnerBorder();
    createBackgroundBlocks();
    imageElement();
    console.log("Wordt geladen");
}
