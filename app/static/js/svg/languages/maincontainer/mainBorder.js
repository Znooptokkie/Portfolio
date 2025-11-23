import { CreateSVG } from "../../components/svg-core/SVGCreate.js";
import { SVGFactory } from "../../components/svg-core/SVGFactory.js";
import { CalcPathProperties } from "../../components/svg-calculations/CalcPathProperties.js";
import { CalcPathFigures } from "../../components/svg-calculations/CalcPathFigures.js";
export class MainContainerContrast extends CreateSVG {
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
export class ConstructSVG {
    constructor(parentSVGSource) {
        this.parentSVGSource = parentSVGSource;
        this.parentSVG = parentSVGSource.getSVGElementRoot;
    }
    getInnerPathValues() {
        const getPathPointsAndSides = CalcPathProperties.getEachSide(outerPath);
        if (!getPathPointsAndSides)
            return null;
        const drawInnerBorder = CalcPathProperties.buildInnerPath(getPathPointsAndSides, 10);
        const mergedArray = CalcPathProperties.mergePathArray(drawInnerBorder);
        const pathToString = CalcPathProperties.createNewSVGPathString(mergedArray);
        return pathToString;
    }
}
export class CreateFiguresFromPaths {
    constructor(parentSVGSource) {
        this.parentSVGSource = parentSVGSource;
        this.parentSVG = parentSVGSource.getSVGElementRoot;
    }
    makeFigures() {
        if (!innerPathString)
            return null;
        const getFiguresPath = CalcPathFigures.createFigurePathString(innerPathString, outerPath);
        if (!getFiguresPath)
            return null;
        let counter = 0;
        for (const figure of getFiguresPath) {
            let color = counter < 12 ? "#01030a" : "#01030a";
            const createfigurePath = new SVGFactory(mainContainer, "path", {
                class: `figure-${counter}`,
                d: `${figure}Z`,
                stroke: "rgba(20, 30, 55, 0.5)",
                "stroke-width": 1,
                opacity: "1",
                fill: color,
                // filter: "url(#ultraDarkFrosted) url(#borderSegmentShadow)",  // beide filters!
            });
            counter++;
            createfigurePath.createSvgTag();
        }
    }
    init() {
        this.makeFigures();
    }
}
const outerPath = "M25,0 L200,0 L250,50 L750,50 L800,0 L975,0 L1000,25 L1000,150 L975,175 L975,500 L1000,525 L1000,650 L975,675 L800,675 L775,650 L225,650 L200,675 L25,675 L0,650 L0,525 L25,500 L25,175 L0,150 L0,25 L25,0";
const mainContainer = new MainContainerContrast("proto-2", {
    viewBox: "-3 -3 1006 682",
    preserveAspectRatio: "xMidYMid meet"
}, true, "language", outerPath);
const inner = new ConstructSVG(mainContainer);
const innerPath = CalcPathProperties.getEachSide(outerPath);
const innerPathString = inner.getInnerPathValues();
const figure = new CreateFiguresFromPaths(mainContainer);
export function exportClass() {
    mainContainer.init();
    figure.init();
}
