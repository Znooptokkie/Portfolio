import { InnerBorder, LanguageMainBorder } from "./LanguageMainBorder.js"

// import { innerPathString, outerPath } from "../languageInit.js"

import{ SVGFactory } from "../../components/svg-core/SVGFactory.js"
import { CalcPathFigures } from "../../components/svg-calculations/CalcPathFigures.js"

import { SVGPathAttributes } from "../../../types/svg/attributes.js"
import { CreateSVG } from "../../components/svg-core/SVGCreate.js"

export class LanguageInnerBorder
{
    private parentSVGSource: LanguageMainBorder
    private parentSVG: SVGElement | null
    private padding: number

    constructor(parentSVGSource: LanguageMainBorder, padding: number = 5)
    {
        this.parentSVGSource = parentSVGSource;
        this.parentSVG = parentSVGSource.getSVGElementRoot;
        this.padding = padding
    }

    private makeFigures(container: CreateSVG): void | null
    {        
        const outer = this.parentSVGSource.getPathPoints;
        const inner = new InnerBorder(this.parentSVGSource).getInnerPathValues(this.padding);

        if (!inner || !outer)
            return null
            
        const getFiguresPath = CalcPathFigures.createFigurePathString(inner, outer);
            
        if (!getFiguresPath)
            return null

        const innerGroup = new SVGFactory(container, "g", {
            class: `${this.parentSVGSource.sectionName}-inner`
        }).createSvgTag()

        new SVGFactory(innerGroup, "path", {
            d: inner,
            // fill: "#000214",
            fill: "url(#ultraDarkGlass)",
            // filter: "url(#ultraDarkFrosted) url(#borderSegmentShadow)",
            stroke: "none",
        }).createSvgTag();

        let counter = 0;
        
        for (const figure of getFiguresPath)
        {
            // let color = counter < 12 ? "#01030a" : "#000214";
            // let color = counter < 12 ? "#010307" : "#010307"
            let color = counter < 12 ? "#0a121c" : "#010307"


            const createfigurePath = new SVGFactory<SVGPathAttributes>(container, "path", {
                class: `figure-${counter}`,
                d: `${figure}Z`,
                stroke: "rgba(51, 81, 142, 0.85)",
                // stroke: "#010307",
                "stroke-width": 1,
                opacity: "1",
                // fill: "url(#innerBorderGradient)"
                fill: "none",
                // fill: "#000214",
                // filter: "url(#ultraDark)",
            });

            counter++;
            createfigurePath.createSvgTag();
        }
    }

    public init(container: CreateSVG): void
    {
        this.makeFigures(container)
    }
}