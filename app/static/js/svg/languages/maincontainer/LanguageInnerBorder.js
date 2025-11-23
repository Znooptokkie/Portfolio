import { innerPathString, outerPath } from "../languageInit.js";
import { SVGFactory } from "../../components/svg-core/SVGFactory.js";
import { CalcPathFigures } from "../../components/svg-calculations/CalcPathFigures.js";
export class LanguageInnerBorder {
    constructor(parentSVGSource) {
        this.parentSVGSource = parentSVGSource;
        this.parentSVG = parentSVGSource.getSVGElementRoot;
    }
    makeFigures(container) {
        if (!innerPathString)
            return null;
        const getFiguresPath = CalcPathFigures.createFigurePathString(innerPathString, outerPath);
        if (!getFiguresPath)
            return null;
        const innerGroup = new SVGFactory(container, "g", {
            class: `${this.parentSVGSource.sectionName}-inner`
        }).createSvgTag();
        new SVGFactory(innerGroup, "path", {
            d: innerPathString,
            fill: "url(#ultraDarkGlass)",
            filter: "url(#ultraDarkFrosted) url(#borderSegmentShadow)",
            stroke: "none",
        }).createSvgTag();
        let counter = 0;
        for (const figure of getFiguresPath) {
            let color = counter < 12 ? "#01030a" : "#01030a";
            const createfigurePath = new SVGFactory(container, "path", {
                class: `figure-${counter}`,
                d: `${figure}Z`,
                stroke: "rgba(51, 81, 142, 0.5)",
                "stroke-width": 1,
                opacity: "1",
                fill: color,
                filter: "url(#ultraDark)",
            });
            counter++;
            createfigurePath.createSvgTag();
        }
    }
    init(container) {
        this.makeFigures(container);
    }
}
