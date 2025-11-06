import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";

export class SVGGroup
{
    private groupSvgElement: SVGElement | null = null;

    constructor(
        private parentSvg: CreateSvgElements,
        private attributes: Record<string, string | number>
        // TODO!: Moet nog zorgen dat die ook in zichezelf <g> kan groeperen
    ) 
    {
        this.attributes = attributes;
    }

    public createGroupSVGElement(): SVGElement | null
    {
        if (!this.groupSvgElement)
        {
            this.groupSvgElement = CreateSvgElements.createSVGElement("g", this.attributes);

            if (!this.groupSvgElement)
            {
                console.error("Cannot create <defs> element.");
                return null;
            }

            this.parentSvg.appendSVGToHTMLId(this.groupSvgElement);
        }

        return this.groupSvgElement;
    }

    public get element(): SVGGElement | null 
    {
        return this.groupSvgElement as SVGGElement | null;
    }

}