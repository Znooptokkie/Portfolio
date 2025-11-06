import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
export class CustomSVGFilter {
    constructor(defs, attributes) {
        this.filterSvgElement = null;
        this.defs = defs;
        this.attributes = attributes;
    }
    createFilterElement() {
        const defsEl = this.defs.createDefSVGElement();
        if (!defsEl)
            return null;
        const filterEl = CreateSvgElements.createSVGElement("filter", this.attributes);
        defsEl.appendChild(filterEl);
        this.filterSvgElement = filterEl;
        return filterEl;
    }
    get element() {
        return this.filterSvgElement;
    }
}
