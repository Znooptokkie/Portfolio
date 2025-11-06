import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
export class SVGDefsElement extends CreateSvgElements {
    constructor(parentSvgElement) {
        super("defs", {}, true);
        this.parentSvgElement = parentSvgElement;
        this.defSvgElement = null;
    }
    createDefSVGElement() {
        if (!this.defSvgElement) {
            const defElement = CreateSvgElements.createSVGElement("defs");
            if (!defElement || !this.parentSvgElement) {
                console.error("Cannot create <defs> SVG Element");
                return null;
            }
            this.parentSvgElement.appendSVGToHTMLId(defElement);
            this.defSvgElement = defElement;
        }
        return this.defSvgElement;
    }
    get element() {
        return this.defSvgElement;
    }
}
