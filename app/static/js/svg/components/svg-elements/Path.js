// svg-elements/Path.ts
import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
import { SVGGroup } from "./Group.js";
export class SVGPath {
    constructor(parent, attributes) {
        this.parent = parent;
        this.attributes = attributes;
        this.pathElement = null;
    }
    createPathElement() {
        this.pathElement = CreateSvgElements.createSVGElement("path", this.attributes);
        if (!this.pathElement || !this.parent) {
            console.error("Cannot create <path> SVG element.");
            return null;
        }
        if (this.parent instanceof CreateSvgElements) {
            this.parent.appendSVGToHTMLId(this.pathElement);
        }
        else if (this.parent instanceof SVGGroup) {
            const groupEl = this.parent.element;
            if (groupEl) {
                groupEl.appendChild(this.pathElement);
            }
        }
        else if (this.parent instanceof SVGElement) {
            this.parent.appendChild(this.pathElement);
        }
        return this.pathElement;
    }
    get element() {
        return this.pathElement;
    }
}
