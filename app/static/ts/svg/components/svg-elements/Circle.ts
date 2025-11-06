import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
import { SVGClipPathElement } from "./ClipPath.js";
import { SVGGroup } from "./Group.js";

export class SVGCircle
{
    constructor(
        private parentSvgElement: SVGClipPathElement | CreateSvgElements | SVGGroup | null,
        private attributes: Record<string, string | number>
    ) {}

    public createCircleElement(): void | null
    {
        const circleElement = CreateSvgElements.createSVGElement("circle", this.attributes);

        if (!circleElement || !this.parentSvgElement)
        {
            console.error("Can not create <circle> SVG Element");
            return null;
        }

        if (this.parentSvgElement instanceof CreateSvgElements)
        {
            this.parentSvgElement.appendSVGToHTMLId(circleElement);
        }
        else if (this.parentSvgElement instanceof SVGClipPathElement)
        {
            const clipPathElement = this.parentSvgElement.createClipPathSVGElement();
            clipPathElement?.appendChild(circleElement);
        }
        else if (this.parentSvgElement instanceof SVGGroup)
        {
            const groupElement = this.parentSvgElement.createGroupSVGElement();
            groupElement?.appendChild(circleElement);
        }
    }
}
