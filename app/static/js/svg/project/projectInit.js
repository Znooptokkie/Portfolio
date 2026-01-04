import { CreateSVG } from "../components/core/SVGCreate.js";
import { SVGFactory } from "../components/core/SVGFactory.js";
function mainSVG() {
    const mainPath = "M15,0 L150,0 L165,15 L835,15 L850,0 L985,0 L1000,15 L1000,150 L985,165 L985,515 L1000,530 L1000,665 L985,680 L850,680 L800,630 L200,630 L150,680 L15,680 L0,665 L0,530 L15,515 L15,165 L0,150 L0,15 L15,0";
    const titlePath = "M205,635 L795,635 L845,685 L795,735 L205,735 L155,685 L205,635";
    const prevButtonPAth = "M20,690 L150,690 L195,735 L65,735 L20,690";
    const nextButtonPath = "M850,690 L980,690 L935,735 L805,735 L850,690";
    // Balk:    100
    // Knop:    50
    // padding: 20
    const svg = new CreateSVG("project-slideshow-main-svg", {
        viewBox: "0 0 1000 735",
        preserveAspectRatio: "xMidYMid"
    }, true);
    const createMain = new SVGFactory(svg, "path", {
        d: mainPath,
        stroke: "grey",
        "stroke-width": 2
    }).createSvgTag();
    const createTitle = new SVGFactory(svg, "path", {
        d: titlePath,
        stroke: "green",
        "stroke-width": "blue"
    }).createSvgTag();
    const prevButton = new SVGFactory(svg, "path", {
        d: prevButtonPAth,
        stroke: "purple",
        "stroke-width": 2
    }).createSvgTag();
    const nextButton = new SVGFactory(svg, "path", {
        d: nextButtonPath,
        stroke: "cyan",
        "stroke-width": 2
    }).createSvgTag();
}
function smallSVG() {
    const smallParentContainer = document.querySelector(".small-slideshow-svg-article");
    const path = "M15,0 L985,0";
    const svg = new CreateSVG("project-slideshow-small-svg", {
        viewBox: "0 0 1000 750",
        preserveAspectRatio: "xMidYMid"
    }, true);
    const container = new SVGFactory(svg, "path", {
        d: path,
        stroke: "lightblue",
        "stroke-width": 2
    }).createSvgTag();
}
export function projectInit() {
    mainSVG();
    smallSVG();
}
