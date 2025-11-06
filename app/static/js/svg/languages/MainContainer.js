import { CreateSvgElements } from "../components/svg-core/CreateSvgElements.js";
import { SVGGroup } from "../components/svg-elements/Group.js";
import { SVGPath } from "../components/svg-elements/Path.js";
import { SVGForeignObject } from "../components/svg-elements/foreignObject.js";
export class LanguageMainContainer extends CreateSvgElements {
    constructor(HTMLId, svgAttributes, defaultStyling) {
        super(HTMLId, svgAttributes, defaultStyling);
    }
    createBigMainBorder() {
        const borderGroup = new SVGGroup(this, {
            class: "big-main-border-group",
            style: "overflow: hidden;"
        });
        borderGroup.createGroupSVGElement();
        // --- Hoofdpad ---
        const borderTop = "M25,0 L200,0 L250,50 L750,50 L800,0 L975,0";
        const borderRight = "L1000,25 L1000,150 L975,175 L975,500 L1000,525 L1000,650 L975,675";
        const borderBottom = "L800,675 L775,650 L225,650 L200,675 L25,675";
        const borderLeft = "L0,650 L0,525 L25,500 L25,175 L0,150 L0,25";
        const borderD = `${borderTop} ${borderRight} ${borderBottom} ${borderLeft} Z`;
        const mainPath = new SVGPath(borderGroup, {
            id: "big-main-border",
            d: borderD,
            fill: "rgba(6, 10, 18, 0.25)",
            stroke: kleur,
            "stroke-width": "4",
            "stroke-opacity": "0.3",
        });
        mainPath.createPathElement();
    }
    createSideBars() {
        const sidebarGroup = new SVGGroup(this, {
            class: "big-main-border-group",
        });
        sidebarGroup.createGroupSVGElement();
        const barLeftPath = "M10,515 L25,500 L25,175 L10,160 Z";
        const barRightPath = "M990,160 L975,175 L975,500 L990,515 Z";
        const leftBar = new SVGPath(sidebarGroup, {
            id: "big-sidebar-left",
            d: barLeftPath,
            // fill: kleur,
            fill: "#2ecc71",
            stroke: kleur,
            "stroke-width": "1",
            "stroke-opacity": "0.3",
        });
        leftBar.createPathElement();
        const rightBar = new SVGPath(sidebarGroup, {
            id: "big-sidebar-right",
            d: barRightPath,
            // fill: kleur,
            fill: "#2ecc71",
            stroke: kleur,
            "stroke-width": "1",
            "stroke-opacity": "0.3",
        });
        rightBar.createPathElement();
    }
    createTopBar() {
        const topBarGroup = new SVGGroup(this, {
            class: "main-border-top-bar-group"
        });
        topBarGroup.createGroupSVGElement();
        const topBarObject = new SVGPath(topBarGroup, {
            id: "big-top-bar",
            d: "M220,20 L250,50 L750,50 L780,20 Z",
            // fill: "#2ecc71",
            fill: kleur,
            stroke: "#2ecc71",
            "stroke-width": "1",
            "stroke-opacity": "0.3",
        });
        topBarObject.createPathElement();
    }
    createTextInSVG() {
        const textGroup = new SVGGroup(this, {
            class: "main-border-text-group"
        });
        const foreignObject = new SVGForeignObject(textGroup, {
            x: 50,
            y: 50,
            width: 900,
            height: 580 // was 680
        });
        foreignObject.createForeignObjectElement();
        if (foreignObject.element) {
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
            foreignObject.element.appendChild(div);
        }
    }
    init() {
        this.createSideBars();
        this.createBigMainBorder();
        this.createTextInSVG();
        this.createTopBar();
    }
}
const mainContainer = new LanguageMainContainer("proto-1", {
    viewBox: "-3 -3 1006 682",
    preserveAspectRatio: "xMidYMid meet"
}, true);
export function exportInstances() {
    mainContainer.init();
}
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
