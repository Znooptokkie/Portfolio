import { CreateSVG } from "./SVGCreate.js";

export class SVGFactory<T extends Record<string, string | number> = Record<string, string | number>>
{
    // -- SVGElement: The SVG element created by this factory
    private SVGElement: SVGElement | null = null;

    // -- parentSVG: The parent to which the created element will be appended
    // -- SVGNSParam: The type of SVG element to create (e.g., "circle", "rect")
    // -- options: Optional key:value pairs applied as attributes to the created element
    constructor(
        private parentSVG: CreateSVG | SVGElement | SVGFactory | null,
        private SVGNSParam: keyof SVGElementTagNameMap,
        private options?: T
    )
    {
        this.SVGNSParam = SVGNSParam;
        this.options = options;
    }

    // -- **Creates the specified SVG element**
    // -- **Appends it to the resolved parent (CreateSVG, SVGFactory, or SVGElement)**
    // -- **If creation fails or parent cannot be resolved, logs an error**
    // --
    // -- return: The created SVG element or null if creation/appending fails
    public createSvgTag(): SVGElement | null
    {
        if (!this.SVGElement)
        {
            this.SVGElement = CreateSVG.createSVGElement(this.SVGNSParam, this.options);

            if (!this.SVGElement)
            {
                console.error(`Can't create <${this.SVGNSParam}> tag or parent SVG is missing.`);
                return null;
            }

            let parent: CreateSVG | SVGElement | null = null;

            if (this.parentSVG instanceof CreateSVG) 
            {   
                parent = this.parentSVG.getSVGElementRoot;
            } 
            else if (this.parentSVG instanceof SVGFactory) 
            {
                parent = this.parentSVG.getSVGElement;
            } 
            else if (this.parentSVG instanceof SVGElement) 
            {
                parent = this.parentSVG;
            }

            if (!parent) 
            {
                console.error("Can't find parent SVG element.");
                return null;
            }

            parent.appendChild(this.SVGElement);
        }

        return this.SVGElement;
    }

    // -- **Getter for the created SVG element**
    public get getSVGElement(): SVGElement | null
    {
        return this.SVGElement as SVGElement | null;
    }
}
