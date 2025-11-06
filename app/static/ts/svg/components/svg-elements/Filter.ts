import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
import { SVGDefsElement } from "./Defs.js";

export class CustomSVGFilter
{
    protected attributes: Record<string, string | number>;
    protected defs: SVGDefsElement;

    private filterSvgElement: SVGFilterElement | null = null;

    constructor(defs: SVGDefsElement, attributes: Record<string, string | number>) 
    {
        this.defs = defs;
        this.attributes = attributes;
    }

    public createFilterElement(): SVGFilterElement | null 
    {
        const defsEl = this.defs.createDefSVGElement();
        if (!defsEl) return null;

        const filterEl = CreateSvgElements.createSVGElement("filter", this.attributes) as SVGFilterElement;
        defsEl.appendChild(filterEl);
        this.filterSvgElement = filterEl;
        return filterEl;
    }

    public get element(): SVGFilterElement | null 
    {
        return this.filterSvgElement;
    }
}
