// svg-elements/Path.ts
import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
import { SVGGroup } from "./Group.js";

export class SVGPath {
    private pathElement: SVGPathElement | null = null;

    constructor(
        private parent: CreateSvgElements | SVGGroup | SVGElement | null,
        private attributes: Record<string, string | number>
    ) {}

    public createPathElement(): SVGPathElement | null 
    {
        this.pathElement = CreateSvgElements.createSVGElement("path", this.attributes) as SVGPathElement;

        if (!this.pathElement || !this.parent) 
        {
            console.error("Cannot create <path> SVG element.");
            return null;
        }

        if (this.parent instanceof CreateSvgElements) 
        {
            this.parent.appendSVGToHTMLId(this.pathElement);
        }
        else if (this.parent instanceof SVGGroup) 
        {
            const groupEl = this.parent.element;
            if (groupEl) 
            {
                groupEl.appendChild(this.pathElement);
            }
        }
        else if (this.parent instanceof SVGElement) 
        {
            this.parent.appendChild(this.pathElement);
        }

        return this.pathElement;
    }

    public get element(): SVGPathElement | null 
    {
        return this.pathElement;
    }
}