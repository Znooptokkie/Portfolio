import { CreateSVG } from "../../components/svg-core/SVGCreate.js";
import { SVGFactory } from "../../components/svg-core/SVGFactory.js";
export class MainBorder extends CreateSVG {
    constructor(HTMLId, svgAttributes, defaultStyling, sectionName, pathPoints) {
        super(HTMLId, svgAttributes, defaultStyling);
        this.sectionName = sectionName;
        this.pathPoints = pathPoints;
    }
    createMainContainerContrast() {
        const contrastGroup = new SVGFactory(this, "g", {
            id: `${this.sectionName}-contrast`
        }).createSvgTag();
        const contrastPath = new SVGFactory(contrastGroup, "path", {
            d: this.pathPoints,
            // fill: "#000214",
            fill: "none",
            stroke: "none",
            "stroke-width": 1
        }).createSvgTag();
    }
    init() {
        this.createMainContainerContrast();
    }
    get getPathPoints() {
        return this.pathPoints;
    }
}
