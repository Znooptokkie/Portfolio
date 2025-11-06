import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
import { SVGGroup } from "./Group.js";
export class SVGForeignObject {
    constructor(parentSvg, attributes) {
        this.parentSvg = parentSvg;
        this.attributes = attributes;
        this.foreignObjectElement = null;
        this.attributes = attributes;
    }
    createForeignObjectElement() {
        var _a;
        if (!this.foreignObjectElement) {
            this.foreignObjectElement = CreateSvgElements.createSVGElement("foreignObject", this.attributes);
            if (!this.foreignObjectElement) {
                console.error("Cannot create <foreignObject> element.");
                return null;
            }
            if (this.parentSvg instanceof CreateSvgElements) {
                this.parentSvg.appendSVGToHTMLId(this.foreignObjectElement);
            }
            else if (this.parentSvg instanceof SVGGroup) {
                if (!this.parentSvg.element) {
                    this.parentSvg.createGroupSVGElement();
                }
                (_a = this.parentSvg.element) === null || _a === void 0 ? void 0 : _a.appendChild(this.foreignObjectElement);
            }
        }
        return this.foreignObjectElement;
    }
    get element() {
        return this.foreignObjectElement;
    }
}
