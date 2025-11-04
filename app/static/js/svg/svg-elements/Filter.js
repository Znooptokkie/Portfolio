import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
export class SVGFilterElement {
    constructor(defs, attributes) {
        this.defs = defs;
        this.attributes = attributes;
    }
    createFilterElement() {
        const defsEl = this.defs.createDefSVGElement();
        if (!defsEl) {
            console.error("No <defs> element available for filter");
            return null;
        }
        const filterEl = CreateSvgElements.createSVGElement("filter", this.attributes);
        if (!filterEl) {
            console.error("Cannot create <filter>");
            return null;
        }
        defsEl.appendChild(filterEl);
        return filterEl;
    }
}
