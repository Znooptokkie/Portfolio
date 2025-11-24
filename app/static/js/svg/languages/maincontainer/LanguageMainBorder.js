import { CreateSVG } from "../../components/svg-core/SVGCreate.js";
import { SVGFactory } from "../../components/svg-core/SVGFactory.js";
import { CalcPathProperties } from "../../components/svg-calculations/CalcPathProperties.js";
export class LanguageMainBorder extends CreateSVG {
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
export class InnerBorder {
    constructor(parentSVGSource) {
        this.parentSVGSource = parentSVGSource;
        this.parentSVG = parentSVGSource.getSVGElementRoot;
    }
    getInnerPathValues(padding = 10) {
        const path = this.parentSVGSource.getPathPoints;
        const getPathPointsAndSides = CalcPathProperties.getEachSide(this.parentSVGSource.getPathPoints);
        if (!getPathPointsAndSides)
            return null;
        const drawInnerBorder = CalcPathProperties.buildInnerPath(getPathPointsAndSides, padding);
        const mergedArray = CalcPathProperties.mergePathArray(drawInnerBorder);
        const pathToString = CalcPathProperties.createNewSVGPathString(mergedArray);
        return pathToString;
    }
}
