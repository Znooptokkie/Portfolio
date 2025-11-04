import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
import { SVGGroup } from "./Group.js";

export class SVGLine
{
    constructor(
        private parentSvgElement: SVGGroup | CreateSvgElements,
        private attributes: Record<string, string | number>
    ) {}
    
    public createLineElement(): void | null
    {
        const lineElement = CreateSvgElements.createSVGElement("line", this.attributes);
        
        if (!lineElement || !this.parentSvgElement)
        {
            console.error("Can not create <line> SVG Element");
            return null;
        }

        if (this.parentSvgElement instanceof CreateSvgElements)
        {
            this.parentSvgElement.appendSVGToHTMLId(lineElement);
        }
        else if (this.parentSvgElement instanceof SVGGroup)
        {
            const groupElement = this.parentSvgElement.createGroupSVGElement();
            groupElement?.appendChild(lineElement);
        }
    }
}