import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";

export class SVGImage
{
    constructor(
        private parentSvgElement: CreateSvgElements,
        private attributes: Record<string, string | number>
    ) {}
    
    public createimageElement(): void | null
    {
        const imageElement = CreateSvgElements.createSVGElement("image", this.attributes);
        
        if (!imageElement || !this.parentSvgElement)
        {
            console.error("Can not create <line> SVG Element");
            return null;
        }

        if (this.parentSvgElement instanceof CreateSvgElements)
        {
            this.parentSvgElement.appendSVGToHTMLId(imageElement);
        }
    }
}