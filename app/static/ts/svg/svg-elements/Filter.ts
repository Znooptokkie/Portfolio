import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
import { SVGDefsElement } from "./Defs.js";

export class SVGFilterElement 
{
    protected attributes: Record<string, string | number>;
    protected defs: SVGDefsElement;

    constructor(defs: SVGDefsElement, attributes: Record<string, string | number>) 
    {
        this.defs = defs;
        this.attributes = attributes;
    }

    public createFilterElement(): SVGElement | null 
    {
        const defsEl = this.defs.createDefSVGElement();

        if (!defsEl) 
        {
            console.error("No <defs> element available for filter");
            return null;
        }

        const filterEl = CreateSvgElements.createSVGElement("filter", this.attributes);
        
        if (!filterEl) 
        {
            console.error("Cannot create <filter>");
            return null;
        }

        defsEl.appendChild(filterEl);
        return filterEl;
    }
}
