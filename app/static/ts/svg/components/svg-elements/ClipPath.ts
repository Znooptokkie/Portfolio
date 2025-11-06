import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";

export class SVGClipPathElement
{
    private clipPathSvgElement: SVGElement | null = null;

    constructor(
        private parentSvg: CreateSvgElements,
        private attributes: Record<string, string | number>
    ) 
    {
        this.attributes = attributes;
    }

    public createClipPathSVGElement(): SVGElement | null
    {
        this.clipPathSvgElement = CreateSvgElements.createSVGElement("clipPath", this.attributes);

        if (!this.clipPathSvgElement)
        {
            console.error("Cannot create <clipPath> element.");
            return null;
        }

        return this.parentSvg.appendSVGToHTMLId(this.clipPathSvgElement);
    }

    public get element(): SVGGElement | null 
    {
        return this.clipPathSvgElement as SVGGElement | null
    }
}
