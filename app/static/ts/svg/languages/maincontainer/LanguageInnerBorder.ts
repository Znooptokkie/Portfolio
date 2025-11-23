import { LanguageMainBorder } from "./LanguageMainBorder.js"

import { innerPathString, outerPath } from "../languageInit.js"

import{ SVGFactory } from "../../components/svg-core/SVGFactory.js"
import { CalcPathFigures } from "../../components/svg-calculations/CalcPathFigures.js"

import { SVGPathAttributes } from "../../../types/svg/attributes.js"
import { CreateSVG } from "../../components/svg-core/SVGCreate.js"

export class LanguageInnerBorder
{
    private parentSVGSource: LanguageMainBorder
    private parentSVG: SVGElement | null

    constructor(parentSVGSource: LanguageMainBorder)
    {
        this.parentSVGSource = parentSVGSource;
        this.parentSVG = parentSVGSource.getSVGElementRoot;
    }

    private makeFigures(container: CreateSVG): void | null
    {        
        if (!innerPathString)
            return null
        const getFiguresPath = CalcPathFigures.createFigurePathString(innerPathString, outerPath);

        if (!getFiguresPath)
            return null

        const innerGroup = new SVGFactory(container, "g", {
            class: `${this.parentSVGSource.sectionName}-inner`
        }).createSvgTag()

        new SVGFactory(innerGroup, "path", {
            d: innerPathString,
            fill: "url(#ultraDarkGlass)",
            filter: "url(#ultraDarkFrosted) url(#borderSegmentShadow)",
            stroke: "none",
        }).createSvgTag();

        let counter = 0;
        
        for (const figure of getFiguresPath)
        {
            let color = counter < 12 ? "#01030a" : "#01030a";

            const createfigurePath = new SVGFactory<SVGPathAttributes>(container, "path", {
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

    public init(container: CreateSVG): void
    {
        this.makeFigures(container)
    }
}