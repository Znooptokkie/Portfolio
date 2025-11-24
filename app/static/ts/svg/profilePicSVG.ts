import { CreateSVG } from "./components/svg-core/SVGCreate.js";
import { SVGFactory } from "./components/svg-core/SVGFactory.js";

import { CalcPathProperties } from "./components/svg-calculations/CalcPathProperties.js";
import { CalcCircleProperties } from "./components/svg-calculations/CalcCircleProperties.js";

import { SVGCircleAttributes, SVGImageAttributes } from "../types/svg/attributes"

if (document.getElementById("profile-pic-svg"))
{
    // ROOT SVG ELEMENT <svg>
    var htmlSVGElement = new CreateSVG(
        "profile-pic-svg",
        {
            viewBox: "0 0 1200 1200",
            preserveAspectRatio: "xMidYMid meet"
        },
        true
    ); 
}

// Both THIN an BIG inner borders

const radiusInner: number = 375;
const circumferenceInnerBorder: number = CalcCircleProperties.calcCircleCircumference(radiusInner); 

// Alle different radius for background blocks
const radiusSmallest: number = 375
const circumferenceSmallest: number = CalcCircleProperties.calcCircleCircumference(radiusSmallest);

const radiusSmall: number = 390
const circumferenceSmall: number = CalcCircleProperties.calcCircleCircumference(radiusSmall);

const radiusMedium: number = 395
const circumferenceMedium: number = CalcCircleProperties.calcCircleCircumference(radiusMedium);

const radiusLarge: number = 400
const circumferenceLarge: number = CalcCircleProperties.calcCircleCircumference(radiusLarge);


function createClipPath(): void
{
    const newClipPathElement = new SVGFactory(htmlSVGElement, "clipPath", 
    {
        id: "circle-inner"
    });

    newClipPathElement.createSvgTag();

    const newCircleInClipPath = new SVGFactory<SVGCircleAttributes>(newClipPathElement, "circle", 
    {
        cx: 600,
        cy: 600,
        r: 300
    });

    newCircleInClipPath.createSvgTag();
}

function createThinInnerBorder(): void
{
    const thinInnerGroupFactory = new SVGFactory(htmlSVGElement, "g",
    {
        class: "thin-inner-border-group"
    });

    const thinInnerGroup = thinInnerGroupFactory.createSvgTag();

    const firstCircleBlockFactory = new SVGFactory<SVGCircleAttributes>(thinInnerGroup, "circle", 
    {
        class: "thin-line-first",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 0.5)",
        "stroke-width": "30",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, circumferenceInnerBorder),
    });

    firstCircleBlockFactory.createSvgTag();

    const secondCircleBlockFactory = new SVGFactory<SVGCircleAttributes>(thinInnerGroup, "circle",
    {
        class: "thin-line-second",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 0.5)",
        "stroke-width": "30",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(300, circumferenceInnerBorder),
        "stroke-dashoffset": 600,
    });

    secondCircleBlockFactory.createSvgTag();

    const thirdCircleBlock = new SVGFactory<SVGCircleAttributes>(thinInnerGroup, "circle",
    {
        class: "thin-line-third",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 0.5)",
        "stroke-width": "30",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, circumferenceInnerBorder),
        "stroke-dashoffset": 1500,
    });

    thirdCircleBlock.createSvgTag();
}


function createBigInnerBorder(): void
{
    const bigInnerGroupFactory = new SVGFactory(htmlSVGElement, "g",
    {
        class: "big-inner-border-group"
    });

    const bigInnerGroup = bigInnerGroupFactory.createSvgTag();

    const firstCircleBlock = new SVGFactory<SVGCircleAttributes>(bigInnerGroup, "circle",
    {
        class: "big-line-first",
        cx: "600",
        cy: "600",
        r: radiusInner,
        stroke: "rgba(46, 204, 113, 1)",
        "stroke-width": "60",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, circumferenceInnerBorder),
    });

    firstCircleBlock.createSvgTag();

    const secondCircleBlock = new SVGFactory<SVGCircleAttributes>(bigInnerGroup, "circle",
    {
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

    secondCircleBlock.createSvgTag();
}

function createBackgroundBlocks(): void
{
    const backgroundGroupFactory = new SVGFactory(htmlSVGElement, "g", 
    {
        class: "background-group"
    });

    const backgroundGroup = backgroundGroupFactory.createSvgTag();

    const firstCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
        class: "background-first bg-child",
        cx: "600",
        cy: "600",
        r: radiusSmallest,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "140",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(100, circumferenceSmallest),
    });

    firstCircleBlock.createSvgTag();

    const secondCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
        class: "background-second bg-child",
        cx: "600",
        cy: "600",
        r: radiusSmall,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "360",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceSmall),
        "stroke-dashoffset": 135
    }); 

    secondCircleBlock.createSvgTag();


    const thirdCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    thirdCircleBlock.createSvgTag();

    const fourthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
        class: "background-fourth bg-child",
        cx: "600",
        cy: "600",
        r: radiusMedium,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "220",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceMedium),
        "stroke-dashoffset": 400
    }); 

    fourthCircleBlock.createSvgTag();

    const fifthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    fifthCircleBlock.createSvgTag();

    const sixthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
        class: "background-sixth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "270",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceLarge),
        "stroke-dashoffset": 665
    }); 

    sixthCircleBlock.createSvgTag();

    const seventhCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
        class: "background-seventh bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "120",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceLarge),
        "stroke-dashoffset": 795
    }); 

    seventhCircleBlock.createSvgTag();

    const eigthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
        class: "background-eigth bg-child",
        cx: "600",
        cy: "600",
        r: radiusLarge,
        stroke: "rgba(46, 204, 113, 0.1)",
        "stroke-width": "60",
        fill: "none",
        "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(120, circumferenceLarge),
        "stroke-dashoffset": 925
    }); 

    eigthCircleBlock.createSvgTag();

    const ninthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    ninthCircleBlock.createSvgTag();

    const tenthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    tenthCircleBlock.createSvgTag();

    const eleventhCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    eleventhCircleBlock.createSvgTag();

    const twelfthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    twelfthCircleBlock.createSvgTag();

    const thirtheenthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    thirtheenthCircleBlock.createSvgTag();

    const fourteenthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    fourteenthCircleBlock.createSvgTag();

    const fifteenthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    fifteenthCircleBlock.createSvgTag();

    const sixteenthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    sixteenthCircleBlock.createSvgTag();

    const seventeenthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    seventeenthCircleBlock.createSvgTag();

    const eigthteenthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    eigthteenthCircleBlock.createSvgTag();

    const nineteenthCircleBlock = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
    {
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

    nineteenthCircleBlock.createSvgTag();
}

function imageElement(): void
{
    const image = new SVGFactory<SVGImageAttributes>(htmlSVGElement, "image",
    {
        class: "svg-image",
        href: "./static/images/myself.webp",
        x: 300,
        y: 300,
        width: 600,
        height: 600,
        "clip-path": "url(#circle-inner)",
        preserveAspectRatio: "xMidYMid slice"
    });

    image.createSvgTag();
}

export function callAllInstances(): void
{
    createClipPath();
    createThinInnerBorder();
    createBigInnerBorder();
    createBackgroundBlocks();
    imageElement();
    // console.log("Wordt geladen");
}