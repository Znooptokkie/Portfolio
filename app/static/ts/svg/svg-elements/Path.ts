import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
import { SVGGroup } from "./Group.js";

export class SVGPath
{
    constructor(
        private parentSvgElement: SVGGroup | CreateSvgElements | null,
        private attributes: Record<string, string | number>
    ) {}

    public createPathElement(): void | null
    {
        const pathElement = CreateSvgElements.createSVGElement("path", this.attributes);

        if (!pathElement || !this.parentSvgElement)
        {
            console.error("Can not create <path> SVG Element");
            return null;
        }

        if (this.parentSvgElement instanceof CreateSvgElements)
        {
            this.parentSvgElement.appendSVGToHTMLId(pathElement);
        }
        else if (this.parentSvgElement instanceof SVGGroup)
        {
            const groupElement = this.parentSvgElement.createGroupSVGElement();
            groupElement?.appendChild(pathElement);
        }
    }
}