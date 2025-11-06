import { CreateSvgElements } from "../svg-core/CreateSvgElements.js";
import { SVGGroup } from "./Group.js";

export class SVGForeignObject
{
    private foreignObjectElement: SVGElement | null = null;

    constructor(
        private parentSvg: CreateSvgElements | SVGGroup | null,
        private attributes: Record<string, string | number>
    ) 
    {
        this.attributes = attributes;
    }

    public createForeignObjectElement(): SVGElement | null
    {
        if (!this.foreignObjectElement)
        {
            this.foreignObjectElement = CreateSvgElements.createSVGElement("foreignObject", this.attributes);

            if (!this.foreignObjectElement)
            {
                console.error("Cannot create <foreignObject> element.");
                return null;
            }

            if (this.parentSvg instanceof CreateSvgElements)
            {
                this.parentSvg.appendSVGToHTMLId(this.foreignObjectElement);
            }
            else if (this.parentSvg instanceof SVGGroup)
            {
                if (!this.parentSvg.element) 
                {
                    this.parentSvg.createGroupSVGElement();
                }
                this.parentSvg.element?.appendChild(this.foreignObjectElement);
            }
        }

        return this.foreignObjectElement;
    }

    public get element(): SVGElement | null 
    {
        return this.foreignObjectElement;
    }
}
