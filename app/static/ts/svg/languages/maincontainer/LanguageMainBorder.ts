import { CreateSVG } from "../../components/svg-core/SVGCreate.js"
import{ SVGFactory } from "../../components/svg-core/SVGFactory.js"
import { CalcPathProperties } from "../../components/svg-calculations/CalcPathProperties.js"

import { SVGPathAttributes } from "../../../types/svg/attributes.js"

import { outerPath } from "../languageInit.js"

export class LanguageMainBorder extends CreateSVG
{
    public sectionName: string
    private pathPoints: string

    constructor(
        HTMLId: string,
        svgAttributes: Record<string, string>,
        defaultStyling: boolean,
        sectionName: string,
        pathPoints: string
    )
    {
        super(HTMLId, svgAttributes, defaultStyling)
        this.sectionName = sectionName
        this.pathPoints = pathPoints
    }

    private createMainContainerContrast(): void
    {
        const contrastGroup = new SVGFactory(this, "g", {
            id: `${this.sectionName}-contrast`
        }).createSvgTag()

        const contrastPath = new SVGFactory<SVGPathAttributes>(contrastGroup, "path", {
            d: this.pathPoints,
            // fill: "#000214",
            fill: "none",
            stroke: "none",
            "stroke-width": 1
        }).createSvgTag()
    }

    public init(): void
    {
        this.createMainContainerContrast()
    }

    public get getPathPoints() : string 
    {
        return this.pathPoints
    }
}

export class InnerBorder
{
    private parentSVGSource: LanguageMainBorder;
    private parentSVG: SVGElement | null;

    constructor(parentSVGSource: LanguageMainBorder)
    {
        this.parentSVGSource = parentSVGSource;
        this.parentSVG = parentSVGSource.getSVGElementRoot;
    }

    public getInnerPathValues(padding: number = 10): string | null
    {
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
