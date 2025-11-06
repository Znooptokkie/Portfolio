import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";

export class SVGDefsElement extends CreateSvgElements
{
    public defSvgElement: SVGElement | null = null;

    constructor(
        private parentSvgElement: CreateSvgElements | null
    ) 
    {
        super("defs",{}, true)
    }

    public createDefSVGElement(): SVGElement | null
    {
        if (!this.defSvgElement)
        {
            const defElement = CreateSvgElements.createSVGElement("defs");

            if (!defElement || !this.parentSvgElement)
            {
                console.error("Cannot create <defs> SVG Element");
                return null;
            }

            this.parentSvgElement.appendSVGToHTMLId(defElement);
            this.defSvgElement = defElement;
        }

        return this.defSvgElement;
    }

    public get element(): SVGGElement | null 
    {
        return this.defSvgElement as SVGGElement | null;
    }
}
