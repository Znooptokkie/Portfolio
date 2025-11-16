import { CreateSVG } from "../components/svg-core/SVGCreate.js";
import { SVGFactory } from "../components/svg-core/SVGFactory.js";
import { CalcPathProperties } from "../components/svg-calculations/CalcPathProperties.js";
// rightTopCorner = "M975,0 L1000,25 L990,30 L970,10 Z"
export class LanguageMainContainer extends CreateSVG {
    constructor(HTMLId, svgAttributes, defaultStyling) {
        super(HTMLId, svgAttributes, defaultStyling);
    }
    createBigMainBorder() {
        const borderGroupFactory = new SVGFactory(this, "g", {
            class: "big-main-border-group",
            style: "overflow: hidden;"
        });
        const borderGroup = borderGroupFactory.createSvgTag();
        // --- Hoofdpad ---
        // const innerTop = "M+5,+10 L-5,+10 L-5,+10 L+5,+10 L+5,+10 L-5,+10"
        // const innerTop = "M30,10 L195,10 L245,60 L755,60 L805,10 L970,10";
        const borderTop = "M25,0 L200,0 L250,50 L750,50 L800,0 L975,0";
        CalcPathProperties.getPathParts(borderTop);
        // const innerRight = L-10,+5 L-10,-5, L-10,-5 L-10,+5 L-10,+5 L-10,-5 L-5,-10 
        // const innerRight = "L990,30 L990,145 L965,170 L965,505 L990,530  L990,645 L970,665";
        const borderRight = "L1000,25 L1000,150 L975,175 L975,500 L1000,525 L1000,650";
        // const innerBor = "L-5,-10 L+5,-10 L+5,-10, L-5,-10, L-5,-10, L+5,-10"
        // const innerBottom = "L970,665 L805,665 L780,640 L220,640 L195,665 L30,665";
        const borderBottom = "L975,675 L800,675 L775,650 L225,650 L200,675 L25,675";
        // const inner l= "L+10,-5 L+10,+5 L+10,+5 L+10,-5 L+10,-5 L+10,+5 "
        // const innerLeft = "L10,645 L10,530 L35,505 L35,170 L10,145 L10,30 L30,10";
        const borderLeft = "L0,650 L0,525 L25,500 L25,175 L0,150 L0,25";
        const borderD = `${borderTop} ${borderRight} ${borderBottom} ${borderLeft} Z`;
        const pathProperties = CalcPathProperties.calcCornersMinusStrokeWidth(borderTop, 4);
        const mainPath = new SVGFactory(borderGroup, "path", {
            id: "big-main-border",
            d: borderD,
            fill: "rgba(6, 10, 18, 0.25)",
            stroke: kleur,
            "stroke-opacity": "0.1",
            "stroke-width": strokeWidth
        });
        mainPath.createSvgTag();
    }
    createSideBars() {
        const sidebarGroupFactory = new SVGFactory(this, "g", {
            class: "big-main-border-group",
        });
        const sidebarGroup = sidebarGroupFactory.createSvgTag();
        const barLeftPath = "M10,515 L25,500 L25,175 L10,160 Z";
        const barRightPath = "M990,160 L975,175 L975,500 L990,515 Z";
        const leftBar = new SVGFactory(sidebarGroup, "path", {
            id: "big-sidebar-left",
            d: barLeftPath,
            // fill: kleur,
            fill: "#2ecc71",
            stroke: kleur,
            "stroke-opacity": "0.3",
            "stroke-width": strokeWidth
        });
        leftBar.createSvgTag();
        // console.log(leftBar);
        const rightBar = new SVGFactory(sidebarGroup, "path", {
            id: "big-sidebar-right",
            d: barRightPath,
            // fill: kleur,
            fill: "#2ecc71",
            stroke: kleur,
            "stroke-opacity": "0.3",
            "stroke-width": strokeWidth
        });
        rightBar.createSvgTag();
    }
    createTopBar() {
        const topBarGroupFactory = new SVGFactory(this, "g", {
            class: "main-border-top-bar-group"
        });
        const topBarGroup = topBarGroupFactory.createSvgTag();
        const topBarObject = new SVGFactory(topBarGroup, "path", {
            id: "big-top-bar",
            d: "M220,20 L250,50 L750,50 L780,20 Z",
            // fill: "#2ecc71",
            fill: kleur,
            stroke: "#2ecc71",
            "stroke-opacity": "0.3",
            "stroke-width": strokeWidth
        });
        topBarObject.createSvgTag();
    }
    createTextInSVG() {
        const textGroupFactory = new SVGFactory(this, "g", {
            class: "main-border-text-group"
        });
        const textGroup = textGroupFactory.createSvgTag();
        const foreignObject = new SVGFactory(textGroup, "foreignObject", {
            x: 50,
            y: 50,
            width: 900,
            height: 580 // was 680
        });
        foreignObject.createSvgTag();
        if (foreignObject.getSVGElement) {
            const div = document.createElement("div");
            div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.padding = "2.5rem";
            div.style.display = "flex";
            div.style.lineHeight = "1.5";
            div.style.justifyContent = "center";
            div.style.alignItems = "center";
            div.style.fontStyle = "italic";
            div.style.fontSize = "54px";
            div.style.fontFamily = "Courier Prime", "monospace";
            div.style.color = kleur;
            div.innerText = '"Ik beschik over een goede basis in meerdere programmeertalen, vooral in Python en JavaScript. En ik blijf mijn kennis verder uitbreiden."';
            foreignObject.getSVGElement.appendChild(div);
        }
    }
    createInnerBorder() {
        const innerBorderGroupFactory = new SVGFactory(this, "g", {
            class: "main-inner-border-group"
        });
        const innerBorderGroup = innerBorderGroupFactory.createSvgTag();
        //  const leftTopCorner = "M25,0 L30,10 M10,30 L0,25";
        const innerTop = "M30,10 L195,10 L245,60 L755,60 L805,10 L970,10";
        const innerRight = "L990,30 L990,145 L965,170 L965,505 L990,530  L990,645";
        const innerBottom = "L970,665 L805,665 L780,640 L220,640 L195,665 L30,665";
        const innerLeft = "L10,645 L10,530 L35,505 L35,170 L10,145 L10,30 Z";
        // const borderLeft = "L0,650 L0,525 L25,500 L25,175 L0,150 L0,25";
        const innerBorderPath = new SVGFactory(innerBorderGroup, "path", {
            id: "main-inner-border-path",
            d: `${innerTop} ${innerRight} ${innerBottom} ${innerLeft}`,
            fill: "none",
            stroke: kleur,
            "stroke-opacity": "0.1",
            "stroke-width": strokeWidth
        });
        innerBorderPath.createSvgTag();
    }
    createCorners() {
        // const rightTopCorner = "M975,0 L1000,25 L990,30 L970,10 Z";
        const rightTopCorner = "M1000,25 L990,30 M970,10 L975,0";
        // const rightBottomCorner = "M1000,650 L975,675 970,665 L990,645 Z";
        const rightBottomCorner = "M975,675 L970,665 M990,645 L1000,650";
        // const leftBottomCorner = "M25,675 L0,650 L10,645 L30,665 Z";
        const leftBottomCorner = "M0,650 L10,645 M30,665 L25,675";
        // const leftTopCorner = "M0,25 L25,0 L30,10 L10,30 Z";
        const leftTopCorner = "M25,0 L30,10 M10,30 L0,25";
        const cornersGroupFactory = new SVGFactory(this, "g", {
            class: "main-corners-group"
        });
        const cornersGroup = cornersGroupFactory.createSvgTag();
        const rightTopCornerPath = new SVGFactory(cornersGroup, "path", {
            id: "main-inner-border-path",
            d: `${rightTopCorner}`,
            fill: "rgba(6, 10, 18, 0.25)",
            stroke: kleur,
            "stroke-opacity": "0.1",
            "stroke-width": strokeWidth
        });
        rightTopCornerPath.createSvgTag();
        const rightBottomCornerPath = new SVGFactory(cornersGroup, "path", {
            id: "main-inner-border-path",
            d: `${rightBottomCorner}`,
            fill: "rgba(6, 10, 18, 0.25)",
            stroke: kleur,
            "stroke-opacity": "0.1",
            "stroke-width": strokeWidth
        });
        rightBottomCornerPath.createSvgTag();
        const leftBottomCornerPath = new SVGFactory(cornersGroup, "path", {
            id: "main-inner-border-path",
            d: `${leftBottomCorner}`,
            fill: "rgba(6, 10, 18, 0.25)",
            stroke: kleur,
            "stroke-opacity": "0.1",
            "stroke-width": strokeWidth
        });
        leftBottomCornerPath.createSvgTag();
        const leftTopCornerPath = new SVGFactory(cornersGroup, "path", {
            id: "main-inner-border-path",
            d: `${leftTopCorner}`,
            fill: "rgba(6, 10, 18, 0.25)",
            stroke: kleur,
            "stroke-opacity": "0.1",
            "stroke-width": strokeWidth
        });
        leftTopCornerPath.createSvgTag();
    }
    init() {
        this.createSideBars();
        this.createBigMainBorder();
        this.createTextInSVG();
        // this.createTopBar();
        this.createInnerBorder();
        this.createCorners();
    }
}
const mainContainer = new LanguageMainContainer("proto-1", {
    viewBox: "-3 -3 1006 682",
    preserveAspectRatio: "xMidYMid meet"
}, true);
console.log(mainContainer);
export function exportInstances() {
    mainContainer.init();
}
const strokeWidth = 4;
// const kleur = "rgba(20, 36, 54, 1)";
const kleur = "rgba(51, 81, 142, 1)";
// const kleur = "rgba(28, 49, 73, 1)"
// const kleur = "rgba(36, 62, 92, 1)"
// const kleur = "rgba(44, 75, 111, 1)"
// const kleur = "rgba(52, 88, 130, 1)"
// const kleur = "rgba(60, 101, 149, 1)"
// const kleur = "rgba(75, 117, 160, 1)"
// const kleur = "rgba(90, 133, 171, 1)"
// const kleur = "rgba(110, 152, 182, 1)"
// const kleur = "rgba(135, 175, 195, 1)"
// const kleur = "rgba(5, 15, 25, 1)"
// const kleur = "rgba(10, 20, 35, 1)"
// const kleur = "rgba(15, 25, 45, 1)"
// const kleur = "rgba(20, 30, 55, 1)"
// const kleur = "rgba(25, 35, 65, 1)"
// const kleur = "rgba(30, 40, 75, 1)"
// const kleur = "rgba(40, 50, 90, 1)"
// const kleur = "rgba(50, 60, 105, 1)"
// const kleur = "rgba(65, 75, 125, 1)"
// const kleur = "rgba(80, 90, 145, 1)"
