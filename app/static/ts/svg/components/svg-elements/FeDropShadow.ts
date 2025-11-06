import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
import { CustomSVGFilter } from "./Filter.js";

export class SVGFeDropShadow
{
    constructor(
        private parentSvgElement: CustomSVGFilter | null,
        private attributes: Record<string, string | number>
    ) {}

    public createFeDropShadowElement(): void | null
    {
        const feDropShadowElement = CreateSvgElements.createSVGElement("feDropShadow", this.attributes);

        if (!feDropShadowElement || !this.parentSvgElement)
        {
            console.error("Cannot create <feDropShadow> SVG Element");
            return null;
        }

        const filterElement = this.parentSvgElement.createFilterElement();
        filterElement?.appendChild(feDropShadowElement);
    }
}