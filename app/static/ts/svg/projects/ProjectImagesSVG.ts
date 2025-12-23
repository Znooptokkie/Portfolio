import { CreateSVG } from "../components/core/SVGCreate.js"
import { SVGFactory } from "../components/core/SVGFactory.js"

export class ProjectImagesSVG
{
    private MAIN_PATH: string
    private BORDER_PADDING: number

    private parentSVG: CreateSVG | null = null

    constructor(
        optional:
        {
            MAIN_PATH?: string
            BORDER_PADDING?: number
        } = {},
        parentSVG: CreateSVG
    )
    {
        this.MAIN_PATH = optional.MAIN_PATH ?? ""
        this.BORDER_PADDING = optional.BORDER_PADDING ?? 0
        this.parentSVG = parentSVG ?? null
    }

    public createProjectLogoSVG()
    {
        const logoSVG = new SVGFactory(this.parentSVG, "path", {
            d: this.MAIN_PATH,
            stroke: "red"
        }).createSvgTag()

        return logoSVG
    }
}