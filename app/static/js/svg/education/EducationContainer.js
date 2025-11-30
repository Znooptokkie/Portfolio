import { SVGFactory } from "../components/svg-core/SVGFactory.js";
import { CalcPathFigures } from "../components/svg-calculations/CalcPathFigures.js";
import { InnerBorder } from "../languages/maincontainer/LanguageMainBorder.js";
// export class EducationContainer extends CreateSVG
// {
//     public sectionName: string
//     private pathPoints: string
//     constructor(
//         HTMLId: string,
//         svgAttributes: Record<string, string>,
//         defaultStyling: boolean,
//         sectionName: string,
//         pathPoints: string
//     )
//     {
//         super(HTMLId, svgAttributes, defaultStyling)
//         this.sectionName = sectionName
//         this.pathPoints = pathPoints
//     }
//     private CreateEducationContainer(): void
//     {
//         const eduactionGroup = new SVGFactory(this, "g", {
//             id: `${this.sectionName}-container`
//         }).createSvgTag()
//         const contrastPath = new SVGFactory<SVGPathAttributes>(eduactionGroup, "path", {
//             d: this.pathPoints,
//             // fill: "#000214",
//             fill: "none",
//             stroke: "none",
//             "stroke-width": 1
//         }).createSvgTag()
//     }
//     public init(): void
//     {
//         this.CreateEducationContainer()
//     }
//     public get getPathPoints() : string 
//     {
//         return this.pathPoints
//     }
// }
// export class InnerBorder
// {
//     private parentSVGSource: EducationContainer;
//     private parentSVG: SVGElement | null;
//     constructor(parentSVGSource: EducationContainer)
//     {
//         this.parentSVGSource = parentSVGSource;
//         this.parentSVG = parentSVGSource.getSVGElementRoot;
//     }
//     public getInnerPathValues(padding: number = 10): string | null
//     {
//         const path = this.parentSVGSource.getPathPoints;
//         const getPathPointsAndSides = CalcPathProperties.getEachSide(this.parentSVGSource.getPathPoints);
//         if (!getPathPointsAndSides) 
//             return null;
//         const drawInnerBorder = CalcPathProperties.buildInnerPath(getPathPointsAndSides, padding);
//         const mergedArray = CalcPathProperties.mergePathArray(drawInnerBorder);
//         const pathToString = CalcPathProperties.createNewSVGPathString(mergedArray);
//         return pathToString;
//     }
// }
export class EducationInnerBorder {
    constructor(parentSVGSource, padding = 5) {
        this.parentSVGSource = parentSVGSource;
        this.parentSVG = parentSVGSource.getSVGElementRoot;
        this.padding = padding;
    }
    makeFigures(container) {
        const outer = this.parentSVGSource.getPathPoints;
        const inner = new InnerBorder(this.parentSVGSource).getInnerPathValues(this.padding);
        if (!inner || !outer)
            return null;
        const getFiguresPath = CalcPathFigures.createFigurePathString(inner, outer);
        if (!getFiguresPath)
            return null;
        const innerGroup = new SVGFactory(container, "g", {
            class: `${this.parentSVGSource.sectionName}-inner`
        }).createSvgTag();
        new SVGFactory(innerGroup, "path", {
            d: inner,
            // fill: "#000214",
            fill: "url(#ultraDarkGlass)",
            // filter: "url(#ultraDarkFrosted) url(#borderSegmentShadow)",
            stroke: "none",
        }).createSvgTag();
        let counter = 0;
        for (const figure of getFiguresPath) {
            let color = counter < 12 ? "#01030a" : "#000214";
            const createfigurePath = new SVGFactory(container, "path", {
                class: `figure-${counter}`,
                d: `${figure}Z`,
                stroke: "rgba(51, 81, 142, 0.5)",
                "stroke-width": 1,
                opacity: "1",
                fill: "#03080f"
                // fill: "#000214",
                // filter: "url(#ultraDark)",
            });
            counter++;
            createfigurePath.createSvgTag();
        }
    }
    init(container) {
        this.makeFigures(container);
    }
}
